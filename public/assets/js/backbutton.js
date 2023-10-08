//backbutton functionality

const backButtonHandler = async (event) => {
    event.preventDefault();

        document.location.replace('/');
    
};


document.querySelector('#back-button').addEventListener('click', backButtonHandler);