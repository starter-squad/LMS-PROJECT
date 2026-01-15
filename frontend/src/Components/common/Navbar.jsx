import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChalkboardUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { authService } from "../../api/auth.service";
import { useUserContext } from "../../contexts/UserContext";

function Navbar({ page }) {
  const navigate = useNavigate();
  
  // Context থেকে user, setUser এবং loading নিন
  const { user, setUser, loading } = useUserContext(); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ইউজার বা এডমিন যেই হোক, লগইন থাকলে user অবজেক্ট থাকবে
  const isAuthenticated = !!user;

  const handleLogOut = async () => {
    await authService.logout(); // LocalStorage ক্লিয়ার করবে
    setUser(null); // Context ক্লিয়ার করবে, যাতে সাথে সাথে 'Login' বাটন ফিরে আসে
    navigate("/login");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // অ্যাক্টিভ পেজের স্টাইল নির্ধারণের ফাংশন
  const getLinkClasses = (linkName) => {
    const base = "no-underline text-[17px] font-bold transition-all duration-300 px-[12px] py-[4px] block rounded";
    const active = "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md";
    const inactive = "text-[rgb(21,21,100)] hover:text-yellow-500";
    return `${base} ${page === linkName ? active : inactive}`;
  };

  // Loading state দেখান যদি context এখনো data load করছে
  if (loading) {
    return (
      <nav className="bg-white w-full flex flex-row justify-between items-center px-[4vw] py-2 shadow-md z-[999] sticky top-0">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="LMS Logo" className="w-[200px] h-auto cursor-pointer" />
          </Link>
        </div>
        <div className="animate-pulse">Loading...</div>
      </nav>
    );
  }

  return (
    <nav className="bg-white w-full flex flex-row justify-between items-center px-[4vw] py-2 shadow-md z-[999] sticky top-0">
      {/* ক্লিকেবল লোগো */}
      <div className="flex items-center">
        <Link to="/" onClick={closeMobileMenu}>
          <img src={logo} alt="LMS Logo" className="w-[200px] h-auto cursor-pointer" />
        </Link>
      </div>

      <div className="flex items-center">
        {/* মোবাইল মেনু টগল বাটন */}
        <div className="md:hidden text-2xl cursor-pointer mr-4" onClick={toggleMobileMenu}>
          &#9776;
        </div>

        <ul className={`flex items-center gap-4 list-none m-0 p-0 ${isMobileMenuOpen ? "absolute top-[70px] left-0 w-full bg-white flex-col p-5 shadow-xl" : "hidden md:flex"}`}>
          
          <li><Link to="/" className={getLinkClasses("home")} onClick={closeMobileMenu}>Home</Link></li>
          <li><Link to="/courses" className={getLinkClasses("courses")} onClick={closeMobileMenu}>Courses</Link></li>

          {/* লগইন করা থাকলে এই লিঙ্কগুলো দেখাবে */}
          {isAuthenticated && (
            <>
              <li>
                <Link to="/profile" className={getLinkClasses("profile")} onClick={closeMobileMenu}>
                  Profile <FontAwesomeIcon icon={faUser} className="ml-1 text-sm" />
                </Link>
              </li>
              <li>
                <Link to="/learnings" className={getLinkClasses("learnings")} onClick={closeMobileMenu}>
                  Learnings <FontAwesomeIcon icon={faChalkboardUser} className="ml-1 text-sm" />
                </Link>
              </li>
            </>
          )}

          <li className="ml-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* এডমিন হলে একটি ব্যাজ দেখাবে যাতে কনফিউশন না হয় */}
                {user.role === "ROLE_ADMIN" && (
                  <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded font-bold border border-red-200">ADMIN</span>
                )}
                
                <button
                  onClick={handleLogOut}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-bold flex items-center gap-2 transition-all"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { navigate("/login"); closeMobileMenu(); }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow-md transition-all"
              >
                Login / Sign Up
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;