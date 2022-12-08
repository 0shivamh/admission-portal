import { useState } from "react";
import {  Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard= ()=>{
    let navigate = useNavigate();
    // const [name, setName] = useState('');




    return(<>
        {/* was-validated */}
        <div className="login page-bg container text-center mt-4 ">

            <p className="display-5">Admission Dashboard</p>

            <form className="center loginform"  >


                    <div className="row crow gx-2">
                        <div className="col-sm">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingInput4" placeholder="20202020230"
                                       required/>
                                <label htmlFor="floatingInput4">Student Name </label>
                            </div>

                        </div>
                        <div className="col-sm">
                            <div className="form-floating mb-3">
                                <input type="number" className="form-control" id="floatingInput4" placeholder="20202020230"
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
                                   required/>
                            <label htmlFor="floatingInput4">Total Amount </label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingInput4" placeholder="20202020230"
                                   required/>
                            <label htmlFor="floatingInput4">Discounted Amount </label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingInput4" placeholder="20202020230"
                                   required/>
                            <label htmlFor="floatingInput4">Paid Amount </label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" id="floatingInput4" placeholder="20202020230"
                                   required/>
                            <label htmlFor="floatingInput4">Dues Amount </label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="date" className="form-control" id="floatingInput4" placeholder="20202020230"
                                   required/>
                            <label htmlFor="floatingInput4">Dues Payment Date </label>
                        </div>

                        <div className="form-floating mb-3">
                            <textarea className="form-control" placeholder="Leave a comment here" id="remark"
                                      style={{height: 100}}></textarea>
                            <label htmlFor="remark">Remark?</label>
                        </div>

                    </div>
                </div>


                <button type="submit" className="btn cbtn mt-2 mb-2" >Add</button>
            </form>

        </div>
        <ToastContainer />
    </>)
}

export default Dashboard;
