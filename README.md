# Projekt: Analiza Sztucznej Inteligencji - Oxido

## Opis Projektu

Ten projekt generuje semantyczny i strukturalny kod HTML dla artykułu na temat sztucznej inteligencji. Używa OpenAI API do automatycznej konwersji treści z pliku tekstowego na format HTML. Projekt jest zgodny z wymaganiami zadania, tworząc odpowiednie nagłówki, paragrafy i obrazy oraz zachowując semantykę i estetykę kodu.

## Pliki projektu

- `artykul.txt` - Plik wejściowy zawierający treść artykułu w formacie tekstowym.
- `index.js` - Skrypt Node.js, który generuje `artykul.html` z `artykul.txt` za pomocą OpenAI API.
- `.env` - Plik konfiguracyjny zawierający klucz API do OpenAI. **UWAGA: PLIKU NIE ZAMIESZCZAM NA GITHUB!!!!
- `szablon.html` - Plik szablonu HTML, który można wykorzystać do dalszego formatowania.
- `podglad.html` - Podgląd artykułu z użyciem stylizacji CSS.
- `package.json` i `package-lock.json` - Pliki konfiguracyjne Node.js z wymaganymi zależnościami.

## Wymagania

- Node.js i npm
- Konto OpenAI z kluczem API

## Instrukcja instalacji

1. Sklonuj repozytorium.
2. Zainstaluj zalezności: npm install
3. Ustaw klucz API: W katalogu głównym projektu utwórz plik .env i wklej do niego swój klucz API:
OPENAI_API_KEY=twój_klucz_api_tutaj
4. Uruchom generowanie HTML: Aby wygenerować plik artykul.html z pliku artykul.txt, uruchom poniższe polecenie: node index.js
To polecenie wygeneruje plik artykul.html, który zawiera cały artykuł w formacie HTML.
5. Podgląd artykułu: Otwórz plik podglad.html w przeglądarce, aby zobaczyć wstępny podgląd artykułu z zastosowanym stylem CSS.
