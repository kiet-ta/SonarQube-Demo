import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/NavBar";

function MainLayout() {
    const location = useLocation(); // Dùng để biết đang ở trang nào


    return (
        <div className="flex flex-col min-h-screen bg-[#FAF8F3]">
            <ScrollToTop />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;