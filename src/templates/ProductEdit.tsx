import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { db } from '../firebase';
import { TextInput, Button, SelectBox } from '../components/UIkit';
import { addProduct } from '../reducks/products/operations';
import { ImageArea, SizeArea } from '../components/Products';

const ProductEdit = () => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split('/product/edit')[1];

  if (id !== '') {
    id = id.split('/')[1];
  }

  const [name, setName] = useState(''),
    [description, setDescription] = useState(''),
    [category, setCategory] = useState(''),
    [gender, setGender] = useState(''),
    [price, setPrice] = useState(''),
    [images, setImages] = useState<{ id: string; path: firebase.storage.UploadTaskSnapshot }[]>([]),
    [sizes, setSizes] = useState<{ size: string; quantity: string }[]>([]);

  const inputName = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [setName]
  );
  const inputDescription = useCallback(
    (e) => {
      setDescription(e.target.value);
    },
    [setDescription]
  );
  const inputPrice = useCallback(
    (e) => {
      setPrice(e.target.value);
    },
    [setPrice]
  );

  const categories = [
    { id: 'tops', name: 'トップス' },
    { id: 'shirts', name: 'シャツ' },
    { id: 'pants', name: 'パンツ' },
    { id: 'socks', name: '靴下' },
  ];
  const genders = [
    { id: 'all', name: 'すべて' },
    { id: 'male', name: 'メンズ' },
    { id: 'female', name: 'レディース' },
  ];

  useEffect(() => {
    if (id !== '') {
      db.collection('products')
        .doc(id)
        .get()
        .then((snapshot) => {
          const data: any = snapshot.data();
          console.log(data);
          setCategory(data.category);
          setDescription(data.description);
          setGender(data.gender);
          setName(data.name);
          setPrice(data.price);
          setSizes(data.sizes);
          setImages(data.images);
        });
    }
  }, [id]);

  return (
    <Wrapper>
      <h2>商品の登録・編集</h2>
      <ImageArea images={images} setImages={setImages} />
      <TextInput
        label="商品名"
        fullWidth={true}
        multiline={false}
        required={true}
        type="text"
        value={name}
        margin="normal"
        onChange={inputName}
      />
      <TextInput
        label="商品説明"
        fullWidth={true}
        multiline={true}
        required={true}
        type="text"
        rows={3}
        value={description}
        margin="normal"
        onChange={inputDescription}
      />
      <SelectBox
        label="カテゴリー"
        options={categories}
        required={true}
        value={category}
        margin="normal"
        select={setCategory}
      />
      <SelectBox
        label="性別"
        options={genders}
        required={true}
        value={gender}
        margin="normal"
        select={setGender}
      />

      <TextInput
        label="価格"
        fullWidth={true}
        multiline={false}
        required={true}
        type="number"
        value={price}
        margin="normal"
        onChange={inputPrice}
      />
      <SizeArea sizes={sizes} setSizes={setSizes} />
      <Button
        label="登録する"
        variant="contained"
        color="primary"
        size="large"
        onClick={() =>
          dispatch(addProduct(id, name, description, category, gender, price, images, sizes))
        }
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90%;
  max-width: 400px;
  margin: 5rem auto 0;
  text-align: center;
`;

export default ProductEdit;
