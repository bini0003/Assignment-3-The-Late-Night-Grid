# Assignment 03: The Late Night Grid (Interactive)
**Student Name:**[Donya Biniek]
**Student Number:** [041020886]

## Client & Purpose
**Client Name:** The Late Night Grid
**Target Audience:** University students aged 18-24.
**Purpose:** A late-night coffee shop located near campus designed for students pulling all-nighters. 

## Feature Checklist
- [x] **1. Responsive Navigation:** Added a hamburger menu for screens under 768px.
- [x] **2. Form Validation:** Contact form validates Name, Email (Regex), and Message (min length). Shows inline errors and success states.
- [x] **3. Back to Top Button:** Appears after 300px of scrolling and smoothly returns users to the top.
- [x] **4. Dynamic Content Rendering:** The menu page is built completely dynamically using a JavaScript array of objects.
- [x] **5. Accordion FAQ:** Added a 4-question "System FAQ" accordion to the Contact page. Only one opens at a time.
-[x] **6. Live Filtering:** Added "All", "Hot", "Cold", and "Food" category filters to the Menu page.
- [x] **7. Fetch Public API:** Uses the Open-Meteo API to fetch and display the current campus weather in the global footer (handles loading and error states).

## AI Usage Documentation
- **Tools Used:** ChatGPT
- **What For:** 
  1. I used AI to generate the `fetch` API logic and handle the async/await structure for the weather widget.
  2. I used AI to explain how to loop through the accordion buttons to ensure only one stays open at a time.
  3. I used AI to provide the regex (regular expression) snippet used for validating the email format in the form.
- **What I Learned:** I learned how DOM manipulation works by dynamically creating `article` elements for the menu, meaning I don't have to hardcode HTML every time a new coffee is added.
