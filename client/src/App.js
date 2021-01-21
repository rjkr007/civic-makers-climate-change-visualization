import React, { useState, useEffect } from "react";


import "./App.css";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import {Row, Col} from 'react-bootstrap';


import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <div>
  <Container fluid className="fluid"><Navbar className = "App-header" expand="lg">
    <Navbar.Brand className="title" href="#" style={{color: "#C98030"}} >SeeChange.</Navbar.Brand>
  
    </Navbar>
    </Container>
    <Container fluid className = "p1">
      Be the voice of the change <br></br>
       you want to see around you.
       <div className = "p2">
         <p></p>
         Find how your elected officals have voted in relation with climate change and <u>make your voice heard.</u>
       </div>
      </Container>

      <Container fluid className="main call"><Container className="inside">
      <h1 className = "paragraph-headings">
      Because for more and more <br></br>
      Australians climate change is <br></br>
      no longer a mere question  of
      <br></br>morality.</h1>

      <p>It is the very real and physical challenge of
      bushfires, floods and droughts causing untold
      damage to homes, livelihoods and lives.</p>
      <p>It is the country - and the planet - that we will leave to those who come after us.</p>

      </Container></Container>


  <div class="full-width-image">
    <img src={ process.env.PUBLIC_URL + '/img/bushfire.jpg' }></img>
      <div class="centered">  <h1 className = "paragraph-headings"> It is still our greatest challenge. </h1></div>
</div>
  <div>
<Container fluid className="however">
<Row>
    <Col className = "nopadding-left" xs = {6} md = {6}>HOWEVER</Col>
    <Col className = "nopadding-right" xs = {6} md = {6}><div class="h-text">HOWEVER</div></Col>
  </Row>
</Container>
<Container fluid className="backgroundforcall call"><Container className="inside"><p>This story <u>should not</u> end with them.</p><p>
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
