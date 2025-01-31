"use client";

import React from "react";
import SearchBarWithResults from "@/components/common/SearchBar";

const SearchSection = ({ profiles }) => {
  const handleSelectUser = (user) => {
    // Handle user selection here
    // Add any additional functionality you need
  };

  return (
    <SearchBarWithResults profiles={profiles} onSelectUser={handleSelectUser} />
  );
};

export default SearchSection;
