import './style.css';

const app = document.querySelector('#app');
let currentPage = 'home';

let currentPageNum = 1;
let maxPage = 0;
let allCharacters = [];

let observer = null; // voor IntersectionObserver beheren

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
        <select id="sort-filter">
          <option value="">Sorteer op</option>
          <option value="name-asc">Naam A-Z</option>
          <option value="name-desc">Naam Z-A</option>
          <option value="status">Status</option>
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

  if (currentPage === 'home') {
    const searchInput = document.getElementById('search');
    const statusFilter = document.getElementById('status-filter');
    const sortFilter = document.getElementById('sort-filter');

    if (searchInput) searchInput.addEventListener('input', () => applyFilters());
    if (statusFilter) statusFilter.addEventListener('change', () => applyFilters());
    if (sortFilter) sortFilter.addEventListener('change', () => applyFilters());
  }
}

// Thema wisselen
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

// Favorieten helper functies
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

function removeFavorite(id) {
  let favorites = getFavorites();
  favorites = favorites.filter(favId => favId !== id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Homepagina: eerste pagina laden
async function loadHomePage() {
  renderPage();
  currentPageNum = 1;
  allCharacters = [];

  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPageNum}`);
    const data = await res.json();
    maxPage = data.info.pages;
    allCharacters = data.results;
    renderCharacters(allCharacters);
    setupScrollObserver();
  } catch (err) {
    document.getElementById('character-list').innerHTML = '<p>Fout bij laden personages</p>';
  }
}

// Lazy load meer characters via IntersectionObserver
async function loadMoreCharacters() {
  if (currentPageNum >= maxPage) return;
  currentPageNum++;

  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPageNum}`);
    const data = await res.json();
    allCharacters = allCharacters.concat(data.results);
    applyFilters(); // filters toepassen op nieuwe lijst
  } catch (err) {
    console.error('Fout bij laden volgende pagina:', err);
  }
}

function setupScrollObserver() {
  // Disconnect oude observer als die er is om memory leaks te voorkomen
  if (observer) {
    observer.disconnect();
  }

  // Verwijder oude sentinel als die er is
  const oldSentinel = document.getElementById('sentinel');
  if (oldSentinel) oldSentinel.remove();

  const sentinel = document.createElement('div');
  sentinel.id = 'sentinel';
  document.getElementById('character-list').appendChild(sentinel);

  observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      loadMoreCharacters();
    }
  }, {
    rootMargin: '200px'
  });

  observer.observe(sentinel);
}

// Favorieten pagina laden
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

// Personages renderen in tabelvorm met 6 kolommen/details
function renderCharacters(characters) {
  const characterList = document.getElementById('character-list');
  const favorites = getFavorites();

  if (characters.length === 0) {
    characterList.innerHTML = '<p>Geen resultaten gevonden.</p>';
    return;
  }

  characterList.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Afbeelding</th>
          <th>Naam</th>
          <th>Status</th>
          <th>Soort</th>
          <th>Geslacht</th>
          <th>Locatie</th>
          <th>Acties</th>
        </tr>
      </thead>
      <tbody>
        ${characters.map(character => {
          const isFavorite = favorites.includes(character.id);
          if (currentPage === 'favorites') {
            return `
              <tr>
                <td><img src="${character.image}" alt="${character.name}" width="50"></td>
                <td>${character.name}</td>
                <td>${character.status}</td>
                <td>${character.species}</td>
                <td>${character.gender}</td>
                <td>${character.location.name}</td>
                <td>
                  <button class="remove-fav" data-id="${character.id}">🗑️ Verwijderen</button>
                </td>
              </tr>
            `;
          } else {
            return `
              <tr>
                <td><img src="${character.image}" alt="${character.name}" width="50"></td>
                <td>${character.name}</td>
                <td>${character.status}</td>
                <td>${character.species}</td>
                <td>${character.gender}</td>
                <td>${character.location.name}</td>
                <td>
                  <button class="add-fav" data-id="${character.id}" ${isFavorite ? 'disabled' : ''}>
                    ${isFavorite ? '❤️ Opgeslagen' : '➕ Bewaar'}
                  </button>
                </td>
              </tr>
            `;
          }
        }).join('')}
      </tbody>
    </table>
  `;

  setupCardButtons();
}

// Voeg event listeners toe voor toevoegen/verwijderen favorieten
function setupCardButtons() {
  document.querySelectorAll('.add-fav').forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.dataset.id);
      saveFavorite(id);
      button.textContent = '❤️ Opgeslagen';
      button.disabled = true;
    });
  });

  document.querySelectorAll('.remove-fav').forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.dataset.id);
      removeFavorite(id);
      loadFavoritesPage();
    });
  });
}

// Filter, zoek en sorteer functie
function applyFilters() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  const status = document.getElementById('status-filter').value;
  const sort = document.getElementById('sort-filter').value;

  let filtered = allCharacters.filter(character => {
    const matchesName = character.name.toLowerCase().includes(searchTerm);
    const matchesStatus = status === '' || character.status === status;
    return matchesName && matchesStatus;
  });

  if (sort === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'name-desc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sort === 'status') {
    filtered.sort((a, b) => a.status.localeCompare(b.status));
  }

  renderCharacters(filtered);
}

// Start de app
loadTheme();
loadHomePage();
