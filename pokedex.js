const numberText = document.querySelector('h2');
const pokemonNameText = document.querySelector('h1');
const pokemonImage = document.querySelector('img');
const ball = document.querySelector('.c8');
const screen = document.querySelector('.screen-container');
const input = document.querySelector('#searchInput');

let currentPokemon = 0;

async function getPokemon(pokemonID) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
  if (!response.ok) {
    return null;
  }
  const pokemon = await response.json();
  return pokemon;
}

async function displayPokemon(pokemonNumber) {
  const pokemon = await getPokemon(pokemonNumber);
  if (!pokemon) {
    setInvalid();
    return;
  }
  numberText.textContent = `Pokemon #${pokemon.id}`;
  pokemonNameText.textContent = pokemon.name;
  pokemonImage.src = pokemon.sprites.front_default;
  currentPokemon = pokemon.id;
}

async function changePokemon(number) {
  ball.style.backgroundColor = 'red';
  if (isNextPokemonValid(number)) {
    number > 0 ? animate('slideOut') : animate('slidePreviousOut');
    setTimeout(() => {
      currentPokemon += number;
      displayPokemon(currentPokemon);
      number > 0 ? animate('slideIn') : animate('slidePreviousIn');
      ball.style.backgroundColor = '#8f0a0a';
    }, '500');
  }
}

function isNextPokemonValid(number) {
  if (number === 1 && currentPokemon <= 1025) return true;
  if (number === -1 && currentPokemon > 1) return true;
  return false;
}

function animate(animation) {
  screen.classList.add(animation);
  setTimeout(() => {
    screen.classList.remove(animation);
  }, '500');
}

function searchPokemon() {
  displayPokemon(input.value);
}

function setInvalid() {
  numberText.textContent = `Error`;
  pokemonNameText.textContent = 'Not Found';
  pokemonImage.src = 'img/error.png';
  input.value = '';
  return;
}