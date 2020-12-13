import React, { useState, useEffect } from "react";
import "./App.css";
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => (
  <div>
  <Navbar expand="lg" variant="light" bg="light">
    <Navbar.Brand href="#">Navbar</Navbar.Brand>
  </Navbar>
    <div>
  <Container fluid className="however">
  <Row>
      <Col className = "nopadding-left" xs = {6} md = {6}>HOWEVER</Col>
      <Col className = "nopadding-right" xs = {6} md = {6}><div class="h-text">HOWEVER</div></Col>
    </Row>
  </Container>
  <Container fluid className="main call"><Container className="inside"><p>This story <u>should not</u> end with them.</p><p>
<u>We</u> believe in accountability, transparency and the <br></br>
right of all people to participate in the<br></br>
decisions that will shape our future.</p>


<p>On this page you will find significant legislation <br></br>
and motions, debated in the Australian House of<br></br>
Representatives and Senate and relating to
climate <br></br> change, carbon emissions and 
environmental <br></br> protections.</p>


<p><u>You</u> will find how your elected officials voted and <br></br>
<u>their</u> track record of voting on these issues.</p>


<p><u>You</u> will find ways that you can make <u>your voice</u>
<br></br>heard  and ways to make a difference.</p></Container></Container>
  <Container fluid className="main sep"></Container>
  <Container fluid className="footer">Footer</Container>

           </div>
  </div>
);

export default App;
