import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PlusSquareOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

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
import { toggleOverflow } from '../rtk/features/styleSlice';

const EmployeePage = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [payload, setPayload] = useState({
    fullName: '',
    user: {
      userEmail: '',
      roleId: null,
    },
    isActive: null,
    fileName: null,
    fileExt: null,
  });
  const [selectedData, setSelectedData] = useState(null);
  const [isAddNewEmployeeOverlayOpen, setIsAddNewEmployeeOverlayOpen] =
    useState(false);
  const [isEditEmployeeOverlayOpen, setIsEditEmployeeOverlayOpen] =
    useState(false);
  const [isDeleteEmployeeOverlayOpen, setIsDeleteEmployeeOverlayOpen] =
    useState(false);
  const userSession = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

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
    const response = await addNewEmployee(payload, userSession);
    if (response.status === 201) {
      fetchAllEmployees();
      setIsAddNewEmployeeOverlayOpen(false);
      dispatch(toggleOverflow());
    } else {
      setError(response);
    }
  };

  const editEmployeeHandler = async () => {
    const response = await editEmployee(selectedData.id, payload, userSession);
    if (response.status === 200) {
      fetchAllEmployees();
      setIsEditEmployeeOverlayOpen(false);
      dispatch(toggleOverflow());
    } else {
      setError(response);
    }
  };

  const deleteEmployeeHandler = async () => {
    const response = await deleteEmployee(selectedData.id, userSession);
    if (response.status === 200) {
      fetchAllEmployees();
      setIsDeleteEmployeeOverlayOpen(false);
      dispatch(toggleOverflow());
    } else {
      setError(response);
    }
  };

  // * Start Of Input Handler
  const fullNameInputHandler = (e) => {
    setPayload((prevState) => {
      return {
        ...prevState,
        fullName: e.target.value,
      };
    });
  };

  const emailInputHandler = (e) => {
    setPayload((prevState) => {
      return {
        ...prevState,
        user: {
          ...prevState.user,
          userEmail: e.target.value,
        },
      };
    });
  };

  const roleInputHandler = (value) => {
    setPayload((prevState) => {
      return {
        ...prevState,
        user: {
          ...prevState.user,
          roleId: value,
        },
      };
    });
  };

  const isActiveInputHandler = (value) => {
    setPayload((prevState) => {
      return {
        ...prevState,
        isActive: value,
      };
    });
  };
  // * End Of Input Handler

  console.log(selectedData);

  useEffect(() => {
    fetchAllEmployees();
    fetchAllRoles();
  }, []);

  return (
    <Container
      disableScroll={
        isAddNewEmployeeOverlayOpen ||
        isEditEmployeeOverlayOpen ||
        isDeleteEmployeeOverlayOpen
      }
    >
      {isFetching ? (
        <Heading4>Loading ...</Heading4>
      ) : (
        <>
          <Header2>
            <Heading4>Employee List</Heading4>
            <PlusIconWrapper
              onClick={() => {
                setIsAddNewEmployeeOverlayOpen(true);
                dispatch(toggleOverflow());
              }}
            />
          </Header2>
          <CardWrapper>
            {data.map((item) => (
              <EmployeeCard
                setIsEditEmployeeOverlayOpen={setIsEditEmployeeOverlayOpen}
                setSelectedData={setSelectedData}
                setIsDeleteEmployeeOverlayOpen={setIsDeleteEmployeeOverlayOpen}
                key={item.id}
                data={item}
              />
            ))}
          </CardWrapper>

          {/* // *Start of add new employee overlay */}
          <OverlayComponent isOpen={isAddNewEmployeeOverlayOpen}>
            <CloseIcon
              onClick={() => {
                setIsAddNewEmployeeOverlayOpen((prevState) => !prevState);
                dispatch(toggleOverflow());
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
            />
            <CustomInputField
              onChange={(e) => {
                emailInputHandler(e);
              }}
              placeholder='Email'
              max={255}
            />

            <SelectComponent
              size='large'
              data={IS_ACTIVE_DATA}
              setSelectedValue={(value) => {
                isActiveInputHandler(value);
              }}
              defaultValue='Select Activity'
              selectedValue={payload.isActive ?? true}
            />

            <SelectRoleComponent
              size='large'
              data={roles}
              setSelectedValue={(value) => {
                roleInputHandler(value);
              }}
            />

            <FileUploader payload={payload} setPayload={setPayload} />

            <PrimaryButton
              onClick={postNewEmployee}
              size='md'
              disabled={
                !payload.fullName ||
                !payload.user.userEmail ||
                !payload.user.roleId ||
                !payload.isActive
              }
            >
              Add
            </PrimaryButton>
          </OverlayComponent>
          {/* //* End of add new employee overlay */}

          {/* //? Start of edit employee overlay */}
          <OverlayComponent isOpen={isEditEmployeeOverlayOpen}>
            <CloseIcon
              onClick={() => {
                setIsEditEmployeeOverlayOpen((prevState) => !prevState);
                dispatch(toggleOverflow());
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
              Edit <HighlightedText>{selectedData?.fullName}</HighlightedText>
            </p>
            <CustomInputField
              onChange={(e) => {
                fullNameInputHandler(e);
              }}
              placeholder={selectedData?.fullName}
              max={255}
            />
            <CustomInputField
              onChange={(e) => {
                emailInputHandler(e);
              }}
              placeholder={'Email'}
              max={255}
            />

            <SelectComponent
              size='large'
              data={IS_ACTIVE_DATA}
              setSelectedValue={(value) => {
                isActiveInputHandler(value);
              }}
              selectedValue={payload.isActive ?? selectedData?.isActive}
            />

            <SelectRoleComponent
              size='large'
              data={roles}
              setSelectedValue={(value) => {
                roleInputHandler(value);
              }}
              // selectedValue={payload.user.roleId ?? selectedData?.user.roleId}
            />

            <FileUploader payload={payload} setPayload={setPayload} />

            <PrimaryButton
              // onClick={postNewEmployee}
              size='md'
              disabled={
                !payload.fullName ||
                !payload.user.userEmail ||
                !payload.user.roleId ||
                !payload.isActive
              }
            >
              Add
            </PrimaryButton>
          </OverlayComponent>
          {/* //? End of edit employee overlay */}

          {/* //! Start of delete employee overlay */}
          <OverlayComponent isOpen={isDeleteEmployeeOverlayOpen}>
            <CloseIcon
              onClick={() => {
                setIsDeleteEmployeeOverlayOpen((prevState) => !prevState);
                dispatch(toggleOverflow());
              }}
              style={{ padding: '20px', alignSelf: 'flex-start' }}
            >
              Close
            </CloseIcon>
            <p
              style={{
                fontSize: '50px',
                fontWeight: 'bold',
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                hyphens: 'auto',
                whiteSpace: 'normal',
                width: '100%',
              }}
            >
              Are you sure to delete{' '}
              <HighlightedText fontSize='50px' fontWeight='bold'>
                {selectedData?.fullName}
              </HighlightedText>{' '}
              ?
            </p>
            <PrimaryButton onClick={deleteEmployeeHandler} size='md'>
              Yes, Delete
            </PrimaryButton>
          </OverlayComponent>
          {/* //! End of delete employee overlay */}
        </>
      )}
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
