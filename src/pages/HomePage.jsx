import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import headerData from '../components/Table/headerData';
import TableComponent from '../components/Table';
import PaginationComponent from '../components/PaginationComponent';
import SelectComponent from '../components/SelectComponent';
import InputSearchComponent from '../components/InputSearchComponent';
import { Container, Heading4 } from '../components/Styled';

import { filterData, getTableLength, paginate } from '../utils';
import { getTickets } from '../api/tickets';
import { FILTER_STATUS, MENU_DATA } from '../constants';

const MenuContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
`;

const MenuItem = styled(Link)`
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
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const filteredData = filterData(data, selectedValue, searchInput);
  const tableData = paginate(filteredData, pageSize, page);
  const tableLength = getTableLength(filteredData, selectedValue, '');

  const fetchTickets = async () => {
    setIsFetching(true);
    const response = await getTickets(user);

    setIsFetching(false);
    if (response.status === 200) {
      setData(response.data.datas);
    } else {
      setError(response);
    }
  };

  useEffect(() => {
    fetchTickets();
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
                <MenuItem to={menu.value} key={menu.value}>
                  <p>{menu.label}</p>
                </MenuItem>
              );
            })}
          </MenuContainer>
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
