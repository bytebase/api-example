import { head } from "lodash-es";
import type { ConditionExpr, ConditionGroupExpr, SimpleExpr } from "../types";
import {
  isEqualityExpr,
  isCollectionExpr,
  isConditionExpr,
  isConditionGroupExpr,
  isCompareExpr,
  isStringExpr,
  ExprType,
  isRawStringExpr,
} from "../types";

type CELExpr = any;

const seq = {
  id: 1,
  next() {
    return seq.id++;
  },
};

// Build CEL expr according to simple expr
export const buildCELExpr = async (
  expr: SimpleExpr
): Promise<CELExpr | undefined> => {
  const convert = async (expr: SimpleExpr): Promise<CELExpr | undefined> => {
    if (isConditionGroupExpr(expr)) return convertGroup(expr);
    if (isConditionExpr(expr)) return convertCondition(expr);
    if (isRawStringExpr(expr)) {
      if (!expr.content) {
        return undefined;
      }
      const celExpr = head(
        (
          await celServiceClient.batchParse(
            {
              expressions: [expr.content],
            },
            {
              silent: true,
            }
          )
        ).expressions
      )?.expr;
      if (celExpr) {
        return celExpr;
      } else {
        return undefined;
      }
    }
    throw new Error(`unexpected type "${String(expr)}"`);
  };
  const convertCondition = (condition: ConditionExpr): CELExpr => {
    if (isEqualityExpr(condition)) {
      const { operator, args } = condition;
      const [factor, value] = args;
      return wrapCallExpr(operator, [
        wrapIdentExpr(factor),
        wrapConstExpr(value),
      ]);
    }
    if (isCompareExpr(condition)) {
      const { operator, args } = condition;
      const [factor, value] = args;
      return wrapCallExpr(operator, [
        wrapIdentExpr(factor),
        wrapConstExpr(value),
      ]);
    }
    if (isStringExpr(condition)) {
      const { operator, args } = condition;
      const [factor, value] = args;
      return wrapCallExpr(
        operator,
        [wrapConstExpr(value)],
        wrapIdentExpr(factor)
      );
    }
    if (isCollectionExpr(condition)) {
      const { operator, args } = condition;
      const [factor, values] = args;
      if (operator === "@not_in") {
        return wrapCallExpr("!_", [
          wrapCallExpr("@in", [wrapIdentExpr(factor), wrapListExpr(values)]),
        ]);
      }
      return wrapCallExpr(operator, [
        wrapIdentExpr(factor),
        wrapListExpr(values),
      ]);
    }
    throw new Error(`unsupported condition '${JSON.stringify(condition)}'`);
  };
  const convertGroup = async (
    group: ConditionGroupExpr
  ): Promise<CELExpr | undefined> => {
    const { operator, args } = group;
    if (args.length === 0) {
      return undefined;
    }
    if (args.length === 1) {
      // A dangled Logical Group should be extracted as single condition
      return await convert(args[0]);
    }
    const [left, ...rest] = args;
    return wrapCallExpr(
      operator,
      [
        await convert(left),
        await convertGroup({
          type: ExprType.ConditionGroup,
          operator,
          args: rest,
        }),
      ].filter(Boolean) as CELExpr[]
    );
  };

  seq.id = 1;
  try {
    return await convert(expr);
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

const wrapCELExpr = (object: any): CELExpr => {
  return CELExpr.fromJSON({
    id: seq.next(),
    ...object,
  });
};

// Note: We don't need to wrap date type factor right now. Put it here is just for prevent eslint error.
const wrapConstExpr = (value: number | string | Date): CELExpr => {
  if (typeof value === "string") {
    return wrapCELExpr({
      constExpr: {
        stringValue: value,
      },
    });
  }
  if (typeof value === "number") {
    return wrapCELExpr({
      constExpr: {
        int64Value: value,
      },
    });
  }
  throw new Error(`unexpected value "${value}"`);
};

const wrapListExpr = (values: string[] | number[]): CELExpr => {
  return wrapCELExpr({
    listExpr: {
      elements: values.map(wrapConstExpr),
    },
  });
};

const wrapIdentExpr = (name: string): CELExpr => {
  return wrapCELExpr({
    identExpr: {
      name,
    },
  });
};

const wrapCallExpr = (
  operator: string,
  args: CELExpr[],
  target?: CELExpr
): CELExpr => {
  const object: Record<string, any> = {
    function: operator,
    args,
  };
  if (target) {
    object.target = target;
  }
  return wrapCELExpr({
    callExpr: object,
  });
};