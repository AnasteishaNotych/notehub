import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBox({ onSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={onSearch}
    />
  );
}

export default SearchBox;
