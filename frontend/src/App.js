import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Authentication/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateComponent from "./components/PrivateComponent/PrivateComponent";
import DomainChart from './components/Dashboard/Chart/DomainChart';

function App() {
  return (
    <>
     <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/" element={<Auth />} />
      </Routes>
     
    </>
  );
}

export default App;
