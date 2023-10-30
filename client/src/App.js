import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import {BrowserRouter, Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <LoginSignup/>
    </div>
  );
}

export default App;
