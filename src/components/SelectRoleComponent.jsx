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
    const selectedRole = data.find((role) => role.roleName === value);
    setSelectedValue(selectedRole.id);
  };

  return (
    <Select
      defaultValue={`Select Role`}
      style={{
        width: '100%',
      }}
      size={size}
      onChange={(value) => {
        handleChange(value);
      }}
      value={selectedValue}
    >
      {data.map((data, index) => {
        return (
          <Option value={data.roleName} key={index}>
            {data.roleName}
          </Option>
        );
      })}
    </Select>
  );
};

export default SelectRoleComponent;
