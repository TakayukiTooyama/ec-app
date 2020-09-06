import React, { useCallback } from 'react';
import { IconButton } from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import styled from 'styled-components';

import PreviewImage from './ImagePreview';
import { storage } from '../../firebase';

type Props = {
  images: {
    id: string;
    path: firebase.storage.UploadTaskSnapshot;
  }[];
  setImages: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        path: firebase.storage.UploadTaskSnapshot;
      }[]
    >
  >;
};

function ImageArea({ images, setImages }: Props) {
  const uploadImage = useCallback(
    (e) => {
      const file = e.target.files;
      const blob = new Blob(file, { type: 'image/jpg' });

      const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const N = 16;

      //絶対に被らない名前を作りたい！！
      //crypto.getRandomValues = 乱数生成器
      //new Uint32Array(桁数) = 桁数設定
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('');
      //n = 10桁,   S.length = いっぱい
      //oqxWVW0rRp8keybUこんな感じのを作る

      const uploadRef = storage.ref('images').child(fileName);
      const uploadTask = uploadRef.put(blob);

      uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImage = { id: fileName, path: downloadURL };
          setImages((prev) => [...prev, newImage]);
        });
      });
    },
    [setImages]
  );

  const deleteImage = useCallback(
    (id: string) => {
      const message = window.confirm('画像を削除しますか？');
      if (!message) {
        return false;
      } else {
        const newImage = images.filter((image) => image.id !== id);
        setImages(newImage);
        return storage.ref('images').child(id).delete();
      }
    },
    [images, setImages]
  );

  return (
    <Wrapper>
      {images.length > 0 &&
        images.map((image) => (
          <PreviewImage key={image.id} id={image.id} path={image.path} deleteImage={deleteImage} />
        ))}
      <ImageUpArea>
        <span>商品画像を登録する</span>
        <StyledIconButton>
          <label>
            <AddPhotoAlternateIcon />
            <StyledInput id="image" type="file" onChange={(e) => uploadImage(e)} />
          </label>
        </StyledIconButton>
      </ImageUpArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: wrap;
`;

const ImageUpArea = styled.div`
  text-align: right;
`;

const StyledIconButton = styled(IconButton)`
  width: 48px;
  height: 48px;
`;

const StyledInput = styled.input`
  display: none;
`;

export default ImageArea;
