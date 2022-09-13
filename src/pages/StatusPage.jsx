import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';

import { getAllStatus, postNewStatus } from '../api/status';
import { Container, Heading4, Heading5 } from '../components/Styled';
import { GhostPrimaryButton } from '../components/Button';
import StatusCard from '../components/StatusCard';

const StatusContainer = styled.div`
  overflow: hidden;
  position: relative;
  padding: 20px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.gray};

  span {
    font-size: 32px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

const EditIcon = styled(PlusSquareOutlined)`
  font-size: 24px;
  color: ${(props) =>
    props.edit === 'true' ? props.theme.color.accent : props.theme.color.dark};
  transition: all 0.2s ease-in-out;
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${(props) => props.theme.color.accent};
  border-radius: 4px;
  color: ${(props) => props.theme.color.light};
  padding: 20px;
  transform: ${(props) => (props.isEditMode ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: top center;
  opacity: ${(props) => (props.isEditMode ? 1 : 0)};
  transition: all 0.5s ease;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px 10px;
  grid-template-areas:
    'statusName statusCode'
    'submitButton submitButton';
`;

const StatusNameInputContainer = styled.div`
  grid-area: statusName;
`;

const StatusCodeInputContainer = styled.div`
  grid-area: statusCode;
`;

const SubmitButton = styled(GhostPrimaryButton)`
  grid-area: submitButton;
`;

const InputField = styled.input.attrs((props) => ({
  type: 'text',
  placeholder: props.placeholder,
  maxLength: props.max,
}))`
  outline: none;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  color: ${(props) => props.theme.color.dark};
  border: 2px solid ${(props) => props.theme.color.accent};
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:focus {
    border: 2px solid ${(props) => props.theme.color.dark};
  }
`;

const StatusPage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [postPayload, setPostPayload] = useState({
    statusName: '',
    statusCode: '',
  });
  const userSession = JSON.parse(localStorage.getItem('user'));

  const handleStatusNameInput = (e) => {
    setPostPayload((prevState) => {
      return {
        ...prevState,
        statusName: e.target.value,
      };
    });
  };

  const handleStatusCodeInput = (e) => {
    setPostPayload((prevState) => {
      return {
        ...prevState,
        statusCode: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPostPayload((prevState) => {
      return {
        ...prevState,
        statusPoint: statuses.length + 1,
      };
    });
    postNewStatus(postPayload, userSession);
  };

  useEffect(() => {
    getAllStatus(setIsFetching, setStatuses, userSession);
  }, []);

  return (
    <Container>
      {isFetching ? (
        <Heading4>Loading...</Heading4>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Heading4>Status Page</Heading4>
            <label htmlFor='edit-mode'>
              <EditIcon edit={isEditMode.toString()} />
            </label>
            <input
              style={{
                display: 'none',
              }}
              type='checkbox'
              name='edit-mode'
              id='edit-mode'
              value={isEditMode}
              onChange={() => setIsEditMode(!isEditMode)}
            />
          </div>
          {statuses?.map((status) => {
            return <StatusCard data={status} key={status.statusCode} />;
          })}

          <EditContainer isEditMode={isEditMode}>
            <Heading5>Add new status</Heading5>
            <Form
              onSubmit={(e) => {
                handleSubmit(e, postPayload, userSession);
              }}
            >
              <StatusNameInputContainer>
                {/* <label htmlFor='statusName'>Status Name</label> */}
                <InputField
                  placeholder='Status Name'
                  max={10}
                  onChange={(e) => {
                    handleStatusNameInput(e);
                  }}
                  value={postPayload.statusName}
                />
              </StatusNameInputContainer>
              <StatusCodeInputContainer>
                {/* <label htmlFor='statusCode'>Status Code</label> */}
                <InputField
                  placeholder='Status Code'
                  max={10}
                  onChange={(e) => {
                    handleStatusCodeInput(e);
                  }}
                  value={postPayload.statusCode}
                />
              </StatusCodeInputContainer>
              <SubmitButton
                disabled={
                  postPayload.statusName === '' || postPayload.statusCode === ''
                }
              >
                Add
              </SubmitButton>
            </Form>
          </EditContainer>
        </>
      )}
    </Container>
  );
};

export default StatusPage;
