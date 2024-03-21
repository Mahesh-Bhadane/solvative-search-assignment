import { InputProps } from "./Input";

const SearchInput = (props: InputProps) => {
  return (
    <div id="input-container">
      <input id="search" {...props} />
      <div>
        <p>Ctrl + /</p>
      </div>
    </div>
  );
};

export default SearchInput;
