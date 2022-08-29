import React, { Component } from 'react';

// import ListPage from './Components/Main/ListPage';
import Header from './Components/Header/Header';
import ListPage from './Components/Main/ListPage';
import { LOAD_LIST_PRODUCT } from './GraphQL/Queries';

class App extends Component {
  state = {
    products: [],
    categorys: ['all'],
  };

  componentDidMount = async () => {
    const data = await fetch('http://localhost:4000/graphql', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        query: LOAD_LIST_PRODUCT,
      }),
    });
    const products = await data.json();
    this.setState({ products: products.data.category.products });
    this.state.products.forEach(
      (e) =>
        !this.state.categorys.includes(e.category) &&
        this.state.categorys.push(e.category)
    );
  };

  render() {
    return (
      <div>
        <Header categorys={this.state.categorys} />
        <ListPage products={this.state.products} />
      </div>
    );
  }
}

export default App;
