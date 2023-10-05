const showChat = document.querySelector("#show-chat");
const chatModal = document.querySelector('#chat-dialogue');
const closeDialogueBtn = document.querySelector('#dialogue-btn');
// show modal
showChat.addEventListener('click', () => {
    chatModal.style.right = '0';
    chatModal.classList.remove('hidden');
})
// hide modal
closeDialogueBtn.addEventListener('click', () => {
    chatModal.style.right ='-300px';
    chatModal.classList.add('hidden');
})

// tester below for new ticket modal 
// must move to home.js later

const newTicket = document.querySelector('#new-ticket-btn');
const ticketModal = document.querySelector('#new-ticket');
const ticketSubmitBtn = document.querySelector('#submit-ticket-btn');

newTicket.addEventListener('click', () => {
    ticketModal.style.right = '0';
    ticketModal.classList.remove('hidden');
})

ticketSubmitBtn.addEventListener('click', () => {
    ticketModal.style.right = '-300px';
    ticketModal.classList.add('hidden');
})