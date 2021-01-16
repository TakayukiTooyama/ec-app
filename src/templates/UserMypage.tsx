import React, { useCallback } from 'react';
import { TextDetail, Button } from '../components/UIkit';
import { useSelector, useDispatch } from 'react-redux';
import { getUsername } from '../reducks/users/selectors';
import { push } from 'connected-react-router';
import { RootState } from '../reducks/store/store';

const UserMypage = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const username = getUsername(selector);

  const transition = useCallback(
    (path) => {
      dispatch(push(path));
    },
    [dispatch]
  );

  return (
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">マイページ</h2>
      <div className="module-spacer--medium"></div>
      <TextDetail label="ユーザー名" value={username} />
      <div className="module-spacer--medium"></div>
      <div className="center">
        <Button label="カード情報の編集" onClick={() => transition('/user/payment/edit')} />
        <div className="module-spacer--extra-extra-small"></div>
        <Button label="注文履歴の確認" onClick={() => transition('/order/history')} />
      </div>
    </section>
  );
};

export default UserMypage;
