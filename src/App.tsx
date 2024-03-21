import SearchInput from "./components/ui/SearchInput";
import Table from "./components/ui/Table";

const App = () => {
  return (
    <main>
      <SearchInput placeholder="Search places..." />
      <Table
        currentItems={[{ first: "hello", last: "sdasd", handle: "asdadasdsa" }]}
        headings={["#", "First", "Last", "Handle"]}
      />
    </main>
  );
};

export default App;
