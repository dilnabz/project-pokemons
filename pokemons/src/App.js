import React, {useState, useEffect} from "react";
import {Pokemon} from "./Components/Pokemon/Pokemon";
import "./App.css";

// https://pokeapi.co/api/v2/pokemon/?offset=20&limit=10

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export function App() {
  const [caughtIds, setCaughtIds] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const pokemonsPerPage = 10;

  function getPokemons () {
    const offset = (page-1)*pokemonsPerPage;
    const limit = pokemonsPerPage;
    return fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`).then(response => response.json()).then((result) => {
      const pokemons = result.results;
      return pokemons.map((pokemon) => {
        return {name: pokemon.name,
      id: pokemon.url.slice(34, -1),}})
    })
  }

  function showPokemons() {
    getPokemons().then(res => setPokemons(res));
  }

  useEffect(() => {
    showPokemons();
  }, [page]);

// https://beta.reactjs.org/reference/react/useState#setstate
// https://beta.reactjs.org/learn/state-as-a-snapshot
// https://magma.com/d/ycZWfeiLaZ
  async function togglePokemon(id) {
    await sleep(1000);

    // if (caughtIds.includes(id)) {
    //   setCaughtIds(caughtIds.filter((elem) => elem !== id));
    // } else {
    //   setCaughtIds([...caughtIds, id]);
    // }

    setCaughtIds(prev => {
      if (prev.includes(id)) {
        return prev.filter((elem) => elem !== id);
      } else {
        return [...prev, id];
      }
    });
  }

  function nextPage() {
    setPage(page => page + 1)
  }
  function previousPage() {
    setPage(page => page - 1)
  }
  return (
    <div>
      <h1>
        Поймано {caughtIds.length}/{pokemons.length}
      </h1>
      <button onClick={showPokemons}>Показать покемонов</button>
      <div className="container">
        {pokemons.map((pokemon) => (
          <Pokemon
            key={pokemon.id}
            name={pokemon.name}
            id={pokemon.id}
            status={caughtIds.includes(pokemon.id)}
            togglePokemon={togglePokemon}
          />
        ))}
      </div>
      <div>
        <button disabled={page === 1} onClick={previousPage}>Назад</button>
        <a>{page}</a>
        <button onClick={nextPage}>Вперед</button>
      </div>
    </div>
  );
}
