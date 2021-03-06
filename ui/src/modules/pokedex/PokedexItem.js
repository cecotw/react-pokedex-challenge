import React from 'react';
import { useHistory } from 'react-router-dom';

export default function PokedexItem(props) {
  const history = useHistory();

  function onSelectPokemon() {
    history.push(`/pokemon/${props.pokemon.id}`);
  }

  return (
    <div
      className="flex my-2 p-2 bg-white shadow-2 border rounded items-center w-full overflow-auto cursor-pointer hover:bg-yellow-200"
      onClick={onSelectPokemon}
    >
      <div className="mr-2">{props.pokemon.num}</div>
      <div className="mr-2">{props.pokemon.name}</div>
      <div className="mr-2 flex">
        <span className="font-bold text-sm mr-1">Types: </span>
        {props.pokemon.type.map((t, i) => {
          const comma =
            props.pokemon.type.length > i + 1 ? (
              <span className="mr-1">,</span>
            ) : null;
          return (
            <div key={`${props.pokemon.id}-type-${i}`} className="text-sm">
              {t}
              {comma}
            </div>
          );
        })}
      </div>
      <div className="mr-2 flex">
        <span className="font-bold text-sm mr-1">Weaknesses: </span>
        {props.pokemon.weaknesses.map((t, i) => {
          const comma =
            props.pokemon.weaknesses.length > i + 1 ? (
              <span className="mr-1">,</span>
            ) : null;
          return (
            <div
              key={`${props.pokemon.id}-weaknesses-${i}`}
              className="text-sm"
            >
              {t}
              {comma}
            </div>
          );
        })}
      </div>
    </div>
  );
}
