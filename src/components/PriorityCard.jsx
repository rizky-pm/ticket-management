import React, { useState } from 'react';
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { ToolContainer } from './Styled';

const PriorityCard = ({
  data,
  setIsModalEditPriorityOpen,
  setSelectedPriority,
  setIsModalDeletePriorityOpen,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <PriorityContainer
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      priorityCode={data.priorityCode}
    >
      <span>{data.priorityName}</span>
      <ToolContainer isHovered={isHovered}>
        <DeleteOutlined
          onClick={() => {
            setIsModalDeletePriorityOpen((prevState) => !prevState);
            setSelectedPriority(data);
          }}
          style={{ fontSize: '25px', padding: '10px' }}
        />
        <EditOutlined
          onClick={() => {
            setIsModalEditPriorityOpen((prevState) => !prevState);
            setSelectedPriority(data);
          }}
          style={{ fontSize: '1.5625rem', padding: '10px' }}
        />
      </ToolContainer>
    </PriorityContainer>
  );
};

const renderPriorityCardBg = (code) => {
  switch (code) {
    case 'H':
      return 'background-color: #FF3C38';

    case 'M':
      return 'background-color: #FFD60A';

    case 'L':
      return 'background-color: #00C2FF';

    default:
      break;
  }
};

const PriorityContainer = styled.div`
  overflow: hidden;
  position: relative;
  padding: 40px 20px;
  border-radius: 4px;
  ${(props) => renderPriorityCardBg(props.priorityCode)};

  span {
    font-size: 32px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

export default PriorityCard;
