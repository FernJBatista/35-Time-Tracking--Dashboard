let jsonData = [];

fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
        jsonData = data; // Store the data
        console.log("Fetched data:", jsonData); // Check if the data is stored properly
        renderDashboard(); // Display data when loaded
    })
    .catch((error) => console.error("Error fetching data:", error));


const dashboard = document.querySelector("#dashboard"); // Main container for each article element
const timeSelector = document.querySelectorAll(".time-option"); // Ensure these elements exist

function renderDashboard(timeframe = "daily") {
    console.log("Rendering dashboard with timeframe:", timeframe);
    console.log("Current data:", jsonData);

    // Remove the existing cards
    document.querySelectorAll(".articleCard").forEach(card => card.remove()) 

    jsonData.forEach((item) => {
        const article = document.createElement("article");
        article.classList.add("articleCard");
        article.id = item.title.toLowerCase();
        // Article Element Structure
        article.innerHTML = `
        <img src="./images/icon-${item.title}.svg" alt="${item.title}" class="icon">
        <div class="cardContent">
            <div class="cardTop">
                <h2>${item.title}</h2>
                <img src="./images/icon-ellipsis.svg" alt="More options">
            </div>
            <div class="cardBottom">
                <h3>${item.timeframes[timeframe].current}hrs</h3>
                <p>Last Week - ${item.timeframes[timeframe].previous}hrs</p>
            </div>
        </div>
        `;
        dashboard.appendChild(article);
    })
} 

// Ensure time selector buttons exist and work
timeSelector.forEach((selector) => {
    selector.addEventListener("click", () => {
        timeSelector.forEach(option => option.classList.remove("active"));
        selector.classList.add("active");

        const timeframe = selector.dataset.timeframe; // Get the timeframe from the data attribute
        renderDashboard(timeframe); // Render the dashboard with the selected timeframe
    })
;})