
// Renders a square cell with number and player tokens
const Cell = ({ number, players }) => {
  return (
    <div className="border w-12 h-12 flex flex-col items-center justify-center text-xs">
      {/* Cell number */}
      <div>{number}</div>

      {/* Show player tokens (simple red dots) */}
      <div className="flex flex-wrap">
        {players.map(p => (
          <div
            key={p.id}
            className="w-2 h-2 rounded-full bg-red-500 mx-0.5"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Cell;
