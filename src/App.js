import React, { Component } from 'react';
import axios from "axios";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      order: {}
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
    return Object.values(this.state.order).reduce((acc, curr) => acc + curr, 0);
  }

  handleChange = (event) => {
    this.setState({ order: { ...this.state.order, [event.target.name]: Number(event.target.value) } })
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

          <form>
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
