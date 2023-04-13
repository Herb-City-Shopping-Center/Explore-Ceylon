import './App.css';
import {Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/Authentication/LoginPage';
import SignupPage from './pages//Authentication/SignupPage';
import ProfilePage from './pages/ProfilePage';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact />
      <Route path="/signup" component={SignupPage} exact />
      <Route path="/login" component={LoginPage} exact />
      <Route path="/profile" component={ProfilePage} exact />
    </div>
  );
}

export default App;
