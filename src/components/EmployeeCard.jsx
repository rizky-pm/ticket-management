import React, { useState } from 'react';
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { ToolContainer } from './Styled';
import { toggleOverflow } from '../rtk/features/styleSlice';

const EmployeeCard = ({
  data,
  setIsEditEmployeeOverlayOpen,
  setSelectedData,
  setIsDeleteEmployeeOverlayOpen,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  // console.log(data.fileName);

  return (
    <EmployeeContainer
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {data.fileName === 'Foto' || !data.fileName ? (
        <NoEmployeeAvatar>
          <UserOutlined style={{ fontSize: '40px' }} />
        </NoEmployeeAvatar>
      ) : (
        <EmployeeAvatar src={data?.fileName} alt='avatar' />
      )}
      <EmployeeName>{data.fullName}</EmployeeName>
      <EmployeeEmail>{data.email} email@example.com</EmployeeEmail>
      <ToolContainer isHovered={isHovered}>
        <DeleteOutlined
          onClick={() => {
            setIsDeleteEmployeeOverlayOpen((prevState) => !prevState);
            setSelectedData(data);
            dispatch(toggleOverflow());
          }}
          style={{ fontSize: '25px', padding: '10px' }}
        />
        <EditOutlined
          onClick={() => {
            setIsEditEmployeeOverlayOpen((prevState) => !prevState);
            setSelectedData(data);
            dispatch(toggleOverflow());
          }}
          style={{ fontSize: '1.5625rem', padding: '10px' }}
        />
      </ToolContainer>
    </EmployeeContainer>
  );
};

const EmployeeContainer = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'avatar fullName'
    'avatar email';

  align-items: center;
  overflow: hidden;
  position: relative;
  gap: 0 10px;
  padding: 20px 10px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.gray};
`;

const NoEmployeeAvatar = styled.div`
  grid-area: avatar;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 100%;
  border: 4px solid ${(props) => props.theme.color.dark};
  aspect-ratio: 1/1;
  background-color: ${(props) => props.theme.color.darkGray};
  color: ${(props) => props.theme.color.dark};
  font-size: 40px;
`;

const EmployeeAvatar = styled.img.attrs({ loading: 'lazy' })`
  grid-area: avatar;
  width: 100%;
  object-fit: fill;
  border-radius: 100%;
  aspect-ratio: 1/1;
  background-color: red;
`;

const EmployeeName = styled.p`
  grid-area: fullName;
  font-size: 16px;
  font-weight: bold;
`;

const EmployeeEmail = styled.p`
  grid-area: email;
  font-size: 16px;
`;

export default EmployeeCard;
