import { useEffect, useState } from "react";

import PokemonList from "../components/PokemonList.jsx";
import PokemonModal from "../components/PokemonModal.jsx";
import Search from "../components/Search.jsx";
import axios from "axios";
import title from "../assets/photos/title.png";

const maxPokemon = 1025;
const Home = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const capitalizeFirstLetter = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1);

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

  const fetchPokemonDetails = async (id, name) => {
    try {
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = result.data;
      const types = data.types.map((t) => t.type.name);
      const stats = data.stats.map((s) => ({
        name: s.stat.name,
        value: s.base_stat,
      }));
      const moves = data.moves
        .map((m) => {
          const levelDetails = m.version_group_details.find(
            (v) =>
              v.move_learn_method.name === "level-up" && v.level_learned_at > 0
          );
          return levelDetails
            ? { name: m.move.name, level: levelDetails.level_learned_at }
            : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.level - b.level);

      setSelectedPokemon({
        name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        types,
        stats,
        moves,
        cry: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`,
      });

      document.body.classList.add("overflow-hidden");
    } catch (e) {
      console.error(e);
    }
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    document.body.classList.remove("overflow-hidden");
  };

  const filteredPokemon = pokemon.filter((singlePokemon) =>
    singlePokemon.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex flex-col">
      <img src={title} alt="title" />
      <Search setSearch={setSearch} />
      <PokemonList
        filteredPokemon={filteredPokemon}
        fetchPokemonDetails={fetchPokemonDetails}
        capitalizeFirstLetter={capitalizeFirstLetter}
      />

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={closeModal}
          capitalizeFirstLetter={capitalizeFirstLetter}
        />
      )}
    </div>
  );
};

export default Home;
