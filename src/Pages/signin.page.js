import { useState,useEffect } from "react";
import {  useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2'

const SigninPage=()=>{

    let navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [psw, setPsw] = useState('');

    useEffect(() => {

    }, [])

    return(
        <>
            <div className="login container page-bg text-center mt-4">
                <form className="center loginform" >
                    <p className="display-5">Admission Officer Login</p>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="abc@example.com"
                               value={email}
                               onChange={(e)=> setEmail(e.target.value)} />
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                               value={psw}
                               onChange={(e)=> setPsw(e.target.value)} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button type="submit" className="btn cbtn mt-2 mb-2" >Login</button>
                </form>
            </div>
        </>
    )
}
export default SigninPage;
