require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

function correctPolishCharacters(text) {
  return text
    .replace(/Ä…/g, "ą")
    .replace(/Ä‡/g, "ć")
    .replace(/Ä™/g, "ę")
    .replace(/Å‚/g, "ł")
    .replace(/Å„/g, "ń")
    .replace(/Ã³/g, "ó")
    .replace(/Å›/g, "ś")
    .replace(/Å¼/g, "ż")
    .replace(/Åº/g, "ź")
    .replace(/Ä„/g, "Ą")
    .replace(/Ä†/g, "Ć")
    .replace(/Ä˜/g, "Ę")
    .replace(/Å/g, "Ł")
    .replace(/Åƒ/g, "Ń")
    .replace(/Ã“/g, "Ó")
    .replace(/Åš/g, "Ś")
    .replace(/Å»/g, "Ż")
    .replace(/Å¹/g, "Ź");
}

const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiEndpoint = "https://api.openai.com/v1/chat/completions";

const articleContent = correctPolishCharacters(
  fs.readFileSync("artykul.txt", "utf-8")
);

async function generateHtmlFromArticle() {
  try {
    const prompt = `
      Przekształć poniższy tekst artykułu na strukturalny i semantyczny kod HTML. Oto wymagania:
      1. Umieść tytuł artykułu w tagu <h1>.
      2. Każdy akapit tekstu umieść w osobnym tagu <p>.
      3. Dodaj grafiki w następujących miejscach:
         - Po opisie asystentów głosowych (obraz dotyczący asystentów głosowych, np. Siri lub Google Assistant).
         - Po omówieniu uczenia maszynowego i sieci neuronowych (ilustracja przedstawiająca algorytmy uczenia maszynowego).
         - Przy sekcji "Wyzwania etyczne i społeczne" (ilustracja dotycząca prywatności danych lub etyki AI).
         - W sekcji "Automatyzacja i przyszłość rynku pracy" (grafika symbolizująca automatyzację lub robotykę w miejscu pracy).
      4. W każdym tagu <img> użyj atrybutów:
         - src="image_placeholder.jpg"
         - alt="krótki opis tematyki grafiki".
         - Pod każdym obrazem umieść podpis w tagu <figcaption>, który opisuje grafikę bardziej szczegółowo.
      5. Nie dodawaj tagów <html>, <head> ani <body>. Zwróć tylko treść do umieszczenia pomiędzy tagami <body>.
      6. Zadbaj o poprawną strukturę HTML i semantyczność kodu.
      7. Upewnij się, że treść w alt i figcaption jest zgodna z treścią artykułu i opisuje tematykę obrazów.
      8. Oznacz nagłówki sekcji za pomocą tagów <h2>, jeśli artykuł zawiera podrozdziały (np. „Wyzwania etyczne i społeczne”).
      Tekst: ${articleContent}
    `;

    const response = await axios.post(
      openaiEndpoint,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Jesteś asystentem, który konwertuje tekst na sformatowany HTML.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 3000,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const htmlContent = response.data.choices[0].message.content.trim().replace(/^```html|```$/g, "");

    fs.writeFileSync("artykul.html", htmlContent);
    console.log("Plik artykul.html został zapisany.");
  } catch (error) {
    console.error(
      "Błąd podczas generowania HTML:",
      error.response ? error.response.data : error.message
    );
  }
}

generateHtmlFromArticle();
