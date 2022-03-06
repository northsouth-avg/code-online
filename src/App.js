// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import PrivateRouter from "./routers/specialrouter";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route exact path='/' component={Login}/>
                <Route exact path='/login' component={Login}/>
                <PrivateRouter path='/home' component={Home}/>
            </BrowserRouter>
        </div>
    );
}

export default App;
