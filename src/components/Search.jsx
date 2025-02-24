import searchIcon from "../assets/icons/search.svg";

const Search = ({ setSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <button>
        <img className="h-6" src={searchIcon} alt="magnifying glass icon" />
      </button>
    </div>
  );
};

export default Search;
