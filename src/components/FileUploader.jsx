import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { UploadOutlined } from '@ant-design/icons';

const FileUploader = () => {
  const hiddenFileInput = useRef(null);

  const inputFileHandler = () => {
    hiddenFileInput.current.click();
  };

  return (
    <Container>
      <UploadIcon />
      <UploadText>Upload avatar</UploadText>
      <input
        ref={hiddenFileInput}
        //   onChange={handleChange}
        onClick={(e) => {
          hiddenFileInput.current.value = null;
        }}
        type='file'
        name='studentPhoto'
        id='studentPhoto'
        className='hidden'
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;
  width: 100%;
  background-color: ${(props) => props.theme.color.gray};
  border: 2px solid ${(props) => props.theme.color.accent};
  border-style: dashed;
`;

const UploadIcon = styled(UploadOutlined)`
  font-size: 32px;
  color: ${(props) => props.theme.color.dark};
`;

const UploadText = styled.span`
  color: ${(props) => props.theme.color.dark};
`;

export default FileUploader;
