import { useState } from "react";
import {  Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import BackbtnComponent from "./backbtn.component";
import * as Icon from "react-bootstrap-icons";

const Dashboard= ()=>{
    const navigate = useNavigate();


    return(<>
        {/* was-validated */}
       <Container >
           <p className="h4 m-2 ">Dashboard</p>
           <BackbtnComponent/>
           <Row xs={2} className="text-center">
               <Col>
                   <Card v className="shadow m-2">
                       <Link to="/dashboard/admission" className="card-body ccard" >
                            Add Admission
                       </Link>
                   </Card>
               </Col>
               <Col>
                   <Card  className="shadow m-2">
                       <Link to="/dashboard/viewAdmissions" className="card-body ccard" >
                           View Admission
                       </Link>
                   </Card>
               </Col>
           </Row>
       </Container>
    </>)
}

export default Dashboard;
