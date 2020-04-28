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
        padding: 8,
        flex: '1 0 auto',
        maxWidth: 60,
        margin: '5px 5px',
    },
    clearButton:{
        marginLeft: 'auto'
    }
});

export default function CartList({cartList, setCartList, inventory}) {
    const classes = useStyles();
    const Delete = (deleteItem, deleteSize) => {
        var temp = cartList.slice(0);
        for(var i = 0; i < temp.length; i++){
            if(temp[i].product.sku == deleteItem && temp[i].size == deleteSize){
                inventory[deleteItem][temp[i].size] += temp[i].qty;
                temp.splice(i,1);
                setCartList(temp);
                break;
            }
        }
    }
    const Add = (addItem, addSize) => {
        var temp = cartList.slice(0);
        for(var i = 0; i < temp.length; i++){
            if(temp[i].product.sku == addItem && temp[i].size == addSize && temp[i].size === addSize && inventory[addItem][temp[i].size] > 0){
                temp[i].qty += 1;
                inventory[addItem][temp[i].size] -= 1;
                setCartList(temp);
                break;
            }
        }
    }
    const Sub = (subItem, subSize) => {
        var temp = cartList.slice(0);
        for(var i = 0; i < temp.length; i++){
            if(temp[i].product.sku == subItem && temp[i].size == subSize){
                if (temp[i].qty > 1){
                    temp[i].qty -= 1;
                    inventory[subItem][temp[i].size] += 1;
                    setCartList(temp);
                    break;
                }
                else{
                    inventory[subItem][temp[i].size] += 1;
                    temp.splice(i,1);
                    setCartList(temp);
                    break;
                }
            }
        }
    }
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
                            SIZE: {item.size}
                        </Typography>
                        <Typography variant="h6">
                            $ {item.product.price}
                        </Typography>
                        <Typography variant="subtitle2">
                            <IconButton color={"primary"} aria-label="remove" size={"small"} onClick={() => Sub(item.product.sku, item.size)}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            Item: {item.qty}
                            <IconButton color={"primary"} aria-label="add" size={"small"} onClick={() => Add(item.product.sku, item.size)}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Typography>
                    </CardContent>
                    <IconButton color={"primary"} aria-label="clear" size={"small"} className={classes.clearButton} onClick={() => Delete(item.product.sku, item.size)}>
                        <DeleteIcon/>
                    </IconButton>
                </Card>
            )}
        </Container>
    );
}