import {useEffect, useState} from "react";
import {  Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import BackbtnComponent from "./backbtn.component";
import * as Icon from "react-bootstrap-icons";

const Dashboard= ()=>{
    const navigate = useNavigate();

    const [Officer,setOfficer]=useState([])

    async function getEmp(){
        const email=localStorage.getItem('email')
        const response= await fetch(`http://localhost:5001/api/employee/${email}`,);
        const data= await response.json();
        setOfficer(data)
    }

    useEffect(()=>{
        getEmp();
    },[])

    return(<>
        {/* was-validated */}
       <Container >
           <p className="h4 m-2 ">Dashboard</p>
           {/*<BackbtnComponent/>*/}

           <Card className="d-inline-flex m-2">
               <Card.Header style={{background:"#242B2E", color:"white"}}>
                   <Card.Title>Current Admission Officer Login Details:</Card.Title>
               </Card.Header>
               <Card.Body>
                   <Card.Text><b>Employee ID:</b> {Officer.emp_id}</Card.Text>
                   <Card.Text><b>Name: </b>{Officer.name} </Card.Text>
                   <Card.Text><b>Email: </b> <a href={"mailto:"+Officer.email}>{Officer.email}</a> </Card.Text>
                   <Card.Text><b>Contact: </b><a href={"tel:"+Officer.email}>{Officer.phone}</a> </Card.Text>
                   <Card.Text><b>Designation: </b>{Officer.designation}</Card.Text>
               </Card.Body>
           </Card>

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
