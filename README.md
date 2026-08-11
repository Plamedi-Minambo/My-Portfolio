# My-Portfolio
# APCleaning — Full-Stack Cleaning Service Booking Platform

APCleaning is a booking platform built for a home cleaning service, developed as a team project. It handles the full loop: a customer books a cleaning and pays online, that booking gets assigned to a cleaner and driver, and admins run the whole operation from a dashboard, with four different roles (customer, cleaner, driver, admin) all using their own part of the same app.

This was a team build and everyone worked across both backend and frontend. Here's what I actually did.

## What I built

On the backend, I worked on the `BookingsController` and the `AdminController`. The `BookingsController` is really the heart of the whole system, since it's what creates and manages bookings, and pretty much everything else in the app (assignment, payment, dispatch) depends on a booking existing first. One detail I made sure to handle properly is that you don't need an account to book a cleaning. If someone isn't logged in, the system just generates them a temporary guest ID instead of forcing them to register before they can even get a quote, which felt like the right call for a service business where people usually just want a price and a time slot fast.

The `AdminController` is what powers the admin side of things. It's what lets an admin assign a booking to a specific cleaner and driver, reset that assignment if something goes wrong, and pull the data that feeds into the analytics dashboard.

On the frontend, I built the Home page, the Booking page, the FAQ page, the Contact page, and the Login and Register pages. The Home page is the first thing anyone sees, so it needed to explain what the service does and get people into the booking flow quickly. The Booking page is the actual flow customers use to pick a service and schedule it, and it connects directly to the `BookingsController` I built on the backend. Login and Register handle authentication, including redirecting people to the right place depending on their role once they log in, customers go to the booking page, admins go to the booking management console, cleaners and drivers go to their own dashboards.

## Why working on both sides mattered

Because I built the `BookingsController` on the backend and the `Booking` page on the frontend, I had to think about the same feature from both directions, what the API actually needed to receive, and what the form needed to send it. Same thing with the `AdminController` and the admin screens that call it. That back and forth between backend and frontend was honestly the most useful part of the project for me, since it forced me to understand the whole flow instead of just my one piece of it.

## The rest of the project

The rest of the platform, things like the staff dashboards, payments, analytics, dispatch notes, and loyalty points, was built by the rest of the team. I understand how those pieces connect to what I built, but I've kept this README focused on the parts I can speak to in real depth.
