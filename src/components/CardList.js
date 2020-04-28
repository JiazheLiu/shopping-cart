import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from "./Card"
 
 
export default function CardList({products, cartList, setCartList, inventory}) {
    return (
    
    <React.Fragment>
        <Container fixed>
            <Grid container spacing={2} direction="row">
                {products.map(product =>
                    <Grid item xs={3} key={product.sku + product.size}>
                        <Card product={product} cartList={cartList} setCartList={setCartList} inventory={inventory}/>
                        </Grid>)
                    }
            </Grid>
        </Container>
    </React.Fragment>
     );
 }