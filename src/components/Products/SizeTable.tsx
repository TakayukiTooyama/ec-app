import React from 'react';
import {
  TableContainer,
  Table,
  TableCell,
  TableBody,
  IconButton,
  makeStyles,
  TableRow,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { Size } from '../../reducks/products/types';

const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    width: 48,
    height: 48,
  },
});

type Props = {
  favoriteId?: string;
  sizes: Size[];
  fbChecked: boolean;
  addProduct: (selectSize: string, sizeId: string) => false | undefined;
  addFavorite: (selectSize: string, sizeId: string, fbChecked: boolean) => false | undefined;
  removeFavorite: (sizeId: string) => void;
};

function SizeTable({ sizes, fbChecked, addProduct, addFavorite, removeFavorite }: Props) {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0 &&
            sizes.map((size: Size) => (
              <TableRow key={size.size}>
                <TableCell component="th" scope="row">
                  {size.size}
                </TableCell>
                <TableCell>残り{size.quantity}点</TableCell>
                <TableCell className={classes.iconCell}>
                  {Number(size.quantity) > 0 ? (
                    <IconButton
                      onClick={() => {
                        addProduct(size.size, size.sizeId);
                      }}
                    >
                      <ShoppingCartIcon />
                    </IconButton>
                  ) : (
                    <div>売切</div>
                  )}
                </TableCell>
                <TableCell className={classes.iconCell}>
                  {size.fbChecked ? (
                    <IconButton onClick={() => removeFavorite(size.sizeId)}>
                      <FavoriteIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => addFavorite(size.size, size.sizeId, fbChecked)}>
                      <FavoriteBorderIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SizeTable;
