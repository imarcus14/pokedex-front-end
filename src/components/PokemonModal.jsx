import close from "../assets/icons/close.svg";
import closeReg from "../assets/icons/close-reg.svg";
import sound from "../assets/icons/volume.svg";
import soundReg from "../assets/icons/volume-reg.svg";

const PokemonModal = ({
  pokemon,
  onClose,
  capitalizeFirstLetter,
  usePixelArt,
}) => {
  if (!pokemon) {
    return null;
  }

  const typeColors = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-300",
    fighting: "bg-orange-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    flying: "bg-indigo-300",
    psychic: "bg-pink-500",
    bug: "bg-green-600",
    rock: "bg-gray-600",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-400",
  };

  return (
    <div
      className={`fixed inset-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center z-50 ${
        usePixelArt ? `font-[Pixelify_Sans]` : `font-[Jockey_One]`
      }`}
    >
      <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] max-h-[70vh] overflow-y-auto flex items-center gap-15">
        <button
          className="absolute top-35 left-20 p-1 transition-transform duration-200 hover:scale-110"
          onClick={onClose}
        >
          <img
            src={usePixelArt ? close : closeReg}
            alt="x icon"
            className="h-8"
          />
        </button>
        <div className="flex flex-col pl-10 items-center w-4/12">
          <h2 className="text-3xl">{pokemon.name}</h2>

          <img className="h-80" src={pokemon.image} alt={pokemon.name} />

          <p className="text-xl pb-5 flex gap-2 items-center">
            Type(s):
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={`px-3 py-1 rounded-md text-white ${
                  typeColors[type.toLowerCase()] || "bg-gray-500"
                } font-[Pixelify_Sans]`}
              >
                {capitalizeFirstLetter(type)}
              </span>
            ))}
          </p>

          <div className="flex items-center gap-2">
            <strong className="text-xl">Cry:</strong>
            <button
              onClick={() =>
                document.getElementById(`cry-${pokemon.id}`).play()
              }
              className="transition-transform duration-200 hover:scale-110"
            >
              <img
                className="h-10"
                src={usePixelArt ? sound : soundReg}
                alt="sound icon"
              />
            </button>
            <audio id={`cry-${pokemon.id}`} src={pokemon.cry}></audio>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-5/12 mb-15">
          <strong className="text-xl">Base Stats:</strong>
          <ul className="flex flex-col gap-4 h-80 pt-10">
            {pokemon.stats.map((stat) => (
              <li key={stat.name} className="flex items-center gap-3">
                <span className="capitalize w-45">
                  {capitalizeFirstLetter(stat.name)}:
                </span>
                <div className="w-full bg-gray-300 h-4 rounded-lg overflow-hidden">
                  <div
                    className="bg-red-500 h-full"
                    style={{ width: `${(stat.value / 255) * 100}%` }}
                  ></div>
                </div>
                <span className="w-10 text-right mr-10">{stat.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="max-h-[58vh] overflow-auto w-4/12 pr-10">
          <strong className="text-xl pb-10">Level-up Moves:</strong>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3">
            {pokemon.moves.map((move) => (
              <div
                key={move.name}
                className="bg-gray-100 p-2 rounded-lg text-center text-sm shadow-md border border-gray-300"
              >
                <span className="font-semibold">
                  {capitalizeFirstLetter(move.name)}
                </span>
                <br />
                <span className="text-gray-600 text-xs">
                  Level {move.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
