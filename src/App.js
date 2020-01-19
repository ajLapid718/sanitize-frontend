import React, { Component } from 'react';
import axios from "axios";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: ""
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/")
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form>
            <label>Name:</label>
            <input name="name" type="text" onChange={this.handleChange} value={this.state.name}></input>
            <br />
            <br />
            <label>Price:</label>
            <input name="price" type="text" onChange={this.handleChange} value={this.state.price}></input>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
