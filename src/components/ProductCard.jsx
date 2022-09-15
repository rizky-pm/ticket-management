import React, { useState } from 'react';
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { ToolContainer } from './Styled';

const ProductCard = ({
  data,
  setIsEditProductOverlayOpen,
  setSelectedData,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <ProductContainer
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <ProductName>{data.productName}</ProductName>
      <ProductCode>{data.productCode}</ProductCode>
      <ToolContainer isHovered={isHovered}>
        <DeleteOutlined
          onClick={() => {
            // setIsModalDeletePriorityOpen((prevState) => !prevState);
            // setSelectedPriority(data);
          }}
          style={{ fontSize: '25px', padding: '10px' }}
        />
        <EditOutlined
          onClick={() => {
            setIsEditProductOverlayOpen((prevState) => !prevState);
            setSelectedData(data);
          }}
          style={{ fontSize: '1.5625rem', padding: '10px' }}
        />
      </ToolContainer>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  padding: 20px 20px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.darkGray};
`;

const ProductName = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const ProductCode = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

export default ProductCard;
