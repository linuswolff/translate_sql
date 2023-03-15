// when the window loads, attach an event listener to the form
// that fires when the 'send' button is clicked
window.onload = () => document.getElementById('prompt-form').addEventListener('submit', (e) => {
    // prevent the form from refreshing the page
    e.preventDefault();

    // get the value of the input
    const question = document.getElementById('prompt-input').value;

    // call the function that handles the fetch request
    // (we'll create this function next)
    handleSubmitQuestion(question).then((data) => {
        // add the chatbot's response to the DOM 
        // when the fetch request is complete
        // (we'll create this function later)
        addBotResponseToDialogueBox(data);
    });
});

// function accepts the user `question` as an input
async function handleSubmitQuestion(question) {
    // input validation
    if (!question) {
        return alert('Please enter your support question');
    }

    // add the user's question to the DOM
    // (we'll implement this later)
    addUserQuestionToDialogueBox(question);

    // send fetch request to our backend api
    const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
    });
    
    // extract the `data` field from the response then return it
    const { data } = await response.json();
    return data;
}

// accept the user's question as a function input
function addUserQuestionToDialogueBox(question) {
    // create a new li element
    const userQuestion = document.createElement('li');

    // add user-specific styling to element
    // so that it's obvious this is the user's prompt 
    // and not a response from the chatbot
    userQuestion.classList.add('bg-indigo-500', 'text-white', 'rounded', 'p-2', 'w-fit', 'self-end', 'break-words');

    // add the user's question to the li element
    userQuestion.innerText = question;

    // add the li element to the DOM
    document.getElementById('dialogue').appendChild(userQuestion);

    // clear the input for the next question
    document.getElementById('prompt-input').value = '';
}

function addBotResponseToDialogueBox(response) {
    // create a new li element
    const botResponse = document.createElement('li');

    // add bot-specific styling to element
    botResponse.classList.add('bg-gray-500', 'text-white', 'rounded', 'p-2', 'w-fit', 'self-start');

    // add the bot's response to the element
    botResponse.innerText = response.trim();

    // add the li element to the DOM
    document.getElementById('dialogue').appendChild(botResponse);
}