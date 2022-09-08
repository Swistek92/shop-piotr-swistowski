import React, { Component } from 'react';

import Header from './Components/Header/Header';
import ListPage, { ListPageWithRouter } from './Components/Main/ListPage';
import { LOAD_LIST_PRODUCT } from './GraphQL/Queries';
import { Routes, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addCategories, addProducts, addCurrency } from './Store/ItemsSlice';
import Product from './Components/Product/Product';

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

    const products = await data.json();
    this.setState({ products: products.data.category.products });
    this.props.addProducts(products.data.category.products);
    const cateogiresList = ['all'];
    const availableCurrency = [];
    this.state.products.forEach(
      (e) =>
        !cateogiresList.includes(e.category) && cateogiresList.push(e.category)
    );
    this.state.products[0].prices.forEach((e) => {
      availableCurrency.push(e.currency);
    });
    this.props.addCurrency(availableCurrency);
    this.props.addCategories(cateogiresList);
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<ListPage />} />
          <Route path='/product/:id' element={<Product />} />
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
  addCurrency,
};

export default connect(mapStateToProps, actionsCreators)(App);
