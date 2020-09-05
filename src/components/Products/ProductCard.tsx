import React from 'react';
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
// import NoImage from '../../assets/img/no_image.png';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

type Props = {
  id: string;
  name: string;
  price: number;
  images: Image[];
};

function ProductCard({ id, images, name, price }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={String(images[0].path)} title="" />
      <CardContent>
        <div>
          <Typography component="p">{name}</Typography>
          <Typography color="textSecondary" component="p">
            ￥{price.toLocaleString()}
          </Typography>
        </div>
        <IconButton onClick={handleClick}>
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
