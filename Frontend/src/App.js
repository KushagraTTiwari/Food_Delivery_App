import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './screens/Signup.js';
import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom';
// import { CartProvider } from './componenets/ContextReducer.js';
import Cart from './componenets/Cart.js';
import Checkout from './screens/Checkout.js';

function App() {
  return (
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <Router>
          <div>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<Signup />} />
              <Route exact path='/cart' element={<Cart />} />
              <Route exact path='/checkout' element={<Checkout />} />
            </Routes>
          </div>
        </Router>
      </SnackbarProvider>
  );
}

export default App;
