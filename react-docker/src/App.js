import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data } = await axios.get(
                    'http://localhost:5500/api/products'
                );
                setProducts(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchProducts();
    }, []);
    return (
        <div className="App">
            <h1>My products Products</h1>
            {products.map((product) => {
                return (
                    <div key={product._id}>
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default App;
