import React from 'react';
import { Input } from 'antd';

const InputSearchComponent = ({ searchInput, setSearchInput }) => {
  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <Input
      onChange={(e) => {
        handleInput(e);
      }}
      value={searchInput}
      placeholder='Search something ...'
    />
  );
};

export default InputSearchComponent;
