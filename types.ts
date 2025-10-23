
export enum FeatureType {
  SLIDER = 'slider',
  TEXT = 'text',
  SELECT = 'select',
}

export interface Feature {
  id: string;
  name: string;
  type: FeatureType;
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number | string;
  options?: string[];
  description: string;
}

export interface MLModel {
  id: string;
  name: string;
  description: string;
  features: Feature[];
  predictionTarget: {
    name: string;
    unit: string;
  };
  promptSystemInstruction: string;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
}

export interface PredictionResponse {
  prediction: string | number;
  featureImportances: FeatureImportance[];
}
