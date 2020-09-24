import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { PurchaseContext } from '../context/Purchase.Context';
import { CartContext } from '../context/Cart.Context';
import '../Cart/Modal.css';
import axios from 'axios';
import Rating from './Rating';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 47;
  const left = 47;

  

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const data = localStorage.getItem('user');
  const user = JSON.parse(data);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [phone, setPhone] = React.useState(user.phone);
  const [add, setAdd] = React.useState(user.add);
  const [email, setEmail] = React.useState(user.email);
  const [success, setSuccess] = React.useState(false);
  const { total, dellItem } = useContext(PurchaseContext);
  const { cartItem, dellCart } = useContext(CartContext);

  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setSuccess(false)
  }
  const handleChangePhone = (event) => {
    const value = event.target.value;
    setPhone(value);
  }
  const handleChangeAdd = (event) => {
    const value = event.target.value;
    setAdd(value);
  }
  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const customer= {
      idUser: user._id,
      name: user.name,
      items: cartItem,
      total: total,
      phone: phone,
      add: add,
      email: email
    };
    axios
      .post("http://localhost:8080/cart/", customer)
      .then((res) => {
        setSuccess(true);
        setOpen(false);
        
      })
      .catch((err) => {
        if (err.response === undefined) {
          alert(err);
        }
      });
      dellCart();
      dellItem(); 
  }
  
  const body = (
    <div style={modalStyle} className={classes.paper} >
      <div className="payment">
        <h2 id="simple-modal-title">Payment</h2>
        <h6>Hi, {user.name}</h6>
        <p>You have <span>{cartItem.length}</span> items, Total price:<span> {total}</span></p>
      </div>
      <form className="formPay" onSubmit={handleSubmit}>
        <div className='inputPay'>
          <label><b>Phone Number(*): </b></label>
          <input type='text' name='phone' value={phone} required 
            onChange={handleChangePhone}
          />
        </div>
        <div className='inputPay'>
          <label><b>Your address to delivery(*): </b></label>
          <input type='text' name='add' value={add} required 
            onChange={handleChangeAdd}
          />
        </div>
        <div className='inputPay'>
          <label><b>Email(*):</b></label>
          <input type='text' name='email' value={email} required 
            onChange={handleChangeEmail}
          />
        </div>
        <button type='submit' className="btn btn-2 color-green btn-itemZ">Pay =)))</button>
      </form>
    </div>
  );
  let body1;
  if (user.rate) {
    body1=(
    <div style={modalStyle} className={classes.paper} >
      <h2>Tks for your contribution!</h2>
    </div>
    );
  } else {
    body1=(
    <div style={modalStyle} className={classes.paper} >
      <Rating click={handleClose1} />
    </div>
    )
  }
  return (
    <div>
      <button type="button" onClick={handleOpen} className="btn btn-2 color-green btn-itemZ">
       <b> Pay =))) </b>
      </button>
      { !success ?
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
        :
        <Modal
          open={success}
          onClose={handleClose1}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body1}
        </Modal>
      }
    </div>
  );
}
