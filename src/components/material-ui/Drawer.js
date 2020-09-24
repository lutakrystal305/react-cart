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

          <ListItem button key='z1'>
            {user?
              (<Link to={`/${user._id}`} className='Link-user'>
                <img src={avt} alt='avt' className='avt-user' width={40} />
                <h6 className='user-name'>{user.name}</h6>
              </Link>)
            : (<div className='avt-user avt-none-user'></div>)
            }
          </ListItem>
      </List>
      <Divider />
      <List >
          {isAuth?
            (<ListItem button key='z2' className='Link-item'>
              <Link to='/author' className='Link-nav'>Creator</Link>
            </ListItem>)
            : ''
          }
          {user?
            (<ListItem button key='z3' className='Link-item'>
              <Link to={`/${user._id}/history`} className='Link-nav'>History</Link>
            </ListItem>)
          : ''
          }
          <ListItem button key='z3' className='Link-item Link-Mobile'>
            <Link to="/home" className='Linkz'>Home</Link>
          </ListItem>
          <ListItem button key='z3' className='Link-item Link-Mobile'>
            <Link to="/product" className='Linkz'>Product</Link>
          </ListItem>
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
