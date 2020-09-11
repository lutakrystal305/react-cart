import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames';

import cancel1 from '../img/close (1).svg';
import cancel from '../img/close.svg';

import { PurchaseContext } from '../context/Purchase.Context';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListDividers() {
  const [hover, setHover] = useState(false);
  const { items, handleChangePro } = useContext(PurchaseContext);
  const classes = useStyles();
 
  const handleMouseOver = () => {
    setHover(true);
  }
  const handleMouseOut = () => {
    setHover(false);
  }
  let cancelX = cancel;
  if (hover) {
    cancelX = cancel1;
  }
  return (
    <List component="nav" className={classes.root} className='Dividerz' aria-label="mailbox folders">
      { items.map( x => (
        <ListItem button className={classNames('listItemz', 'btn-3', {'chosen': x.isChosen})} onClick={() => handleChangePro(x)}>
          <ListItemText primary={x.name} />
          <img src={cancelX} alt='cancel' width={32} 
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          />
        </ListItem>
      ))}
    </List>
  );
}
