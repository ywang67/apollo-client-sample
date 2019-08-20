import React from "react";
import { AppRegistry, View } from "react-native-web";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { Feed } from "./views/Feed";
import { Detail } from "./views/Detail";
import { Likes } from "./views/Likes";
import { defaults, resolvers } from "./resolvers";
import { typeDefs } from "./schema";

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: "https://dog-graphql-api.glitch.me/graphql",
  cache,
  resolvers,
  typeDefs
});
console.log(cache);

cache.writeData({
  data: defaults
});
console.log('after writing: ', cache);

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <View>
        <Switch>
          <Route path="/" exact component={Feed} />
          <Route path="/likes" exact component={Likes} />
          <Route path="/:breed/:id" component={Detail} />
        </Switch>
      </View>
    </Router>
  </ApolloProvider>
);

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", { rootTag: document.getElementById("root") });
