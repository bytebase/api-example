export interface Column {
  name: string;
  position: number;
  type: string;
  nullable: boolean;
  comment: string;
  classificationId?: string;
}

export interface ColumnConfig {
  name: string;
  classificationId: string;
  semanticTypeId: string;
  labels: Record<string, string>;
}

export interface TableConfig {
  name: string;
  columnConfigs: ColumnConfig[];
  classificationId: string;
  updater: string;
  sourceBranch: string;
  updateTime: string | null;
}

export interface SchemaConfig {
  name: string;
  tableConfigs: TableConfig[];
  functionConfigs: unknown[];
  procedureConfigs: unknown[];
  viewConfigs: unknown[];
}

export interface Table {
  name: string;
  columns: Column[];
  comment: string;
  classificationId?: string;
}

export interface Schema {
  name: string;
  tables: Table[];
}

export interface DatabaseMetadata {
  schemas: Schema[];
  schemaConfigs: SchemaConfig[];
} 