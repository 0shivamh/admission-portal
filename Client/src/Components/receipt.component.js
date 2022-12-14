import {useEffect, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import BackbtnComponent from "./backbtn.component";
import {PDFDownloadLink} from "@react-pdf/renderer";
import DownloadPDFComponent from "./DownloadPDF.component";
import * as Icon from "react-bootstrap-icons";

const ReceiptComponent = () =>{
    const [stud, setStud] = useState([]);

    async function getStudent(){

        let stud_id=localStorage.getItem("stud_id")
        const response = await fetch(`http://localhost:5001/api/get_student/${stud_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data= await response.json();
        setStud(data)
        // console.table(data)
    }


    useEffect(() => {
        getStudent()
    },[])

    return(<>

                <Container className="mt-2">
                    <BackbtnComponent />
                    <hr/>
                    <p className="h4 ">Fess Receipt</p>
                    <hr/>
                    <Row xs={2}>
                        <Col sm={3}>
                            <div className="user"><b>Student Name:</b> {stud.name}</div>
                            <div className="user"><b>Student Contact:</b> {stud.contact}</div>
                            <div className="user"><b>Domain:</b> {stud.domain}</div>
                        </Col>

                        <Col>
                            <div className="user"><b>Total Amount:</b> {stud.totalAmount}</div>
                            <div className="user"><b>Discount Amount:</b> {stud.discountAmount}</div>
                            <div className="user"><b>Paid Amount:</b> {stud.paidAmount}</div>
                            <div className="user"><b>Dues Amount:</b> {stud.dueAmount}</div>
                            <div className="user"><b>Dues Payment Date: </b> {stud.duePayDate}</div>
                            <div className="user"><b> Remark:</b> {stud.remark}</div>

                        </Col>
                        <div className="user"><b>Signed by:</b> {sessionStorage.getItem('emp_name')}
                            <br/>  <span className="user"><b>Verified by</b> {sessionStorage.getItem('emp_id')}</span>
                        </div>

                        <button className="btn cbtn noprint" onClick={() => window.print()}>Print</button>
                    </Row>
                    <hr/>
                </Container>
        </>)
}
export default ReceiptComponent;
