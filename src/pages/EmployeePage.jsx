import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PlusSquareOutlined, CloseOutlined } from '@ant-design/icons';

import {
  Container,
  Header2,
  Heading4,
  InputField,
  CardWrapper,
  HighlightedText,
} from '../components/Styled';
import { PrimaryButton } from '../components/Button';
import EmployeeCard from '../components/EmployeeCard';
import SelectComponent from '../components/SelectComponent';
import SelectRoleComponent from '../components/SelectRoleComponent';
import OverlayComponent from '../components/OverlayComponent';
import {
  getAllEmployees,
  editEmployee,
  addNewEmployee,
  deleteEmployee,
} from '../api';
import { getAllRoles } from '../api/role';
import { IS_ACTIVE_DATA } from '../constants';
import FileUploader from '../components/FileUploader';

const EmployeePage = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [inputState, setInputState] = useState({});
  const [isAddNewEmployeeOverlayOpen, setIsAddNewEmployeeOverlayOpen] =
    useState(false);
  const userSession = JSON.parse(localStorage.getItem('user'));

  console.log(roles);

  const fetchAllEmployees = async () => {
    setIsFetching(true);
    const response = await getAllEmployees(userSession);
    setIsFetching(false);

    if (response.status === 200) {
      setData(response.data.datas);
    } else {
      setError(response.response.data.message);
    }
  };

  const fetchAllRoles = async () => {
    const response = await getAllRoles(userSession);

    if (response.status === 200) {
      setRoles(response.data.datas);
    }
  };

  const postNewEmployee = async () => {
    console.log(inputState);
    // const response = await addNewEmployee(payload, userSession);
    // if (response.status === 200) {
    //   fetchAllEmployees();
    //   setIsAddNewEmployeeOverlayOpen(false);
    // } else {
    //   setError(response.response.data.message);
    // }
  };

  // * Start Of Input Handler
  const fullNameInputHandler = (e) => {
    setInputState((prevState) => {
      return {
        ...prevState,
        fullName: e.target.value,
      };
    });
  };

  const emailInputHandler = (e) => {
    setInputState((prevState) => {
      return {
        ...prevState,
        user: {
          userEmail: e.target.value,
        },
      };
    });
  };

  const roleInputHandler = (e) => {
    setInputState((prevState) => {
      return {
        ...prevState,
        user: {
          ...prevState.user,
          roleId: e.target.value,
        },
      };
    });
  };

  const isActiveInputHandler = (e) => {
    setInputState((prevState) => {
      return {
        ...prevState,
        isActive: e.target.value,
      };
    });
  };

  const fileInputHandler = (e) => {
    console.log(e.target.files[0]);
    // setInputState((prevState) => {
    //   return {
    //     ...prevState,
    //     fileName: e.target.files[0],
    //   };
    // });
  };
  // * End Of Input Handler

  useEffect(() => {
    fetchAllEmployees();
    fetchAllRoles();
  }, []);

  return (
    <ContainerWithOverlay>
      {isFetching ? (
        <Heading4>Loading ...</Heading4>
      ) : (
        <>
          <Header2>
            <Heading4>Employee List</Heading4>
            <PlusIconWrapper
              onClick={() => {
                setIsAddNewEmployeeOverlayOpen(true);
              }}
            />
          </Header2>
          <CardWrapper>
            {data.map((item) => (
              <EmployeeCard key={item.id} data={item} />
            ))}
          </CardWrapper>

          {/* Start of add new product overlay */}
          <OverlayComponent isOpen={isAddNewEmployeeOverlayOpen}>
            <CloseIcon
              onClick={() => {
                setIsAddNewEmployeeOverlayOpen((prevState) => !prevState);
              }}
              style={{ padding: '20px', alignSelf: 'flex-start' }}
            >
              Close
            </CloseIcon>
            <p
              style={{
                fontSize: '56px',
                fontWeight: 'bold',
              }}
            >
              Add New Employee
            </p>
            <CustomInputField
              onChange={(e) => {
                fullNameInputHandler(e);
              }}
              placeholder='Full Name'
              max={255}
              //   value={inputState.productName || ''}
            />
            <CustomInputField
              onChange={(e) => {
                emailInputHandler(e);
              }}
              placeholder='Email'
              //   value={inputState.productCode || ''}
              max={255}
            />

            <SelectComponent
              size='large'
              data={IS_ACTIVE_DATA}
              //   setSelectedValue={(value) => {
              //     productActiveSelectHandler(value);
              //   }}
              //   selectedValue={inputState.isActive ?? true}
            />

            <SelectRoleComponent size='large' data={roles} />

            <FileUploader />

            <PrimaryButton
              onClick={postNewEmployee}
              size='md'
              //   disabled={!inputState.productName || !inputState.productCode}
            >
              Add
            </PrimaryButton>
          </OverlayComponent>
          {/* End of add new product overlay */}
        </>
      )}
    </ContainerWithOverlay>
  );
};

const ContainerWithOverlay = styled(Container)`
  height: ${(props) => (props.disableScroll ? '90vh' : 'auto')};
  overflow: ${(props) => (props.disableScroll ? 'hidden' : 'auto')};
`;

const PlusIconWrapper = styled(PlusSquareOutlined)`
  font-size: 24px;
  color: ${(props) => props.theme.color.dark};
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.color.accent};
  }
`;

const CustomInputField = styled(InputField)`
  border: 2px solid ${(props) => props.theme.color.dark};
  height: 40px;
  font-size: 16px;

  &:focus {
    border: 2px solid ${(props) => props.theme.color.accent};
  }
`;

const CloseIcon = styled(CloseOutlined)`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 32px;
  color: ${(props) => props.theme.color.light};
`;

export default EmployeePage;
