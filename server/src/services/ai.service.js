import groq from "../utils/groq.js";
import { GROQ_MODEL } from "../utils/constants.js";
import { NOTES_PROMPT } from "../utils/prompts.js";
import Document from "../models/document.model.js";

export const generateNotes = async (
  userId,
  documentId
) => {
  const document = await Document.findOne({
    _id: documentId,
    owner: userId,
  });

  if (!document) {
    throw new Error("Document not found.");
  }

  if (!document.extractedText) {
    throw new Error("Document text not extracted.");
  }

  const response =
    await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        {
          role: "user",
          content: `${NOTES_PROMPT}

${document.extractedText}`,
        },
      ],
    });

  return response.choices[0].message.content;
};