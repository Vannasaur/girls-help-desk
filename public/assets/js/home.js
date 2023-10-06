// new ticket modal 
const newTicket = document.querySelector('#new-ticket-btn');
const ticketModal = document.querySelector('#new-ticket');
const ticketSubmitBtn = document.querySelector('#submit-ticket-btn');
// open drawer
newTicket.addEventListener('click', () => {
    ticketModal.style.right = '0';
    ticketModal.classList.remove('hidden');
})
// close drawer
ticketSubmitBtn.addEventListener('click', () => {
    ticketModal.style.right = '-300px';
    ticketModal.classList.add('hidden');
})