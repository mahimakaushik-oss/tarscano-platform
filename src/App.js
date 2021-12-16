import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home } from './Components/Home'
import { Login } from './Components/Login'
import { Signup } from './Components/Signup'
import { NotFound } from './Components/NotFound'
import { AddProducts } from './Components/AddProducts'
import { Cart } from './Components/Cart'
import Aboutus from './Components/Aboutus'
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import SellerReg from './Components/SellerReg';
import SellerHome from './Components/SellerHome'
import SellerLogin from './Components/SellerLogin'
export const App = () => {
  return (
    <BrowserRouter>
    
      <Switch>

        <Route exact path="/" component = {Home}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        <Route path="/seller-dashboard" component={SellerHome}/>
        <Route path="/add-products" component={AddProducts}/>
        <Route path="/cart" component={Cart}/>    
        <Route path="/aboutus" component={Aboutus}/>
        <Route path="/sellerreg" component={SellerReg}/>
        <Route path="/sellerlogin" component={SellerLogin}/>
        
        
        <Route component={NotFound}/>        
      </Switch>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
