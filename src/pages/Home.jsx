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
  const [usePixelArt, setUsePixelArt] = useState(false);

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
        // image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        // image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        image: usePixelArt
          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
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
      <div className="flex justify-center items-center">
        <img className="h-50 w-200" src={title} alt="title" />
      </div>
      <Search setSearch={setSearch} />
      {/* <div className="flex justify-center mt-4">
        <button
          onClick={() => setUsePixelArt(!usePixelArt)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {usePixelArt ? "Switch to Official Art" : "Switch to Pixel Art"}
        </button>
      </div> */}

      <label className="absolute inline-flex justify-center items-center cursor-pointer mt-5 left-8">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onClick={() => setUsePixelArt(!usePixelArt)}
        />
        <div className="relative w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
        <span
          className={`ms-3 text-sm text-gray-900 dark:text-gray-300 ${
            usePixelArt ? `font-[Jockey_One]` : `font-[Pixelify_Sans]`
          }`}
        >
          {usePixelArt ? "Switch to Official Art" : "Switch to Pixel Art"}
        </span>
      </label>

      <PokemonList
        filteredPokemon={filteredPokemon}
        fetchPokemonDetails={fetchPokemonDetails}
        capitalizeFirstLetter={capitalizeFirstLetter}
        usePixelArt={usePixelArt}
      />

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={closeModal}
          capitalizeFirstLetter={capitalizeFirstLetter}
          usePixelArt={usePixelArt}
        />
      )}
    </div>
  );
};

export default Home;
