import React, { useState, useEffect } from "react";


import "./App.css";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Nav, NavItem, NavLink } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <div>
  <Navbar expand="lg" variant="light" bg="warning">
    <Navbar.Brand href="#">SeeChanges</Navbar.Brand>
    <Nav className = "top-right">
    <NavItem>
          <NavLink href="#">ABOUT THE DATA</NavLink>
        </NavItem>
         <NavItem>
         <NavLink href="#">ABOUT US</NavLink>
  </NavItem> 
        </Nav>
    </Navbar>
    <container className = "p1">
      Be the voice of the change
       you want to see around you.
      </container>
      <div className = "p2">
        Find how your elected officals have voted in relation with climate change and make your voice heard 
      </div>
      <container className = "p3">
        Because for more and more Australians climate change is no longer a mere question  of morality.
      </container>

     <p className = "p4">
        It is the very real and physical challenge of 
        bushfires, floods and droughts causing untold 
        damage to homes, livelihoods and lives.
      </p>

      <p className = "p5">
        It is the country - and the planet - that we will
         leave to those who come after us.
      </p>


  <div class="full-width-image">
    <img src={ process.env.PUBLIC_URL + '/img/bushfire.jpg' }></img>
      <div class="centered">It is still our greatest challenge </div>
</div>


 <Container className="heading">
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium </Container>  
  </div>
);

export default App;
