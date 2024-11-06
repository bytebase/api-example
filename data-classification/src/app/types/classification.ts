export interface Classification {
  id: string;
  title: string;
  description: string;
  levelId?: string;
}

export interface ClassificationLevel {
  id: string;
  title: string;
  description: string;
}

export interface ClassificationData {
  title: string;
  levels: ClassificationLevel[];
  classification: Classification[];
} 