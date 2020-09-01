import React, { useState, useCallback } from 'react';
import { TextInput, Button } from '../atoms';
import styled from 'styled-components';

function LoginForm() {
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
      <Button label="ログイン" variant="contained" color="primary" size="large" />
      <div>パスワードを忘れた方はこちら</div>
      <div>アカウント登録がまだですか？</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  max-width: 400px;
  margin: 5rem auto 0;
  text-align: center;
`;

export default LoginForm;
