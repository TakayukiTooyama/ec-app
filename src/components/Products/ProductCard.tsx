import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Image } from '../../reducks/products/types';
import { deleteProduct } from '../../reducks/products/operations';
import NoImage from '../../assets/img/no_image.png';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      margin: 8,
      width: 'calc(50% - 16px)',
    },
    [theme.breakpoints.up('md')]: {
      margin: 16,
      width: 'calc(33.3333% - 32px)',
    },
  },
  content: {
    display: 'flex',
    padding: '16 8',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
  text: {
    width: '100%',
  },
  price: {
    color: theme.palette.secondary.dark,
    fontSize: 16,
  },
  icon: {
    width: 48,
    height: 48,
  },
}));

type Props = {
  id: string;
  name: string;
  price: number;
  images: Image[];
};

function ProductCard({ id, images, name, price }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={images.length > 0 ? images[0].path : NoImage}
        title=""
        onClick={() => dispatch(push(`/product/${id}`))}
      />
      <CardContent className={classes.content}>
        <div className={classes.text}>
          <Typography component="p">{name}</Typography>
          <Typography className={classes.price} color="textSecondary" component="p">
            ￥{price.toLocaleString()}
          </Typography>
        </div>
        <IconButton className={classes.icon} onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              dispatch(push(`/product/edit/${id}`));
              handleClose();
            }}
          >
            編集
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteProduct(id));
              handleClose();
            }}
          >
            削除
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
