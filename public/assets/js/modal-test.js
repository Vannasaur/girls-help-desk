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

//------------------------------------------------------------------------------------------

// ----------------- HOME.JS PUBLIC -----------------------

// new ticket modal 
const newTicket = document.querySelector('#new-ticket-btn');
const ticketModal = document.querySelector('#new-ticket');
const ticketSubmitBtn = document.querySelector('#submit-ticket-btn');


// open drawer
newTicket.addEventListener('click', () => {
    ticketModal.style.right = '0';
    ticketModal.classList.remove('hidden');
})
// close drawer ticket
ticketSubmitBtn.addEventListener('click', () => {
    ticketModal.style.right = '-300px';
    ticketModal.classList.add('hidden');
})

// create new ticket
const createNewTicketForm = document.querySelector('#createNewTicketForm');

createNewTicketForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form field values
    const subject = document.querySelector('#subject').value;
    const description = document.querySelector('#description').value;
    const status = document.querySelector('#status').value;
    const urgency = document.querySelector('#urgency').value;

    // Create a data object to send as JSON to the server
    const formData = {
        subject,
        description,
        status,
        urgency,
    };

    try {
        // Send a POST request to the server
        const response = await fetch('/api/ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // if ticket creation successful
            const ticketData = await response.json();
            console.log('New ticket created:', ticketData);
        } else {
            // if ticket creation failed
            console.error('Error creating the ticket:', response.statusText);
        }
    } catch (err) {
        console.error('An error occurred:', err);
    }
});

// claim ticket (for tech)

// Must have a list of tickets with claim buttons, and each button has a data-id attribute containing the ticket ID

const claimTicketButtons = document.querySelectorAll('.claim-ticket-btn');

claimTicketButtons.forEach((button) => {
    button.addEventListener('click', async () => {
        const ticketId = document.querySelectorAll('[data-id]');
        const techId = req.session.user_id;
        try {
            // Send a PUT request to claim the ticket
            const response = await fetch(`/api/ticket/${ticketId}`, {
                method: 'PUT',
                body: JSON.stringify({ techId: techId }), // techId needed to claim the ticket
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // if ticket claimed successfully
                console.log(`Ticket ${ticketId} claimed.`);
                // Redirect or perform any other action you need here
            } else {
                // if ticket claiming fails
                console.error(`Error claiming ticket ${ticketId}:`, response.statusText);
            }
        } catch (err) {
            console.error('An error occurred:', err);
        }
    });
});

// logout

const logout = async () => {
    const response = await fetch('/api/users/logout', {
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