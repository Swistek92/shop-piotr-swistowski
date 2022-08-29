/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from 'react';
import styles from './style.module.css';
export class Header extends Component {
  render() {
    return (
      <header className={styles.container}>
        <ul className={styles.links}>
          {this.props.categorys.map((e) => {
            return (
              <li>
                <a href='#'>{e}</a>
              </li>
            );
          })}
        </ul>
        <div className={styles.buttons}>
          <span>$</span>
          <span>CART</span>
        </div>
      </header>
    );
  }
}

export default Header;
