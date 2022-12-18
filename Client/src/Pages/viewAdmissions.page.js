import {useEffect, useRef, useState} from "react";
import {Badge, Button, Card, Col, Container, ListGroup, Row, Table} from "react-bootstrap";
import Swal from "sweetalert2";

import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'

import BackbtnComponent from "../Components/backbtn.component";
import DownloadPDFComponent from "../Components/DownloadPDF.component";
import {Link, useNavigate, useParams} from "react-router-dom";

import * as Icon from 'react-bootstrap-icons';



const ViewAdmissionsPage = ()=>{

    const [admissionID,setAdmissionId]= useState('')

    const [stud_admissions, setStud_Admissions] = useState([]);
    const [query, setQuery] = useState("")

    const [len, setLen] = useState();
    let tmp;
    const navigate = useNavigate();


    async function getAdmissionDetails(){
        const response= await fetch("http://localhost:5001/api/view_admissions");
        const data= await response.json();
        setStud_Admissions(data);
        tmp=data
        // console.log(tmp)
        setLen(data.length);
    }

    async function removeAdmission(stud_id){
        // let =admissionID
        // console.log(stud_id)

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


    useEffect(() => {
        getAdmissionDetails()
    },[])

    function downloadReciept(_id) {

    }

    return(<>


        <div className="m-4">

            <BackbtnComponent/>
            <Row>
                <Col>
                    <p className="h5  mt-2">Total Admissions:{len} </p>
                </Col>
                <Col sm={4} style={{textAlign:"right"}}>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2 mb-2" type="search" onChange={event => setQuery(event.target.value)} placeholder="Search" aria-label="Search"/>
                    </form>
                </Col>
            </Row>

            <Table striped bordered hover variant="dark" className="shadow">
                <thead>
                <tr>
                    <th>Sr No</th>
                    <th>Student Name</th>
                    <th>Student Contact</th>
                    <th>Domain</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
            {

                stud_admissions.filter(admission => {
                    if (query === '') {
                        return admission;
                    } else if (admission.name.toLowerCase().includes(query.toLowerCase())) {
                        return admission;
                    }
                }).map((e, id) => (
                    <tr>
                        <td>{id+1}</td>
                        <td>{e.name}</td>
                        <td>{e.contact}</td>
                        <td>{e.domain}</td>
                        <td style={{textAlign:"right"}}>

                            <Button title="View" className="op-btn m-2" variant="light" size="sm" onClick={ ()=> {
                                localStorage.setItem("stud_id",e._id)
                                // window.open("/dashboard/fees_receipt","height=200,width=200")
                                navigate("/dashboard/fees_receipt")
                                // navigate("")
                            }}>
                                <Icon.EyeFill />
                            </Button>

                            <Button className="op-btn m-2" variant="light" size="sm"  title="Edit details"
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

                            <Button className="op-btn m-2" onClick={()=>{removeAdmission(stud_admissions[id]._id)}} variant="light" size="sm" title="Delete" >
                                <Icon.TrashFill />
                            </Button>

                            <Button className="op-btn m-2" onClick={()=>{downloadReciept(stud_admissions[id]._id)}} variant="light" size="sm" title="Download Fees Receipt" >
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
                                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' :  <Icon.Download style={{color:"black"}} />)}
                                </PDFDownloadLink>

                            </Button>

                        </td>
                    </tr>

                ))
            }

                {/*{stud_admissions.map((e,id) => (*/}
                {/*    */}
                {/*))}*/}
                </tbody>
            </Table>

        </div>

        </>)

}
export default ViewAdmissionsPage;
