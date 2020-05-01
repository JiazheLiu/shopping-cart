import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    //  maxWidth:,
    // height: 750,
    flexGrow: 1,
  },
  media: {
        
        
        height:400,
        // maxWidth: 60,
        // margin: '5px 5px',
  },
//   item: {
//     // padding: theme.spacing(1),
//     alignContent: 'center',
//   },
});


export default function MediaCard({product, cartList, setCartList, inventory}) {
  const classes = useStyles();
  const [productSize, setProductSize] = useState('S');
  const [click, setClick] = useState(false);

  const haveSize = (size) =>{
    return inventory[product.sku][size] > 0;
};
  
  
  const sizeClick = (size) => {
    setClick(true);
    setProductSize(size);
};
  const addCart = () => {
    var tempCart = cartList.slice(0);
    var count;
    for(count = 0; count < tempCart.length; count++){
        if (tempCart[count].product.sku === product.sku && tempCart[count].size === productSize) {
            tempCart[count].qty += 1;
            inventory[product.sku][productSize] -= 1;
            break;
        }
    }
    if(count===tempCart.length){
        inventory[product.sku][productSize] -= 1;
        tempCart.push({product : product, qty : 1, size : productSize});
    }
    setCartList(tempCart);
    setClick(false);
};


  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={"data/products/"+product.sku+"_1.jpg"}
        />
        <CardContent>
            <Typography gutterBottom variant='subtitle1' component="p" align="center">
                         {product.title}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p" align="center">
                         $ {product.price}
            </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container justify="center">
                <Button size="small" color="primary" onClick={() => sizeClick('S')} disabled={!haveSize("S")}>
                S
                </Button>
                <Button size="small" color="primary" onClick={() => sizeClick('M')} disabled={!haveSize("M")}>
                M
                </Button>
                <Button size="small" color="primary" onClick={() => sizeClick('L')} disabled={!haveSize("L")}>
                L
                </Button>
                <Button size="small" color="primary" onClick={() => sizeClick('XL')} disabled={!haveSize("XL")}>
                XL
                </Button>

        <Grid container justify="center" >
                <Button variant="contained" color="primary" disableElevation centered={true} onClick={addCart} disabled={!click}>
                ADD TO CART
                </Button>
            </Grid>
        </Grid>
        
        {/* <Grid container justify="center"> */}
        {/* <Button size="small" variant="outlined" color="primary">
            Add to cart
        </Button> */}
        {/* </Grid> */}
      </CardActions>
    </Card>
  );
}