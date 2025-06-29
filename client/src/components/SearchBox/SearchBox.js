import React, { useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import * as routes from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import "../style.css";
const SearchBox = () => {
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    return searchKey !== ""
      ? navigate(`/?search=${searchKey}`)
      : navigate(`../${routes.HOME}`);
  };

  return (
    <Form inline onSubmit={handleSubmit} className="searchbar">
      <FormControl
        type="text"
        name="seacrh"
        onChange={(e) => setSearchKey(e.target.value)}
        placeholder="Search product..."
        className="mr-sm-2 "
        style={{
          backgroundColor: "#fff",
        }}
      />
      <i className="fas fa-search"></i>
    </Form>
  );
};

export default SearchBox;
