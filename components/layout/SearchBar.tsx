"use client"


import { useSearch } from "../../app/hooks/useSearch";


export default function SearchBar() {
  const { query, setQuery, handleSearch, isLoading } = useSearch();

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(query);
      }}
    >

    </form>
  );
}
