import React from 'react'
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer } from "react-toastify";


function Toast() {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce} >
        </ToastContainer>
    )
}

export default Toast
