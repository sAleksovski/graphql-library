import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Modal } from 'shared/components/Modal';
import { Tab, Tabs } from 'shared/components/Tabs';
import { BoardGameDetails } from './BoardGameDetails';
import { BoardGameList } from './BoardGameList';
import { BookDetails } from './BookDetails';
import { BookList } from './BookList';
import { HomePageWraper } from './styled';

export function HomePage() {
  const history = useHistory();

  return (
    <HomePageWraper>
      <Tabs>
        <Tab to="/books">Books</Tab>
        <Tab to="/board-games">Board Games</Tab>
      </Tabs>

      <Switch>
        <Redirect exact from="/" to="/books" />
        <Route path="/books">
          <BookList onSelectBook={(id: number) => history.push(`/books/${id}`)} />
          <Route
            path={`/books/:bookId`}
            render={(routeProps) => (
              <Modal
                isOpen
                width={1040}
                withCloseIcon={true}
                onClose={() => history.push('/books')}
                renderContent={() => <BookDetails bookId={+routeProps.match.params.bookId} />}
              />
            )}
          />
        </Route>
        <Route path="/board-games">
          <BoardGameList onSelectBoardGame={(id: number) => history.push(`/board-games/${id}`)} />
          <Route
            path={`/board-games/:boardGameId`}
            render={(routeProps) => (
              <Modal
                isOpen
                width={1040}
                withCloseIcon={true}
                onClose={() => history.push('/board-games')}
                renderContent={() => <BoardGameDetails boardGameId={+routeProps.match.params.boardGameId} />}
              />
            )}
          />
        </Route>
      </Switch>
    </HomePageWraper>
  );
}
