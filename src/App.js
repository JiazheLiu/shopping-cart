import React, { useEffect, useState } from 'react';
import CardList from "./components/CardList";
const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    // <ul>
    //   {products.map(product => <li key={product.sku}>{product.title}</li>)}
    // </ul>
    <React.Fragment>
      <CardList products={products}/>
    </React.Fragment>
  );
};

export default App;