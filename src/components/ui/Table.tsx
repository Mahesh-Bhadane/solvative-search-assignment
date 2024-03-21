const Table = ({
  currentItems,
  headings,
}: {
  currentItems: { first: string; last: string; handle: string }[];
  headings: string[];
}) => {
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
        {currentItems.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.first}</td>
            <td>{item.last}</td>
            <td>{item.handle}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
