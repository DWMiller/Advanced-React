import React from 'react';
import Link from 'next/link';

export const Nav = () => {
  return (
    <div>
      <Link href="/sell">
        <a>Sell</a>
      </Link>
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  );
};
