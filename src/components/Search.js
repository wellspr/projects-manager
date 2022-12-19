import { useOutletContext } from "react-router-dom";

const Search = () => {

    const { theme } = useOutletContext();

    return <div className="search">
        <input 
            className={`search__input search__input--theme__${theme}`}
            type="search"
            placeholder="Search Project"
        />
    </div>;
};

export default Search;