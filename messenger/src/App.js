import './styles/App.css';
import { useEffect,useState,useContext } from 'react';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import {} from 'socket.io-client';
import Mainpage from './Mainpage';
import Signin from './Signin';
import Home from './Home';


function App() {
  const [user,setUser] = useState(null);
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path='/'>
              <Mainpage/>
            </Route>
            <Route path='/signin'>
              <Signin/>
            </Route>
            <Route path='/user'>
              <Home/>
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
