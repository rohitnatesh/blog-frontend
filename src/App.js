// Libraries.

import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Dependencies.

import { AuthenticationProvider } from './components/AuthenticationContext';
import SecurePath from './components/SecurePath';
import Root from './routes/root';
import Article from './routes/article';
import SignUp from './routes/signup';
import SpecificArticle from './routes/specificArticle';
import NewArticle from './routes/newArticle';

// Private.

// Public.

const App = () => {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Root />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="articles">
            <Route
              index
              element={
                <SecurePath>
                  <Article />
                </SecurePath>
              }
            />
            <Route
              path="new"
              element={
                <SecurePath>
                  <NewArticle />
                </SecurePath>
              }
            />
            <Route
              path=":articleId"
              element={
                <SecurePath>
                  <SpecificArticle />
                </SecurePath>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  );
};

export default App;
