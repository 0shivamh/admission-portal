import {useEffect, useRef, useState} from "react";
import {Badge, Button, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import Swal from "sweetalert2";
import print from 'ink-html'
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'

import BackbtnComponent from "../Components/backbtn.component";
import DownloadPDFComponent from "../Components/DownloadPDF.component";
import {useNavigate, useParams} from "react-router-dom";



const ViewAdmissionsPage = ()=>{

    const [stud_admissions, setStud_Admissions] = useState([]);
    const [len, setLen] = useState();
    let tmp;
    const navigate = useNavigate();


    async function getAdmissionDetails(){
        const response= await fetch("http://localhost:5001/api/view_admissions");
        const data= await response.json();
        setStud_Admissions(data);
        tmp=data
        console.log(tmp)
        setLen(data.length);
    }

    useEffect(() => {
        getAdmissionDetails()
    },[])

let stud_id;
    return(<>


        <Container>
            <p className="h3 text-center mt-2">Total Admissions:{len} </p>
            <BackbtnComponent/>

            <ListGroup as="ol" numbered>

            {stud_admissions.map((e,id) => (

                <ListGroup.Item key="n"
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <p>Name: {e.name}</p>
                    </div>
                    <Badge bg="primary" pill onClick={ ()=> {
                         localStorage.setItem("stud_id",e._id)
                        navigate("/dashboard/fees_receipt")
                    }}>
                           View
                    </Badge>
                </ListGroup.Item>

                ))}
            </ListGroup>

            <Row xs={2}>

                {stud_admissions.map((e) => (



                        <Col >
                        <Card  className="shadow m-2">
                            <Card.Body id="printable">
                                <div className="user"><b>Student Name:</b> {e.name}</div>
                                <div className="user"><b>Student Contact:</b> {e.contact}</div>
                                <div className="user"><b>Domain:</b> {e.domain}</div>
                                <div className="user"><b>Total Amount:</b> {e.totalAmount}</div>
                                <div className="user"><b>Discount Amount:</b> {e.paidAmount}</div>
                                <div className="user"><b>Paid Amount:</b> {e.paidAmount}</div>
                                <div className="user"><b>Dues Amount:</b> {e.dueAmount}</div>
                                <div className="user"><b>Dues Payment Date: </b> {e.duePayDate}</div>
                                <div className="user"><b> Remark:</b> {e.remark}</div>
                            </Card.Body>
                            <button className="btn cbtn" >D</button>
                        </Card>
                            <PDFDownloadLink document={<DownloadPDFComponent />} fileName="somename.pdf">
                                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                            </PDFDownloadLink>
                        </Col>
                    ))}
            </Row>



        </Container>




        </>)

}
export default ViewAdmissionsPage;
