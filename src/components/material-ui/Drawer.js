import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import avt from '../img/avt.png';
import { Link, useHistory } from 'react-router-dom';
import '../Navbar.css';
import { AuthContext } from '../context/Auth.Context';
import { CartContext } from '../context/Cart.Context';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer(props) {
  const history = useHistory();
  const { user } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const { isAuth } = React.useContext(AuthContext);
  const { cartItem } = React.useContext(CartContext);
  const data = localStorage.getItem('cartItem');
  var cartItemS;
  if (cartItem.length !== 0) {
    cartItemS = cartItem;
  } else if (data){
    cartItemS = JSON.parse(data);
  } else {
    cartItemS = [];
  }
  const signOut = () => {
    localStorage.removeItem("token");
    if (!localStorage.getItem('token')) {
      localStorage.removeItem("key");
      if (!localStorage.getItem('key')) {
        localStorage.removeItem("user");
      }
    }
    history.push("/");
    window.location.reload();
  }



  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ right: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List >
        {user ? 
        (<Link to={`/user/${user._id}`} className='Link-user'>
          <ListItem button key='z1'>
              <div>
                <img src={avt} alt='avt' className='avt-user' width={40} />
                <h6 className='user-name'>{user.name}</h6>
              </div>
          </ListItem>
        </Link>)
        : (<ListItem><div className='avt-user avt-none-user'></div></ListItem>)
        }
      </List>
      <Divider />
      <List >
          {isAuth?
            (
            <Link to='/creator' className='Link-nav'>
              <ListItem button key='z2' className='Link-item'>
                Creator
              </ListItem>
            </Link>)
            : ''
          }
          {user?
            (
            <Link to={`/history/${user._id}`} className='Link-nav'>
              <ListItem button key='z3' className='Link-item'>
                History
              </ListItem>
            </Link>)
          : ''
          }
          <Link to="/home" className='Linkz'>
            <ListItem button key='z3' className='Link-item Link-Mobile'>
              Home
            </ListItem>
          </Link>
          <Link to="/product" className='Linkz'>
            <ListItem button key='z3' className='Link-item Link-Mobile'>
              Product
            </ListItem>
          </Link>
          {isAuth?
            (<ListItem button key='z3' className='Link-item Link-Mobile'>
              <Link to="/cartShopping" className='Linkz'>Cart({cartItemS.length})</Link>
            </ListItem>)
          : ''
          }
          <ListItem button key='z3' className='Link-item'>
            {isAuth?
              <button onClick={signOut}><b>Log out...</b></button>
            : <Link to="/login" className='Linkz Top'><b> Login </b></Link>
            }
          </ListItem>
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment key='right'>
          {isAuth?
            (<img src={avt} alt='avt' className='avt-user' width={40} 
              onMouseOver={toggleDrawer('right', true)}
              onClick={toggleDrawer('right', true)}
            />)
          :
            (<div className='avt-user avt-none-user' 
              onMouseOver={toggleDrawer('right', true)}
              onClick={toggleDrawer('right', true)}
            ></div>)
          }
          <Drawer anchor='right' open={state['right']} onClose={toggleDrawer('right', false)}>
            {list('right')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
