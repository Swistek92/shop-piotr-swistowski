import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { LOAD_LIST_PRODUCT } from '../../GraphQL/Queries';
import styles from './style.module.css';
const ListPage = () => {
  const { error, loading, data } = useQuery(LOAD_LIST_PRODUCT);
  const [products, setProducts] = useState('');
  useEffect(() => {
    if (data) {
      setProducts(data.category.products);
      console.log(data.category.products);
    }
  }, [data]);
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1 className={styles.header}>Category Name </h1>
      <div className={styles.cards}>
        {products &&
          products.map((e) => {
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
};

export default ListPage;
