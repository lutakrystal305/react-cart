import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import '../Cart/Rating.css';
import axios from 'axios';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

export default function HoverRating(props) {
  const { click } = props;
  const [value, setValue] = React.useState(3);
  const [hover, setHover] = React.useState(-1);
  const [valueCom, setValueCom] = React.useState('')
  const classes = useStyles();

  const handleChange= (event) => {
    const x = event.target.value;
    setValueCom(x);
  }
  const data=localStorage.getItem('user');
  const user = JSON.parse(data);
  const post= {
    _id:  user._id,
   comment:  {
    rate: value,
    comment: valueCom
  }
} 
  const handleClick= () => {
    axios
      .post("https://amber-api.herokuapp.com/user/rate", post)
      .then((res) => {
        click();
      })
      .catch((err) => {
        if (err.response === undefined) {
          alert(err);
        }
      });
  }

  return (
    <div>
      <div className="head-rate">
        <h2>Rating</h2>
        <p>Thank you for your contribution!</p>
      </div>
      <div className={classes.root}>
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
      </div>
      <div className='inputPay comment-d'>
        <label><b>Your comment for this web :</b></label>
        <input type='text' className='comment' name='comment' placeholder='Your comment'
          onChange={handleChange}
        />
      </div>
      <button onClick={handleClick} className='btn btn-2 btn-green btn-comment'>OK</button>
    </div>
  );
}
