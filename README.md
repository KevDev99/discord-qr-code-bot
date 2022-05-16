# Discord Bot - QR Code Generator

![image](https://user-images.githubusercontent.com/102754713/168608927-71c87c2e-9c2d-44e1-a136-ebd859c7347d.png)


# Installation
````dotenv
TOKEN = YOUR_BOT_TOKEN
APP_ID = APPLICATION_ID
````

Clone this repo and run ***first***
```javascript
npm install
````

then create the slash command with
```javascript
node slash-command.js
````

start bot
```javascript
node .
```

# Usage

use slash command in discord chat
```
/generateqr text: YOUR_TEXT

  optional:
  * background: YOUR_HEX_BACKGROUND_COLOR 
  * color: YOUR_HEX_COLOR
  * width: YOUR_WIDTH 
```
