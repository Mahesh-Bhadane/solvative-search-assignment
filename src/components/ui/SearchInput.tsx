import { useCallback, useEffect, useRef } from "react";
import { InputProps } from "./Input";

const SearchInput = (props: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "/") {
      event.preventDefault();
      inputRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div id="input-container">
      <input id="search" {...props} ref={inputRef} />
      <div>
        <p>Ctrl + /</p>
      </div>
    </div>
  );
};

export default SearchInput;
