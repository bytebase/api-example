export interface ClassificationLevel {
  id: string;
  title: string;
  description: string;
}

export interface Classification {
  id: string;
  title: string;
  description: string;
  levelId?: string;
}

export interface ClassificationConfig {
  id: string;
  title: string;
  levels: ClassificationLevel[];
  classification: Record<string, Classification>;
  classificationFromConfig: boolean;
}

export interface DataClassificationSettingValue {
  configs: ClassificationConfig[];
}

export interface ClassificationResponse {
  name: string;
  value: {
    dataClassificationSettingValue: DataClassificationSettingValue;
  };
} 