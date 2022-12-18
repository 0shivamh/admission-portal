import { useCallback, useRef, useState } from "react";
import {  Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Container, Toast} from "react-bootstrap";
import BackbtnComponent from "../Components/backbtn.component";
import Webcam from "react-webcam";
import webcamRef from "react-chips/docs/static/manager.958779b5fb60b2065863.bundle";

const AdAdmission= ()=>{
    let navigate = useNavigate();

    const [profile, setProfile] = useState('https://www.w3schools.com/w3images/avatar2.png');
    const [name, setName] = useState('');
    const [contact,setContact] =useState('');
    const [course,setCourse] = useState('');
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
        }
        else if(data.status==='error-val'){
            Swal.fire(
                {title:'Admission entry already exist',
                    text:'In case if you have any problem please contact administrator!',
                    icon:'warning',
                    confirmButtonColor: '#5ae4a7'}
            )

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

    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        // alert("hi")
        const imageSrc = webcamRef.current.getScreenshot();
        setProfile(imageSrc);
    }, [webcamRef, setProfile]);

    return(<>
        {/* was-validated */}
        <p className="h3 text-center mt-4">Add Admission</p>
        <hr/>
        <Container>
            <BackbtnComponent/>
        </Container>

        <div className="login page-bg container text-center mt-4" >

            <form onSubmit={handleAdmission}>
                <div className="row  " >

                    <div className="col-2 d-flex align-items-center mb-2  " >
                        <img className="img-thumbnail cimg rounded float-start " src={profile} />
                    </div>
                    <div className="col-3 d-flex align-items-center">
                        <div className="input-group mb-2">
                            {/*<label id="idcard" className="form-label ">Take a Profile</label>*/}
                            <div className="input-group ">
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    height={140}
                                    screenshotFormat="image/jpeg"
                                    minScreenshotWidth={1040}
                                    minScreenshotHeight={140}
                                />
                                <button onClick={capture} className="btn btn-secondary">Capture</button>
                            </div>

                        </div>
                    </div>
                    <div className="col-3 d-flex align-items-center">
                        <div className="input-group mb-2">
                            <label id="idcard" className="form-label ">Choose Profile</label>
                            <div className="input-group ">
                                <input type="file" name="idcard"  className="form-control"
                                       onChange={(e) => setProfile(URL.createObjectURL(e.target.files[0]))}   />
                            </div>
                        </div>
                    </div>

                </div>



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
                                <option value="IoT">IOT</option>
                                <option value="DS">DS</option>
                                <option value="AI">AI</option>

                            </select>
                            <label htmlFor="floatingSelect1">Domains</label>
                        </div>

                    </div>

                    <div className="col">
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingInput4"
                                   value={totalAmount}
                                   onChange={(e)=> setTotalAmount(e.target.value)}
                                   required/>
                            <label htmlFor="floatingInput4">Total Amount </label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingInput4"
                                   value={discountAmount}
                                   onChange={(e)=> setDiscountAmount(e.target.value)}
                                   required/>
                            <label htmlFor="floatingInput4">Discounted Amount </label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingInput4"
                                   value={paidAmount}
                                   onChange={(e)=> setPaidAmount(e.target.value)}
                                   required/>
                            <label htmlFor="floatingInput4">Paid Amount </label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingInput4"
                                   value={dueAmount}
                                   onChange={(e)=> setDueAmount(e.target.value)}
                                   required/>
                            <label htmlFor="floatingInput4">Dues Amount </label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="date" className="form-control" id="floatingInput4"
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


                <button type="submit" className="btn cbtn mt-2 mb-2 btn-lg" >Add</button>
                <Link to="/viewAdmissions" className="btn cbtn mt-2  btn-lg mb-2">View</Link>

            </form>


        </div>
        <ToastContainer />
    </>)
}

export default AdAdmission;
