import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const SelectRoleComponent = ({
  setSelectedValue,
  data,
  size,
  selectedValue,
}) => {
  const handleChange = (value) => {
    setSelectedValue(value);
  };

  console.log(data[0]);

  return (
    <Select
      defaultValue={`${data[0]?.roleName} - ${data[0]?.roleCode}`}
      style={{
        width: '100%',
      }}
      size={size}
      onChange={handleChange}
      value={selectedValue}
    >
      {data.map((data, index) => {
        return (
          <Option value={data.id} key={index}>
            {data.roleName} - {data.roleCode}
          </Option>
        );
      })}
    </Select>
  );
};

export default SelectRoleComponent;
