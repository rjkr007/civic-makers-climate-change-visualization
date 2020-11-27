import React, { useState, useEffect } from "react";

import "./App.css";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => (
  <div>
  <Navbar expand="lg" variant="light" bg="light">
    <Navbar.Brand href="#">Navbar</Navbar.Brand>
  </Navbar>
  <div class="full-width-image">
    <img src={ process.env.PUBLIC_URL + '/img/bushfire.jpg' }></img>
    </div>
  <Container className="heading">
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium </Container>
  </div>
);

export default App;
