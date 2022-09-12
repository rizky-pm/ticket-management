import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  overflow-x: auto;
  table-layout: fixed;
  width: 1500px;
  border-radius: 10px;
  border: 1px solid #090909;
  text-align: left;

  thead {
    th {
      padding: 12.5px;
      background-color: ${(props) => props.theme.color.dark};
      color: ${(props) => props.theme.color.light};
      font-weight: 400;

      :nth-of-type(1) {
        text-align: center;
        width: 7.5%;
      }

      :nth-of-type(2) {
        width: 40%;
      }

      :nth-of-type(3) {
        width: 30%;
      }

      :nth-of-type(4) {
        width: 30%;
      }

      :nth-of-type(5) {
        width: 25%;
      }

      :nth-of-type(6) {
        width: 15%;
      }

      :nth-of-type(7) {
        width: 10%;
      }
    }
  }

  tbody {
    tr {
      :nth-child(even) {
        background-color: whitesmoke;
      }

      td {
        padding: 12.5px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        :nth-of-type(1) {
          text-align: center;
          width: 5%;
        }
      }
    }
  }
`;

const TableComponent = (props) => {
  const { tableData, headerData } = props;
  const navigate = useNavigate();

  const renderTableHeader = () => {
    return headerData.map((data, index) => {
      return <th key={index}>{data}</th>;
    });
  };

  const renderTableData = () => {
    return tableData.map((data, index) => {
      const {
        id,
        title,
        picName,
        customerName,
        productName,
        statusName,
        priorityName,
      } = data;

      return (
        <tr
          key={index}
          onClick={(e) => {
            console.log(id);
            navigate(`/ticket/${id}`);
          }}
        >
          <td>{id}</td>
          <td>{title}</td>
          <td>{picName}</td>
          <td>{customerName}</td>
          <td>{productName}</td>
          <td>{statusName}</td>
          <td>{priorityName}</td>
        </tr>
      );
    });
  };

  return (
    <Table>
      <thead>
        <tr>{renderTableHeader()}</tr>
      </thead>
      <tbody>{renderTableData()}</tbody>
    </Table>
  );
};

export default TableComponent;
