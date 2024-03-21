/* eslint-disable @typescript-eslint/no-explicit-any */
const Table = ({
  currentItems,
  headings,
  loading,
  searchTerm,
}: {
  currentItems: any[];
  headings: string[];
  loading?: boolean;
  searchTerm?: string;
}) => {
  if (loading) return <div className="lds-dual-ring"></div>;

  return (
    <table>
      <thead>
        <tr>
          {headings.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {!searchTerm && currentItems.length === 0 ? (
          <tr>
            <td className="text-center" colSpan={headings.length}>
              <p>Start searching</p>
            </td>
          </tr>
        ) : currentItems.length === 0 ? (
          <tr>
            <td className="text-center" colSpan={headings.length}>
              No results found
            </td>
          </tr>
        ) : (
          currentItems.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.country}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
