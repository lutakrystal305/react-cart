import React, { useEffect, useContext } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { CartContext } from '../context/Cart.Context';


export default function SimpleRating(props) {
  const { users,getUsers } = useContext(CartContext);
  const { user } = props;
  useEffect(() => {
    getUsers()
  },[]);
  let x=users.reduce((a,b) => {
    return a+b.rate.rate;
  },0);
  console.log(x);
  let y;
  if (user) {
    y = user.rate.rate
  } else {
    y= Math.round(x/users.length);
  }
  return (
    <div>
      
      <Box component="fieldset" mb={3} borderColor="transparent">
        {!user ?
          <Typography component="legend">Rating for web:</Typography>
          : ''
        }
        <Rating name="read-only" value={y} readOnly />
      </Box>
      
    </div>
  );
}
