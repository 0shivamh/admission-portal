import {useEffect, useRef, useState} from "react";
import {Badge, Button, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import Swal from "sweetalert2";
import print from 'ink-html'
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'

import BackbtnComponent from "../Components/backbtn.component";
import DownloadPDFComponent from "../Components/DownloadPDF.component";
import {Link, useNavigate, useParams} from "react-router-dom";

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

    function downloadReciept(_id) {

    }

    return(<>


        <Container className="m-2">
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
                    <Button title="View" className="m-2" variant="dark" size="sm" onClick={ ()=> {
                         localStorage.setItem("stud_id",e._id)
                        // window.open("/dashboard/fees_receipt","height=200,width=200")
                        navigate("/dashboard/fees_receipt")
                        // navigate("")
                    }}>
                        <Icon.EyeFill />
                    </Button>

                    <Button className="m-2" variant="dark" size="sm"  title="Edit details"
                    onClick={()=>{
                        localStorage.setItem("stud_id",e._id)
                        sessionStorage.setItem("name", e.name);
                        sessionStorage.setItem("contact", e.contact);
                        sessionStorage.setItem("totalAmount", e.totalAmount);
                        sessionStorage.setItem("discountAmount", e.discountAmount);
                        sessionStorage.setItem("paidAmount", e.paidAmount);
                        sessionStorage.setItem("dueAmount", e.dueAmount);
                        sessionStorage.setItem("duePayDate", e.duePayDate);
                        sessionStorage.setItem("remark", e.remark);
                        navigate("/dashboard/editAdmission")}
                    }>
                        <Icon.PencilFill />
                    </Button>

                    <Button className="m-2" onClick={()=>{removeAdmission(stud_admissions[id]._id)}} variant="dark" size="sm" title="Delete" >
                        <Icon.TrashFill />
                    </Button>

                    <Button className="m-2" onClick={()=>{downloadReciept(stud_admissions[id]._id)}} variant="dark" size="sm" title="Download Fees Receipt" >
                        <PDFDownloadLink document={<DownloadPDFComponent name={stud_admissions[id].name}
                                                                         contact={stud_admissions[id].contact}
                                                                         domain={stud_admissions[id].domain}
                                                                         totalAmount={stud_admissions[id].totalAmount}
                                                                         discountAmount={stud_admissions[id].discountAmount}
                                                                         paidAmount={stud_admissions[id].paidAmount}
                                                                         dueAmount={stud_admissions[id].dueAmount}
                                                                         duePayDate={stud_admissions[id].duePayDate}
                                                                         remark={stud_admissions[id].remark}

                        />} fileName={stud_admissions[id].name+"-Fees-Receipt.pdf"}>
                            {({ blob, url, loading, error }) => (loading ? 'Loading document...' :  <Icon.Download style={{color:"white"}} />)}
                        </PDFDownloadLink>

                    </Button>

                </ListGroup.Item>

                ))}
            </ListGroup>
        </Container>

        </>)

}
export default ViewAdmissionsPage;
