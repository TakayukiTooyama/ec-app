import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { TextInput, Button } from '../components/UIkit';
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
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">ログイン</h2>
      <div className="module-spacer--medium"></div>
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
        onChange={inputPassword}
      />
      <div className="module-spacer--medium"></div>
      <div className="center">
        <Button label="ログイン" onClick={() => dispatch(signIn(email, password))} />
        <div className="module-spacer--extra-extra-small"></div>
        <Button label="Googleログイン" onClick={(e: any) => dispatch(googleAuth())} />
        <div className="module-spacer--extra-extra-small"></div>
        <p onClick={() => dispatch(push('/signin/reset'))}>パスワードを忘れた方はこちら</p>
        <p onClick={() => dispatch(push('/signup'))}>アカウント登録がまだですか？</p>
      </div>
    </div>
  );
}

export default SignIn;
