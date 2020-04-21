import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from "./Card"
 
 
export default function ProductCardList({products}) {
    return (
    
    <React.Fragment>
        <Container fixed>
            <Grid container spacing={2} direction="row">
                {products.map(product =>
                    <Grid item xs={3}>
                        <Card product={product} key={product.sku}/>
                        </Grid>)
                    }
            </Grid>
        </Container>
    </React.Fragment>
     );
 }