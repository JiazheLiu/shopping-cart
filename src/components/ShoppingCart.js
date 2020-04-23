import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

const useStyles = makeStyles({
    root:{
        display: 'flex',
    },
    details:{
        display: 'flex',
        flexDirection: 'column',
    },
    image:{
        padding: 5,
        flex: '1 0 auto',
        maxWidth: 40,
        margin: '5px 5px',
    },
    clearButton:{
        marginLeft: 'auto'
    }
});

export default function CartList({cartList, setCartList}) {
    const classes = useStyles();

    return (
        <Container maxWidth="lg">
            {cartList.map(item =>
                <Card className={classes.root} key={item.product.sku + item.size}>
                    <CardMedia
                        className={classes.image}
                        image={"data/products/"+item.product.sku+"_2.jpg"}
                        height="50"
                    />
                    <CardContent className={classes.details}>
                        <Typography variant="subtitle2">
                            {item.product.title}
                        </Typography>
                        <Typography variant="subtitle2">
                            size: {item.size}
                        </Typography>
                        <Typography variant="h6">
                            $ {item.product.price}
                        </Typography>
                        <Typography variant="subtitle2">
                            <IconButton aria-label="remove" size={"small"}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            Item: {item.qty}
                            <IconButton aria-label="add" size={"small"}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Typography>
                    </CardContent>
                    <IconButton aria-label="clear" size={"small"} className={classes.clearButton}>
                        <DeleteIcon/>
                    </IconButton>
                </Card>
            )}
        </Container>
    );
}