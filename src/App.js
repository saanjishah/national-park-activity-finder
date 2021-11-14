import React from 'react';
import './App.css';
import Form from './components/Form';
import CardsPage from './components/CardsPage';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/national-park-activity-finder/" exact component={Home} />
        <Route path="/Parks" component={Parks} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;

const Home = () => {
  return (
    <div className="Home">
      <h1 className="title">National Park Activity Finder</h1>
      <div >
        <Form />
      </div>
    </div>
  )
}

const Parks = (props) => {
  return (
    <div>
      <CardsPage props = {props.location.state}/>    
    </div>
  )
}
