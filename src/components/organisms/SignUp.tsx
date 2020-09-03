import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { TextInput, Button } from '../atoms';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { signUp } from '../../reducks/users/operations';

function SignUp() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [confirPassword, setConfirPassword] = useState('');

  const inputUsername = useCallback(
    (e) => {
      setUsername(e.target.value);
    },
    [setUsername]
  );
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
  const inputConfirPassword = useCallback(
    (e) => {
      setConfirPassword(e.target.value);
    },
    [setConfirPassword]
  );

  return (
    <Wrapper>
      <TextInput
        label="ユーザー名"
        fullWidth={true}
        multiline={false}
        required={true}
        type="text"
        value={username}
        onChange={inputUsername}
      />
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
        label="パスワード(半角英数字で6文字以上)"
        fullWidth={true}
        multiline={false}
        required={true}
        type="password"
        value={password}
        onChange={inputPassword}
      />
      <TextInput
        label="パスワードの再確認"
        fullWidth={true}
        multiline={false}
        required={true}
        type="password"
        value={confirPassword}
        onChange={inputConfirPassword}
      />
      <Button
        label="アカウントを登録する"
        variant="contained"
        color="primary"
        size="large"
        onClick={() => dispatch(signUp(username, email, password, confirPassword))}
      />
      <div onClick={() => dispatch(push('/signin'))}>アカウントをお持ちの方はこちら</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  max-width: 400px;
  margin: 5rem auto 0;
  text-align: center;
`;

export default SignUp;
