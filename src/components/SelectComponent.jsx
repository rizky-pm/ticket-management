import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const SelectComponent = ({ setSelectedValue, data, size }) => {
  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <Select
      defaultValue={data[0].label}
      style={{
        width: '100%',
      }}
      size={size}
      onChange={handleChange}
    >
      {data.map((data, index) => {
        return (
          <Option value={data.value} key={index}>
            {data.label}
          </Option>
        );
      })}
    </Select>
  );
};

export default SelectComponent;
