let mode = localStorage.getItem("testMode").trim();
let timerDuration = null;
let text = null;
if (mode === "1 Min") {
    timerDuration = 60;
} 
else if (mode === "3 Min") {
    timerDuration = 180;
} 
else if (mode === "5 Min") {
    timerDuration = 300; 
}
else if (mode === "1 Page") {
    text = "Success is not built overnight. It is the result of small, consistent efforts that accumulate over time. Whether learning a new skill, developing a habit, or working toward a goal, persistence is the key. Many people believe that talent alone leads to achievement, but discipline and dedication often outweigh natural ability.Consider the journey of a writer. The first draft may be rough, filled with errors and incomplete thoughts. However, through revision and continuous improvement, the story takes shape. The same principle applies to athletes, musicians, and professionals in every field. Regular practice sharpens skills and builds confidence.Consistency also fosters resilience. Challenges and setbacks are inevitable, but those who persist develop the ability to adapt and grow. A person who commits to daily improvement, no matter how small, eventually surpasses those who rely on occasional bursts of effort.Moreover, habits formed through repetition shape our future. A student who reads every day expands their knowledge significantly over time. A programmer who codes consistently gains a deeper understanding of logic and problem-solving. Small daily actions compound into remarkable results.However, consistency does not mean perfection. There will be days of slow progress, moments of doubt, and occasional failures. The key is to stay committed despite these obstacles. Even when motivation fades, discipline keeps momentum alive.In a world that often seeks instant gratification, those who master the art of patience and persistence stand out. The greatest accomplishments are not the result of luck but of unwavering effort. Whether in personal growth, career success, or creative endeavors, the path to excellence is paved with consistent action.";
}
else if(mode === "2 Page"){
    text = "The human mind is a powerful tool capable of incredible feats of creativity, problem-solving, and resilience. Throughout history, people have pushed the boundaries of knowledge and innovation, transforming the world in unimaginable ways. From the invention of the wheel to the creation of artificial intelligence, progress has been driven by curiosity and determination. The ability to adapt and learn is what sets humanity apart. Every great discovery starts with a question, a desire to understand something deeper. Scientists, philosophers, and inventors have spent lifetimes chasing answers, refining theories, and challenging assumptions. It is through this relentless pursuit of knowledge that civilizations have flourished. Education plays a crucial role in shaping individuals and societies. A well-educated population is the foundation of a prosperous nation. Schools and universities provide the structure for learning, but true education extends beyond classrooms. It is in daily experiences, conversations, and personal reflections that deeper understanding is developed. Lifelong learning is essential in a world that is constantly changing. Those who embrace new knowledge and skills remain adaptable and relevant in any field. Technology has revolutionized the way people access information, making learning more accessible than ever before. With the internet, anyone can explore complex subjects, master new languages, or acquire technical skills from anywhere in the world. The challenge lies in discerning credible information from misinformation. Critical thinking is essential in evaluating sources and forming well-reasoned opinions. In an era of rapid technological advancement, artificial intelligence, automation, and digital communication are reshaping industries and daily life. While these innovations bring efficiency and convenience, they also raise ethical and social questions. The balance between progress and responsibility must be carefully maintained. Automation is replacing repetitive tasks, freeing up human potential for more creative and strategic roles. However, the displacement of traditional jobs necessitates continuous learning and skill development. The ability to adapt to change determines success in a dynamic world. The human spirit is defined by perseverance. Every individual faces obstacles and failures, but resilience is what separates those who succeed from those who give up.";
}
let texts = [
    "Deep in the forest, hidden among towering trees, stood an old wooden cabin. Its walls whispered stories of the past as the wind howled through the cracks. A small fireplace flickered inside, casting shadows on the wooden floor. The scent of pine and damp earth filled the air. Outside, the sounds of rustling leaves and distant owls created a peaceful melody. The cabin stood still, a quiet retreat in the heart of the wilderness.",
    "Dark clouds rolled in, covering the moonlit sky. The air was heavy, charged with the promise of a storm. Lightning streaked across the heavens, illuminating the landscape for mere seconds. Thunder rumbled, shaking the windows. The rain arrived, tapping against the roof like a rhythmic drumbeat. Inside, she wrapped herself in a warm blanket, sipping tea, feeling safe despite the chaos outside. The storm raged on, a force of nature in full display.",
    "The streets bustled with life as people hurried to their destinations. Car horns blared, and the scent of fresh coffee mixed with the aroma of street food. Businessmen rushed with briefcases in hand, while children laughed on their way to school. Vendors called out their offers, filling the air with excitement. Skyscrapers reflected the golden sunlight, standing tall against the blue sky. Amidst the chaos, a musician played a gentle tune, adding beauty to the morning rush.",
    "Hidden behind ivy-covered walls was a secret garden unlike any other. Flowers of every color bloomed under the golden sunlight, their petals swaying with the breeze. A fountain trickled water into a crystal-clear pond where fish glided gracefully. Birds chirped, and butterflies danced through the air. The scent of fresh roses filled the space, bringing peace to anyone who entered. It was a magical escape from the worries of the world, a hidden paradise.",
    "The train rumbled along the tracks, weaving through mountains and valleys. Passengers gazed out of the windows, watching the world blur by. Rolling green fields stretched endlessly, dotted with grazing cattle. The rhythmic clatter of wheels was soothing, like a heartbeat of adventure. Inside, the smell of warm pastries filled the air as travelers sipped their coffee. Conversations mixed with laughter, and for a moment, time slowed. The journey was just as beautiful as the destination."
];
if(timerDuration!= null) text = texts[Math.floor(Math.random() * texts.length)];
let textContainer = document.querySelector(".area"); 
let target = document.getElementById("target");
let result = document.getElementById("result"); 
let reset = document.querySelector("button");
let currindex = 0;
let interval = null;
let count = 0;
let errors = 0;
for(let i = 0; i< text.length; i++){
    let span = document.createElement("span");
    span.textContent = text[i];
    target.appendChild(span);
}
let arr = document.querySelectorAll("span");
arr[0].classList.add("cur"); 
function keys(event){
    event.preventDefault();
    if(currindex == 0) starttimer();
    if(event.key == "Backspace"){
        arr[currindex].classList.remove("cur");
        arr[currindex-1].classList.add("cur");
        update(-1);
        return;
    }
    else if(event.key == "Shift" || event.key == "CapsLock") return;
    if(event.key == text[currindex]) update(1);
    else {
        update(0);
        errors++;
    }
    currindex++;
    if(currindex<arr.length){
        arr[currindex-1].classList.remove("cur");
        arr[currindex].classList.add("cur");
    }

    if(currindex == arr.length || (timerDuration !== null && count >= timerDuration)){
        clearInterval(interval);
        document.removeEventListener("keydown",keys);
        let wpm = (currindex/5)/(count/60);
        let acc = 100*(currindex-errors)/currindex;
        result.innerHTML = `<span>Your speed is ${Math.max(0,wpm.toFixed(2))} WPM </span><br>
        <span>Your accuracy is ${Math.max(0,acc.toFixed(2))} % </span>`;  
        saveTypingResult(Math.max(0, wpm.toFixed(2)), Math.max(0, acc.toFixed(2)));
    }
    autoScroll();
}
function update(num){
    if(num== 1) arr[currindex].classList.add("correct");
    else if(num == 0)arr[currindex].classList.add("incorrect");
    else {
        currindex--;
        arr[currindex].classList.remove("correct");
        if (arr[currindex].classList.contains("incorrect")) {
            arr[currindex].classList.remove("incorrect");
            errors--;
        }
    }
}
function starttimer(){
    if(interval) return;
    interval = setInterval(()=>{
        count++;
        let min =Math.floor(count / 60);
        let rem = count %60;
        result.innerHTML = `TIME : ${min} : ${rem}`;
    },1000);
}
reset.addEventListener("click",()=>{
    for(let i = 0; i<arr.length; i++){
        arr[i].classList.remove("correct");
        arr[i].classList.remove("incorrect");
        arr[currindex].classList.remove("cur");
        currindex = 0;
        errors = 0;
        arr[0].classList.add("cur");
    }
})
function autoScroll() {
    let cursorElement = arr[currindex];
    let containerHeight = textContainer.clientHeight;
    let scrollPosition = textContainer.scrollTop; 
    let cursorPosition = cursorElement.offsetTop; 
    if (cursorPosition - scrollPosition > containerHeight - 20) { 
        textContainer.scrollTop += 40; 
    }
}

function saveUserName() {
    let name = document.getElementById("usernameInput").value;
    if (name) {
        document.getElementById("nameModal").style.display = "none";
        document.addEventListener("keydown",keys);
    }
}
let typingResults = JSON.parse(localStorage.getItem("typingResults")) || [];

function saveTypingResult(speed, accuracy) {
    let name = document.getElementById("usernameInput").value.trim() || "Anonymous";
    typingResults.push({ name, speed, accuracy });
    localStorage.setItem("typingResults", JSON.stringify(typingResults));
}

document.getElementById("modeSelect").addEventListener("change", updateMode);

function updateMode() {
    var selectedMode = this.value; 
    localStorage.setItem("testMode", selectedMode); 
    window.location.href = "typindtest2.html";
}