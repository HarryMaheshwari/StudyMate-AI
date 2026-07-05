import axios from "axios";
import { PDFParse } from "pdf-parse";

export const extractTextFromPdf = async (pdfUrl) => {
  const response = await axios.get(pdfUrl, {
    responseType: "arraybuffer",
  });

  const pdfBuffer = Buffer.from(response.data);

  const parser = new PDFParse({
    data: pdfBuffer,
  });

  const result = await parser.getText();

  await parser.destroy();

  return result.text;
};