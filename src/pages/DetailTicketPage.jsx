import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { FileOutlined } from '@ant-design/icons';
import 'moment/locale/id';

import { downloadFile } from '../utils';
import { getTicket } from '../api/tickets';
import { getComments, postComment } from '../api/comment';
import { getAttachment } from '../api/attachment';
import CommentCard from '../components/CommentCard';
import { DangerButton, GhostDangerButton } from '../components/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  padding: 20px;
`;

const Type = styled.span`
  font-size: 18px;
  font-weight: semibold;
`;

const Heading4 = styled.h3`
  font-size: 20px;
  font-weight: 600;
`;

const AttachmentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  background-color: ${(props) => props.theme.color.gray};
  aspect-ratio: 16 / 9;
  border-radius: 3px;

  span {
    display: block;
    width: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const Paragraph = styled.p`
  line-height: 1.5;
`;

const TextareaContainer = styled.div`
  display: ${(props) => (props.role === 'ESA' ? 'none' : 'flex')};
  flex-direction: column;
  gap: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  padding: 10px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  line-height: 1.3;

  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.color.dark};
  }
`;

const AdminButtonsContainer = styled.div`
  display: ${(props) => (props.role === 'PIC' ? 'flex' : 'none')};
  flex-direction: column;
  gap: 10px;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.color.gray};
`;

const SubmitButton = styled.button`
  padding: 10px 10px;
  background-color: ${(props) => props.theme.color.dark};
  color: ${(props) => props.theme.color.light};
  border-radius: 4px;
  outline: none;
  border: none;
`;

const DetailTicketPage = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState({});
  const [attachment, setAttachment] = useState(null);
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const id = useParams().id;

  const postCommentHandler = async () => {
    const payload = {
      headerId: data?.id,
      commentText: comment,
      fileName: null,
      fileExt: null,
    };

    postComment(user, setComment, setComments, getComments, id, payload);
  };

  const putTicketStatusHandler = async () => {
    const payload = {
      id: data?.statusId === 3 || data?.statusId === 1 ? 2 : 3,
      updatedBy: data.picId,
    };

    console.log(payload);
  };

  const commentHandler = (e) => {
    setComment(e.target.value);
  };

  console.log(data);

  useEffect(() => {
    getTicket(setIsFetching, setData, id, user);
    getComments(setComments, id, user);
  }, []);

  useEffect(() => {
    if (data?.fileId) {
      getAttachment(data.fileId, user, setAttachment);
    }
  }, [data]);

  return (
    <Container>
      {isFetching ? (
        <span>Loading ...</span>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Type>
              {data?.productName} / {data?.priorityName} / {data?.statusName}
            </Type>
            <p>Assigned to {data?.picName}</p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Heading4>{data?.title}</Heading4>
            <p>{data?.customerName}</p>
            <p>
              {moment(data?.createdAt).format('dddd, Do MMMM YYYY - HH:mm')}
            </p>
          </div>

          <Paragraph>
            {data?.description} Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Repudiandae, repellat! Deserunt, aliquam numquam.
            Facere voluptas quia provident odio quaerat et aspernatur nesciunt,
            quibusdam dolore voluptates expedita iste voluptatem deserunt iusto.
          </Paragraph>

          <h5>Attachment</h5>
          {attachment ? (
            <AttachmentContainer
              onClick={() => {
                downloadFile(data);
              }}
            >
              <FileOutlined
                style={{
                  fontSize: '40px',
                }}
              />

              <span
                style={{
                  textAlign: 'center',
                }}
              >
                {data?.title}-attachment.{data?.fileExt} Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Hic excepturi voluptatum,
                assumenda commodi rerum nobis rem quas placeat labore beatae
                tempora facere, non eveniet quae? Non officia nostrum quis
                repudiandae.
              </span>
            </AttachmentContainer>
          ) : (
            <span>There is no atatchment</span>
          )}

          <h5>Comment(s)</h5>
          <TextareaContainer role={user.data.roleCode}>
            <label
              style={{
                display: 'none',
              }}
              htmlFor='comment'
            >
              Leave your comment
            </label>
            <Textarea
              placeholder='Leave your comment here'
              name='comment'
              id='comment'
              rows='5'
              value={comment}
              onChange={(e) => {
                commentHandler(e);
              }}
            ></Textarea>
            <SubmitButton onClick={postCommentHandler}>Comment</SubmitButton>
          </TextareaContainer>
          {comments ? (
            comments.map((comment, index) => (
              <CommentCard key={index} data={comment} />
            ))
          ) : (
            <span>there is no comment</span>
          )}
          <AdminButtonsContainer role={user.data.roleCode}>
            <Divider />
            <DangerButton onClick={putTicketStatusHandler}>
              Close Ticket
            </DangerButton>
          </AdminButtonsContainer>
        </>
      )}
    </Container>
  );
};

export default DetailTicketPage;
