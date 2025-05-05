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
Vereiste	Implementatie	Bestandslocatie
Elementen selecteren	document.getElementById()	main.js (regel 4)
Elementen manipuleren	innerHTML, classList.add	main.js (regel 24, 80)
Events aan elementen koppelen	addEventListener()	main.js (regel 89)
const & let gebruik	Overal gebruikt	main.js
Template literals	${} in kaart HTML	main.js (regel 28)
Iteratie over arrays	forEach over characters	main.js (regel 24)
Array methodes	filter, map, includes	main.js (regels 63, 68, 78)
Arrow functions	(entry) => {} in observer	main.js (regel 10)
Ternary operator	Favorieten knop hartje 🤍❤️	main.js (regel 30)
Callback functions	In Event Listeners	main.js (regel 89)
Promises	fetch().then()	favorites.js (regel 9)
Async & Await	async fetchCharacters()	main.js (regel 13)
Observer API	IntersectionObserver animaties	main.js (regel 7)
Fetch data	API calls	main.js (regel 13)
JSON manipulatie	data.results	main.js (regel 16)
Formulier validatie	(niet nodig, zoekveld is input)	-
LocalStorage gebruik	Opslaan favorieten & thema	main.js (regel 76)
Flexbox/Grid layout	CSS grid voor kaartjes	style.css (regel 31)
CSS styling	Licht/donker thema	style.css

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


