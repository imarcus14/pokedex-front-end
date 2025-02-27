const PokemonCard = ({ name, id }) => {
  return (
    <div className="m-3 shadow-md rounded-lg flex flex-col bg-white text-center">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        alt={name}
        className="h-48 my-7"
      />
      <p className="mb-7 font-[Jockey_One] text-xl">
        #{id} {name}
      </p>
    </div>
  );
};

export default PokemonCard;
