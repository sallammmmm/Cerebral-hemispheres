import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Disease, CaseStudy } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const diseaseSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING },
      description: { type: Type.STRING },
      hemisphere: { type: Type.STRING, enum: ['Left', 'Right', 'Bilateral'] },
      symptoms: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    },
    required: ['name', 'description', 'hemisphere', 'symptoms']
  }
};

const caseStudySchema: Schema = {
  type: Type.OBJECT,
  properties: {
    scenario: { type: Type.STRING },
    question: { type: Type.STRING },
    options: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of exactly 4 possible answers."
    },
    correctOptionIndex: { type: Type.INTEGER, description: "Index of the correct option (0-3)" },
    explanation: { type: Type.STRING, description: "Detailed clinical explanation of why the answer is correct." }
  },
  required: ['scenario', 'question', 'options', 'correctOptionIndex', 'explanation']
};

export const generateDiseases = async (): Promise<Disease[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 3 distinct, clinically significant diseases or syndromes specifically resulting from lesions or dysfunction in the cerebral hemispheres (e.g., stroke syndromes, neglect syndromes, aphasias). Provide diversity between left and right hemisphere pathologies.",
      config: {
        responseMimeType: "application/json",
        responseSchema: diseaseSchema,
        temperature: 0.7,
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as Disease[];
    }
    throw new Error("No data returned from Gemini");
  } catch (error) {
    console.error("Error generating diseases:", error);
    throw error;
  }
};

export const generateCaseStudy = async (): Promise<CaseStudy> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Create a challenging clinical case study question suitable for medical students involving cerebral hemisphere pathology. Include a patient vignette, a question, 4 options, and a detailed explanation.",
      config: {
        responseMimeType: "application/json",
        responseSchema: caseStudySchema,
        temperature: 0.8,
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return { ...data, id: crypto.randomUUID() } as CaseStudy;
    }
    throw new Error("No data returned from Gemini");
  } catch (error) {
    console.error("Error generating case study:", error);
    throw error;
  }
};