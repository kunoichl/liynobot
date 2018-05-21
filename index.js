//this is required for making the Discord bot work.
const Discord = require('discord.js')

//this creates a framework for the bot to play with the Discord API. the name 'client' in all instances (aside from Discord.Client) can be changed to whatever.
const client = new Discord.Client();

//this is a set of character(s) that go in front of the message to let the bot know that it should reply to this message. make anything the prefix, i have it set to '$' for convenience.
const prefix = "]"

//code designed to keep bot online, pings roughly every five minutes
const http = require('http');
const express = require('express');
const app = express();
//Date.now returns a time in Unix Seconds, find a way to get a timestamp that isn't Unix.
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping received!");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000)

//once you have made the bot account in itself, find where the token is stored there and paste that into the .env file like this, without the quotes: "TOKEN=[token goes here]"
client.login(process.env.TOKEN)

//this tells the bot that once it logs in using the token, it will start checking messages.
client.on('ready', () => {
    console.log("Bot online!")
    client.user.setActivity(`with ${client.guilds.size} servers!`, { type: "PLAYING" } )
})

client.on("message", message => {

    let cmdUser = message.guild.member(message.author)
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    
    if(message.author.bot) return;

    if(cmd === `${prefix}ping`)
    {
    let pingTime = new Date().getTime() - message.createdTimestamp

    console.log("Ping request sent by " + cmdUser + ", sending message...")
    message.channel.send("This message took " + pingTime + " to make a round-trip!")
    }
});