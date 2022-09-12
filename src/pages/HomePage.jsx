import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import headerData from '../components/Table/headerData';
import TableComponent from '../components/Table';
import PaginationComponent from '../components/PaginationComponent';
import { filterData, getTableLength, paginate } from '../utils';
import { getTickets } from '../api/tickets';
import SelectComponent from '../components/SelectComponent';
import { FILTER_STATUS, MENU_DATA } from '../constants';
import InputSearchComponent from '../components/InputSearchComponent';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  padding: 20px;
`;

const MenuContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100px;
  /* aspect-ratio: 1; */
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.dark};

  p {
    width: 100px;
    display: block;
    color: ${(props) => props.theme.color.light};
    text-align: center;
    font-size: 14px;
    /* font-weight: 600; */
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Heading4 = styled.h3`
  font-size: 20px;
  font-weight: 600;
`;

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const filteredData = filterData(data, selectedValue, searchInput);
  const tableData = paginate(filteredData, pageSize, page);
  const tableLength = getTableLength(filteredData, selectedValue, '');

  useEffect(() => {
    getTickets(setIsFetching, setData, user);
  }, []);

  return (
    <Container>
      <Heading4>Hello {user.data.userEmail}</Heading4>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <>
          <MenuContainer>
            {MENU_DATA.map((menu) => {
              return (
                <MenuItem key={menu.value}>
                  <p>{menu.label}</p>
                </MenuItem>
              );
            })}
          </MenuContainer>
          {/* <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                backgroundColor: 'red',
                borderRadius: '4px',
                width: '100px',
                aspectRatio: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span>Users</span>
            </div>
            <div
              style={{
                backgroundColor: 'red',
                borderRadius: '4px',
                width: '100px',
                aspectRatio: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span>Users</span>
            </div>
            <div
              style={{
                backgroundColor: 'red',
                borderRadius: '4px',
                width: '100px',
                aspectRatio: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span>Users</span>
            </div>
            <div
              style={{
                backgroundColor: 'red',
                borderRadius: '4px',
                width: '100px',
                aspectRatio: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span>Users</span>
            </div>
            <div
              style={{
                backgroundColor: 'red',
                borderRadius: '4px',
                width: '100px',
                aspectRatio: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span>Users</span>
            </div>
            <div
              style={{
                backgroundColor: 'red',
                borderRadius: '4px',
                width: '100px',
                aspectRatio: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span>Users</span>
            </div>
            <div
              style={{
                backgroundColor: 'red',
                borderRadius: '4px',
                width: '100px',
                aspectRatio: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span>Users</span>
            </div>
            <div
              style={{
                backgroundColor: 'red',
                borderRadius: '4px',
                width: '100px',
                aspectRatio: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span>Users</span>
            </div>
            <div
              style={{
                backgroundColor: 'red',
                borderRadius: '4px',
                width: '100px',
                aspectRatio: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span>Users</span>
            </div>
          </div> */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
            }}
          >
            <SelectComponent
              setSelectedValue={setSelectedValue}
              data={FILTER_STATUS}
            />
            <InputSearchComponent
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </div>
          <TableContainer>
            <TableComponent tableData={tableData} headerData={headerData} />
          </TableContainer>
          <PaginationComponent
            page={page}
            total={tableLength}
            setPage={setPage}
          />
        </>
      )}
    </Container>
  );
};

export default HomePage;
