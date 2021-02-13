import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Admin    from './components/Admin';
import Login    from './components/Login'
import Register from './components/Register';
import User     from './components/User';
import Home     from './components/Home'

import './styles/base.scss'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/' component={Login} />
        <Route exact path='/user' component={User} />
        <Route exact path='/admin' component={Admin} />
        <Route exact path='/login' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
