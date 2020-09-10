import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

import NoImage from '../../assets/img/no_image.png';
import { Image } from '../../reducks/products/types';
import { makeStyles } from '@material-ui/core';

type Props = {
  images: Image[];
};

const useStyles = makeStyles({
  image: {
    height: '600px',
  },
});

function ImageSwiper({ images }: Props) {
  const classes = useStyles();
  const [params] = useState({
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
  });
  return (
    <Swiper {...params}>
      {images.length === 0 ? (
        <div className="p-media__thumb">
          <img className={classes.image} src={NoImage} alt="NoImage" />
        </div>
      ) : (
        images.map((image) => (
          <div key={image.id} className="p-media__thumb">
            <img src={image.path} alt="商品画像" />
          </div>
        ))
      )}
    </Swiper>
  );
}

export default ImageSwiper;
