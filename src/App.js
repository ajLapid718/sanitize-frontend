import React, { Component } from 'react';
import axios from "axios";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      totalPrice: "",
      items: []
    }
  }

  componentDidMount() {
    axios
      .get("/api/items")
      .then(res => res.data)
      .then(itemsFromAPI => this.setState({ items: itemsFromAPI }))
      .catch(err => console.log(err));
  }

  // change the total price based on the 
  handleChange = (event) => {
    console.log(event.target)
    this.setState({ totalPrice: Number(event.target.value) });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.items.map(item => (
            <div onClick={this.handleClick} key={item.id}>
              {item.id} {item.name} {item.price}
              {/* <form> */}
              <select onChange={this.handleChange}>
                <option value={item.price}>1</option>
                <option value={item.price * 2}>2</option>
                <option value={item.price * 3}>3</option>
              </select>
              {/* </form> */}
            </div>))}

          <form>
            <br />
            Total Price: {this.state.totalPrice}
            <br />
            <button>Add To Database</button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
