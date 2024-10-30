"use client";

import { Button } from "./ui/button";
import { X } from "lucide-react";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-btn") as HTMLFormElement;

    if (form) {
      form.reset();
    }
  };

  return (
    <Button onClick={reset} type="submit" className="search-btn text-white">
      <X size={25} />
    </Button>
  );
};

export default SearchFormReset;
