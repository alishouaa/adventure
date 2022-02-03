import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddProduct from './product/Add-Product'
import AddTour from './Component/tour/Add-Tour'
import Home from './Component/Home';
import AdminLogin from './Component/register/Admin-login';
import Product from './product/Product';
import ProductOne from './product/ProductOne'
import Tour from './Component/tour/Tour'
import TourOne from './Component/tour/TourOne'
import GetPostTour from './Component/tour/get-tour';
import Payment from './Component/Payment';
import AddImage from './Component/Add-Image'
import GetOrderProduct from './product/get-product';
import Mix from './Component/Mix';
import Control from './Component/Control';
import Cal from './Component/Cal';
import Termes from './Component/Termes';
import About from './Component/About';
import TermeAdmin from './Component/Add-Terme';
import AddNews from './Component/Add-News';
import AddFeature from './Component/Add-feature';
import AddMember from './Component/Add-member';
import EditOpinion from './Component/Editopinion';
import GetEmail from './Component/Get-Email';
import PayTour from './Component/tour/Payment-tour'
const App = () => {

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/admin-user' component={AdminLogin} />
          <Route path='/Product' component={Product} />
          <Route path='/product-one' component={ProductOne} />
          <Route path='/Tour' component={Tour} />
          <Route path='/tour-one' component={TourOne} />
          <Route path='/Cal-me' component={Cal} />
          <Route path='/Payment' component={Payment} />
          <Route path='/Termes' component={Termes} />
          <Route path='/About' component={About} />
          <Route path='/payment-tour' component={PayTour} />
          {/* {localStorage.getItem("_id") === "61d85783812ba10417195a76" ?
            <Switch>
          <Route path='/Control' component={Control} />
          </Switch>
            :
            <div></div>
          } */}
          <Route path='/Control' component={Control} />

        </Switch>
      </div>
    </Router>
  );

}

export default App;
