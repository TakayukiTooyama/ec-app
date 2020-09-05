import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import styled from 'styled-components';

import { TextInput, Button } from '../components/UIkit';
import { resetPassword } from '../reducks/users/operations';

function Reset() {
  const dispatch = useDispatch();
  const [resetEmail, setResetEmail] = useState('');

  const inputResetEmail = useCallback(
    (e) => {
      setResetEmail(e.target.value);
    },
    [setResetEmail]
  );

  return (
    <Wrapper>
      <h2>パスワードリセット</h2>
      <TextInput
        label="メールアドレス"
        fullWidth={true}
        multiline={false}
        required={true}
        type="email"
        value={resetEmail}
        onChange={inputResetEmail}
      />
      <Button
        label="パスワードをリセットする"
        variant="contained"
        color="primary"
        size="large"
        onClick={() => dispatch(resetPassword(resetEmail))}
      />
      <div onClick={() => dispatch(push('/signin'))}>ログイン画面に戻る</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  max-width: 400px;
  margin: 5rem auto 0;
  text-align: center;
`;

export default Reset;
