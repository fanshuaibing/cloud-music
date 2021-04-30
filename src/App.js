import React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { GlobalStyle } from "./style";
import { IconStyle } from "./assets/iconfont/iconfont";
import { renderRoutes } from "react-router-config";
import routes from "./routes";
import store from "./store/index";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <GlobalStyle />
          <IconStyle />
          {renderRoutes(routes)}
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
