import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { BookList } from './BookList';
import { HomePageWraper, Tab, Tabs } from './styled';

export function HomePage() {
  return (
    <HomePageWraper>
      <Tabs>
        <Tab to="/books">Books</Tab>
        <Tab to="/board-games">Board Games</Tab>
      </Tabs>

      <Switch>
        <Redirect exact from="/" to="/books" />
        <Route path="/books">
          <BookList />
        </Route>
        <Route path="/board-games">Not implemented.</Route>
      </Switch>
    </HomePageWraper>
  );
}
