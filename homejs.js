
const text = "Improve Your Typing Speed with RapidType";
const typingText = document.getElementById("typing-text");

let index = 0;

function typeText() {
    if (index < text.length) {
        typingText.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeText, 100);
    }
}

window.onload = () => {
    setTimeout(typeText, 500);
};

document.querySelectorAll(".mode-btn").forEach((button) => {
    button.addEventListener("click", function () {
        let mode = this.textContent.trim(); 
        localStorage.setItem("testMode", mode); 
        window.location.href = "typindtest2.html";
    });
});

document.querySelector(".start-btn").addEventListener("click", function () {
    localStorage.setItem("testMode", "1 Min");
    window.location.href = "typindtest2.html";
});
document.getElementById("modeSelect").addEventListener("change", updateMode);

function updateMode() {
    var selectedMode = this.value; 
    localStorage.setItem("testMode", selectedMode); 
    window.location.href = "typindtest2.html";
}