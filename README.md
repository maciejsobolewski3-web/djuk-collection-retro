# Djuk Collection — Retro

Piąty niezależny wariant pokazowego sklepu: pudrowy róż, krem, pomidorowa czerwień, pastelowe kafelki i typografia Fraunces. Ilustracja ubrań oraz fotografia kampanijna nawiązują do katalogów z lat 70.

## Wersje do porównania

- Retro: https://maciejsobolewski3-web.github.io/djuk-collection-retro/
- Editorial: https://maciejsobolewski3-web.github.io/djuk-collection-editorial/
- Atelier: https://maciejsobolewski3-web.github.io/djuk-collection-atelier/
- Bold: https://maciejsobolewski3-web.github.io/djuk-collection-bold/
- Pierwsza wersja: https://maciejsobolewski3-web.github.io/djuk-collection/

## Funkcje

Strona główna, katalog, kategorie, cztery produkty, warianty kolorystyczne, rozmiary, galeria z powiększeniem, wyszukiwanie, sortowanie, ulubione, koszyk, podsumowanie oraz strony marki i kontaktu. Dane koszyka i ulubionych korzystają z osobnych kluczy `djuk.retro.*`. Intro wyświetla się raz na sesję; można je pominąć. Animacje uwzględniają preferencję ograniczonego ruchu.

To wersja demonstracyjna. Modele, zdjęcia, rozmiary i ceny są przykładowe. Strona nie przyjmuje zamówień, nie przetwarza płatności ani nie zbiera danych klienta. Ilustracja na stronie głównej jest dekoracyjna; rzeczywisty katalog demonstracyjny dostępny jest w sekcji Kolekcja. Indeksowanie wyszukiwarek jest wyłączone.

## Uruchomienie i edycja

`npm start` uruchamia serwer pod http://localhost:4177 (Python 3). `npm run check` sprawdza składnię JavaScript (Node.js). Bez instalacji paczek i etapu budowania.

`app.js` zawiera katalog i podstrony, `index.html` nawigację i stopkę, `style.css` wspólne style, `retro.css` wygląd tej wersji, a `motion.js` intro oraz animacje. Routing oparty na fragmencie URL działa bez przekierowań na GitHub Pages. `.nojekyll` wyłącza Jekyll. Fonty Fraunces i DM Sans są pobierane z Google Fonts z systemowymi fontami zastępczymi.

## Grafiki

Nowe obrazy powstały z użyciem wbudowanego image_gen:

- [retro-collage.webp](assets/retro-collage.webp) — dekoracyjna ilustracja ubrań i dodatków.
- [retro-campaign.webp](assets/retro-campaign.webp) — fotografia modelki w czekoladowym komplecie.
- [retro-image-prompts.json](assets/retro-image-prompts.json) — pełne prompty.

Galerie produktów pochodzą z wcześniejszych wariantów; prompty dodatkowych ujęć zapisano w [alternate-image-prompts.json](assets/alternate-image-prompts.json).

## Weryfikacja

Sprawdzono Chromium na desktopie i telefonie, układy 320–1440 px, intro i ograniczony ruch, nawigację, kategorie, sortowanie, walidację rozmiaru, ilości i sumy koszyka, zapis po odświeżeniu, ulubione, wyszukiwanie, galerie, okna dialogowe oraz niezależność pamięci od wcześniejszych wariantów. Bez błędów JavaScript i brakujących zasobów.
