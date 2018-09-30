import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';

import PaginationStyles from './styles/PaginationStyles.js';
import { perPage } from '../config.js';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

export const Pagination = props => {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ data, loading, error }) => {
        if (loading) <p>Loading...</p>;
        if (error) <p>Error...</p>;

        const count = data.itemsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        return (
          <PaginationStyles>
            <Head>
              <title>
                Sick Fits! | {props.page} of {pages}
              </title>
            </Head>
            <Link
              prefetch
              href={{
                pathname: 'items',
                query: { page: props.page - 1 },
              }}
            >
              <a className="prev" aria-disabled={props.page <= 1}>
                {' '}
                ← Prev
              </a>
            </Link>
            <p>
              {/*  */}
              Page: {props.page} of {pages}
            </p>
            <p>{count} Items Total</p>

            <Link
              prefetch
              href={{
                pathname: 'items',
                query: { page: props.page + 1 },
              }}
            >
              <a className="prev" aria-disabled={props.page >= pages}>
                Next →
              </a>
            </Link>
          </PaginationStyles>
        );
      }}
    </Query>
  );
};

export default Pagination;
