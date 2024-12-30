import React from 'react';
import './SearchBar.css';

const SearchBar = ({ search, setSearch }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search movies..."
            />
        </div>
    );
};

export default SearchBar;
