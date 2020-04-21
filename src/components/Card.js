import React from 'react';
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
    // width: '100%',
    height: 400,
  },
//   item: {
//     // padding: theme.spacing(1),
//     alignContent: 'center',
//   },
});

export default function MediaCard({product}) {
  const classes = useStyles();

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
                <Button size="small" color="primary">
                S
                </Button>
                <Button size="small" color="primary">
                M
                </Button>
                <Button size="small" color="primary">
                L
                </Button>
                <Button size="small" color="primary">
                XL
                </Button>

        <Grid container justify="center" >
                <Button variant="contained" color="primary" disableElevation centered={true}>
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