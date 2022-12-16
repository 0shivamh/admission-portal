import {useEffect, useState} from "react";
import {Card} from "react-bootstrap";

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

        <Card  className="shadow m-2">
            <Card.Body id="printable">
                <div className="user"><b>Student Name:</b> {stud.name}</div>
                <div className="user"><b>Student Contact:</b> {stud.contact}</div>
                <div className="user"><b>Domain:</b> {stud.domain}</div>
                <div className="user"><b>Total Amount:</b> {stud.totalAmount}</div>
                <div className="user"><b>Discount Amount:</b> {stud.paidAmount}</div>
                <div className="user"><b>Paid Amount:</b> {stud.paidAmount}</div>
                <div className="user"><b>Dues Amount:</b> {stud.dueAmount}</div>
                <div className="user"><b>Dues Payment Date: </b> {stud.duePayDate}</div>
                <div className="user"><b> Remark:</b> {stud.remark}</div>
            </Card.Body>
            <button className="btn cbtn" >D</button>
        </Card>

        </>)
}
export default ReceiptComponent;
