import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './mypage.css';

import MyPageLayout from "./MyPageLayout";

const MyPage = () => {


  return (
    <div className="container">
      <MyPageLayout />
    </div>
  );
};

export default MyPage;