import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { TextInput, Button } from '../atoms';

function ResetForm() {
  const [resetEmail, setResetEmail] = useState('');

  const inputEmail = useCallback(
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
        onChange={inputEmail}
      />
      <Button label="パスワードをリセットする" variant="contained" color="primary" size="large" />
      <div>ログイン画面に戻る</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  max-width: 400px;
  margin: 5rem auto 0;
  text-align: center;
`;

export default ResetForm;
