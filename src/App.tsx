/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import SearchInput from "./components/ui/SearchInput";
import Table from "./components/ui/Table";
import { getCitites } from "./services";
import Input from "./components/ui/Input";
import Pagination from "./components/ui/Pagination";

const App = () => {
  const [cities, setCities] = useState<
    {
      id: number;
      name: string;
      country: string;
    }[]
  >([]);

  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const handleSearch = async (
    searchTerm: string,
    citiesLimit = 5,
    offset = 0
  ) => {
    setIsLoading(true);
    const res = await getCitites({
      searchTerm,
      limit: citiesLimit,
      offset: offset,
    });
    if (res) {
      setCities(res.data);
      setTotalItems(res.total);
      const calculatedPage = Math.floor(offset / citiesLimit) + 1;

      setCurrentPage(calculatedPage);
    } else {
      setCities([]);
      setTotalItems(0);
    }
    setIsLoading(false);
  };

  const handleLimitChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(e.target.value));
    await handleSearch(search, Number(e.target.value));
    setCurrentPage(1);
  };

  const handleKeyDown = async (e: any) => {
    if (e.key === "Enter" && search.length) {
      setActiveSearch(e.target.value);
      await handleSearch(e.target.value, limit);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const offset = (page - 1) * limit;

    handleSearch(search, limit, offset);
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
        currentItems={cities}
        headings={["#", "Place Name", "Country"]}
        loading={isLoading}
        searchTerm={activeSearch}
      />

      <Input
        type="number"
        value={limit}
        onChange={async (e) => await handleLimitChange(e)}
        placeholder="Limit"
        max={10}
        min={1}
      />

      <Pagination
        totalItems={totalItems}
        itemsPerPage={limit}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default App;
