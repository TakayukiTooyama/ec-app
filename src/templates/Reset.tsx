import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

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
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">パスワードリセット</h2>
      <div className="module-spacer--medium"></div>
      <TextInput
        label="メールアドレス"
        fullWidth={true}
        multiline={false}
        required={true}
        type="email"
        value={resetEmail}
        onChange={inputResetEmail}
      />
      <div className="module-spacer--medium"></div>
      <div className="center">
        <Button
          label="パスワードをリセットする"
          onClick={() => dispatch(resetPassword(resetEmail))}
        />
        <div className="module-spacer--extra-extra-small"></div>
        <p onClick={() => dispatch(push('/signin'))}>ログイン画面に戻る</p>
      </div>
    </div>
  );
}

export default Reset;
