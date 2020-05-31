import React from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { Modal } from 'shared/components/Modal';
import { BookDetails } from './BookDetails';
import { BookList } from './BookList';
import { HomePageWraper, Tab, Tabs } from './styled';

export function HomePage() {
  const match = useRouteMatch();
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
                onClose={() => history.push(match.url)}
                renderContent={() => <BookDetails bookId={+routeProps.match.params.bookId} />}
              />
            )}
          />
        </Route>
        <Route path="/board-games">Not implemented.</Route>
      </Switch>
    </HomePageWraper>
  );
}
