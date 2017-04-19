# Badkittybot
My slack bot: **@bad.kitty**! He won't encourage you or help you ever. He will offer you photos of his sarcastic feline friends.
Type **/help** in slack while mentioning **@bad.kitty** for a list of commands and interactions!

## Commands
Commands | Response
---|---
/help | List all the commands
/uptime | Bot uptime
/custom | List custom interactions
/git | Links the github
'Fact', 'Tell me something' | Random fact about cats
'Img', 'Photo', 'Inspiration' | Displays a cat meme


## Custom Interactions
Commands | Response
---|---
'Hello', 'Hi', 'Hey' | "I'm chewing on a mouse head. He's still twitching. How rude."
'My name is [Name]', 'Call me [Name]' | "Good, I know your name. Hey, [Name] do you have any catnip? I'm having a long day."
'What time is it?' | "It's mouse eating time!"
'I have a problem', 'question', 'oh no' | "Fire solves much. Have you tried fire?"
'Do you know a joke?', 'Joke', 'Lol' | "ur a joke"
'You are not nice', 'meany' | "Whatever. Rub my belleh"
'You're a wild cat' | "Tell me something I don't know."

## How to run the bot
1. Clone the repo
2. Create a bot in slack (https://YOURTEAMHERE.com/apps/manage/custom-integrations)
3. Get the token
    * if you wish to run it local or without an ".env" file skip to step 6
4. Create an ".env" in the same folder as index.js
5. Add "token=YOURBOTTOKEN" to the file
6. run the bot using "node index.js" or if you didn't make an env, "set token=YOURTOKEN & node index.js"

## How to add commands
1. Add your command to either commands.json or custom.json
2. Create the function in index.js
3. Edit the README.md to reflect the changes
