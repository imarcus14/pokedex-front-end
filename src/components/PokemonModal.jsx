const PokemonModal = ({ pokemon, onClose, capitalizeFirstLetter }) => {
  if (!pokemon) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-50">
      <h2>{pokemon.name}</h2>
      <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] max-h-[70vh] overflow-y-auto flex items-center">
        {/* <h2>{pokemon.name}</h2> */}
        <img className="h-80" src={pokemon.image} alt={pokemon.name} />
        <p>Type(s): {pokemon.types.map(capitalizeFirstLetter).join(", ")}</p>

        <div>
          <strong>Base Stats:</strong>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.name}>
                {capitalizeFirstLetter(stat.name)}: {stat.value}
              </li>
            ))}
          </ul>
        </div>

        <div className="max-h-[50vh] flex">
          <strong>Level-up Moves:</strong>
          <ul>
            {pokemon.moves.map((move) => (
              <li key={move}>
                {capitalizeFirstLetter(move.name)} - Level {move.level}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <strong>Cry:</strong>
          <button
            onClick={() => document.getElementById(`cry-${pokemon.id}`).play()}
            className="p-2  text-white rounded-full"
          >
            ▶️
          </button>
          <audio id={`cry-${pokemon.id}`} src={pokemon.cry}></audio>
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PokemonModal;
