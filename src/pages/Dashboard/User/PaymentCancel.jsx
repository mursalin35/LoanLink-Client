import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div>
            <title>Payment Cancel</title>
            <h1>Payment is cancel. try again</h1>
            <Link to="/dashboard/my-loans">
            <button className='btn btn-primary px-4 btm btn-sm text-black'>try again</button></Link>
        </div>
    );
};

export default PaymentCancel;