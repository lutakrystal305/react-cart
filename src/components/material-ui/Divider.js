import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames';

import tick from '../img/tickz1.svg';
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
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const { items, handleChangePro, handleDelItem } = useContext(PurchaseContext);
  const classes = useStyles();
  
  
  const handleMouseOver1 = () => {
    setHover1(true);
  }
  const handleMouseOut1 = () => {
    setHover1(false);
  }
  const handleMouseOver2 = () => {
    setHover2(true);
  }
  const handleMouseOut2 = () => {
    setHover2(false);
  }
  let cancelX = tick;
  if (hover1) {
    cancelX = cancel;
  }
  if (hover2) {
    cancelX = cancel1;
  }
  return (
    <List component="nav" className={classes.root} className='Dividerz' aria-label="mailbox folders">
      { items.map( x => (
        <ListItem button 
          className={classNames('listItemz', 'btn-3', {'chosen': x.isChosen})}
          onClick={() => handleChangePro(x)}
          onMouseOver={handleMouseOver1}
          onMouseOut={handleMouseOut1}
          >
          <ListItemText primary={x.name} />
          
          <img src={cancelX} alt='cancel' width={14} 
            onMouseOver={handleMouseOver2}
            onMouseOut={handleMouseOut2}
            onClick={() => handleDelItem(x)}
          />
        </ListItem>
      ))}
    </List>
  );
}
