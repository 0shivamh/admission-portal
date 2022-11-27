import './App.css';
import NavbarComponent from "./Components/navbar.component";
import {BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import SigninPage from "./Pages/signin.page";
import FooterComponent from "./Components/footer.component";
import HomeDashboardComponent from "./Components/HomeDashboard.component";

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
          </Routes>

          <footer>
            <FooterComponent/>
          </footer>
        </Router>

      </div>
  );
}

export default App;
