const showChat = document.querySelector("#show-chat");
const chatModal = document.querySelector('#chat-dialogue');
const closeDialogueBtn = document.querySelector('#dialogue-btn');
// show modal (open drawer)
// Listen for click events on the openDrawer element. When the click event occurs, open the side drawer element.
showChat.addEventListener('click', () => {
    chatModal.style.right = '0';
    chatModal.classList.remove('hidden');
})
// hide modal (toggleHideMessage)
closeDialogueBtn.addEventListener('click', () => {
    chatModal.style.right = '-300px';
    chatModal.classList.add('hidden');
})


// update ticket (for tech)
// Listen for submit events on the updateTicket element. When the submit event occurs, capture the form field data and PUT to /api/ticket/:ticketId

// save edit button handler
const saveEditBtnHandler = async (event) => {
    event.preventDefault();

    const subject = document.querySelector('#edit-subject').value.trim();
    const description = document.querySelector('#edit-description').value.trim();
    const status = document.querySelector('#edit-status').value;
    const urgency = document.querySelector('#edit-urgency').value;

    const id = event.target.getAttribute('data-id');
    console.log(id);
    // is this supposed to be /api/ticket/:ticketId? 
    const response = await fetch(`/api/ticket/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            ticket_id: id,
            subject,
            description,
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
    .addEventListener('submit', saveEditBtnHandler);


// add message
// Listen for submit events on the addMessage element. When the submit event occurs, capture the form field data and POST to /api/log/:ticketId?drawer=<BOOLEAN>
const addMessageHandler = async (event) => {
    event.preventDefault();

    const messageTxt = document.querySelector('#message-txt').value.trim();
    const id = event.target.getAttribute('data-id');
    const drawerBoolean = document.querySelector('#drawer-boolean').value; // IS THIS RIGHT? WOULD I HAVE THIS SET TO TRUE SINCE THE DRAWER SHOULD BE OPEN WHEN THEY SEND A MESSAGE? or is this for the ishidden property??

    const response = await fetch(`/api/log/${id}?drawer=${drawerBoolean}`, {
        method: 'POST',
        body: JSON.stringify({
            ticketId: id,
            message: messageTxt,
            type: 'Message', // WOULD TYPE ALWAYS BE MESSAGE?
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // redirect to ticket they are messaging about??????
    if (response.ok) {
        document.location.replace(`/ticket/${id}`);
    } else {
        alert('Failed to send message');
        console.log(response.statusText)
    }
};

// add message btn listener
document
    .querySelector('.add-message-btn')
    .addEventListener('submit', addMessageHandler);


// toggle hide message
// Listen for click events on the toggleHideMessage button elements. When the click event occurs capture the log id and make a PUT call to /api/log/:ticketId/:logId?drawer=<BOOLEAN>
const hideMessageHandler = async (event) => {
    event.preventDefault();

    const toggleHideBtn = document.querySelector('#toggle-hide').value;
    const id = event.target.getAttribute('data-id');
    const logId = document.querySelector('#log-id').value;
    const drawerBoolean = document.querySelector('#drawer-boolean').value; // IS THIS RIGHT? WOULD I HAVE THIS SET TO TRUE SINCE THE DRAWER SHOULD BE OPEN WHEN THEY SEND A MESSAGE? or is this for the ishidden property??

    if (toggleHideBtn === true) {
        (toggleHideBtn === false)
    }

    if (toggleHideBtn === false) {
        (toggleHideBtn === true)
    }

    const response = await fetch(`/api/log/${id}/${logId}?drawer=${drawerBoolean}`, {
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

document.querySelector('#hide-message').addEventListener('click', hideMessageHandler);


// logout
// Listen for click events on the logout button element. When the click event occurs, make a DELETE call to /api/users

const logout = async () => {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out.');
    }
};

document.querySelector('#logout').addEventListener('click', logout);