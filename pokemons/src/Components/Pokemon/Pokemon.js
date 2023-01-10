import React, {useState, useEffect} from "react";
import "./Pokemon.css";

export function Pokemon(props) {
  const [counter, setCounter] = useState(0);
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`;
  function clickHandler() {
    props.togglePokemon(props.id);
  }

  function incrementCounter() {
    setCounter(counter => counter + 1);
    setCounter(counter => counter + 1);
    setCounter(counter => counter + 1);
  }

  return (
    <div
      className="avatar"
      style={{background: props.status ? "red" : "green"}}
    >
      <div className="pokemonName">#{props.id} {props.name}</div>
      <div className="pokemonPhoto">
        <img src={image} alt="pokemon" onClick={incrementCounter}/>
      </div>
      <div className="pokemonStatus" onClick={clickHandler}>
        {props.status ? "Отпустить" : "Поймать"}
      </div>
    </div>
  );
}
