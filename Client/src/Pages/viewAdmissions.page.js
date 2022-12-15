import {useEffect, useState} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";



const ViewAdmissionsPage = ()=>{
    const [stud_admissions, setStud_Admissions] = useState([]);
    const [len, setLen] = useState();
    let tmp;

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

    return(<>

        <Container>
            <p className="h6 text-center mt-2">Total Admissions:{len} </p>

            <Row xs={2}>

                    {stud_admissions.map((e) => (
                        <Col >
                        <Card  className="shadow m-2">
                            <Card.Body>
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
                        </Card>
                        </Col>

                    ))}

            </Row>

        </Container>




        </>)

}
export default ViewAdmissionsPage;
