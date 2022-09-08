import React, { Component } from 'react';
import styles from './style.module.css';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { selectItem } from '../../Store/CartSlice';

class ListPage extends Component {
  items = () => {
    const { products, currentCategory } = this.props.items;

    if (!products) return;
    let filtered = products;

    if (currentCategory !== 'all') {
      filtered = filtered.filter((e) => e.category === currentCategory);
    }
    // console.log(this.props);
    return filtered.map((e) => {
      return (
        <div key={e.id} className={styles.card}>
          <img className={styles.img} src={e.gallery[0]} alt={e.id} />
          <p className={styles.title}> {e.name}</p>
          <p className={styles.price}> $ {e.prices[0].amount}</p>
          <Link
            onClick={() => this.props.selectItem(e.id)}
            to={`/product/${e.id}`}
            className={styles.link}
          >
            Details
          </Link>
        </div>
      );
    });
  };

  render() {
    // console.log(this.props);
    const { currentCategory } = this.props.items;
    return (
      <main className={styles.main}>
        <h1 className={styles.header}>Category {currentCategory}</h1>
        <div className={styles.cards}>{this.items()}</div>
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { cart, items } = state;

  return { cart, items };
};

const actionsCreators = { selectItem };

export default connect(mapStateToProps, actionsCreators)(ListPage);
