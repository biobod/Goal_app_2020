import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import UserSearch from './pages/UserSearch.jsx';
import HomePage from './pages/HomePage.jsx';
import Navbar from './pages/Navbar.jsx';
import PageContent from './components/PageContent';
import store from './redux/store';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/users-search">
          <PageContent>
            <UserSearch />
          </PageContent>
        </Route>
        <Route exact path="/">
          <PageContent>
            <HomePage />
          </PageContent>
        </Route>
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
