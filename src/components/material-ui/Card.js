import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import cancel1 from '../img/close (3).svg';
import cancel from '../img/close (2).svg';

import { PurchaseContext } from '../context/Purchase.Context';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgMediaCard(props) {
  const { items, handleDelItem } = useContext(PurchaseContext);

  const [hover2, setHover2] = useState(false);
  const classes = useStyles();

  
  const handleMouseOver2 = () => {
    setHover2(true);
  }
  const handleMouseOut2 = () => {
    setHover2(false);
  }
  let cancelX = cancel;
  if (hover2) {
    cancelX = cancel1;
  }
  const { product } = props;
  return (
    <Card className={classes.root} className='cardroot' >
      <CardActionArea>  
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={product.image}
          title="Contemplative Reptile"
        />
         <img className="btn-cancel" src={cancelX} alt='cancel' width={20} 
            onMouseOver={handleMouseOver2}
            onMouseOut={handleMouseOut2}
            onClick={() => handleDelItem(product)}
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className="namePro">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
