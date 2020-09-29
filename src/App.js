import React, { Suspense, lazy } from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import Loading from "./components/common/Loading";  /* Added Loading spinner */

const AlbumItemScreen = lazy(() =>
  import("./screens/AlbumItemScreen")
);

const AlbumListScreen = lazy(() =>
  import("./screens/AlbumListScreen")
);

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>  
        <Switch>
          <Route path="/albums" exact component={AlbumListScreen} />
          <Route path="/albums/:id" exact component={AlbumItemScreen} />
          <Redirect from="/" to="/albums" />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
