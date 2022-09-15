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
import ProductCard from '../components/ProductCard';
import SelectComponent from '../components/SelectComponent';
import OverlayComponent from '../components/OverlayComponent';
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
} from '../api';
import { IS_ACTIVE_DATA } from '../constants';

const ProductPage = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [error, setError] = useState('');
  const [inputState, setInputState] = useState({});
  const [isAddNewProductOverlayOpen, setIsAddNewProductOverlayOpen] =
    useState(false);
  const [isEditProductOverlayOpen, setIsEditProductOverlayOpen] =
    useState(false);
  const [isDeleteProductOverlayOpen, setIsDeleteProductOverlayOpen] =
    useState(false);

  const userSession = JSON.parse(localStorage.getItem('user'));

  const fetchAllProducts = async () => {
    setIsFetching(true);
    const response = await getAllProducts(userSession);
    setIsFetching(false);

    if (response.status === 200) {
      setData(response.data.datas);
    } else {
      setError(response.data.message);
    }
  };

  const productNameInputHandler = (e) => {
    setInputState((prevState) => {
      return {
        ...prevState,
        productName: e.target.value,
      };
    });
  };

  const productCodeInputHandler = (e) => {
    setInputState((prevState) => {
      return {
        ...prevState,
        productCode: e.target.value,
      };
    });
  };

  const productActiveSelectHandler = (value) => {
    console.log(value);
    setInputState((prevState) => {
      return {
        ...prevState,
        isActive: value,
      };
    });
  };

  const addNewProductHandler = async () => {
    const payload = {
      ...inputState,
      isActive: inputState.isActive ?? true,
    };

    const response = await addNewProduct(payload, userSession);
    setIsFetching(false);

    if (response.status === 201) {
      setIsAddNewProductOverlayOpen(false);
      setInputState({});
      fetchAllProducts();
    } else {
      setError(response.data.message);
    }
  };

  const editProductHandler = async () => {
    const payload = {
      id: selectedData.id,
      productName: inputState.productName ?? selectedData.productName,
      isActive: inputState.isActive ?? selectedData.isActive,
      version: selectedData.version,
    };

    const response = await editProduct(payload, userSession);

    if (response.status === 200) {
      setIsEditProductOverlayOpen(false);
      setInputState({});
      fetchAllProducts();
    }
  };

  const deleteProductHandler = async () => {
    const res = await deleteProduct(selectedData.id, userSession);

    if (res.status === 200) {
      setIsDeleteProductOverlayOpen(false);
      setInputState({});
      fetchAllProducts();
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <ContainerWithOverlay>
      {isFetching ? (
        <Heading4>Loading...</Heading4>
      ) : (
        <>
          <Header2>
            <Heading4>Product List</Heading4>
            <PlusIconWrapper
              onClick={() => {
                setIsAddNewProductOverlayOpen((prevState) => !prevState);
              }}
            />
          </Header2>
          <CardWrapper>
            {data.map((item) => {
              return (
                <ProductCard
                  setSelectedData={setSelectedData}
                  setIsEditProductOverlayOpen={setIsEditProductOverlayOpen}
                  setIsDeleteProductOverlayOpen={setIsDeleteProductOverlayOpen}
                  key={item.id}
                  data={item}
                />
              );
            })}
          </CardWrapper>

          {/* Start of add new product overlay */}
          <OverlayComponent isOpen={isAddNewProductOverlayOpen}>
            <CloseIcon
              onClick={() => {
                setIsAddNewProductOverlayOpen((prevState) => !prevState);
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
              Add New Product
            </p>
            <CustomInputField
              onChange={(e) => {
                productNameInputHandler(e);
              }}
              placeholder='Product Name'
              max={255}
              value={inputState.productName || ''}
            />
            <CustomInputField
              onChange={(e) => {
                productCodeInputHandler(e);
              }}
              placeholder='Product Code'
              value={inputState.productCode || ''}
              max={4}
            />

            <SelectComponent
              size='large'
              data={IS_ACTIVE_DATA}
              setSelectedValue={(value) => {
                productActiveSelectHandler(value);
              }}
              selectedValue={inputState.isActive ?? true}
            />
            <PrimaryButton
              onClick={addNewProductHandler}
              size='md'
              disabled={!inputState.productName || !inputState.productCode}
            >
              Add
            </PrimaryButton>
          </OverlayComponent>
          {/* End of add new product overlay */}

          {/* Start of edit product overlay */}
          <OverlayComponent isOpen={isEditProductOverlayOpen}>
            <CloseIcon
              onClick={() => {
                setIsEditProductOverlayOpen((prevState) => !prevState);
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
              Edit Product
            </p>
            <CustomInputField
              onChange={(e) => {
                productNameInputHandler(e);
              }}
              placeholder={selectedData?.productName}
              max={255}
              //   value={inputState?.productName}
            />

            <SelectComponent
              size='large'
              data={IS_ACTIVE_DATA}
              setSelectedValue={(value) => {
                productActiveSelectHandler(value);
              }}
              selectedValue={inputState?.isActive || selectedData?.isActive}
            />
            <PrimaryButton
              onClick={editProductHandler}
              size='md'
              disabled={!inputState.productName}
            >
              Edit
            </PrimaryButton>
          </OverlayComponent>
          {/* End of edit product overlay */}

          {/* Start of delete product overlay */}
          <OverlayComponent isOpen={isDeleteProductOverlayOpen}>
            <CloseIcon
              onClick={() => {
                setIsDeleteProductOverlayOpen((prevState) => !prevState);
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
                {selectedData?.productName}
              </HighlightedText>{' '}
              ?
            </p>
            <PrimaryButton onClick={deleteProductHandler} size='md'>
              Yes, Delete
            </PrimaryButton>
          </OverlayComponent>
          {/* End of delete product overlay */}
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

export default ProductPage;
