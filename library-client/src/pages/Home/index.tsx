import React from 'react';
import { BookList } from './books/BookList';
import { Header } from './Header';

export function HomePage() {
  return (
    <>
      <Header />
      <BookList />
    </>
  );
}
