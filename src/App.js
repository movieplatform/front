import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./page/commonUI/Layout";
import Main from './page/main/Main';
import Login from './page/main/auth/Login';
import Register from './page/main/auth/Register';
import MyPage from "./page/main/auth/MyPage/MyPage";
import BookingPage from "./page/main/booking/Bookingpage";
import ProtectedRoute from "./page/main/ProtectedRoute";
import MoviesPage from "./page/main/movies/MoviesPage";
import AdminPageLayout from "./page/main/auth/MyPage/AdminPageLayout";
import AdminRoute from "./page/main/AdminRoute";
import MoviesDetail from "./page/main/movies/MoviesDetail.jsx";
import QAPage from "./page/main/community/QAPage.jsx";
import QADetailPage from "./page/main/community/QADetailPage.jsx";

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
            path="/adminpage"
            element={
              <AdminRoute>
                <AdminPageLayout />
              </AdminRoute>
            }
          />

          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/*" element={<AdminPageLayout />} />

          <Route path="/booking" element={<BookingPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:docId" element={<MoviesDetail />} />
          <Route path="/qa" element={<QAPage/>} />
          <Route path="/qa/:id" element={<QADetailPage/>} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
