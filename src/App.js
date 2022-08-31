import React, { Component } from 'react';

// import ListPage from './Components/Main/ListPage';
import Header from './Components/Header/Header';
import ListPage from './Components/Main/ListPage';
import { LOAD_LIST_PRODUCT } from './GraphQL/Queries';
import { Routes, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { addProducts } from './Store/';
import { addCategories, addProducts } from './Store/ItemsSlice';
class App extends Component {
  state = {
    products: [],
    categories: ['all'],
    currentCategory: 'all',
    cart: [
      { itemId: 'huarache-x-stussy-le ', score: 1, attributes: { size: 42 } },
    ],
  };

  changeCateogry = (category) => {
    this.setState({ currentCategory: category });
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
    console.log();
    const products = await data.json();
    this.setState({ products: products.data.category.products });
    this.props.addProducts(products.data.category.products);
    const cateogiresList = ['all'];
    this.state.products.forEach(
      (e) =>
        !cateogiresList.includes(e.category) && cateogiresList.push(e.category)
    );
    this.props.addCategories(cateogiresList);
  };

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<ListPage />} />
        </Routes>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { cart, items } = state;

  return { cart, items };
};
const actionsCreators = {
  addProducts,
  addCategories,
};

export default connect(mapStateToProps, actionsCreators)(App);
