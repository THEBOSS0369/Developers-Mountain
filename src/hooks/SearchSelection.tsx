"use client";

import React from "react";
import SearchBarWithResults from "@/components/common/SearchBar";

const SearchSection = ({ profiles, currentUserId }) => {
  const handleSelectUser = (user) => {
    // Handle user selection here
    //  additional functionality
  };

  return (
    <SearchBarWithResults
      profiles={profiles}
      currentUserId={currentUserId}
      onSelectUser={handleSelectUser}
    />
  );
};

export default SearchSection;
