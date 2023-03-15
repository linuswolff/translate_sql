import express from 'express'
import * as path from 'path'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
import * as dotenv from 'dotenv'
import {enrichUserPromptWithContext} from "./utils.js";

// load environment variables from .env file
dotenv.config();

// initialize express app
export const app = express()

// parse application/json request bodies
app.use(bodyParser.json())

// serve static files from client folder (js, css, images, etc.)
app.use(express.static(path.join(process.cwd(), 'client')))

// create http post endpoint that accepts user input
// our route `/api/openai` is arbitrary
// but it's generally a convention to prefix routes with `/api` 
// followed by a descriptive resource name, in our case `/openai`

// note that this is an HTTP POST request as denoted by `app.post`
app.post('/api/openai', async (req, res) => {
    const { question } = req.body;

    // send a request to the OpenAI API with the user's prompt
    // using the node-fetch library
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            // notice how we're using process.env here
            // this is using the environment variable from the .env file
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        // construct the request payload 
        // to be sent to the OpenAI API,
        // passing in an 'enriched' version
        // of the user's prompt
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: enrichUserPromptWithContext(question),
			// the maximum number of tokens/words the bot should return
            // in response to a given prompt
            max_tokens: 100,
        }),
    });
    
    // parse the response from OpenAI as json
    const data = await response.json();

    // return the json response to the client
    res.json({ data: data.choices[0].text });
});

// set the port to listen on
// which is either the port specified in the .env
// or 3000 if no port is specified
const PORT = process.env.PORT || 3000;

// start the express server
app.listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));

