import React, { useCallback } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Button } from '../UIkit';

const PaymentEdit = () => {
  const dispatch = useDispatch();

  const goToMypage = useCallback(() => {
    dispatch(push('/user/mypage'));
  }, [dispatch]);

  return (
    <div className="c-section-container">
      <div className="u-text__headline u-text-center">クレジットカード情報の登録・編集</div>
      <div className="module-spacer--medium"></div>

      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div className="module-spacer--medium"></div>
      <div className="center">
        <Button label="マイページに戻る" onClick={goToMypage} />
      </div>
    </div>
  );
};

export default PaymentEdit;
