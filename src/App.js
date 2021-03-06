import React, { useEffect, useState } from 'react';
import CardList from "./components/CardList";
import ShoppingCart from "./components/ShoppingCart";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Container from '@material-ui/core/Container';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Button, Message, Title } from "rbx";

const firebaseConfig = {
  apiKey: "AIzaSyAY_zNGoReDzJPzXIh5lD2fkLGoW8no1ic",
  authDomain: "shopping-cart-f263f.firebaseapp.com",
  databaseURL: "https://shopping-cart-f263f.firebaseio.com",
  projectId: "shopping-cart-f263f",
  storageBucket: "shopping-cart-f263f.appspot.com",
  messagingSenderId: "265080170348",
  appId: "1:265080170348:web:65916bc68c0ff7492bb549"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();



const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    display: 'flex',
  },
  appBar: {
    flexGrow: 1,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    flexGrow: 1,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: 400,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const theme = useTheme();
  const products = Object.values(data);
  const [open, setOpen] = React.useState(false);
  const [cartList, setCart] = useState([]);
  const [inventory, setInv] = useState({});
  const [user, setUser] = useState(null);
  const uid = user? user.uid : null;

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: (result) =>{
        db.child('cart').child(result.user.uid).update(cartList);
        
        return false;
      } 
    }
  };
  const setCartList = (data) => {
    if(uid) {
        setCart(data);
        db.child('cart').child(uid).set(data);
    }
    else{
        setCart(data);
    }
};
  
  const Welcome = ({ user }) => (
    <Message color="info">
      <Message.Header>
        Welcome, {user.displayName}
        <Button primary onClick={() => firebase.auth().signOut()}>
          Log out
        </Button>
      </Message.Header>
    </Message>
  );

  const SignIn = () => (
    <StyledFirebaseAuth
      uiConfig={uiConfig}
      firebaseAuth={firebase.auth()}
    />
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleUp = () =>{
    setCart([]);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const totalAmount = (cartList) => {
    let count;
    let sum = 0;
    for(count = 0; count < cartList.length; count++){
        sum += cartList[count].product.price * cartList[count].qty;
    }
    sum = sum.toFixed(2);
    return sum;
};
  
  useEffect(() => {
    const handleData = snap => {
      setInv(snap.val());
    };
    db.on('value', handleData, error => alert(error));
    // document.write(inventory)
    return () => { db.off('value', handleData); };
    // const fetchInv = async () => {
    // const response = await fetch('./data/inventory.json');
    // const json = await response.json();
    // setInv(json);
    // // };
    // fetchInv();
  },[]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      const handleData = snap => {
        setInv(snap.val());
        setData(json);
      };
      
      db.on('value', handleData, error => alert(error));
      // document.write(inventory)
      return () => { db.off('value', handleData); };
      // const fetchInv = async () => {
      // setData(json);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, [user]);

  return (
    // <ul>
    //   {products.map(product => <li key={product.sku}>{product.title}</li>)}
    // </ul>
    <div className={classes.root}>
    <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            MAX MALL
          </Typography>
          <React.Fragment>
              { user ? <Welcome user={ user } /> : <SignIn /> }
          </React.Fragment>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
    </AppBar>
    <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <React.Fragment>
          <CardList products={products} cartList={cartList} setCartList={setCartList} inventory={inventory}/>
        </React.Fragment>
    </main>
    <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <React.Fragment>
            <ShoppingCart cartList={cartList} setCartList={setCartList} inventory={inventory}/>
        </React.Fragment>
        <Divider />
        <Container fixed>
        <Typography align="left" variant="h6" noWrap>
            Total $ : {totalAmount(cartList)}
          </Typography>
        <button onClick={handleUp}>
          update cart
        </button>
        </Container>
      </Drawer> 

    </div>
  );
};

export default App;