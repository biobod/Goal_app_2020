import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import UserSearch from './pages/EmployeeSearch.jsx';
import Navbar from './pages/Navbar.jsx';
import PageContent from './components/PageContent';
import store from './redux/store';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/employees">
          <PageContent>
            <UserSearch />
          </PageContent>
        </Route>
        <Redirect from="/" to="/employees" />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
