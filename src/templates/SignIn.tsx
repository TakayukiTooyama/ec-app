import React, { useState, useCallback } from 'react';
import { TextInput, Button } from '../components/UIkit';
import styled from 'styled-components';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { signIn, googleAuth } from '../reducks/users/operations';

function SignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState('');

  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  return (
    <Wrapper>
      <h2>ログイン</h2>
      <TextInput
        label="メールアドレス"
        fullWidth={true}
        multiline={false}
        required={true}
        type="email"
        value={email}
        onChange={inputEmail}
      />
      <TextInput
        label="パスワード"
        fullWidth={true}
        multiline={false}
        required={true}
        type="password"
        value={password}
        margin="normal"
        onChange={inputPassword}
      />
      <Button
        label="ログイン"
        variant="contained"
        color="primary"
        size="large"
        onClick={() => dispatch(signIn(email, password))}
      />
      <Button
        label="Googleログイン"
        variant="contained"
        size="large"
        onClick={(e: any) => dispatch(googleAuth())}
      />
      <div onClick={() => dispatch(push('/signin/reset'))}>パスワードを忘れた方はこちら</div>
      <div onClick={() => dispatch(push('/signup'))}>アカウント登録がまだですか？</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  max-width: 400px;
  margin: 5rem auto 0;
  text-align: center;
`;

export default SignIn;
