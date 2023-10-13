const showChat = document.querySelector("#show-chat");
const chatModal = document.querySelector('#chat-dialogue');
const chatSubmitBtn = document.querySelector('#send-message-btn');
const closeChatModalBtn = document.querySelector('#close-chat-modal');
const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];
const statusPill = document.querySelector('#status');

// show modal (open drawer)
// Listen for click events on the openDrawer element. When the click event occurs, open the side drawer element.
showChat.addEventListener('click', () => {
    chatModal.classList.remove('hidden');
    chatModal.classList.add('openDrawer');
    //statusPill.style.opacity = '0';
})

closeChatModalBtn.addEventListener('click', () => {
    chatModal.classList.remove('openDrawer');
    chatModal.classList.add('hidden');
    //statusPill.style.opacity = '1';
})

// update ticket (for tech)
// Listen for submit events on the updateTicket element. When the submit event occurs, capture the form field data and PUT to /api/ticket/:ticketId

// save edit button handler
const saveEditBtnHandler = async (event) => {
    event.preventDefault()
    const status = document.querySelector('.edit-status').value;
    const urgency = document.querySelector('.edit-urgency').value;
console.log(status, urgency);
    const response = await fetch(`/api/ticket/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            ticket_id: id,
            status,
            urgency
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // redirect to ticket they are updating
    if (response.ok) {
        document.location.replace(`/ticket/${id}`);
    } else {
        alert('Failed to save updates');
        console.log(response.statusText)
    }
};


// update ticket btn listener
document
    .querySelector('.edit-ticket-btn')
    .addEventListener('click', saveEditBtnHandler);


// add message
// Listen for submit events on the addMessage element. When the submit event occurs, capture the form field data and POST to /api/log/:ticketId?drawer=<BOOLEAN>
const addMessageHandler = async (event) => {
    event.preventDefault();

    const messageTxt = document.querySelector('#message-txt').value.trim();
    const checkbox = document.querySelector('.is-hidden-checkbox');

    console.log(messageTxt, id, checkbox);

    const response = await fetch(`/api/log/${id}?drawer=true`, {
        method: 'POST',
        body: JSON.stringify({
            ticketId: id,
            message: messageTxt,
            type: 'Message',
            isHidden: checkbox.value,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        console.log('Message created!');
        document.location.replace(`/ticket/${id}?drawer=true`);
    } else {
        alert('Failed to send message');
        console.log(response.statusText)
    }
};

// add message btn listener
document
    .querySelector('#add-message-btn')
    .addEventListener('click', addMessageHandler);

const modalChatHider = () => {
    const endpoint = window.location.href.split('=');
    if (endpoint[1] === 'true') {
        chatModal.classList.remove('hidden');
        chatModal.classList.add('openDrawer');
    }
};

modalChatHider();

// toggle hide message
// Listen for click events on the toggleHideMessage button elements. When the click event occurs capture the log id and make a PUT call to /api/log/:ticketId/:logId?drawer=<BOOLEAN>
const hideMessageHandler = async (event) => {
    event.preventDefault();

    const toggleHideBtn = document.querySelector('.toggle-hide').value;
    // const logId = document.querySelector('.log-id').value;
    
    if (toggleHideBtn === true) {
        (toggleHideBtn === false)
    }

    if (toggleHideBtn === false) {
        (toggleHideBtn === true)
    }
    const response = await fetch(`/api/log/${logId}`, {
        method: 'PUT',
        body: JSON.stringify({
            isHidden: toggleHideBtn
        })
    })
    // no redirect, stay on message chat log
    if (response.ok) {
        console.log('Message hidden successfully');
    } else {
        alert('Failed to hide message');
        console.log(response.statusText)
    }
};

// commented out cause its currently not working
// document.querySelector('.hide-message').addEventListener('click', hideMessageHandler);

const shadow = () => {
    const bigCard = document.querySelector('.tester');
    bigCard.style.boxShadow = '2px 2px 2rem #79767a';

    console.log(bigCard.style);
}

shadow();