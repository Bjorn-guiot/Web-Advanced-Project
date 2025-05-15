# Web Advanced Project
Een interactieve webapplicatie waarmee je karakters uit de Rick and Morty-wereld kan ontdekken, zoeken, filteren, sorteren en opslaan als favorieten.
Gemaakt voor het vak Advanced Web.


•	Beschrijving
•	Features
•	Technische vereisten en implementatie
•	Installatiehandleiding
•	Gebruikte API's
•	Screenshots
•	Gebruikte bronnen


Beschrijving
Deze single-page applicatie gebruikt de Rick and Morty API om karakters op te halen.
Gebruikers kunnen:
•	Karakters zoeken, filteren en sorteren
•	Favoriete karakters opslaan (ook na refresh bewaard!)
•	Tussen licht en donker thema wisselen
•	Favorieten apart bekijken

Features
•	Dataverzameling: haalt karakters op via de Rick and Morty API
•	Zoekfunctie: zoek karakters op naam
•	Filterfunctie: filter op status (Alive, Dead, Unknown)
•	Favorieten: sla karakters lokaal op via LocalStorage
•	Observer API: animaties als kaarten in beeld komen
•	Thema wisselaar: schakel tussen licht en donker
•	Responsive Design: werkt op mobiel, tablet en desktop

Technische vereisten en implementatie
HTML
| Vereiste                     | Locatie              | Uitleg               |
|----------------------------------------------------------------------------|
| Basis HTML layout            | Hele bestand (1-15)  | Simpele en correcte HTML5 structuur met `<!doctype>`, `html`, `head`, `body` elementen.                 |
| Responsive design (viewport) | Lijn 6               | `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` voor mobiele responsiviteit. |
| Externe JS-module import     | Lijn 13              | `<script type="module" src="/src/main.js"></script>` gebruikt moderne ES-module import.                 |

Javascript
| Vereiste                        | Locatie                                                                   |Toelichting      |
|-------------------------------------------------------------------------------------------------------------------------------|
| **DOM manipulatie**             | Diverse regels (4, 9-27, 38-50, 63-74, 78-100)                            | Elementen selecteren (`querySelector`, `getElementById`), innerHTML manipulatie, eventlisteners koppelen (`addEventListener`). |
| **Constanten en variabelen**    | Regel 3 (`const app`), regels 10+ (`let currentPage`)                     | Gebruik van `const` en `let` voor variabelen.                                                                                  |
| **Template literals**           | Regel 6-24, 74-98                                                         | HTML-strings met `${}` interpolatie in functies `renderNav()`, `renderHeader()`, `renderPage()`, `renderCharacters()`.         |
| **Array methodes**              | Regel 95 (`map()`), 108 (`filter()`)                                      | Array methodes voor het mappen van favorieten en filteren van favorieten.                                                      |
| **Arrow functions**             | Regel 103-118 (`=>` gebruikt in event listeners)                          | Arrow functies gebruikt in `forEach` event handlers en `.map` callback.                                                        |
| **Ternary operator**            | Regel 16-23 (in `renderHeader`), 85 (in `renderCharacters`)               | Voorwaardelijke rendering en tekstselectie binnen template literals.                                                           |
| **Callback functions**          | Regel 89, 106-116 (in event listeners)                                    | Functies doorgegeven als callbacks aan eventlisteners en `.map`.                                                               |
| **Promises**                    | Regel 58-67 (fetch met `.then` en `Promise.all`)                          | Fetch gebruikt met `.then` en `Promise.all` voor meerdere API requests.                                                        |
| **Async & Await**               | Regel 53-75, 77-90 (`async function loadHomePage` en `loadFavoritesPage`) | Asynchrone functies met `await` voor fetch calls en data verwerking.                                                           |
| **LocalStorage**                | Regel 38-54 (`localStorage.getItem/setItem`)                              | Opslaan en ophalen van thema en favorieten in `localStorage`.                                                                  |
| **Formulier validatie (basis)** | Regel 0-100 (indirect, input veld aanwezig, maar geen echte validatie)    | Search input aanwezig, maar valideerfunctie ontbreekt (kan nog toegevoegd worden).                                             |
| **Eventhandling**               | Regel 30-50, 95-118                                                       | Gebeurtenissen gekoppeld aan knoppen, links, en theme toggle.    

CSS
| Vereiste                           | Regels         | Toelichting | 
| ------------------------------------------------------------------|
| **Basis CSS Styling**              | 1 - 44         | Algemene styling van `body`, `header`, `nav`, `.card`, en `img`. Gebruik van CSS variabelen (`--bg-color`, `--text-color`). |
| **Thema wisselen (licht/donker)**  | 7 - 14         | Definiëren van lichte en donkere thema's via CSS variabelen en `.dark` class op `body`.                                     |
| **Flexbox**                        | 16 - 21        | Header als flex container, kolomrichting, ruimte tussen items (`gap`), centreren van items.                                 |
| **CSS Grid**                       | 26 - 30        | Grid layout voor `#character-list` met responsive kolommen via `auto-fill` en `minmax`.                                     |
| **Overgangen / Animaties**         | 4 - 7, 33 - 39 | Transitie effecten op kleuren en op `.card` transform en opacity voor fade-in effect.                                       |
| **Gebruik van CSS variabelen**     | 3 - 14         | Variabelen voor achtergrond- en tekstkleur, aangepast bij `.dark`.                                                          |
| **Gebruiksvriendelijke elementen** | 31 - 44        | Stijl voor `.card` met afgeronde hoeken, schaduw, padding en afbeelding styling voor consistentie.                          |

Installatiehandleiding
1.	Clone deze repository:
bash
CopyEdit
git clone https://github.com/jouwgebruikersnaam/rick-and-morty-explorer.git
2.	Installeer dependencies (met Vite):
bash
CopyEdit
npm install
3.	Start de Vite development server:
bash
CopyEdit
npm run dev
4.	Open in je browser:
http://localhost:5173/
De app is nu klaar voor gebruik!

Gebruikte API's
•	Rick and Morty API https://rickandmortyapi.com/

Gebruikte bronnen
•	Rick and Morty API documentatie
•	Vite officiële documentatie
•	MDN Web Docs
•	StackOverflow
•	ChatGPT (voor hulp bij structuur en observer API uitleg)
•	https://mamasvg.com/product/rick-and-morty-svg-free/


