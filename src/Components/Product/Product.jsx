import React, { Component } from 'react';
import styles from './style.module.css';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../Store/CartSlice';
import { Navigate } from 'react-router-dom';

class Product extends Component {
  state = {
    select: 0,
    attributes: [],
    noAttributesAlert: '',
    redirect: false,
  };

  addToCart(addToCart, item) {
    const noAttributes = this.state.attributes.find((e) => e.selected === '');
    if (noAttributes) {
      this.setState({ noAttributesAlert: 'Select Attributes!' });
      return;
    } else {
      this.setState({ noAttributesAlert: '' });
      const cartItem = {
        attributes: this.state.attributes,
        item,
      };
      this.setState({ redirect: true });
      // this.props.navigate('/');
      // addToCart();
    }
  }
  componentDidMount() {
    console.log(this.props);
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  changeState = (name, value) => {
    this.setState({ name: value });
  };

  imgs = (gallery) => {
    return gallery.map((e, i) => {
      return (
        <img
          onClick={() => this.setState({ select: i })}
          key={e}
          src={e}
          alt='img'
        />
      );
    });
  };

  selectImg = (item) => {
    return <img alt='img' src={item.gallery[this.state.select]} />;
  };

  details = (item, Curency, addToCart) => {
    const price = item.prices.find((e) => e.currency.label === Curency.label);
    const attributes = JSON.parse(JSON.stringify(item.attributes));
    attributes.forEach((element) => {
      element.selected = '';
    });

    if (this.state.attributes.length < 1) {
      this.setState({ attributes });
    }
    return (
      <div>
        <h3>{item.name}</h3>
        <p>{item.brand}</p>
        {item.attributes.map((e, i) => {
          if (!this.state.attributes[i]) return;

          return (
            <>
              <p>{e.name}</p>
              {e.items.map((e) => {
                const selected = e.id;
                const name = attributes[i].name;
                const isSelected = e.id === this.state.attributes[i].selected;
                return (
                  <div
                    style={{
                      backgroundColor: isSelected && 'black',
                      color: isSelected && 'white',
                    }}
                    onClick={() =>
                      this.setState({
                        attributes: this.state.attributes.map((e) =>
                          e.name === name ? { ...e, selected } : e
                        ),
                      })
                    }
                    className={styles.attributes}
                  >
                    {e.displayValue}
                  </div>
                );
              })}
            </>
          );
        })}
        <p>Price</p>
        <p>
          {price.amount} {Curency.label} {Curency.symbol}
        </p>
        <p style={{ color: 'red' }}>{this.state.noAttributesAlert}</p>
        <button onClick={() => this.addToCart(addToCart, item)}>
          Add to cart
        </button>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
          consequatur.
        </p>
      </div>
    );
  };

  render() {
    const { products, currentCurency } = this.props.items;
    const { selectItem } = this.props.cart;
    const item = products.find((e) => e.id === selectItem);
    const addToCart = this.props.addToCart;
    return (
      <main className={styles.main}>
        <div className={styles.imgs}>{this.imgs(item.gallery)}</div>
        <div className={styles.img}>{this.selectImg(item)}</div>
        <div className={styles.details}>
          {this.details(item, currentCurency, addToCart)}
        </div>
        {this.state.redirect && <Navigate to='/' replace={true} />}
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { cart, items } = state;

  return { cart, items };
};

const actionsCreators = { addToCart };

function withParams(Product) {
  return (props) => <Product {...props} navigate={useNavigate()} />;
}

export default connect(mapStateToProps, actionsCreators)(Product);
// export default withParams(connect(mapStateToProps, actionsCreators)(Product));
