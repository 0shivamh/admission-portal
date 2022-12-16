import {useEffect, useRef, useState} from "react";
import {Badge, Button, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import Swal from "sweetalert2";
import print from 'ink-html'
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'

import BackbtnComponent from "../Components/backbtn.component";
import DownloadPDFComponent from "../Components/DownloadPDF.component";
import {useNavigate, useParams} from "react-router-dom";

import * as Icon from 'react-bootstrap-icons';


const ViewAdmissionsPage = ()=>{

    const [admissionID,setAdmissionId]= useState('')

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

    async function removeAdmission(stud_id){
        // let =admissionID
        console.log(stud_id)

        Swal.fire(
            {title:'Are you Sure to remove?',
                icon:'warning',
                confirmButtonColor: 'black', allowOutsideClick: false,
                showCancelButton: true,
                cancelButtonColor: '#d33',
                allowEscapeKey: true,}
        ).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(`http://localhost:5001/api/remove_student/${stud_id}`, {
                    method: 'POST',
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                        'email_id': localStorage.getItem('email'),
                        'Content-Type': 'application/json'
                    }

                })
                const data = await response.json();

                if (data.status === 'okay') {
                    Swal.fire(
                        {
                            title: 'Admission Deleted Successful!',
                            icon: 'success',
                            confirmButtonColor: '#242B2E', allowOutsideClick: false,
                            allowEscapeKey: false,
                        }
                    )
                    getAdmissionDetails()

                }
                else if (data.status === 'error') {
                    Swal.fire(
                        {
                            title: 'Please try Again!',
                            icon: 'error',
                            confirmButtonColor: '#242B2E', allowOutsideClick: false,
                            allowEscapeKey: false,
                        }
                    )
                }
            }
        })

    }

    async function updateAdmission(stud_id){
        // let =admissionID
        console.log(stud_id)



    }

    useEffect(() => {
        getAdmissionDetails()
    },[])

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
                    <Button className="m-2" variant="dark" size="sm" onClick={ ()=> {
                         localStorage.setItem("stud_id",e._id)
                        window.open("/dashboard/fees_receipt","height=200,width=200")
                        // navigate("")
                    }}>
                        <Icon.EyeFill />
                    </Button>

                    <Button className="m-2" variant="dark" size="sm" >
                        <Icon.PencilFill />
                    </Button>

                    <Button className="m-2" onClick={()=>{removeAdmission(stud_admissions[id]._id)}} variant="dark" size="sm" >
                        <Icon.TrashFill />
                    </Button>



                </ListGroup.Item>

                ))}
            </ListGroup>

            {/*<Row xs={2}>*/}

            {/*    {stud_admissions.map((e) => (*/}



            {/*            <Col >*/}
            {/*            <Card  className="shadow m-2">*/}
            {/*                <Card.Body id="printable">*/}
            {/*                    <div className="user"><b>Student Name:</b> {e.name}</div>*/}
            {/*                    <div className="user"><b>Student Contact:</b> {e.contact}</div>*/}
            {/*                    <div className="user"><b>Domain:</b> {e.domain}</div>*/}
            {/*                    <div className="user"><b>Total Amount:</b> {e.totalAmount}</div>*/}
            {/*                    <div className="user"><b>Discount Amount:</b> {e.paidAmount}</div>*/}
            {/*                    <div className="user"><b>Paid Amount:</b> {e.paidAmount}</div>*/}
            {/*                    <div className="user"><b>Dues Amount:</b> {e.dueAmount}</div>*/}
            {/*                    <div className="user"><b>Dues Payment Date: </b> {e.duePayDate}</div>*/}
            {/*                    <div className="user"><b> Remark:</b> {e.remark}</div>*/}
            {/*                </Card.Body>*/}
            {/*                <button className="btn cbtn" >D</button>*/}
            {/*            </Card>*/}
            {/*                <PDFDownloadLink document={<DownloadPDFComponent />} fileName="somename.pdf">*/}
            {/*                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}*/}
            {/*                </PDFDownloadLink>*/}
            {/*            </Col>*/}
            {/*        ))}*/}
            {/*</Row>*/}



        </Container>




        </>)

}
export default ViewAdmissionsPage;
