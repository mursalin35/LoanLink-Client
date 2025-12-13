import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div>
            <h1>Payment is cancel. try again</h1>
            <Link to="/dashboard/my-parcels">
            <button className='btn btn-primary btn-sm text-black'>try again</button></Link>
        </div>
    );
};

export default PaymentCancel;