// ==========================================
// THE LATE NIGHT GRID - MAIN JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initBackToTop();
    initWeatherAPI();

    // Initialize page-specific scripts
    if (document.getElementById("menu-container")) {
        initDynamicMenu();
    }
    if (document.getElementById("contact-form")) {
        initFormValidation();
        initAccordion();
    }
});

// ------------------------------------------
// 1. RESPONSIVE NAVIGATION (Hamburger Menu)
// ------------------------------------------
function initNavigation() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("nav ul");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        hamburger.classList.toggle("active");
    });

    // Close menu when clicking a link
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
        });
    });
}

// ------------------------------------------
// 3. BACK TO TOP BUTTON
// ------------------------------------------
function initBackToTop() {
    const bttBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            bttBtn.classList.add("visible");
        } else {
            bttBtn.classList.remove("visible");
        }
    });

    bttBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ------------------------------------------
// 7. FETCH API (Weather Widget in Footer)
// ------------------------------------------
// AI-assisted: Used ChatGPT to structure the async/await fetch request
async function initWeatherAPI() {
    const weatherContainer = document.getElementById("weather-widget");
    weatherContainer.innerText = "Loading campus weather...";

    try {
        // Fetching Ottawa weather (Campus location)
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=45.4215&longitude=-75.6972&current_weather=true");
        if (!response.ok) throw new Error("Weather API failed");
        
        const data = await response.json();
        const temp = data.current_weather.temperature;
        
        weatherContainer.innerHTML = `Campus Status: <strong>${temp}°C</strong>`;
    } catch (error) {
        console.error(error);
        weatherContainer.innerText = "Weather feeds currently offline.";
    }
}

// ------------------------------------------
// 4 & 6. DYNAMIC CONTENT & FILTERING (Menu Page)
// ------------------------------------------
function initDynamicMenu() {
    const menuContainer = document.getElementById("menu-container");
    const filterBtns = document.querySelectorAll(".filter-btn");

    // Array of Objects (Requirement 4)
    const menuData =[
        { name: "Binary Brew", desc: "Standard drip coffee. 1s and 0s.", price: "$3.00", category: "hot" },
        { name: "Full Stack Latte", desc: "Espresso, milk, foam, and caramel.", price: "$5.50", category: "hot" },
        { name: "Nitro Cold Brew", desc: "Smooth caffeine hit.", price: "$5.00", category: "cold" },
        { name: "Python Punch", desc: "Energy drink mix with lime.", price: "$4.50", category: "cold" },
        { name: "The Stack Overflow", desc: "Quad-shot espresso over ice. No mercy.", price: "$6.00", category: "cold" },
        { name: "RAM Ball", desc: "Oat and peanut butter energy bite.", price: "$2.50", category: "food" },
        { name: "Motherboard Muffin", desc: "Blueberry muffin with crumble top.", price: "$3.75", category: "food" }
    ];

    // Function to render items
    function renderMenu(items) {
        menuContainer.innerHTML = ""; // Clear current items
        items.forEach(item => {
            const article = document.createElement("article");
            article.classList.add("card");
            article.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <p style="color:#ff5f00; font-weight:bold; margin-top:10px;">${item.price}</p>
            `;
            menuContainer.appendChild(article);
        });
    }

    // Initial render
    renderMenu(menuData);

    // Filtering logic (Requirement 6)
    filterBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            // Manage active class
            filterBtns.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");

            const category = e.target.getAttribute("data-category");
            if (category === "all") {
                renderMenu(menuData);
            } else {
                const filtered = menuData.filter(item => item.category === category);
                renderMenu(filtered);
            }
        });
    });
}

// ------------------------------------------
// 2. FORM VALIDATION
// ------------------------------------------
function initFormValidation() {
    const form = document.getElementById("contact-form");
    const successMsg = document.getElementById("form-success");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent submission
        let isValid = true;

        // Name Validation
        const name = document.getElementById("name");
        const nameError = document.getElementById("name-error");
        if (name.value.trim() === "") {
            nameError.innerText = "Name is required.";
            isValid = false;
        } else {
            nameError.innerText = "";
        }

        // Email Validation (AI-assisted: Used ChatGPT for Regex pattern)
        const email = document.getElementById("email");
        const emailError = document.getElementById("email-error");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            emailError.innerText = "Please enter a valid university email.";
            isValid = false;
        } else {
            emailError.innerText = "";
        }

        // Message Validation
        const msg = document.getElementById("message");
        const msgError = document.getElementById("message-error");
        if (msg.value.trim().length < 10) {
            msgError.innerText = "Message must be at least 10 characters.";
            isValid = false;
        } else {
            msgError.innerText = "";
        }

        // If valid, show success and reset
        if (isValid) {
            successMsg.innerText = "Data Transmitted Successfully! We will ping you back soon.";
            form.reset();
        } else {
            successMsg.innerText = "";
        }
    });
}

// ------------------------------------------
// 5. ACCORDION FAQ
// ------------------------------------------
function initAccordion() {
    const accordions = document.querySelectorAll(".accordion-btn");

    accordions.forEach(acc => {
        acc.addEventListener("click", function () {
            // Close other accordions
            accordions.forEach(other => {
                if (other !== this) {
                    other.classList.remove("active");
                    other.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current accordion
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });
}