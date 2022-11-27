import {Component} from "react";
import Lottie from "lottie-react";
import pageNot from "../Animations/36395-lonely-404.json"
class PageNotFound extends Component {
    state = {  }
    render() {
        return (<>
            <div className="container text-center">
            <Lottie loop={true} animationData={pageNot} />
            </div>
        </>);
    }
}

export default PageNotFound;
