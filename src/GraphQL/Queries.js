import { gql } from '@apollo/client';

export const LOAD_LIST_PRODUCT = gql`
  query {
    category {
      name
      products {
        brand
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;
