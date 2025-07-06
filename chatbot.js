
const API_URL = "https://script.google.com/macros/s/AKfycby9bsFEuOFsbz_NtsKGMHa2NV_uHHiAsoXz-2sGRjrCRBtyjsBFFjTFvzH7-rAHFVdv/exec";

async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const userInput = inputField.value.trim();
    if (!userInput) return;

    const chatMessages = document.getElementById("chat-messages");
    chatMessages.innerHTML += `<div class="user-message">${userInput}</div>`;

    inputField.value = "";

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const numberOnly = userInput.replace(/[^0-9]/g, "");

        const item = data.find(entry => entry["Post Number"].toString() === numberOnly);

        if (item) {
            chatMessages.innerHTML += `<div class="bot-message">
                <strong>${item["Product Name"]}</strong><br>
                <a href="${item["Affiliate Link"]}" target="_blank">Click here to view product</a>
            </div>`;
        } else {
            chatMessages.innerHTML += `<div class="bot-message">Sorry, I couldn’t find that post number.</div>`;
        }
    } catch (error) {
        chatMessages.innerHTML += `<div class="bot-message">Oops! Something went wrong. Please try again later.</div>`;
    }

    chatMessages.scrollTop = chatMessages.scrollHeight;
}
