import './App.css';
import Form from './Form';
import {BrowserRouter as Router, Routes, Route, Redirect, Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path= "/Signup_Login_Pages" element={<Form/>}/>
            <Route path= "/Signup_Login_Pages/login" element={<Form/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
