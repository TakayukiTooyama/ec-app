import React from 'react';
import { signOut } from '../../reducks/users/operations';
import { useDispatch } from 'react-redux';
import { Button } from '../atoms';
import styled from 'styled-components';

const Home = () => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <Button
        label="sign out"
        variant="contained"
        color="primary"
        onClick={() => dispatch(signOut())}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 5rem;
`;

export default Home;
