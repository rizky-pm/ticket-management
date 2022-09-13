import React, { useState } from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.min.css';
import { Collapse } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';

import '../index.css';
import { DangerButton, GhostPrimaryButton, PrimaryButton } from './Button';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const PanelComponent = styled(Panel)`
  position: relative;
  width: 100%;
`;

const UserEmail = styled.p`
  width: 225px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: bold;
`;

const RoleTag = styled.span`
  background-color: ${(props) => props.roleColor};
  padding: 1px 10px;
  color: ${(props) => props.theme.color.dark};
  border-radius: 4px;
`;

const CollapseComponent = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  const renderRoleTag = (role) => {
    switch (role) {
      case 'ESA':
        return <RoleTag roleColor='rgba(235, 64, 52, 0.5)'>{role}</RoleTag>;

      case 'PIC':
        return <RoleTag roleColor='rgba(234, 250, 7, 0.5)'>{role}</RoleTag>;

      case 'CUST':
        return <RoleTag roleColor='rgba(48, 250, 7, 0.5)'>{role}</RoleTag>;

      default:
        break;
    }
  };

  return (
    <Collapse
      bordered={false}
      expandIconPosition={'end'}
      className='site-collapse-custom-collapse'
      onChange={() => {
        setIsHovered(!isHovered);
      }}
    >
      <PanelComponent
        header={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div>
              <UserOutlined
                style={{
                  fontSize: '30px',
                }}
              />
            </div>
            <UserEmail>{data.userEmail}</UserEmail>
          </div>
        }
        key='1'
        className='site-collapse-custom-panel'
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'flex-start',
            gap: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignSelf: 'normal',
              justifyContent: 'space-between',
            }}
          >
            <p>{data.userEmail}</p>
            {renderRoleTag(data.roleCode)}
          </div>
          <div
            style={{
              alignSelf: 'flex-end',
              display: 'inline-flex',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            <PrimaryButton sm='5px 10px'>Delete</PrimaryButton>
            <GhostPrimaryButton sm='5px 10px' bg='yellow'>
              Edit
            </GhostPrimaryButton>
          </div>
        </div>
      </PanelComponent>
    </Collapse>
  );
};

export default CollapseComponent;
