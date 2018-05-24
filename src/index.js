import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import "./index.css"

import Navbar from "./navbar"
import Family from "./family"
import Chores from "./chores"
import Redeemables from "./redeemables"
import Redeemable from "./components/redeemable"
import Member from "./components/member"

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  background: "inherit",
}

const { protocol, hostname } = window.location

const client = new ApolloClient({
  uri: `${protocol}//${hostname}:4000/graphql`,
})

const App = () => (
  <ApolloProvider client={client}>
    <div style={styles} id="app">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Family} />
        <Route path="/family" component={Family} />
        <Route path="/chores" component={Chores} />
        <Route exact path="/redeemables" component={Redeemables} />
        <Route path="/redeemables/edit/:redeemableId" component={Redeemable} />
        <Route path="/member/:memberId" component={Member} />
      </Switch>
    </div>
  </ApolloProvider>
)

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
)
