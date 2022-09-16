import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { UploadOutlined, CloseOutlined } from '@ant-design/icons';
import { fileToBase64 } from '../utils';

const FileUploader = ({ payload, setPayload }) => {
  const [fileSelected, setFileSelected] = useState(null);
  const hiddenFileInput = useRef(null);

  const inputFileHandler = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleInputFileChange = (e) => {
    const fileSelected = e.target.files[0];
    const extension = fileSelected.name.split('.').pop();
    const type = fileSelected.type.replace(/\/.*$/gm, '');

    if (type !== 'image' && type !== 'application') {
      console.log('File type not supported');
    } else {
      if (fileSelected.size < 1000000) {
        setFileSelected(fileSelected);

        fileToBase64(fileSelected, (err, result) => {
          if (result) {
            setPayload((prevState) => {
              return {
                ...prevState,
                fileName: result,
                fileExt: extension,
              };
            });
          } else if (err) {
            console.log(err);
          }
        });
      } else {
        console.log('File size is too big');
      }
    }
  };

  const clearFileHandler = () => {
    setFileSelected(null);
    setPayload((prevState) => {
      return {
        ...prevState,
        fileName: null,
        fileExt: null,
      };
    });
  };

  return (
    <Container onClick={inputFileHandler}>
      {fileSelected ? (
        <>
          <ClearIcon onClick={clearFileHandler} />
          <p
            style={{
              color: 'black',
              textAlign: 'center',
            }}
          >
            {fileSelected.name}
          </p>
        </>
      ) : (
        <>
          <UploadIcon />
          <UploadText>Upload avatar</UploadText>
          <input
            ref={hiddenFileInput}
            onChange={handleInputFileChange}
            onClick={(e) => {
              hiddenFileInput.current.value = null;
            }}
            type='file'
            name='studentPhoto'
            id='studentPhoto'
            style={{
              display: 'none',
            }}
          />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;
  width: 100%;
  aspect-ratio: 3 / 1;
  background-color: ${(props) => props.theme.color.gray};
  border: 2px solid ${(props) => props.theme.color.accent};
  border-style: dashed;
`;

const ClearIcon = styled(CloseOutlined)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
  color: ${(props) => props.theme.color.dark};
`;

const UploadIcon = styled(UploadOutlined)`
  font-size: 32px;
  color: ${(props) => props.theme.color.dark};
`;

const UploadText = styled.span`
  color: ${(props) => props.theme.color.dark};
`;

export default FileUploader;
