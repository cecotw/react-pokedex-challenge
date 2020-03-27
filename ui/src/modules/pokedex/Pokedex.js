import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import PokedexHeader from './PokedexHeader';
import PokedexItem from './PokedexItem';

const GET_POKEDEX = gql`
  query getPokedex {
    pokedex @client {
      id
      name
      num
    }
  }
`;

// TODO this mocks a backend resolver
const resolvers = {
  Query: {
    pokedex: async (_, args, { cache }) => {
      console.log(cache);
      try {
        const res = await fetch(
          'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json'
        );
        const data = await res.json();

        return data.pokemon.map(p => {
          p.__typename = 'Pokemon';
          return p;
        });
      } catch (e) {
        console.log(`Something went wrong with the data source: ${e}`);
      }
    }
  }
};

export default function Pokedex() {
  const client = useApolloClient();
  client.addResolvers(resolvers);

  const { loading, error, data } = useQuery(GET_POKEDEX);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <section className="w-1/2 flex">
      <div className="bg-red-600 rounded shadow px-4 py-20 w-1/2">
        <PokedexHeader></PokedexHeader>
        <div className="rounded bg-white overflow-y-auto h-64 px-2">
          {data.pokedex.map(pokemon => (
            <PokedexItem key={pokemon.id} pokemon={pokemon}></PokedexItem>
          ))}
        </div>
      </div>
      <div className="bg-red-600 rounded shadow px-4 py-20 w-1/2">
        <div className="rounded bg-red-700 overflow-y-auto h-64 px-2"></div>
      </div>
    </section>
  );
}