import { useEffect, useState } from "react";

import PokemonList from "../components/PokemonList.jsx";
import Search from "../components/Search.jsx";
import axios from "axios";

const Home = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const result = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        setPokemon(result.data.results);
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
    <div>
      <Search />
      <PokemonList />
    </div>
  );
};

export default Home;
