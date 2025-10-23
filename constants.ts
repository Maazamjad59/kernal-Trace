
import type { MLModel } from './types';
import { FeatureType } from './types';

export const ML_MODELS: MLModel[] = [
  {
    id: 'credit-score',
    name: 'Credit Score Predictor',
    description: 'This is a regression model that predicts a creditworthiness score based on financial factors. Higher scores indicate lower risk. It helps lenders assess the likelihood of a borrower defaulting on a loan.',
    features: [
      { id: 'income', name: 'Annual Income ($)', type: FeatureType.SLIDER, min: 10000, max: 200000, step: 1000, defaultValue: 75000, description: 'The total annual income of the applicant.' },
      { id: 'age', name: 'Age', type: FeatureType.SLIDER, min: 18, max: 80, step: 1, defaultValue: 35, description: 'The age of the applicant.' },
      { id: 'dti', name: 'Debt-to-Income Ratio', type: FeatureType.SLIDER, min: 0, max: 1, step: 0.01, defaultValue: 0.4, description: 'The percentage of gross monthly income that goes to paying monthly debt payments.' },
      { id: 'cards', name: 'Number of Credit Cards', type: FeatureType.SLIDER, min: 0, max: 20, step: 1, defaultValue: 4, description: 'The total number of credit cards the applicant holds.' },
    ],
    predictionTarget: { name: 'Credit Score', unit: '' },
    promptSystemInstruction: 'You are an expert machine learning model that predicts creditworthiness. Analyze the user\'s input features and provide a credit score from 300 to 850. Also, provide a feature importance score for each input, where a higher score means the feature had a greater impact on the prediction. The total of all importance scores should sum to 100. Respond ONLY with a valid JSON object matching the provided schema.'
  },
  {
    id: 'sentiment-analyzer',
    name: 'Sentiment Analyzer',
    description: 'This is a classification model that determines the emotional tone behind a body of text. It\'s commonly used to understand customer feedback, social media sentiment, and reviews.',
    features: [
      { id: 'text', name: 'Review Text', type: FeatureType.TEXT, defaultValue: 'The food at this restaurant was absolutely amazing!', description: 'Enter the text you want to analyze.' }
    ],
    predictionTarget: { name: 'Sentiment', unit: '' },
    promptSystemInstruction: 'You are an expert machine learning model that analyzes text sentiment. Classify the user\'s input text as "Positive", "Negative", or "Neutral". Also, provide a feature importance score of 100 for the text input, as it is the only feature. Respond ONLY with a valid JSON object matching the provided schema.'
  },
  {
    id: 'house-price',
    name: 'House Price Estimator',
    description: 'A regression model that predicts the market value of a house based on its key features. Real estate agents and buyers use such models to get quick valuation estimates.',
    features: [
      { id: 'sqft', name: 'Square Footage', type: FeatureType.SLIDER, min: 500, max: 5000, step: 50, defaultValue: 1800, description: 'The total living area of the house in square feet.' },
      { id: 'bedrooms', name: 'Bedrooms', type: FeatureType.SLIDER, min: 1, max: 8, step: 1, defaultValue: 3, description: 'The number of bedrooms in the house.' },
      { id: 'bathrooms', name: 'Bathrooms', type: FeatureType.SLIDER, min: 1, max: 6, step: 0.5, defaultValue: 2, description: 'The number of bathrooms in the house.' },
      { id: 'location', name: 'Location Quality', type: FeatureType.SELECT, options: ['Average', 'Good', 'Excellent'], defaultValue: 'Good', description: 'The perceived quality of the neighborhood.'}
    ],
    predictionTarget: { name: 'Estimated Price', unit: '$' },
    promptSystemInstruction: 'You are an expert real estate valuation model. Predict the market price of a house based on its features. Also, provide a feature importance score for each input, where a higher score means the feature had a greater impact on the prediction. The total of all importance scores should sum to 100. Respond ONLY with a valid JSON object matching the provided schema.'
  },
];
