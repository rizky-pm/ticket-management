import React from 'react';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment/moment';
import 'moment/locale/id';

const CommentCardContainer = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  grid-template-rows: 25px 20px 1fr;
  gap: 5px 10px;
  grid-auto-flow: row;
  grid-template-areas:
    'avatar name'
    'avatar date'
    'comment comment';

  background-color: ${(props) => props.theme.color.gray};
  padding: 20px;
  border-radius: 5px;
`;

const Avatar = styled.div`
  background-color: ${(props) => props.theme.color.darkGray};
  border-radius: 50%;
  aspect-ratio: 1;
  grid-area: avatar;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Name = styled.span`
  grid-area: name;
  display: flex;
  align-items: center;
`;

const Date = styled.span`
  grid-area: date;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const Comment = styled.p`
  margin-top: 10px;
  grid-area: comment;
  line-height: 1.3;
  letter-spacing: 0.5px;
`;

const CommentCard = ({ data }) => {
  return (
    <CommentCardContainer>
      <Avatar>
        <UserOutlined
          style={{
            fontSize: '30px',
          }}
        />
      </Avatar>
      <Name>{data.creatorName}</Name>
      <Date>
        {moment(data?.createdAt).format('dddd, Do MMMM YYYY - HH:mm')}
      </Date>
      <Comment>{data?.commentText}</Comment>
    </CommentCardContainer>
  );
};

export default CommentCard;
