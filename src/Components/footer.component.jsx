import {Container, Row, Col, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./style.component.css"
const FooterComponent =()=>{
    return(<>
        <div className="foot">
        <Container style={{marginTop:"60px"}} >
            <Row>
                <Col>
                    <p className="h5"><b>Admission Portal</b></p>
                    <p>Smart way handle your data</p>
                </Col>
                <Col >
                    <Link to="" className="link-footer">Security</Link><br/>
                    <Link to="" className="link-footer">Privacy</Link><br/>
                    <Link to="" className="link-footer">Payment</Link><br/>
                    <Link to="" className="link-footer">Terms</Link><br/>
                </Col>
                <Col>
                    <Link to="" className="link-footer">About</Link><br/>
                    <Link to="" className="link-footer">Source</Link><br/>
                    <Link to="" className="link-footer">Contact</Link><br/>
                    <Link to="" className="link-footer">Help</Link><br/>
                </Col>
                <Col>
                    {/*<Link to="" className="link-footer">Refund</Link><br/>*/}
                    {/*<Link to="" className="link-footer">User Guide</Link><br/>*/}

                    <Image className="img-fluid" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" />

                </Col>
                <hr className="mt-2"/>
         <span>Way2Manage © {new Date().getFullYear()} All Rights Reserved{" "}| Developed by <a className="link-footer" href="https://www.google.com" style={{color:"white"}}>---</a></span>
                <hr/>

            </Row>
        </Container>
        </div>
        </>)
}
export default FooterComponent;
