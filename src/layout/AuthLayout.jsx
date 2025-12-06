import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Shared/Navbar';
import Footer from '../components/Shared/Footer';

const AuthLayout = () => {
    return (
        <div>
            <Navbar/>
         <main>
            <Outlet/>
         </main>
         <Footer/>
        </div>
    );
};

export default AuthLayout;