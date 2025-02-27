import PokemonCard from "./PokemonCard";

const PokemonList = ({ filteredPokemon }) => {
  const capitalizeFirstLetter = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 pt-10">
      {filteredPokemon.map((pokemon, index) => (
        <PokemonCard
          key={pokemon.id}
          name={capitalizeFirstLetter(pokemon.name)}
          id={pokemon.id}
        />
      ))}
      ;
    </div>
  );
};

export default PokemonList;
