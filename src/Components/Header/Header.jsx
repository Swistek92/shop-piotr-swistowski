/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from 'react';
import styles from './style.module.css';
import { connect } from 'react-redux';
import { changeCategory } from '../../Store/ItemsSlice';
export class Header extends Component {
  categories = () => {
    console.log(this.props);
    if (this.props.items.categories === []) return;
    return this.props.items.categories.map((e) => {
      const isCurrentCategory = e === this.props.items.currentCategory;

      return (
        <li
          style={{
            color: isCurrentCategory && 'green',
            textDecoration: isCurrentCategory && 'underline',
          }}
          onClick={() => this.props.changeCategory(e)}
        >
          {e}
        </li>
      );
    });
  };

  render() {
    return (
      <header className={styles.container}>
        <ul className={styles.links}>{this.categories()}</ul>
        <h5>Logo</h5>
        <div className={styles.buttons}>
          <div>$</div>
          <div className={styles.dropdown}>
            <button className={styles.link}>Cart</button>
            <div className={styles.dropdownCart}>
              <div className={styles.title}>My bag. 3 items</div>
              <div className={styles.cartItem}></div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { cart, items } = state;

  return { cart, items };
};
const actionsCreators = {
  changeCategory,
};

export default connect(mapStateToProps, actionsCreators)(Header);
