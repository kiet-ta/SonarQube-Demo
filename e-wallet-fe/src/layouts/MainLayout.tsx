import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/NavBar";

function MainLayout() {
    const location = useLocation(); // Dùng để biết đang ở trang nào

    const mainRef = useRef(null);


    return (
        <div className="flex flex-col min-h-screen bg-[#FAF8F3]">
            <ScrollToTop />
            <Navbar/>

            {/* MAIN CONTENT */}
            <main
                ref={mainRef}
                className={`flex-grow transition-all duration-300 ${isComparePage
                    ? "bg-transparent px-0 py-0" // Full width, bỏ padding & nền
                    : "container mx-auto px-6 py-8"
                    }`}
            >
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default MainLayout;