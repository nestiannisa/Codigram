import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constant";
import { CardDetail } from "../components/index";
import Swal from "sweetalert2";

function DetailPosting() {
  return (
    <>
      <div className="container">
        <CardDetail />
      </div>
    </>
  );
}

export default DetailPosting;
