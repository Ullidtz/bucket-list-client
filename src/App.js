import React, { Component } from 'react';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import BucketBullets from './components/BucketBullets.js';
import './App.css';

class App extends Component {
  client;
  constructor(props){
    super(props);
    this.client = new ApolloClient({
      uri: "http://localhost:4000"
    });
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Bucket List</h1>
          </header>
          <div className="App-bodyz">
            <BucketBullets/>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
