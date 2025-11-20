import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBox({ search, onChange }: SearchBoxProps) {
  return (
    <input
      defaultValue={search}
      onChange={onChange}
      type="text"
      className={css.searchInput}
    />
  );
}

export default SearchBox;
