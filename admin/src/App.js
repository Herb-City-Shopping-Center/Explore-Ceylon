import './App.css';
import {Route} from 'react-router-dom'
import LoginPage from './pages/Authentication/LoginPage';
import SignupPage from './pages//Authentication/SignupPage';
import ProfilePage from './pages/ProfilePage';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Route path="/admin" component={Dashboard} exact />
      <Route path="/admin/signup" component={SignupPage} exact />
      <Route path="/admin/login" component={LoginPage} exact />
      <Route path="/admin/profile" component={ProfilePage} exact />
    </div>
  );
}

export default App;
