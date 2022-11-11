// Libraries.

import { BrowserRouter, Route, Routes } from "react-router-dom";

// Dependencies.

import { AuthenticationProvider } from "./components/AuthenticationContext";
import SecurePath from "./components/SecurePath";
import Root from "./routes/root";
import Home from "./routes/home";

const App = () => {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route
            path="/home"
            element={
              <SecurePath>
                <Home />
              </SecurePath>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthenticationProvider>
  );
};

export default App;
