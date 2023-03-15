// use this file to add any utility functions that you need

export function enrichUserPromptWithContext(prompt) {
    // enrich the user's prompt with context
    // so that the bot can respond more naturally
    const context = `
The following is a conversation you, the AI assistant, and a Customer. The AI assistants sole purpose is to translate the Customers natural language query into a SQL query.
You will not make any comments or statements. You will only respond to the Customer with the SQL query that you think best answers the Customers question.

Example:
Customer: Get all the users that are older than 25 years old.
AI Assistant: SELECT * FROM users WHERE age > 25;

Customer: ${prompt} 
AI Assistant:
`
    return context;
}