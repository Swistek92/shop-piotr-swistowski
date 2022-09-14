import React, { Component } from 'react';
import styles from './styles.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectAttributes,
  incrementQuantity,
  decrementQuantity,
} from '../../Store/CartSlice';

class Cart extends Component {
  items = () => {
    const cart = this.props.cart.cart;
    const selectedCurrency = this.props.items.currentCurency.label;
    return cart.map((e) => {
      const price = e.item.prices.find(
        (e) => e.currency.label === selectedCurrency
      );

      const itemId = e.item.id;
      const quantity = e.quantity;
      return (
        <>
          <div className={styles.cartItem}>
            <div>
              <p> {e.item.name}</p>
              <p> {e.item.brand}</p>
              <p>
                {price.amount} {price.currency.symbol}
              </p>
              {e.attributes.map((e, i) => {
                const selected = e.selected;
                const name = e.name;
                return (
                  <>
                    <p>{name}</p>
                    {e.items.map((e) => {
                      const isSelected = e.id === selected;
                      // console.log(e);
                      if (name === 'Color') {
                        return (
                          <button
                            className={styles.colorAttribute}
                            style={{
                              backgroundColor: e.value,
                              color: e.value,
                              border: isSelected && '1px solid #5ECE7B',
                              scale: isSelected && 'calc(1.25)',
                            }}
                            onClick={() =>
                              this.props.selectAttributes([itemId, name, e.id])
                            }
                          >
                            __
                          </button>
                        );
                      } else {
                        return (
                          <button
                            style={{
                              backgroundColor: isSelected && 'black',
                              color: isSelected && 'white',
                              scale: isSelected && 'calc(1.25)',
                            }}
                            onClick={() =>
                              this.props.selectAttributes([itemId, name, e.id])
                            }
                            className={styles.attributes}
                          >
                            {e.value}
                          </button>
                        );
                      }
                    })}
                  </>
                );
              })}
            </div>
            <div className={styles.cartItemRight}>
              <div className={styles.rightButtons}>
                <button
                  className={styles.quantityBtn}
                  onClick={() => this.props.incrementQuantity(itemId)}
                >
                  +
                </button>
                <p>{quantity}</p>
                <button
                  className={styles.quantityBtn}
                  onClick={() => this.props.decrementQuantity(itemId)}
                >
                  -
                </button>
              </div>
              <img
                className={styles.img}
                alt='galery img'
                src={e.item.gallery[0]}
              />
            </div>
          </div>
          <hr />
        </>
      );
    });
  };

  render() {
    const { currentCategory } = this.props.items;
    return (
      <main className={styles.main}>
        <h1>CART</h1>
        <hr />
        {this.items()}
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { cart, items } = state;

  return { cart, items };
};

const actionsCreators = {
  selectAttributes,
  incrementQuantity,
  decrementQuantity,
};

export default connect(mapStateToProps, actionsCreators)(Cart);
