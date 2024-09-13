import React, { useState, useRef, useEffect } from "react";

interface CustomSelectProps {
  options: { id: number; name: string }[];
  onChange?: (selectedValue: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("Select...");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <div className="custom-select" ref={dropdownRef}>
      <div className="select-header" onClick={handleToggle}>
        <span>{selectedOption}</span>
        <span className="arrow">▼</span>
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li key={option.id} onClick={() => handleSelect(option.name)}>
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
