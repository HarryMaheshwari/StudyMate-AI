export const parseAIJson = (text) => {
  if (!text) {
    throw new Error("AI returned an empty response.");
  }

  let cleaned = text.trim();

  // Remove ```json
  cleaned = cleaned.replace(/^```json/i, "");

  // Remove ```
  cleaned = cleaned.replace(/^```/, "");

  // Remove ending ```
  cleaned = cleaned.replace(/```$/, "");

  cleaned = cleaned.trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    throw new Error("Failed to parse AI JSON response.");
  }
};