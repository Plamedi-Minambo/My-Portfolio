import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Collapse from '@preline/collapse'
import APCleaningLogo from '../assets/aPCleaningLogo.png';
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {

  const { user, logout } = useContext(AuthContext);


return(
    <>
    <header class="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-[#CEC9CF] text-sm py-3 dark:bg-neutral-800 bg-gray-700">
        <nav class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
            <div class="flex items-center justify-between">
      <Link to="/" aria-label="Home">
              <img
                src={APCleaningLogo}
                alt="Logo"
                className="h-20 w-auto dark:invert"
              />
            </Link>

      <div class="sm:hidden">
        <button type="button" class="hs-collapse-toggle relative size-9 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" id="hs-navbar-example-collapse" aria-expanded="false" aria-controls="hs-navbar-example" aria-label="Toggle navigation" data-hs-collapse="#hs-navbar-example">
          <svg class="hs-collapse-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
          <svg class="hs-collapse-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          <span class="sr-only">Toggle navigation</span>
        </button>
      </div>
    </div>

<section id="hs-navbar-example" class="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block" aria-labelledby="hs-navbar-example-collapse">
    <section class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
      {/* All Customers */}
      {
        user?.role !== "Admin" && user?.role !== "Cleaner" && user?.role !== "Driver" && (
      <>
        <Link to="/">
        <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Home</div>
        </Link>
        <Link to="/pricing">
        <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Pricing</div>
        </Link>
        <Link to="/book">
        <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Book</div>
        </Link>
        <Link to="/shop">
        <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Shop</div>
        </Link>
        <Link to="/about">
        <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">About</div>
        </Link>
        <Link to="/contact">
        <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Contact</div>
        </Link>
        <Link to="faq">
        <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">FAQ</div>
        </Link>
      </>
        )
        }

        {/* Registered Customers Only */}
        {
          user?.role === "Customer" && (
            <Link to="/profile">
              <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Profile</div>
              </Link>
          )
        }
        {
          user?.role === "Customer" && (
            <Link to="/settings">
              <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Settings</div>
              </Link>
          )
        }
        {
          user?.role === "Customer" && (
            <Link to="/feedback">
              <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Feedback</div>
              </Link>
          )
        }

        {/* Cleaners Only */}
        {
          user?.role === "Cleaner" && (
            <Link to="/cleaner-dashboard">
              <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Dashboard</div>
              </Link>
          )
        }
        {
          user?.role === "Cleaner" && (
            <Link to="/cleaner-feedback-viewer">
              <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Feedback</div>
              </Link>
          )
        }

        {/* Drivers Only */}
        {
          user?.role === "Driver" && (
            <Link to="/driver-dashboard">
              <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Dashboard</div>
              </Link>
          )
        }

        {/* Admin Navigation */}
        {
        user?.role === "Admin" && (
          <Link to="/waitlist">
            <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Waitlist</div>
            </Link>
          )
        }
        {
        user?.role === "Admin" && (
          <Link to="/analytics">
            <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Analytics</div>
            </Link>
          )
        }
        {
        user?.role === "Admin" && (
          <Link to="/manage-bookings">
            <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Bookings</div>
            </Link>
          )
        }
        {
        user?.role === "Admin" && (
          <Link to="/manage-services">
            <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Services</div>
            </Link>
          )
        }
        {
        user?.role === "Admin" && (
          <Link to="/manage-cleaners">
            <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Cleaners</div>
            </Link>
          )
        }
        {
        user?.role === "Admin" && (
          <Link to="/manage-drivers">
            <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Drivers</div>
            </Link>
          )
        }
        {
        user?.role === "Admin" && (
          <Link to="/manage-products">
            <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Products</div>
            </Link>
          )
        }
        {
        user?.role === "Admin" && (
          <Link to="/manage-inquiries">
            <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Inquiries</div>
            </Link>
          )
        }
        {
        user?.role === "Admin" && (
          <Link to="/manage-feedback">
            <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Feedbacks</div>
            </Link>
          )
        }
        {
        user?.role === "Admin" && (
          <Link to="/manage-notes">
            <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Dispatch Notes</div>
            </Link>
          )
        }
        
        {/* Welcome User and Logout */}
        {
          user? (
            <>
            <div className="font-medium text-white">Welcome, {user.name}</div>
            <button onClick={logout} className="font-medium text-red-600 hover:underline">Logout</button>
            </>
          ) : (
            <>
            <Link to="/register">
            <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Register</div>
            </Link>
            <Link to="/login">
            <div class="font-medium text-white focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500 decoration-2 hover:underline">Login</div>
            </Link>
            </>
          )
        }

    </section>
</section>
    </nav>
    </header>
    </>
);
}

export default Navigation