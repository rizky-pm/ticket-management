import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { UserOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const UserCardContainer = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr 0.2fr;
  grid-template-rows: 1fr 1fr;
  justify-content: center;
  gap: 0px 5px;
  grid-template-areas:
    'avatar userEmail isActive'
    'avatar roleCode isActive';

  background-color: ${(props) => props.theme.color.darkGray};
  border-radius: 4px;
  padding: 20px 10px;
  position: relative;
  transition: all 0.5s ease;
  overflow: hidden;

  &:hover {
    background-color: ${(props) => props.theme.color.gray};
  }
`;

const Avatar = styled.div`
  grid-area: avatar;
`;

const UserEmail = styled.p`
  grid-area: userEmail;
  align-self: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: bold;
`;

const RoleCode = styled.p`
  grid-area: roleCode;
  align-self: center;
`;

const IsActive = styled.p`
  grid-area: isActive;
  justify-self: end;
  align-self: center;
`;

const ToolContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  position: absolute;
  top: 0;
  right: 0;
  background-color: ${(props) => props.theme.color.dark};
  width: 125px;
  /* height: ${(props) => props.height || '100%'}; */
  height: 100%;
  /* aspect-ratio: 1 / 1; */
  transform: ${(props) =>
    props.isHovered ? 'translateX(0)' : 'translateX(100%)'};
  transition: all 0.3s ease-in-out;
  color: white;
  z-index: 10;
`;

const UserCard = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const panelRef = useRef(null);

  console.log(panelRef.current);

  return (
    <UserCardContainer
      ref={panelRef}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <Avatar>
        <UserOutlined
          style={{
            fontSize: '40px',
          }}
        />
      </Avatar>
      <UserEmail>{data.userEmail}</UserEmail>
      <RoleCode>{data.roleCode}</RoleCode>
      <IsActive>{data.isActive.toString()}</IsActive>

      <ToolContainer isHovered={isHovered}>
        <DeleteOutlined
          onClick={() => {
            console.log('delete');
          }}
          style={{ fontSize: '25px', padding: '10px' }}
        />
        <EditOutlined
          onClick={() => {
            setIsCollapsed(!isCollapsed);
            console.log('edit');
          }}
          style={{ fontSize: '1.5625rem', padding: '10px' }}
        />
      </ToolContainer>
    </UserCardContainer>
  );
};

export default UserCard;
