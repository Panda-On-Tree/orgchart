import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Bounce, ToastContainer, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
<BrowserRouter basename='/ess/'>
    <App />
    <ToastContainer limit={1} transition={Zoom} style={{zIndex:'99999999'}}/>
</BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
