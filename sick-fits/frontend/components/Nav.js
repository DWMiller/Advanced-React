import React from 'react';
import Link from 'next/link';

import NavStyles from './styles/NavStyles';
import { User } from './User';
import { Signout } from './Signout';

export const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/items">
          <a>Shop</a>
        </Link>

        {me ? (
          <React.Fragment>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/me">
              <a>{me.email}</a>
            </Link>
            <Signout />
          </React.Fragment>
        ) : null}

        {!me ? (
          <Link href="/signup">
            <a>Sign In</a>
          </Link>
        ) : null}
      </NavStyles>
    )}
  </User>
);
