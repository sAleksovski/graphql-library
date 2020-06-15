import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';

const GET_PENDING_LOANS = gql`
  query PendingLoans {
    pendingLoans {
      id
      user {
        name
      }
      requestedAt
      item {
        ... on Book {
          title
          author
        }
        ... on BoardGame {
          title
        }
      }
    }
  }
`;

export function ManageLoans() {
  const { loading, error, data } = useQuery(GET_PENDING_LOANS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.pendingLoans.map((item: any) => (
        <div key={item.id}>
          {item.id} {item.item.title}
        </div>
      ))}
    </div>
  );
}
