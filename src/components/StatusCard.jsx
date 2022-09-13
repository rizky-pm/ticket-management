import React, { useState } from 'react';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

import { deleteStatus, editStatus } from '../api/status';
import { InputField } from './Styled';

const StatusContainer = styled.div`
  overflow: hidden;
  position: relative;
  padding: 40px 20px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.gray};

  span {
    font-size: 32px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

const DeleteContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 40%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${(props) => props.theme.color.dark};
  transform: ${(props) =>
    props.isStatusHovered ? 'translateX(0)' : 'translateX(100%)'};
  transition: all 0.5s ease;

  p {
    font-size: 16px;
    color: ${(props) => props.theme.color.light};
    font-weight: 500;
    padding: 5px;
  }
`;

const EditContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.color.accent};
  transform: ${(props) =>
    props.isStatusFocused ? 'translateX(0)' : 'translateX(-100%)'};
  transition: all 0.5s ease;
  padding: 0 10px;
  gap: 0 5px;

  p {
    font-size: 16px;
    color: ${(props) => props.theme.color.light};
    font-weight: 500;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 0.9fr 0.4fr;
  grid-template-rows: 1fr;
  gap: 5px 5px;
  grid-template-areas: 'statusName submitButton';
`;

const StatusNameInputContainer = styled.div`
  grid-area: statusName;
`;

const SubmitButton = styled.button`
  grid-area: submitButton;
  outline: none;
  border: none;
  font-weight: 500;
  font-size: 20px;
  color: ${(props) => props.theme.color.light};
  background-color: transparent;
  align-self: center;
`;

const StatusCard = ({ data, reference }) => {
  const [isStatusHovered, setIsStatusHovered] = useState(false);
  const [isStatusFocused, setIsStatusFocused] = useState(false);
  const [putPayload, setPutPayload] = useState({
    statusName: '',
  });
  const userSession = JSON.parse(localStorage.getItem('user'));

  const deleteStatusHandler = (id, userSession) => {
    deleteStatus(id, userSession);
  };

  const editStatusHandler = () => {
    const payload = {
      id: data.id,
      ...putPayload,
    };

    editStatus(payload, userSession);
  };

  const handleStatusNameInput = (e) => {
    setPutPayload((prevState) => {
      return {
        ...prevState,
        statusName: e.target.value,
      };
    });
  };

  return (
    <StatusContainer
      onMouseEnter={() => {
        setIsStatusHovered(true);
      }}
      onMouseLeave={() => {
        setIsStatusHovered(false);
      }}
      ref={reference}
    >
      <span>{data.statusName}</span>
      <DeleteContainer isStatusHovered={isStatusHovered}>
        <SubmitButton
          onClick={() => {
            deleteStatusHandler(data.id, userSession);
          }}
        >
          Delete
        </SubmitButton>
        <SubmitButton
          onClick={() => {
            setIsStatusFocused(!isStatusFocused);
          }}
        >
          Edit
        </SubmitButton>
      </DeleteContainer>

      <EditContainer isStatusFocused={isStatusFocused}>
        <Form
          onSubmit={(e) => {
            editStatusHandler(e);
          }}
        >
          {/* <label htmlFor='statusName'>Status Name</label> */}
          <StatusNameInputContainer>
            <InputField
              placeholder={data.statusName}
              max={10}
              onChange={(e) => {
                handleStatusNameInput(e);
              }}
              value={putPayload.statusName}
            />
          </StatusNameInputContainer>
          <SubmitButton disabled={putPayload.statusName === ''}>
            Edit
          </SubmitButton>
        </Form>
        <CloseOutlined
          onClick={() => {
            setIsStatusFocused(!isStatusFocused);
          }}
          style={{
            fontSize: '20px',
            color: 'white',
          }}
        />
      </EditContainer>
    </StatusContainer>
  );
};

export default StatusCard;
