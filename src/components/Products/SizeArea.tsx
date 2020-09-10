import React, { useState, useCallback } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { TextInput } from '../UIkit';
import { Size } from '../../reducks/products/types';

const useStyles = makeStyles({
  checkIcon: {
    float: 'right',
  },
  iconCell: {
    padding: 0,
    height: 48,
    width: 48,
  },
});

type Props = {
  sizes: Size[];
  setSizes: React.Dispatch<React.SetStateAction<Size[]>>;
};

function SizeArea({ sizes, setSizes }: Props) {
  const classes = useStyles();
  const [index, setIndex] = useState(0),
    [size, setSize] = useState(''),
    [quantity, setQuantity] = useState(0);

  const inputSize = useCallback(
    (e) => {
      setSize(e.target.value);
    },
    [setSize]
  );
  const inputQuantity = useCallback(
    (e) => {
      setQuantity(e.target.value);
    },
    [setQuantity]
  );

  const addSize = (addIndex: number, size: string, quantity: number) => {
    if (size === '') {
      return false;
    } else {
      //ここがいまいち理解できていない
      if (addIndex === size.length) {
        const newSizes = { size: size, quantity: quantity };
        setSizes((prev) => [...prev, newSizes]);
        setIndex(addIndex + 1);
        setSize('');
        setQuantity(0);
      } else {
        const newSizes = sizes;
        newSizes[addIndex] = { size: size, quantity: quantity };
        setSizes(newSizes);
        setIndex(newSizes.length);
        setSize('');
        setQuantity(0);
      }
    }
  };

  const editSize = (editIndex: number, size: string, quantity: number) => {
    setIndex(editIndex);
    setSize(size);
    setQuantity(quantity);
  };

  const deleteSize = (delteIndex: number) => {
    const newSizes = sizes.filter((item, idx) => idx !== delteIndex);
    setSizes(newSizes);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell className={classes.iconCell}></TableCell>
              <TableCell className={classes.iconCell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sizes.length > 0 &&
              sizes.map((item, idx) => (
                <TableRow key={idx.toString()}>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => editSize(idx, item.size, item.quantity)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteSize(idx)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="p-grid__row">
          <TextInput
            label="サイズ"
            fullWidth={true}
            multiline={false}
            required={true}
            rows={1}
            type="text"
            value={size}
            onChange={inputSize}
          />
          <TextInput
            label="数量"
            fullWidth={true}
            multiline={false}
            required={true}
            rows={1}
            type="number"
            value={quantity}
            onChange={inputQuantity}
          />
        </div>
        <IconButton className={classes.checkIcon} onClick={() => addSize(index, size, quantity)}>
          <CheckCircleIcon />
        </IconButton>
      </TableContainer>
    </div>
  );
}

export default SizeArea;
