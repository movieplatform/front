import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./page/commonUI/Layout";
import Main from './page/main/Main';
import Login from './page/main/auth/Login';
import Register from './page/main/auth/Register';
import MyPage from "./page/main/auth/MyPage/MyPage";
import BookingPage from "./page/main/booking/Bookingpage";
import ProtectedRoute from "./page/main/ProtectedRoute";

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route
                path="/mypage"
                element={
                    <ProtectedRoute>
                        <MyPage />
                    </ProtectedRoute>
                }
            />
          <Route path="/booking" element={<BookingPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
