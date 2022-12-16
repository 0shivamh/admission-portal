import { useState } from "react";
import {  Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Container} from "react-bootstrap";
import BackbtnComponent from "../Components/backbtn.component";

const AdAdmission= ()=>{
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [contact,setContact] =useState('');
    // const [course,setCourse] = useState('');
    const [domain,setDomain]= useState('');
    const [totalAmount,setTotalAmount] = useState('')
    const [discountAmount,setDiscountAmount]= useState('')
    const [paidAmount,setPaidAmount] = useState('');
    const [dueAmount,setDueAmount] = useState('');
    const [duePayDate, setDuePayDate] = useState('');
    const [remark, setRemark]= useState('')




    async function handleAdmission(event){
        event.preventDefault()

        const response= await fetch("http://localhost:5001/api/submitAdmission",
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
        const data= await response.json();

        if(data.status==='okay'){
            Swal.fire(
                {title:'Admission processed successfully',
                    icon:'success',
                    confirmButtonColor: '#5ae4a7'}
            )
            localStorage.clear();
            navigate(`/`);
        }
        else if(data.status==='error-val'){
            Swal.fire(
                {title:'Admission entry already exist',
                    text:'In case if you have any problem please contact administrator!',
                    icon:'warning',
                    confirmButtonColor: '#5ae4a7'}
            )
            localStorage.clear();
            navigate(`/`);

        }
        else if(data.status==='error'){
            Swal.fire(
                {title:'Failed to submit!',
                    text:'contact administrator!',
                    icon:'error',
                    confirmButtonColor: '#5ae4a7'}
            )
            // localStorage.clear();
            // navigate(`/`);
        }

    }


    return(<>
        {/* was-validated */}
        <p className="display-5 text-center mt-4">Admission Dashboard</p>
        <Container>
            <BackbtnComponent/>
        </Container>

        <div className="login page-bg container text-center mt-4" onSubmit={handleAdmission}>



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
                                <div className="alert alert-info" role="alert">
                                    Foundation
                                </div>
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


                <button type="submit" className="btn cbtn mt-2 mb-2" >Add</button>
            </form>

            <Link to="/viewAdmissions" className="btn cbtn mt-2 mb-2">View</Link>

        </div>
        <ToastContainer />
    </>)
}

export default AdAdmission;
