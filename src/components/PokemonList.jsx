import PokemonCard from "./PokemonCard";

const PokemonList = ({
  filteredPokemon,
  fetchPokemonDetails,
  capitalizeFirstLetter,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 pt-10">
      {filteredPokemon.map((pokemon, index) => (
        <div
          key={pokemon.id}
          onClick={() =>
            fetchPokemonDetails(pokemon.id, capitalizeFirstLetter(pokemon.name))
          }
        >
          <PokemonCard
            name={capitalizeFirstLetter(pokemon.name)}
            id={pokemon.id}
          />
        </div>
      ))}
      ;
    </div>
  );
};

export default PokemonList;
