import './App.css';
import NavbarComponent from "./Components/navbar.component";
import {BrowserRouter as Router, Routes, Route, Link, useParams, Outlet, Navigate,} from 'react-router-dom';
import SigninPage from "./Pages/signin.page";
import FooterComponent from "./Components/footer.component";
import HomeDashboardComponent from "./Components/HomeDashboard.component";
import PageNotFound from "./Components/404.component";
import CreatAccount from "./Pages/createAccount.page";
import Dashboard from "./Components/dashboard.component";
import ViewAdmissionsPage from "./Pages/viewAdmissions.page";
import AdAdmission from "./Pages/adAdmission.page";
import ReceiptComponent from "./Components/receipt.component";
import EditAdmissionPage from "./Pages/editAdmission.page";
import Auth from "./auth";
import NoAuth from "./noauth";
function App() {

    return (
      <div className="App">
        <Router>
          <header>
            <NavbarComponent />
          </header>

          <Routes>

              <Route path="/" exact element={<NoAuth/>} >
                  <Route path="" exact element={<HomeDashboardComponent/>}/>
                  <Route path="signin" exact element={<SigninPage/>}/>
                  <Route path="register" exact element={<CreatAccount/>} />
              </Route>

              {/*private routes*/}

              <Route path="/" exact element={<Auth/>} >

                  <Route path="dashboard" exact element={<Dashboard/>} />
                  <Route path="dashboard/admission" exact element={<AdAdmission/>} />
                  <Route path="dashboard/viewAdmissions" exact element={<ViewAdmissionsPage/>} />
                  <Route path="dashboard/editAdmission" exact element={<EditAdmissionPage/>} />
                  <Route path="dashboard/fees_receipt" exact element={<ReceiptComponent/>} />

              </Route>

              <Route path="*"  element={<PageNotFound />} />
          </Routes>

          <footer>
            <FooterComponent/>
          </footer>
        </Router>

      </div>
  );
}

export default App;
