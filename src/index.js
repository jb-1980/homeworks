import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import "./client/index.css"

import Navbar from "./client/navbar"
import Family from "./client/family"
import Chores from "./client/chores"
import Redeemables from "./client/redeemables"
import Redeemable from "./client/components/redeemable"
import Member from "./client/components/member"

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  background: "inherit"
}

const { protocol, hostname, port } = window.location

const client = new ApolloClient({
  uri: `${protocol}//${hostname}:${port}/graphql`
})

window.__HOMEWORKS_USER__ = {
  firstname: "Joseph",
  lastname: "Gilgen",
  username: "jgilgen",
  username_slug: "jgilgen"
}
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
