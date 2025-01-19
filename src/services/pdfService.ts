import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const fileManager = new GoogleAIFileManager(import.meta.env.VITE_GEMINI_API_KEY);

async function uploadToGemini(file: File) {
  const uploadResult = await fileManager.uploadFile(file, {
    mimeType: file.type,
    displayName: file.name,
  });
  return uploadResult.file;
}

async function waitForFilesActive(files: any[]) {
  for (const name of files.map((file) => file.name)) {
    let file = await fileManager.getFile(name);
    while (file.state === "PROCESSING") {
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      file = await fileManager.getFile(name);
    }
    if (file.state !== "ACTIVE") {
      throw Error(`File ${file.name} failed to process`);
    }
  }
}

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "You are an AI chatbot that accepts Form 16 as input and generates a JSON file for pre-filled data to be uploaded on the e-filing portal.",
});

export async function processForm16(pdfFile: File) {
  try {
    const uploadedFile = await uploadToGemini(pdfFile);
    await waitForFilesActive([uploadedFile]);

    const chatSession = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    });

    const result = await chatSession.sendMessage({
      role: "user",
      parts: [
        {
          fileData: {
            mimeType: uploadedFile.mimeType,
            fileUri: uploadedFile.uri,
          },
        },
        {
          text: "Extract data from this Form 16 and generate a JSON file following the ITR-1 format",
        },
      ],
    });

    const jsonResponse = JSON.parse(result.response.text());
    return jsonResponse;
  } catch (error) {
    console.error('Error processing Form 16:', error);
    throw error;
  }
} 