import { useState } from "react";
import { CiSearch } from "react-icons/ci";

interface InputSearchProps {
  onSearch: (query: string) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); 
  };

  return (
    <div className="input-container">
      <input
        type="text"
        id="search"
        placeholder=" "
        value={searchQuery}
        onChange={handleSearch}
      />
      <label htmlFor="search">Keywords</label>
      <CiSearch className="icon" size={20} />
    </div>
  );
};

export default InputSearch;
