import React from 'react';
import 'antd/dist/antd.min.css';
import { Pagination } from 'antd';

const PaginationComponent = ({ page, total, setPage }) => {
  const onShowSizeChange = (current) => {
    setPage(current);
  };

  return (
    <Pagination
      showSizeChanger
      onChange={onShowSizeChange}
      defaultCurrent={1}
      current={page}
      total={total}
    />
  );
};

export default PaginationComponent;
