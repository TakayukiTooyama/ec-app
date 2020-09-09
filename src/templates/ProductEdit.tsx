import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { db } from '../firebase';
import { TextInput, Button, SelectBox } from '../components/UIkit';
import { saveProduct } from '../reducks/products/operations';
import { ImageArea, SizeArea } from '../components/Products';
import { Size, Image, Product } from '../reducks/products/types';

function ProductEdit() {
  const dispatch = useDispatch();

  let id = window.location.pathname.split('/product/edit')[1];

  if (id !== '') {
    id = id.split('/')[1];
  }

  const [name, setName] = useState(''),
    [description, setDescription] = useState(''),
    [category, setCategory] = useState(''),
    [gender, setGender] = useState(''),
    [price, setPrice] = useState(0),
    [images, setImages] = useState<Image[]>([]),
    [sizes, setSizes] = useState<Size[]>([]);

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
          const data = snapshot.data() as Product;
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
    <section className="c-section-container">
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <ImageArea images={images} setImages={setImages} />
      <TextInput
        label="商品名"
        fullWidth={true}
        multiline={false}
        required={true}
        type="text"
        value={name}
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
        onChange={inputDescription}
      />
      <SelectBox
        label="カテゴリー"
        options={categories}
        required={true}
        value={category}
        select={setCategory}
      />
      <SelectBox label="性別" options={genders} required={true} value={gender} select={setGender} />

      <TextInput
        label="価格"
        fullWidth={true}
        multiline={false}
        required={true}
        type="number"
        value={price}
        onChange={inputPrice}
      />
      <div className="module-spacer--small"></div>
      <SizeArea sizes={sizes} setSizes={setSizes} />
      <div className="module-spacer--small"></div>
      <div className="center">
        <Button
          label="登録する"
          onClick={() =>
            dispatch(saveProduct(id, name, description, category, gender, price, images, sizes))
          }
        />
      </div>
    </section>
  );
}

export default ProductEdit;
