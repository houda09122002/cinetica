import { useState } from "react";

export default function SearchResults({ results }: { results: any[] }) {
  if (results.length === 0) {
    return <div className="text-center">No results found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {results.map((result) => (
        <div key={result.id} className="p-4 border rounded">
          <h3>{result.title || result.name}</h3>
          <p>{result.overview}</p>
        </div>
      ))}
    </div>
  );
}
