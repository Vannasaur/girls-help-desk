// new ticket modal 
const newTicket = document.querySelector('#new-ticket-btn');
const ticketModal = document.querySelector('#new-ticket');
const ticketSubmitBtn = document.querySelector('#submit-ticket-btn');
const closeModalBtn = document.querySelector('#close-new-ticket-modal');

// open drawer
// Listen for click events on the openDrawer element. When the click event occurs, open the side drawer element.
newTicket.addEventListener('click', () => {
    ticketModal.style.right = '0';
    ticketModal.classList.remove('hidden');
})
// close drawer (new ticket modal)
ticketSubmitBtn.addEventListener('click', () => {
    ticketModal.style.right = '-300px';
    ticketModal.classList.add('hidden');
})
closeModalBtn.addEventListener('click', () => {
    ticketModal.style.right = '-300px';
    ticketModal.classList.add('hidden');
})

// create new ticket
// Listen for submit events on the createNewTicket element. When the submit event occurs, capture the form field data and POST to /api/ticket
const createNewTicketForm = document.querySelector('#submit-ticket-btn');

createNewTicketForm.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form field values
    const subject = document.querySelector('#subject').value;
    const description = document.querySelector('#description').value;
    const urgency = document.querySelector('#urgencyFilter').value;
    console.log(subject, description, urgency)
    // Create a data object to send as JSON to the server
    const formData = {
        subject,
        description,
        urgency,
    };

    try {
        // Send a POST request to the server
        const response = await fetch('/api/ticket', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        
        if (response.ok) {
            // if ticket creation successful
            console.log('New ticket created!');
            const ticketId = response.url.split('/')[
                response.url.split('/').length - 1
            ];
            console.log(ticketId)
            document.location.replace(`/ticket/${ticketId}`)
            // const ticketId = response.url.split('/')[
            //     response.url.split('/').length - 1
            // ];
            // console.log(ticketId)
            // // document.location.replace(`/ticket/${ticketId}`)

        } else {
            // if ticket creation failed
            console.error('Error creating the ticket:', response.statusText);
        }
    } catch (err) {
        console.error('An error occurred:', err);
    }
});


// claim ticket (for tech)
// Listen for click events on the claimTicket button elements. When the click event occurs, capture the ticket id data and PUT to /api/ticket/:id
// Must have a list of tickets with claim buttons, and each button has a data-id attribute containing the ticket ID
const userId = document.getElementById('userData').getAttribute('data-user-id');
const claimTicketButtons = document.querySelectorAll('.claim-ticket-btn');

claimTicketButtons.forEach((button) => {
    button.addEventListener('click', async () => {
        const ticketId = button.getAttribute('data-id');

        try {
            // PUT request to claim the ticket
            const response = await fetch(`/api/ticket/${ticketId}`, {
                method: 'PUT',
                body: JSON.stringify({ techId: userId, status: 'Claimed' }), // techId is claiming the ticket in ticketControllers req.body
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // if ticket claimed successfully
                console.log(`Ticket ${ticketId} claimed.`);
                document.location.reload();
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
// Listen for click events on the logout button element. When the click event occurs, make a DELETE call to /api/user
const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        console.log('Signed out!');
        document.location.replace('/login');
    } else {
        alert('Failed to log out.');
    }
};

document.querySelector('#logout').addEventListener('click', logout);
