import {useCallback, useEffect, useRef, useState} from "react";
import {  Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Container, Toast} from "react-bootstrap";
import BackbtnComponent from "../Components/backbtn.component";
import Webcam from "react-webcam";
import webcamRef from "react-chips/docs/static/manager.958779b5fb60b2065863.bundle";

const EditAdmissionPage= ()=>{
    let navigate = useNavigate();
    const [stud_data,setStudData] = useState([]);

    const [profile, setProfile] = useState('');
    const [name, setName] = useState(sessionStorage.getItem('name'));
    const [contact,setContact] =useState(sessionStorage.getItem('contact'));
    const [course,setCourse] = useState(sessionStorage.getItem('name'));
    const [domain,setDomain]= useState(sessionStorage.getItem('domain'));
    const [totalAmount,setTotalAmount] = useState(sessionStorage.getItem('totalAmount'))
    const [discountAmount,setDiscountAmount]= useState(sessionStorage.getItem('discountAmount'))
    const [paidAmount,setPaidAmount] = useState(sessionStorage.getItem('paidAmount'));
    const [dueAmount,setDueAmount] = useState(sessionStorage.getItem('dueAmount'));
    const [duePayDate, setDuePayDate] = useState(sessionStorage.getItem('duePayDate'));
    const [remark, setRemark]= useState(sessionStorage.getItem('remark'))

    async function getStudent(){

        let stud_id=localStorage.getItem("stud_id")
        const response = await fetch(`http://localhost:5001/api/get_student/${stud_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data= await response.json();
        setStudData(data)


    }

    //
    // setName(stud_data.name)
    // setContact(stud_data.contact)
    // setDomain(stud_data.domain)
    // setTotalAmount(stud_data.totalAmount)
    // setDiscountAmount(stud_data.discountAmount)
    // setPaidAmount(stud_data.paidAmount)
    // setDueAmount(stud_data.dueAmount)
    // setDuePayDate(stud_data.duePayDate)
    // setRemark(stud_data.remark)
    // console.table(data)

    async function updateAdmission(event){
        event.preventDefault()

        let stud_id=localStorage.getItem("stud_id")
        const response= await fetch(`http://localhost:5001/api/editAdmission/${stud_id}`,
            {
                method:'POST',
                headers:{
                    'x-access-token':localStorage.getItem('token'),
                    'email_id':localStorage.getItem('email'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // _id,
                    name,
                    contact,
                    // course,
                    domain,
                    totalAmount,
                    discountAmount,
                    paidAmount,
                    dueAmount,
                    duePayDate,
                    remark,

                }),

            })
        console.table(name)
        const data= await response.json();
        console.table(data)
        if(data.status==='okay'){
            Swal.fire(
                {title:'Admission updated successfully',
                    icon:'success',
                    confirmButtonColor: '#5ae4a7'}
            )
        }
        else if(data.status==='error'){
            Swal.fire(
                {title:'Failed to edit!',
                    text:'contact administrator!',
                    icon:'error',
                    confirmButtonColor: '#5ae4a7'}
            )
            // localStorage.clear();
            // navigate(`/`);
        }

    }
    useEffect(() => {
        // getStudent()
    },[])

    return(<>
        {/* was-validated */}
        <p className="display-5 text-center mt-4">Edit Admission Details</p>
        <Container>
            <BackbtnComponent/>
        </Container>

        <div className="login page-bg container text-center mt-4" onSubmit={updateAdmission}>



            <form className="center "  >

                <div className="row  gx-2">
                    <div className="col-sm">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput4" placeholder="20202020230"
                                   value={name}
                                   onChange={(e)=> setName(e.target.value)}
                                   required/>
                            <label htmlFor="floatingInput4">Student Name </label>
                        </div>

                    </div>
                    <div className="col-sm">
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingInput4" placeholder="20202020230"
                                   value={contact}
                                   onChange={(e)=> setContact(e.target.value)}
                                   required/>
                            <label htmlFor="floatingInput4">Student Contact Number </label>
                        </div>
                    </div>
                </div>

                <div className="row gx-2">
                    <div className="col">
                        <div className="row gx-2">
                            <div className="col">

                                <Toast bg="secondary" style={{color:"white"}}>
                                    <Toast.Body>Foundation</Toast.Body>
                                </Toast>
                                <Toast bg="secondary" style={{color:"white"}}>
                                    <Toast.Body>Foundation</Toast.Body>
                                </Toast>

                            </div>
                            <div className="col">
                                <div className="alert alert-info" role="alert">
                                    Test
                                </div>
                            </div>
                            <div className="col">
                                <div className="alert alert-info" role="alert">
                                    Target
                                </div>
                            </div>
                            <div className="col">
                                <div className="alert alert-info" role="alert">
                                    Apple
                                </div>
                            </div>
                        </div>

                        <div className="form-floating">
                            <select className="form-select" required id="floatingSelect1"
                                    value={domain}
                                    onChange={(e)=> setDomain(e.target.value)}
                            >
                                <option value="">Open this select </option>
                                <option value="IoT">1 </option>
                                <option value="IoT">2 </option>
                                <option value="IoT">3 </option>

                            </select>
                            <label htmlFor="floatingSelect1">Domains</label>
                        </div>

                    </div>

                    <div className="col">
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingInput4" placeholder="20202020230"
                                   value={totalAmount}
                                   onChange={(e)=> setTotalAmount(e.target.value)}
                                   required/>
                            <label htmlFor="floatingInput4">Total Amount </label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingInput4" placeholder="20202020230"
                                   value={discountAmount}
                                   onChange={(e)=> setDiscountAmount(e.target.value)}
                                   required/>
                            <label htmlFor="floatingInput4">Discounted Amount </label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingInput4" placeholder="20202020230"
                                   value={paidAmount}
                                   onChange={(e)=> setPaidAmount(e.target.value)}
                                   required/>
                            <label htmlFor="floatingInput4">Paid Amount </label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingInput4" placeholder="20202020230"
                                   value={dueAmount}
                                   onChange={(e)=> setDueAmount(e.target.value)}
                                   required/>
                            <label htmlFor="floatingInput4">Dues Amount </label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="date" className="form-control" id="floatingInput4" placeholder="20202020230"
                                   value={duePayDate}
                                   onChange={(e)=> setDuePayDate(e.target.value)}
                                   required/>
                            <label htmlFor="floatingInput4">Dues Payment Date </label>
                        </div>

                        <div className="form-floating mb-3">
                            <textarea className="form-control" placeholder="Leave a comment here" id="remark"
                                      value={remark}
                                      onChange={(e)=> setRemark(e.target.value)}
                                      style={{height: 100}}></textarea>
                            <label htmlFor="remark">Remark?</label>
                        </div>

                    </div>
                </div>


                <button type="submit" className="btn cbtn mt-2 mb-2" >Update</button>
            </form>

            {/*<Link to="/viewAdmissions" className="btn cbtn mt-2 mb-2">View</Link>*/}

        </div>
        <ToastContainer />
    </>)
}

export default EditAdmissionPage;
