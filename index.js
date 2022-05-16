require('dotenv').config()

const { Client, MessageEmbed, MessageAttachment } = require('discord.js');
const QRCode = require('qrcode');

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES'],
});

// fired when the bot is ready and correctly configured
client.once('ready', () => console.log('Bot Ready!'));

// checks for slash commands interactions
client.on('interactionCreate', async (interaction) => {

  // if its not a slash command leave
  if (!interaction.isCommand()) return;

  const {commandName, options} = interaction;

  if (commandName === 'generateqr') {

    // get arguments
    const text = options.getString('text');
    const background = options.getString('background');
    const color = options.getString('color');
    const width = options.getInteger('width');

    // set options for the QRCode
    const opts = {
      color: {
        dark: color ?? '#000',
        light: background ?? '#FFF'
      },
      width: width ?? 116,
    }

    // create base64 string
    QRCode.toDataURL(text, opts, async function (err, b64image) {

        // check if the base64 string has been created -> if not return message to the user
        if(!b64image) {
          return await interaction.reply({ content: 'Error creating QR Code! Check if you have set the value for each used argument correctly.', ephemeral: true });
        }

        // decode base 64 and create a Discord MessageAttachment object
        const data = b64image.split(',')[1];     
        const buf = new Buffer.from(data, 'base64');
        const file = new MessageAttachment(buf, 'qrcode.jpeg');

        // send the whole message
        const res = new MessageEmbed()
          .setTitle('QR Code Response')
          .setImage('attachment://qrcode.jpeg')
          .setTimestamp();
        await interaction.channel.send({ embeds: [res], files: [file]});
      });  
  }
});

client.login(process.env.TOKEN)