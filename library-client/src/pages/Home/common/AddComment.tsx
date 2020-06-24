import { useMutation } from '@apollo/react-hooks';
import { DocumentNode, gql } from 'apollo-boost';
import { UserAvatar } from 'pages/common/UserAvatar';
import React, { useState } from 'react';
import { Input } from 'shared/components/Form';
import {
  LibraryItemDetailsComment,
  LibraryItemDetailsCommentLeft,
  LibraryItemDetailsCommentMain,
} from 'shared/components/Library';

const ADD_COMMENT = gql`
  mutation AddComment($comment: CreateCommentInput!) {
    createComment(comment: $comment) {
      id
      content
      createdAt
      user {
        name
        avatarUrl
      }
    }
  }
`;

interface AddCommentProps {
  queryWithVariables: {
    query: DocumentNode;
    variables: { [key: string]: string | number };
  };
  propertyKey: string;
  itemId: number;
}

export function AddComment({ queryWithVariables, propertyKey, itemId }: AddCommentProps) {
  const [addComment] = useMutation(ADD_COMMENT, {
    update(cache, { data: { createComment } }) {
      const cachedQuery = cache.readQuery<{ [key: string]: any }>(queryWithVariables) || {};
      cache.writeQuery({
        ...queryWithVariables,
        data: {
          [propertyKey]: {
            ...cachedQuery[propertyKey],
            comments: createComment,
          },
        },
      });
      setComment('');
    },
  });

  const [comment, setComment] = useState<string>('');

  function keyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      addComment({
        variables: {
          comment: {
            itemId,
            content: comment,
          },
        },
      });
    }
  }

  return (
    <LibraryItemDetailsComment>
      <LibraryItemDetailsCommentLeft>
        <UserAvatar />
      </LibraryItemDetailsCommentLeft>
      <LibraryItemDetailsCommentMain hideBorder={true}>
        <Input type="text" value={comment} onChange={(e) => setComment(e.target.value)} onKeyPress={keyPress} />
      </LibraryItemDetailsCommentMain>
    </LibraryItemDetailsComment>
  );
}
