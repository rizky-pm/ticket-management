import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const SelectComponent = ({ setSelectedValue, data }) => {
  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <Select
      defaultValue={data[0].label}
      style={{
        width: 120,
      }}
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
