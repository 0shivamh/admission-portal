import './App.css';
import NavbarComponent from "./Components/navbar.component";
import {BrowserRouter as Router, Routes, Route, Link,} from 'react-router-dom';
import SigninPage from "./Pages/signin.page";
import FooterComponent from "./Components/footer.component";
import HomeDashboardComponent from "./Components/HomeDashboard.component";
import PageNotFound from "./Components/404.component";
import CreatAccount from "./Pages/createAccount.page";
import Dashboard from "./Components/dashboard.component";
import Logout from "./Components/logout.component";
function App() {
    const userAuth = localStorage.getItem('token');
    console.log(userAuth)
    return (


      <div className="App">



        <Router>

          <header>
            <NavbarComponent/>
          </header>

          <Routes>

                <Route path="/" exact element={<HomeDashboardComponent/>}/>
                <Route path="/signin" exact element={<SigninPage/>}/>
              <Route path="/register" exact element={<CreatAccount/>} />

              {/*private routes*/}
              {
                  userAuth ? <Route path="/" exact element={<HomeDashboardComponent/>}/>:
                      <Route path="/dashboard" exact element={<Dashboard/>} />

              }

              {/*<Route path=*/}

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
