
import { GoogleGenAI, Type } from "@google/genai";
import type { MLModel, PredictionResponse, Feature } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getPrediction = async (
  model: MLModel,
  formData: Record<string, string | number>
): Promise<PredictionResponse> => {
  try {
    const featureMap = model.features.reduce((acc, feature) => {
      acc[feature.id] = feature;
      return acc;
    }, {} as Record<string, Feature>);

    const promptData = Object.entries(formData).reduce((acc, [key, value]) => {
      const featureName = featureMap[key]?.name || key;
      acc[featureName] = value;
      return acc;
    }, {} as Record<string, string | number>);

    const userPrompt = JSON.stringify(promptData);

    const schema = {
      type: Type.OBJECT,
      properties: {
        prediction: {
          type: model.id === 'sentiment-analyzer' ? Type.STRING : Type.NUMBER,
          description: `The model's prediction. A ${model.predictionTarget.name}.`,
        },
        featureImportances: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              feature: {
                type: Type.STRING,
                description: "The name of the input feature.",
              },
              importance: {
                type: Type.NUMBER,
                description: "The importance score of the feature (0-100).",
              },
            },
            required: ["feature", "importance"],
          },
        },
      },
      required: ["prediction", "featureImportances"],
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: model.promptSystemInstruction,
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText) as PredictionResponse;
    return parsedResponse;
  } catch (error) {
    console.error("Error fetching prediction from Gemini API:", error);
    throw new Error("Failed to get a prediction. Please check the console for details.");
  }
};
