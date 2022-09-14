import React, { useState } from 'react';
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const renderCardBackgroundColor = (roleCode) => {
  switch (roleCode) {
    case 'ESA':
      return 'background-color: #FF3C38';

    case 'PIC':
      return 'background-color: #FFD60A';

    case 'CUST':
      return 'background-color: #00C2FF';

    default:
      break;
  }
};

const CardContainer = styled.div`
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: green;
  ${(props) => renderCardBackgroundColor(props.roleCode)};
  gap: 10px;
  overflow: hidden;
  position: relative;
`;

const CardRoleName = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const CardRoleCode = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

const ToolContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  position: absolute;
  top: 0;
  right: 0;
  background-color: ${(props) => props.theme.color.dark};
  /* width: 20%; */
  /* height: ${(props) => props.height || '100%'}; */
  height: 100%;
  /* aspect-ratio: 1 / 1; */
  transform: ${(props) =>
    props.isHovered ? 'translateX(0)' : 'translateX(100%)'};
  transition: all 0.3s ease-in-out;
  color: white;
  z-index: 10;
`;

const RoleCard = ({
  setSelectedRole,
  setIsEditRoleOverlayOpen,
  isEditRoleOverlayOpen,
  setIsDeleteRoleOverlayOpen,
  isDeleteRoleOverlayOpen,
  data,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <CardContainer
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      roleCode={data.roleCode}
    >
      <CardRoleName>{data.roleName}</CardRoleName>
      <CardRoleCode>{data.roleCode}</CardRoleCode>
      <ToolContainer isHovered={isHovered}>
        <DeleteOutlined
          onClick={() => {
            setIsDeleteRoleOverlayOpen(!isDeleteRoleOverlayOpen);
            setSelectedRole(data);
          }}
          style={{ fontSize: '25px', padding: '10px' }}
        />
        <EditOutlined
          onClick={() => {
            setIsEditRoleOverlayOpen(!isEditRoleOverlayOpen);
            setSelectedRole(data);
          }}
          style={{ fontSize: '1.5625rem', padding: '10px' }}
        />
      </ToolContainer>
    </CardContainer>
  );
};

export default RoleCard;
