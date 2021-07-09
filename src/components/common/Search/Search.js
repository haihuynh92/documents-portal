import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Search.scss';

const Search = (props) => {
  const { onSearch, placeholder } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const typingTimeOut = useRef(null);
  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value);
    
    if (typingTimeOut.current) {
      clearTimeout(typingTimeOut.current);
    }
  
    typingTimeOut.current = setTimeout(() => {
      if (!e.target.value.length) {
        onSearch(e.target.value);
      }
    }, 500);
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
    }
    return;
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
        />
        <Button variant="default" onClick={submitKey} className="btn-search">
          <i className="fa fa-search" aria-hidden="true"></i>
        </Button>
        
      </Form.Group>
    </div>
  );
};

export default Search;