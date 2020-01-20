import React, { Component } from 'react';
import axios from "axios";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      itemAndPrice: {},
      itemAndQuantity: {}
    }
  }

  componentDidMount() {
    axios
      .get("/api/items")
      .then(res => res.data)
      .then(itemsFromAPI => this.setState({ items: itemsFromAPI }))
      .catch(err => console.log(err));
  }

  calculateTotalPrice = () => {
    return Object.values(this.state.itemAndPrice).reduce((acc, curr) => acc + curr, 0);
  }

  handleChange = (event) => {
    // modify the order, that way we can have unique keys, and a running count of the total price;
    this.setState({ itemAndPrice: { ...this.state.itemAndPrice, [event.target.name]: Number(event.target.value) } })
    // keep a running track of the quantities;
    this.setState({ itemAndQuantity: { ...this.state.itemAndQuantity, [event.target.name]: Number(event.target.options[event.target.options.selectedIndex].text) } })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    let productsToPost = [];

    for (let key in this.state.itemAndQuantity) {
      productsToPost.push({name: key, quantity: this.state.itemAndQuantity[key]})
    }

    axios
      .post("/api/orders", { products: productsToPost, totalPrice: this.calculateTotalPrice() })
      .then(res => res.data)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.items.map(item => (
            <div key={item.id}>
              {item.id} {item.name} {item.price}
              <select name={item.name} onChange={this.handleChange}>
                <option value={0}>0</option>
                <option value={item.price}>1</option>
                <option value={item.price * 2}>2</option>
                <option value={item.price * 3}>3</option>
              </select>
            </div>))}

          <form onSubmit={this.handleSubmit}>
            <br />
            Total Price: ${this.calculateTotalPrice()}
            <br />
            <button>Add To Database</button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
