import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  // new payment > success check
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState([])

  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure()
  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
        axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
        .then(res=>{
            console.log(res.data)
            setPaymentInfo({
                transactionId: res.data.transactionId,
                trackingId: res.data.trackingId,
            })
        })
    }
  }, [sessionId, axiosSecure]);
  return (
    <div>
      <h2 className="4xl">Payment successfully</h2>
      <p>Your Transaction Id: {paymentInfo.transactionId}</p>
      <p>Your Tracking Id: {paymentInfo.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
