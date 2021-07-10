import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Search.scss';

const Search = (props) => {
  const { onSearch } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);

  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value); 
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !!searchTerm) {
      onSearch(searchTerm);
      setSearchTerm('');
    }
  }
  
  const submitKey = () => {
    if (!!searchTerm) {
      onSearch(searchTerm);
      setSearchTerm('');
    } else {
      searchRef.current.focus();
    }
  }

  const refreshControl = () => {
    onSearch('');
    setSearchTerm('');
  }
  
  return (
    <div className="search-form">
      <Form.Group>
        <Form.Control
          type="text" 
          name="search" 
          autoComplete="off"
          value={searchTerm}
          placeholder="Tìm kiếm..."
          onChange={handleChangeSearch}
          onKeyDown={handleKeyDown}
          ref={searchRef}
        />
        <Button variant="default" onClick={submitKey} className="btn-search" title="Tìm kiếm">
          <i className="fa fa-search" aria-hidden="true"></i>
        </Button>
      </Form.Group>
      <Button variant="default" onClick={refreshControl} className="btn-refresh" title="Làm mới Table">
        <i className="fa fa-refresh" aria-hidden="true"></i>
      </Button>
    </div>
  );
};

export default Search;