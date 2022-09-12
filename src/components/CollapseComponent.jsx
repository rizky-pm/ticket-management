import React, { useState } from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.min.css';
import { Collapse } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';

import '../index.css';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const PanelComponent = styled(Panel)`
  position: relative;
  width: 100%;
  background-color: red;
`;

const UserEmail = styled.p`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: bold;
`;

const CollapseComponent = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const onChange = (key) => {
    console.log(key);
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
        {/* <ToolContainer isHovered={isHovered}>
          <DeleteOutlined
            onClick={() => {
              console.log('delete');
            }}
            style={{ fontSize: '25px', padding: '10px' }}
          />
          <EditOutlined
            onClick={() => {
              console.log('edit');
            }}
            style={{ fontSize: '1.5625rem', padding: '10px' }}
          />
        </ToolContainer> */}
        <p>{text}</p>
      </PanelComponent>
    </Collapse>
  );
};

export default CollapseComponent;
