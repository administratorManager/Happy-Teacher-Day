let generatedCode = '';
let selectedCardType = '';
let verticalTextTemplate = `
    المعلمون هم قلب التعليم النابض<br>
    شكراً لمربي الأجيال.<br>
    المعلم/ {name}<br>
    شكراً لمن أضاء قناديل العلم والمعرفة.<br>
    شكراً لرمز التضحية والعطاء ..<br>
    شكراً لمعلمينا ... لكم كل الامتنان والتقدير<br>
    ..مدير المدرسة 
`;

document.addEventListener("DOMContentLoaded", function () {
    generateNewCode();
});

function generateNewCode() {
    generatedCode = Math.floor(100 + Math.random() * 900).toString();
    document.getElementById("verificationInput").value = generatedCode;
    document.getElementById("generatedNumber").innerText = `${generatedCode}`;
}

function selectCard(type) {
    selectedCardType = type;
    document.querySelectorAll('.card-select').forEach(card => {
        card.classList.remove('card-selected');
    });
    document.getElementById(type + 'Card').classList.add('card-selected');
}

function updateCardText(name) {
    const personalizedText = verticalTextTemplate.replace('{name}', name);
    return personalizedText;
}

function downloadCard() {
    const name = document.getElementById("nameInput").value;
    const userInput = document.getElementById("userInput").value;
    const generatedCodeInput = document.getElementById("verificationInput").value;

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    if (userInput !== generatedCodeInput) {
        alert("The verification code does not match. Please try again.");
        return;
    }

    const cardText = updateCardText(name);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (selectedCardType === 'vertical') {
        canvas.width = 600; 
        canvas.height = 900; 
    } else {
        canvas.width = 900;
        canvas.height = 600; 
    }

    const backgroundImage = new Image();
    backgroundImage.src = 'images/teacher-day background.jpg'; 
    backgroundImage.onload = function() {
  
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white"; 
        ctx.font = "bold 36px 'Calibri Light', sans-serif"; 
        ctx.textAlign = "center";

        
        const textLines = cardText.split("<br>");
        const lineHeight = 40;
        const totalHeight = textLines.length * lineHeight;

        let startY = (canvas.height / 2) - (totalHeight / 2);

 
        textLines.forEach((line, index) => {
            ctx.fillText(line, canvas.width / 2, startY + (index * lineHeight));
        });

        const link = document.createElement('a');
        link.download = selectedCardType === 'vertical' ? 'vertical_teacher_card.png' : 'horizontal_teacher_card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };
}

function resetForm(event) {
    event.preventDefault();
    generateNewCode();
    document.getElementById("nameInput").value = '';
    document.getElementById("userInput").value = '';
    selectedCardType = '';
    document.querySelectorAll('.card-select').forEach(card => {
        card.classList.remove('card-selected');
    });
}

function readAloud(event) {
    debugger;
    event.preventDefault(); // Prevents the page from jumping to the top
    const number = generatedCode;
    const utterance = new SpeechSynthesisUtterance(`${number}`);
    window.speechSynthesis.speak(utterance);
}
