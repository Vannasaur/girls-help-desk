const showChat = document.querySelector("#show-chat");
const chatModal = document.querySelector('#chat-dialogue');
const closeDialogueBtn = document.querySelector('#dialogue-btn');
// show modal (open drawer)
showChat.addEventListener('click', () => {
    chatModal.style.right = '0';
    chatModal.classList.remove('hidden');
})
// hide modal (toggleHideMessage)
closeDialogueBtn.addEventListener('click', () => {
    chatModal.style.right ='-300px';
    chatModal.classList.add('hidden');
})