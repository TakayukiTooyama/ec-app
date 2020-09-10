import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Button } from '../components/UIkit';

const OrderCompleted = () => {
  const dispatch = useDispatch();
  const goToHome = useCallback(() => {
    dispatch(push('/'));
  }, [dispatch]);
  return (
    <div className="c-section-container">
      <p>ご注文ありがとうございました！</p>
      <div className="module-spacer--medium"></div>
      <Button label="ショッピングを続ける" onClick={goToHome} />
    </div>
  );
};

export default OrderCompleted;
