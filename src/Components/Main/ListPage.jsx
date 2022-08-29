import React, { Component } from 'react';
import styles from './style.module.css';

class ListPage extends Component {
  render() {
    return (
      <>
        <h1 className={styles.header}>Category Name </h1>
        <div className={styles.cards}>
          {this.props.products.map((e) => {
            return (
              <div key={e.id} className={styles.card}>
                <img className={styles.img} src={e.gallery[0]} alt={e.id} />
                <p className={styles.title}> {e.name}</p>
                <p className={styles.price}> $ {e.prices[0].amount}</p>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default ListPage;
