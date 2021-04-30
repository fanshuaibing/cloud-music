import React from "react";
import { HashRouter } from "react-router-dom";
import { GlobalStyle } from "./style";
import { IconStyle } from "./assets/iconfont/iconfont";
import { renderRoutes } from "react-router-config";
import routes from "./routes";
function App() {
  return (
    <HashRouter>
      <div className="App">
        <GlobalStyle />
        <IconStyle />
        {renderRoutes(routes)}
      </div>
    </HashRouter>
  );
}

export default App;
