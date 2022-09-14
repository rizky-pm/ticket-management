import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';

import {
  addNewPriority,
  deletePriority,
  editPriority,
  getAllPriorities,
} from '../api';
import PriorityCard from '../components/PriorityCard';
import {
  Container,
  Heading4,
  CardWrapper,
  Header2,
  Form,
  InputField,
} from '../components/Styled';
import ModalComponent from '../components/ModalComponent';

const PriorityPage = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [isModalAddPriorityOpen, setIsModalAddPriorityOpen] = useState(false);
  const [isModalEditPriorityOpen, setIsModalEditPriorityOpen] = useState(false);
  const [isModalDeletePriorityOpen, setIsModalDeletePriorityOpen] =
    useState(false);
  const [data, setData] = useState([]);
  const [payload, setPayload] = useState({
    priorityName: '',
    priorityCode: '',
    priorityPoint: data?.length + 1,
    isActive: true,
  });
  const [selectedPriority, setSelectedPriority] = useState({});
  const userSession = JSON.parse(localStorage.getItem('user'));

  const fetchPriorities = async () => {
    setIsFetching(true);
    const response = await getAllPriorities(userSession);
    setIsFetching(false);

    if (response.status === 200) {
      setData(response.data.datas);
    }
  };

  const statusNameInputHandler = (e) => {
    setPayload((prevState) => {
      return {
        ...prevState,
        priorityName: e.target.value,
      };
    });
  };

  const statusCodeInputHandler = (e) => {
    setPayload((prevState) => {
      return {
        ...prevState,
        priorityCode: e.target.value,
      };
    });
  };

  const addNewPriorityHandler = async () => {
    setIsFetching(true);
    const response = await addNewPriority(payload, userSession);
    setIsFetching(false);
    console.log(response);
    if (response.status === 201) {
      setIsModalAddPriorityOpen(false);
      fetchPriorities();
    }
  };

  const editPriorityHandler = async () => {
    const payloadData = {
      id: selectedPriority.id,
      priorityName: payload.priorityName,
      priorityPoint: selectedPriority.priorityPoint,
      isActive: selectedPriority.isActive,
      version: selectedPriority.version,
    };

    const response = await editPriority(payloadData, userSession);
    console.log(response);
    if (response.status === 200) {
      setIsModalEditPriorityOpen(false);
      fetchPriorities();
    }
  };

  const deletePriorityHandler = async () => {
    const response = await deletePriority(selectedPriority.id, userSession);

    if (response.status === 200) {
      setIsModalDeletePriorityOpen(false);
      fetchPriorities();
    }
  };

  const negativeHandler = () => {
    setIsModalAddPriorityOpen(false);
    setIsModalEditPriorityOpen(false);
    setIsModalDeletePriorityOpen(false);
  };

  useEffect(() => {
    fetchPriorities();
  }, []);

  return (
    <Container>
      {isFetching ? (
        <Heading4>Loading ...</Heading4>
      ) : (
        <>
          <Header2>
            <Heading4>Priorities</Heading4>
            <PlusIconWrapper
              onClick={() => {
                setIsModalAddPriorityOpen(true);
              }}
            />
          </Header2>
          <CardWrapper>
            {data.map((item) => (
              <PriorityCard
                key={item.id}
                data={item}
                setIsModalEditPriorityOpen={setIsModalEditPriorityOpen}
                setSelectedPriority={setSelectedPriority}
                setIsModalDeletePriorityOpen={setIsModalDeletePriorityOpen}
              />
            ))}
          </CardWrapper>
        </>
      )}
      {/* Start of add new priority */}
      <ModalComponent
        title={'Add New Priority'}
        statusPoint={data?.length + 1}
        isModalOpen={isModalAddPriorityOpen}
        setIsModalAddPriorityOpen={setIsModalAddPriorityOpen}
        positiveHandler={addNewPriorityHandler}
        negativeHandler={negativeHandler}
        payload={payload}
        isFetching={isFetching}
      >
        <Form>
          <InputField
            max={10}
            onChange={(e) => {
              statusNameInputHandler(e);
            }}
            placeholder={"Priority's name"}
          />
          <InputField
            max={4}
            onChange={(e) => {
              statusCodeInputHandler(e);
            }}
            placeholder={"Priority's code"}
          />
        </Form>
      </ModalComponent>
      {/* End of add new priority */}

      {/* Start of edit priority */}
      <ModalComponent
        title={`Edit ${selectedPriority?.priorityName} Priority`}
        statusPoint={data?.length + 1}
        isModalOpen={isModalEditPriorityOpen}
        positiveHandler={editPriorityHandler}
        negativeHandler={negativeHandler}
        payload={payload}
        isFetching={isFetching}
        disabled={payload.priorityName === ''}
      >
        <Form>
          <InputField
            max={10}
            onChange={(e) => {
              statusNameInputHandler(e);
            }}
            placeholder={"Priority's name"}
          />
        </Form>
      </ModalComponent>
      {/* End of edit priority */}

      {/* Start of delete priority */}
      <ModalComponent
        title={`Delete Priority`}
        statusPoint={data?.length + 1}
        isModalOpen={isModalDeletePriorityOpen}
        positiveHandler={deletePriorityHandler}
        negativeHandler={negativeHandler}
        payload={payload}
        isFetching={isFetching}
      >
        <span>{`Are you sure to delete ${selectedPriority.priorityName}`}</span>
      </ModalComponent>
      {/* End of delete priority */}
    </Container>
  );
};

const PlusIconWrapper = styled(PlusSquareOutlined)`
  font-size: 24px;
  color: ${(props) => props.theme.color.dark};
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.color.accent};
  }
`;

export default PriorityPage;
