import React from 'react';
import styled from 'styled-components';

type Props = {
  id: string;
  path: firebase.storage.UploadTaskSnapshot;
  deleteImage: (id: string) => void;
};

const PreviewImage = ({ id, path, deleteImage }: Props) => {
  return (
    <div>
      <StyledImage alt="プレビュー画像" src={String(path)} onClick={() => deleteImage(id)} />
    </div>
  );
};

const StyledImage = styled.img`
  width: 300px;
  height: 300px;
`;

export default PreviewImage;
