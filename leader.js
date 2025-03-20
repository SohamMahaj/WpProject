document.addEventListener("DOMContentLoaded", function () {
    updateLeaderboard();
});

function updateLeaderboard() {
    let leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = ""; // Clear previous entries

    let results = JSON.parse(localStorage.getItem("typingResults")) || [];

    // Sort results by speed (WPM) in descending order
    results.sort((a, b) => b.speed - a.speed);

    // Display top 10 scores
    results.slice(0, 10).forEach((entry, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.speed} WPM</td>
            <td>${entry.accuracy} %</td>
        `;
        leaderboard.appendChild(row);
    });
}
document.getElementById("modeSelect").addEventListener("change", updateMode);

function updateMode() {
    var selectedMode = this.value; 
    localStorage.setItem("testMode", selectedMode); 
    window.location.href = "typindtest2.html";
}