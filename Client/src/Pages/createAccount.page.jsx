import { useState } from "react";
import {  Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatAccount= ()=>{
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');
    const [emp_id,setEmp_id] =useState("");
    const [phone, setPhone] = useState('');
    const [designation, setDesignation] = useState('');


    async function registerUser(event){
        event.preventDefault()
            const response= await fetch("http://localhost:5001/api/register",
                {
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        emp_id,
                        name,
                        email,
                        psw,
                        phone,
                        designation,
                    }),

                })
            const data= await response.json();
            // console.log(data)

            if(data.status==='Okay'){
                Swal.fire(
                    {title:'Registration Successful!',
                        text:'Please login and continue',
                        icon:'success',
                        confirmButtonColor: '#5ae4a7'}
                )
                navigate(`/login`);
                //to clear all field
                setEmp_id("")
                setName("")
                setEmail("")
                setPsw("")
                setPhone("")
                setDesignation("")
            }
            else if(data.status==='error-psw'){
                Swal.fire(
                    {title:'Registration Failed!',
                        text:'Password should be minimum 8 character or more',
                        icon:'error',
                        confirmButtonColor: '#5ae4a7'}
                )
                setPsw("")

            }
            else if(data.status==='error-email'){
                Swal.fire(
                    {title:'Email Already Registered!',
                        text:'Please check all details!',
                        icon:'error',
                        confirmButtonColor: '#5ae4a7'}
                )
                setEmail("")
            }
            else if(data.status==='error-team'){
                Swal.fire(
                    {title:'Employee Id Already Exist!',
                        text:'Please change it !',
                        icon:'error',
                        confirmButtonColor: '#5ae4a7'}
                )
                setEmp_id("")
            }
            else if(data.status==='error'){
                Swal.fire(
                    {title:'Registration Failed!',
                        text:'Please check all details!',
                        icon:'error',
                        confirmButtonColor: '#5ae4a7'}
                )
                setEmp_id("")
                setName("")
                setEmail("")
                setPsw("")
                setPhone("")
                setDesignation("")

            }

    }


    return(<>
        {/* was-validated */}
        <div className="login page-bg container text-center mt-4 ">

            <p className="display-5">Create Account</p>

            <form className="center loginform" onSubmit={registerUser} >
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput4" placeholder="20202020230"
                               value={emp_id}
                               onChange={(e)=> setEmp_id(e.target.value)} required/>
                        <label htmlFor="floatingInput4">Employee Id</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="name" className="form-control" id="floatingInput1" placeholder="abc"
                               value={name}
                               onChange={(e)=> setName(e.target.value)} required
                        />
                        <label htmlFor="floatingInput1">Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput2" placeholder="abc@example.com"
                               value={email}
                               onChange={(e)=> setEmail(e.target.value)}  required/>
                        <label htmlFor="floatingInput2">Email</label>
                    </div>


                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                               value={psw}
                               onChange={(e)=> setPsw(e.target.value)} required/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="floatingInput3" placeholder="20202020230"
                               value={phone}
                               onChange={(e)=> setPhone(e.target.value)} required />
                        <label htmlFor="floatingInput3">Mobile Number</label>
                    </div>

                    <div className="form-floating mt-3 mb-3">
                        <input type="text" className="form-control" id="floatingInput5" placeholder="20202020230"
                               value={designation}
                               onChange={(e)=> setDesignation(e.target.value)} required/>
                        <label htmlFor="floatingInput5">Designation</label>
                    </div>

                    <button type="submit" className="btn cbtn mt-2" >Register</button>
                    <p className="white">Already have an account?
                        <Link to="/login" className="white"> Log In</Link></p>
                </form>

        </div>
        <ToastContainer />
    </>)
}

export default CreatAccount;
