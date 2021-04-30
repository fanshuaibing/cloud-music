import React, { memo } from "react";
import { renderRoutes } from "react-router-config";

const Home = (props) => {
  const { route } = props;
  return <div> {renderRoutes(route.routes)}</div>;
};

export default memo(Home);
