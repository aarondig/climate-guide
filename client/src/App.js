import React from "react";
import "./App.css";

// PROBABLE FUTURES API KEY = FQCzxCCBAh0wih1Yx0DFqheeldF0T6FD
// PROBABLE FUTURES API PASSWORD = v6mbHDocvyWPM9pNYNBxvdZda1_yFq4DY_1QS5kVNWuGZGlDg4Lri89szt1KIe8W

import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  View,
  Card,
} from "@aws-amplify/ui-react";
import Assistant from "./apis/openai";

function App({ signOut }) {
  return (
    <View className="App">
      <Button onClick={signOut}>Sign Out</Button>
      <Assistant/>
    </View>
  );
}

export default withAuthenticator(App);
