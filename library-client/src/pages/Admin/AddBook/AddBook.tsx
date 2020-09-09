import { useMutation } from '@apollo/react-hooks';
import { ApolloError, gql } from 'apollo-boost';
import React, { useState } from 'react';
import { EmptyState } from 'shared/components/EmptyState';
import { Loading } from 'shared/components/Loading';
import { SearchBox } from 'shared/components/SearchBox';
import { CenterSearchBox } from './styled';

const ADD_BOOK_TO_LIBRARY = gql`
  mutation createBookByIsbn($isbn: String!) {
    createBookByIsbn(isbn: $isbn) {
      id
      title
    }
  }
`;

export function AddBook() {
  const [isbnInput, setIsbnInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [addBook] = useMutation(ADD_BOOK_TO_LIBRARY, {
    onCompleted: ({ createBookByIsbn: { title } }) => {
      setErrorMessage('');
      setSuccessMessage(`Added book with name: ${title}`);
      setIsbnInput('');
      setLoading(false);
    },
    onError: (error: ApolloError) => {
      setSuccessMessage('');
      setErrorMessage(error.message.split(': ')[1]);
      setLoading(false);
    },
  });

  function onAddBook(isbn: string) {
    setLoading(true);
    setIsbnInput(isbn);
    addBook({
      variables: {
        isbn,
      },
    });
  }

  return (
    <>
      <CenterSearchBox>
        <SearchBox value={isbnInput} onSubmit={onAddBook} />
      </CenterSearchBox>
      {loading ? (
        <Loading />
      ) : (
        <>
          {successMessage && <EmptyState icon="book" title="Book added successfully" message={successMessage} />}
          {errorMessage && <EmptyState icon="error" title="Failed to add book by ISBN" message={errorMessage} />}
          {!successMessage && !errorMessage && (
            <EmptyState icon="search" title="Add books by ISBN" message="Search for books to add" />
          )}
        </>
      )}
    </>
  );
}
