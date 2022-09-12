import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../api/user';
import CollapseComponent from '../components/CollapseComponent';

import { Container, Heading4 } from '../components/Styled';
import UserCard from '../components/UserCard';

const UserPage = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [users, setUsers] = useState([]);
  const userSession = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    getAllUsers(setIsFetching, setUsers, userSession);
  }, []);

  return (
    <Container>
      {isFetching ? (
        <h1>Loading data ...</h1>
      ) : (
        <>
          <Heading4>User Page</Heading4>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {users.map((user) => {
              //   return <UserCard key={user.userEmail} data={user} />;

              return <CollapseComponent data={user} key={user.userEmail} />;
            })}
          </div>
        </>
      )}
    </Container>
  );
};

export default UserPage;
