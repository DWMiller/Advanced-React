import React, { Component } from 'react';
import { SINGLE_ITEM_QUERY } from './UpdateItem';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';

import ErrorMessage from './ErrorMessage';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .details {
    margin: 4rem;
    font-size: 2rem;
  }
`;

export default class SingleItem extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <ErrorMessage error={error} />;
          if (!data.item) return <p>Item not found</p>;
          return (
            <SingleItemStyles>
              <Head>
                <title>Sick Fits | {data.item.title}</title>
              </Head>
              <img src={data.item.largeImage} alt={data.item.title} />
              <div className="details">
                <h2>Viewing {data.item.title}</h2>
                <p>{data.item.description}</p>
              </div>
              Single Item!! {data.item.title}
            </SingleItemStyles>
          );
        }}
      </Query>
    );
  }
}
