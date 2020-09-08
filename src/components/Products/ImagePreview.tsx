import React from 'react';

type Props = {
  id: string;
  path: string;
  deleteImage: (id: string) => void;
};

const ImagePreview = ({ id, path, deleteImage }: Props) => {
  return (
    <div className="p-media__thumb">
      <img alt="プレビュー画像" src={path} onClick={() => deleteImage(id)} />
    </div>
  );
};

export default ImagePreview;
