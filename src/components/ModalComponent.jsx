import React, { useState } from 'react';
import { Modal } from 'antd';

const ModalComponent = ({
  isModalOpen,
  title,
  negativeHandler,
  positiveHandler,
  payload,
  isFetching,
  disabled,
  children,
}) => {
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={positiveHandler}
      onCancel={negativeHandler}
      confirmLoading={isFetching}
      centered
      okButtonProps={{
        disabled: disabled,
        danger: true,
      }}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
