import { Search } from "lucide-react";
import Form from "next/form";
import { Button } from "./ui/button";
import SearchFormReset from "./SearchFormReset";

const SearchForm = ({ query }: { query?: string | undefined }) => {
  return (
    <Form action="/" className="search-form">
      <input
        name="query"
        placeholder="Search Startups"
        className="search-input"
        defaultValue=""
      />
      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <Button type="submit" className="search-btn text-white">
          <Search size={25} />
        </Button>
      </div>
    </Form>
  );
};

export default SearchForm;
