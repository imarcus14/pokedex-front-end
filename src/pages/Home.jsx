import { useEffect, useState } from "react";

import PokemonList from "../components/PokemonList.jsx";
import Search from "../components/Search.jsx";
import axios from "axios";
import title from "../assets/photos/title.png";

const maxPokemon = 1025;
const Home = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      let allPokemon = [];
      let nextUrl = "https://pokeapi.co/api/v2/pokemon?limit=100";
      try {
        while (nextUrl && allPokemon.length <= maxPokemon) {
          const result = await axios.get(nextUrl);
          const newPokemon = result.data.results.map((p) => {
            // Extract the Pokémon ID from its URL
            const id = p.url.split("/").slice(-2, -1)[0];
            return { ...p, id };
          });

          if (allPokemon.length + newPokemon.length > maxPokemon) {
            allPokemon = [
              ...allPokemon,
              ...newPokemon.slice(0, maxPokemon - allPokemon.length),
            ];
            break;
          } else {
            allPokemon = [...allPokemon, ...newPokemon];
          }

          nextUrl = result.data.next;
        }
        setPokemon(allPokemon);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((singlePokemon) =>
    singlePokemon.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex flex-col">
      <img src={title} alt="title" />
      <Search setSearch={setSearch} />
      <PokemonList filteredPokemon={filteredPokemon} />
    </div>
  );
};

export default Home;
