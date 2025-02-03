import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import DashboardPage from './components/DashboardPage';  // الصفحة الرئيسية بعد التسجيل
import AddIssuePage from './components/AddIssuePage';   // صفحة إضافة مشكلة
import ListIssuePage from './components/ListIssuePage';       // صفحة عرض المشاكل

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashboardPage />} />  {/* الصفحة الرئيسية بعد تسجيل الدخول */}
        <Route path="/add-issue" element={<AddIssuePage />} />    {/* صفحة إضافة مشكلة */}
        <Route path="/issues" element={<ListIssuePage />} />         {/* صفحة عرض المشاكل */}
        <Route path="/" element={<Login />} />                     {/* الصفحة الافتراضية هي Login */}
      </Routes>
    </Router>
  );
}

export default App;
