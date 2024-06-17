import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "components/header";
import Topic from "view/topic";
import Article from "view/article";
import User from "view/user";
import About from "view/about";
import NotFound from "view/not-found";
import Layout, { Fixed, Main } from "./style";
import NavLink from "components/nav-link";
const list = [
  { name: "首页", route: "/topic/all" },
  { name: "返回", route: "/about" },
]
const BaseLayout = () => {
  return (
    <Layout top={92}>
      <Fixed>
        <Header logo={require("assets/logo.svg")} />
        <NavLink list={list} />
      </Fixed>
      <Switch>
        <Redirect from={"/"} to={"/topic/all"} exact />
        <Route path={"/topic/:tag"} component={Topic} exact />
        <Main>
          <Route path={"/article/:id"} component={Article} exact />
          <Route path={"/user/:name"} component={User} exact />
          <Route path={"/about"} component={About} exact />
          <Route path={"*"} component={NotFound} />
        </Main>
      </Switch>
    </Layout>
  );
};

export default React.memo(BaseLayout);
