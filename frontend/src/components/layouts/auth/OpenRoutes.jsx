import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OpenRoutes = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

      if(!token){
        return children
      }

  return null;
};

export default OpenRoutes;
