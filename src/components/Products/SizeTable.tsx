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

import { Size } from '../../reducks/products/types';

const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    width: 48,
    height: 48,
  },
});

type Props = {
  sizes: Size[];
};

function SizeTable({ sizes }: Props) {
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
                    <IconButton>
                      <ShoppingCartIcon />
                    </IconButton>
                  ) : (
                    <div>売切</div>
                  )}
                </TableCell>
                <TableCell className={classes.iconCell}>
                  <IconButton>
                    <FavoriteBorderIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SizeTable;
