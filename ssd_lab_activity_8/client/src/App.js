import "./App.css";
import SignUpForm from "./components/SignUp";
import LoginForm from "./components/Login";
import Student from "./components/Student";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddQuery from "./components/AddQuery";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='login' element={<LoginForm />} />
        <Route path='signup' element={<SignUpForm />} />
        <Route path='student/addQuery' element={<AddQuery />} />
        <Route path='student' element={<Student />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
