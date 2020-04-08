import React from 'react';

export default function Header ({title, children}) {
  return (
    <>
      <header>{title}</header>
      {children}
    </>
  );
}