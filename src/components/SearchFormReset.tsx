"use client";

import { Button } from "./ui/button";
import { X } from "lucide-react";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-btn");

    if (form instanceof HTMLFormElement) {
      form.reset();
    }
  };

  return (
    <Button
      onClick={reset}
      name="query"
      type="submit"
      className="search-btn text-white"
    >
      <X size={25} />
    </Button>
  );
};

export default SearchFormReset;
