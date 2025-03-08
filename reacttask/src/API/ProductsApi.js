import axios from 'axios';
import React from 'react';
import './ProductsApi.css';

class ProductsApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mydata : []};
    }

    componentDidMount(){
        axios.get("https://fakestoreapi.com/products")
        .then(res=>{
            this.setState({mydata:res.data})
        })
    }

    handleAddToCart = (product) => {
        // Empty navigation function (does nothing for now)
        console.log(`${product.title} added to cart`);
    };
    
    render() { 
        return ( <>
             <div className="products-container">
                {this.state.mydata.map((value, index) => (
                    <div key={index} className="product-card">
                        <img src={value.image} alt={value.title} />
                        <h2>{value.title}</h2>
                        <p>${value.price}</p>
                        <button 
                            className="add-to-cart" 
                            onClick={() => this.handleAddToCart(value)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </> );
    }
}
 
export default ProductsApi;