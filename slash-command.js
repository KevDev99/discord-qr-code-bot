const DiscordJS = require('discord.js')
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const commands = [
  {
    name: 'generateqr',
    description: 'Generate a QR Code',
    options: [
      {
        name: 'text',
        description: 'Your text for the QR Code',
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'background',
        description: 'Set a hex color for your background',
        required: false,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'color',
        description: 'Set a hex color for your color',
        required: false,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
      },
      {
        name: 'width',
        description: 'Set your size for the QR Code, Example: 200 -> which resolves in 200x200',
        required: false,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.INTEGER
      }
    ]
  },
];

const rest = new REST({version: '9'}).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.APP_ID), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();