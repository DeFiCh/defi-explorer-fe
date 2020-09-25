import React from "react";
import { MdSearch } from "react-icons/md";
import { Button } from "reactstrap";
import { Desktop, Mobile } from "../../../../components/Responsive";

const SearchBar = (props) => {
  const {
    loadSearchInputBar,
    showSearchBar,
    setShowSearchBar,
  } = props;

  return (
    <>
      <Desktop>{loadSearchInputBar()}</Desktop>
      <Mobile>
        <Button color='link' className="float-right" onClick={() => setShowSearchBar(!showSearchBar)}>
          <MdSearch />
        </Button>
      </Mobile>
    </>
  );
};

export default SearchBar;
