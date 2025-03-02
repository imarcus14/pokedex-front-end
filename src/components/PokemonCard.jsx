const PokemonCard = ({ name, id, usePixelArt }) => {
  return (
    <div className="m-3 shadow-md rounded-lg flex flex-col bg-white text-center transition-transform duration-200 hover:scale-110">
      <img
        // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        src={
          usePixelArt
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        }
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
