import { convertFromExpr } from "@/plugins/cel/cel";

export async function parseCelExpression(celExpression: string): Promise<any> {
  const response = await fetch(`/api/cel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      expressions: [celExpression]
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return convertFromExpr(data.expressions[0].expr);
}