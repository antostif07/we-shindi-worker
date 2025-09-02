import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

// Exemple : récupération context client
async function getClientContext(clientId: string) {
  // Ici tu peux récupérer depuis Firestore ou Upstash Redis
  return {
    name: clientId,
    catalog: ["Produit A", "Produit B", "Service X"],
    allowedIntents: ["salutation","demande_produit","reclamation","autre"]
  };
}

export async function processMessageAI({ clientId, message, intent }: { clientId: string, message: string, intent: string }) {
  const context = await getClientContext(clientId);

  const prompt = `
Client: ${context.name}
Catalogue: ${context.catalog.join(", ")}
Intention: ${intent}
Message: "${message}"
Réponds de manière concise et adaptée.
`;

  const response = await genAI.models.generateContent({ model: "gemini-1.5-flash", contents: prompt });
  return response.text!.trim();
}
