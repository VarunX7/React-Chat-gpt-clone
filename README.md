# Chat_GPT clone   
An AI chat app built using React.js and OpenAI's api.

## To get started...   
1. Clone the project or download zip file.   
2. In the terminal type - `npm install`. This will install the node module dependencies.    
3. You will need to get your own api key from https://openai.com/ . Save it in a .env file.     
4. Then type npm start or npm `start:frontend` and `start:backend` to start the frontend and backend respectively.    

## Possible improvements...  
OpenAi's API doesn't track previous queries and responses in the current chat. If you want it to give its responses by taking previous queries into account you can simply change the code to add the previous chats to the 'value' that you are passing on to the backend as message.        
This method would be more expensive though, as the number of tokens passed would greatly increase with each new query.