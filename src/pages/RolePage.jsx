import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PlusSquareOutlined, CloseOutlined } from '@ant-design/icons';

import {
  Container,
  Header2,
  Heading4,
  InputField,
  CardWrapper,
} from '../components/Styled';
import {
  addNewRole,
  deleteRoleById,
  editRole,
  getAllRoles,
  getRoleById,
} from '../api/role';
import { GhostDangerButton, PrimaryButton } from '../components/Button';
import SelectComponent from '../components/SelectComponent';
import OverlayComponent from '../components/OverlayComponent';
import RoleCard from '../components/RoleCard';
import { IS_ACTIVE_DATA } from '../constants';

const ContainerWithOverlay = styled(Container)`
  height: ${(props) => (props.disableScroll ? '90vh' : 'auto')};
  overflow: ${(props) => (props.disableScroll ? 'hidden' : 'auto')};
`;

const CustomInputField = styled(InputField)`
  border: 2px solid ${(props) => props.theme.color.dark};
  height: 60px;
  font-size: 20px;

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

const RolePage = () => {
  const [isAddNewRoleOverlayOpen, setIsAddNewRoleOverlayOpen] = useState(false);
  const [isEditRoleOverlayOpen, setIsEditRoleOverlayOpen] = useState(false);
  const [isDeleteRoleOverlayOpen, setIsDeleteRoleOverlayOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState({});
  const [isActive, setIsActive] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);
  const [addNewRolePayload, setAddNewRolePayload] = useState({
    roleName: '',
    roleCode: '',
  });
  const [editRolePayload, setEditRolePayload] = useState({
    roleName: '',
  });
  const userSession = JSON.parse(localStorage.getItem('user'));

  const getRole = async () => {
    const res = await getRoleById(selectedRole.id, userSession);
    setRole(res.data.data);
  };

  const roleNameInputHandler = (e) => {
    setAddNewRolePayload({
      ...addNewRolePayload,
      roleName: e.target.value,
    });
  };

  const roleCodeInputHandler = (e) => {
    setAddNewRolePayload({
      ...addNewRolePayload,
      roleCode: e.target.value,
    });
  };

  const AddNewRoleButtonHandler = async () => {
    const payload = {
      ...addNewRolePayload,
      isActive,
    };

    const res = await addNewRole(payload, userSession);

    if (res.status === 201) {
      setIsAddNewRoleOverlayOpen(false);
      getAllRoles(setIsFetching, setRoles, userSession);
      setAddNewRolePayload({
        roleName: '',
        roleCode: '',
      });
    }
  };

  const EditRoleButtonHandler = async () => {
    const payload = {
      ...role,
      roleName: editRolePayload.roleName,
    };

    const res = await editRole(payload, userSession);

    if (res.status === 200) {
      setIsEditRoleOverlayOpen(false);
      setSelectedRole(null);
      getAllRoles(setIsFetching, setRoles, userSession);
    }
  };

  const deleteRoleButtonHandler = async () => {
    const res = await deleteRoleById(selectedRole.id, userSession);

    if (res.status === 200) {
      setIsDeleteRoleOverlayOpen(false);
      setSelectedRole(null);
      getAllRoles(setIsFetching, setRoles, userSession);
    }
  };

  useEffect(() => {
    getAllRoles(setIsFetching, setRoles, userSession);
  }, []);

  useEffect(() => {
    if (selectedRole) {
      getRole();
    }
  }, [selectedRole]);

  return (
    <ContainerWithOverlay
      disableScroll={
        isAddNewRoleOverlayOpen ||
        isEditRoleOverlayOpen ||
        isDeleteRoleOverlayOpen
      }
    >
      {isFetching ? (
        <Heading4>Loading ...</Heading4>
      ) : (
        <>
          <Header2>
            <Heading4>Role List</Heading4>

            <label htmlFor='edit-mode'>
              <PlusSquareOutlined style={{ fontSize: '24px' }} />
            </label>
            <input
              style={{
                display: 'none',
              }}
              type='checkbox'
              name='edit-mode'
              id='edit-mode'
              value={isAddNewRoleOverlayOpen}
              onChange={() =>
                setIsAddNewRoleOverlayOpen(!isAddNewRoleOverlayOpen)
              }
            />
          </Header2>
          <CardWrapper>
            {roles?.map((role) => {
              return (
                <RoleCard
                  setSelectedRole={setSelectedRole}
                  isEditRoleOverlayOpen={isEditRoleOverlayOpen}
                  setIsEditRoleOverlayOpen={setIsEditRoleOverlayOpen}
                  setIsDeleteRoleOverlayOpen={setIsDeleteRoleOverlayOpen}
                  isDeleteRoleOverlayOpen={isDeleteRoleOverlayOpen}
                  data={role}
                  key={role.id}
                />
              );
            })}
          </CardWrapper>

          {/* Start of overlay for add new role */}
          <OverlayComponent isOpen={isAddNewRoleOverlayOpen}>
            <CloseIcon
              onClick={() => {
                setIsAddNewRoleOverlayOpen(!isAddNewRoleOverlayOpen);
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
              Add New Role
            </p>
            <CustomInputField
              onChange={(e) => {
                roleNameInputHandler(e);
              }}
              placeholder='Role Name'
              value={addNewRolePayload.roleName}
            />
            <CustomInputField
              onChange={(e) => {
                roleCodeInputHandler(e);
              }}
              placeholder='Role Code'
              value={addNewRolePayload.roleCode}
              max={4}
            />

            <SelectComponent
              size='large'
              data={IS_ACTIVE_DATA}
              setSelectedValue={setIsActive}
            />
            <PrimaryButton
              onClick={AddNewRoleButtonHandler}
              size='md'
              disabled={
                addNewRolePayload.roleName === '' ||
                addNewRolePayload.roleCode === ''
              }
            >
              Add
            </PrimaryButton>
          </OverlayComponent>
          {/* End of overlay for add new role */}

          {/* Start of overlay for edit role */}
          <OverlayComponent isOpen={isEditRoleOverlayOpen}>
            <CloseIcon
              onClick={() => {
                setIsEditRoleOverlayOpen(!isEditRoleOverlayOpen);
              }}
              style={{ padding: '20px', alignSelf: 'flex-start' }}
            />
            <p
              style={{
                fontSize: '56px',
                fontWeight: 'bold',
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                hyphens: 'auto',
                whiteSpace: 'normal',
                width: '100%',
              }}
            >
              Edit {selectedRole?.roleName}
            </p>
            <CustomInputField
              onChange={(e) => {
                setEditRolePayload((prevState) => {
                  return {
                    ...prevState,
                    roleName: e.target.value,
                  };
                });
              }}
              placeholder='New Role Name'
            />
            <PrimaryButton
              onClick={EditRoleButtonHandler}
              size='md'
              disabled={editRolePayload.roleName === ''}
            >
              Edit
            </PrimaryButton>
          </OverlayComponent>
          {/* End of overlay for edit role */}

          {/* Start of overlay for delete role */}
          <OverlayComponent isOpen={isDeleteRoleOverlayOpen}>
            <CloseIcon
              onClick={() => {
                setIsDeleteRoleOverlayOpen(!isDeleteRoleOverlayOpen);
              }}
              style={{ padding: '20px', alignSelf: 'flex-start' }}
            />
            <p
              style={{
                fontSize: '56px',
                fontWeight: 'bold',
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                hyphens: 'auto',
                whiteSpace: 'normal',
                width: '100%',
              }}
            >
              Are You Sure To Delete {selectedRole?.roleName}
            </p>
            <PrimaryButton onClick={deleteRoleButtonHandler} size='md'>
              Yes, Delete
            </PrimaryButton>
            <GhostDangerButton
              onClick={() => {
                setIsDeleteRoleOverlayOpen(!isDeleteRoleOverlayOpen);
                setSelectedRole(null);
              }}
              size='md'
            >
              No, Cancel
            </GhostDangerButton>
          </OverlayComponent>
          {/* End of overlay for delete role */}
        </>
      )}
    </ContainerWithOverlay>
  );
};

export default RolePage;
