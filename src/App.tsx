/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import SearchInput from "./components/ui/SearchInput";
import Table from "./components/ui/Table";
import { getCitites } from "./services";

const App = () => {
  const [cities, setCities] = useState<
    {
      id: number;
      name: string;
      country: string;
    }[]
  >();
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchTerm: string) => {
    setIsLoading(true);
    const data = await getCitites({ searchTerm });
    if (data) {
      setCities(data);
    }
    setIsLoading(false);
  };

  const handleKeyDown = async (e: any) => {
    if (e.key === "Enter" && search.length) {
      setActiveSearch(e.target.value);
      await handleSearch(e.target.value);
    }
  };

  return (
    <main>
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search places..."
        onKeyDown={handleKeyDown}
      />
      <Table
        currentItems={cities ?? []}
        headings={["#", "Place Name", "Country"]}
        loading={isLoading}
        searchTerm={activeSearch}
      />
    </main>
  );
};

export default App;
