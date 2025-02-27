import searchIcon from "../assets/icons/search.svg";

const Search = ({ setSearch }) => {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 pl-4 bg-white rounded-full focus:outline-none"
      />
      <button>
        <img className="h-6" src={searchIcon} alt="magnifying glass icon" />
      </button>
    </div>
  );
};

export default Search;
