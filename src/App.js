import './App.css';
import NavbarComponent from "./Components/navbar.component";
import {BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import SigninPage from "./Pages/signin.page";
import FooterComponent from "./Components/footer.component";
import HomeDashboardComponent from "./Components/HomeDashboard.component";
import PageNotFound from "./Components/404.component";
function App() {
  return (
      <div className="App">



        <Router>

          <header>
            <NavbarComponent/>
          </header>

          <Routes>

                <Route path="/" exact element={<HomeDashboardComponent/>}/>
                <Route path="/signin" exact element={<SigninPage/>}/>
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
