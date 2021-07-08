import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
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
      const formSearchValue = {
        keySearch: e.target.value
      };

      onSearch(formSearchValue);
  
    }, 500);
    
  }
  
  return (
    <div className="search-form">
      <Form onSubmit={e => e.preventDefault()}>
        <Form.Group>
          <Form.Control
            type="text" 
            name="search" 
            autoComplete="off"
            value={searchTerm}
            placeholder= {placeholder}
            onChange={handleChangeSearch}
          />
          <i className="fa fa-search" aria-hidden="true"></i>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Search;