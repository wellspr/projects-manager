import { useOutletContext } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { useRef } from "react";

const Search = ({ searchTerm, setSearchTerm }) => {

    const { theme } = useOutletContext();
    const inputRef = useRef(null);

    return <div className="search">
        <input 
            className={`search__input search__input--theme__${theme}`}
            ref={inputRef}
            type="search"
            placeholder="Search Project"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
        />
        <div 
            className={
                `search__close-icon ${!searchTerm && "search__close-icon--hidden"}`
            }
            onClick={() => {
                setSearchTerm("");
                inputRef.current.focus();
            }}
            >
            <GrClose size={14}/>
        </div>
    </div>;
};

export default Search;
