import './style.css';

const app = document.querySelector('#app');
let currentPage = 'home';

function renderNav() {
  return `
    <nav>
      <a href="#" id="home-link">Home</a> |
      <a href="#" id="favorites-link">Favorieten</a>
    </nav>
  `;
}

function renderHeader(title) {
  return `
    <header>
      <h1>${title}</h1>
      ${renderNav()}
      ${currentPage === 'home' ? `
        <input type="text" id="search" placeholder="Zoek een karakter...">
        <select id="status-filter">
          <option value="">Alle status</option>
          <option value="Alive">Levend</option>
          <option value="Dead">Dood</option>
          <option value="unknown">Onbekend</option>
        </select>
      ` : ''}
      <button id="theme-toggle">Thema wisselen</button>
    </header>
  `;
}

function renderPage(content) {
  app.innerHTML = `
    ${renderHeader(currentPage === 'home' ? 'Rick & Morty Characters' : 'Mijn Favorieten')}
    <main id="character-list">${content || ''}</main>
  `;

  setupEventListeners();
}

function setupEventListeners() {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  const homeLink = document.getElementById('home-link');
  const favoritesLink = document.getElementById('favorites-link');

  homeLink?.addEventListener('click', (e) => {
    e.preventDefault();
    currentPage = 'home';
    loadHomePage();
  });

  favoritesLink?.addEventListener('click', (e) => {
    e.preventDefault();
    currentPage = 'favorites';
    loadFavoritesPage();
  });
}

//040576

// dark Thema wisselen
function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}
function loadTheme() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark');
  }
}

// Helper functies voor favorieten
function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorite(id) {
  const favorites = getFavorites();
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

//110501

function removeFavorite(id) {
  let favorites = getFavorites();
  favorites = favorites.filter(favId => favId !== id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Homepagina met alle personages.
async function loadHomePage() {
  renderPage();
  const list = document.getElementById('character-list');

  try {
    const res = await fetch('https://rickandmortyapi.com/api/character');
    const data = await res.json();
    renderCharacters(data.results);
  } catch (err) {
    list.innerHTML = '<p>Fout bij laden personages</p>';
  }
}

// Het favorieten gedeelte vann de webpagina Favorieten.
async function loadFavoritesPage() {
  renderPage();
  const characterList = document.getElementById('character-list');
  const favorites = getFavorites();

  if (favorites.length === 0) {
    characterList.innerHTML = '<p>Geen favorieten opgeslagen.</p>';
    return;
  }

  try {
    const requests = favorites.map(id =>
      fetch(`https://rickandmortyapi.com/api/character/${id}`).then(res => res.json())
    );
    const characters = await Promise.all(requests);
    renderCharacters(characters);
  } catch (err) {
    characterList.innerHTML = '<p>Fout bij laden favorieten.</p>';
  }
}

//Toon personages in de DOM met knoppen.
function renderCharacters(characters) {
  const characterList = document.getElementById('character-list');
  const favorites = getFavorites();

  characterList.innerHTML = characters.map(character => {
    const isFavorite = favorites.includes(character.id);
    const button = currentPage === 'favorites'
      ? `<button class="remove-fav" data-id="${character.id}">🗑️ Verwijderen</button>`
      : `<button class="add-fav" data-id="${character.id}">${isFavorite ? '❤️ Opgeslagen' : '➕ Bewaar'}</button>`;

    return `
      <div class="card show">
        <img src="${character.image}" alt="${character.name}">
        <h3>${character.name}</h3>
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
        <p>Location: ${character.location.name}</p>
        ${button}
      </div>
    `;
  }).join('');

  setupCardButtons();
}

function setupCardButtons() {
  // favoriete personages selcteren.
  document.querySelectorAll('.add-fav').forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.dataset.id);
      saveFavorite(id);
      button.textContent = '❤️ Opgeslagen';
      button.disabled = true;
    });
  });

//010704

  // Verwijder geselecteerde pesonages uit de favorieten.
  document.querySelectorAll('.remove-fav').forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.dataset.id);
      removeFavorite(id);
      loadFavoritesPage();
    });
  });
}

// het starten van de pagina.
loadTheme();
loadHomePage();