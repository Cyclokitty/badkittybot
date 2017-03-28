require('dotenv').config();
const Botkit = require('botkit');
const os = require('os');
const randomPick = require('unique-random-array');
const catPics = require('./catPics.json');

var controller = Botkit.slackbot({
  debug: false
});

// connect the bot to a stream of messages
controller.spawn({
  token: process.env.TOKEN,
}).startRTM();

// giv the bot something to listen for
controller.hears(['hello', 'hi'], 'ambient', (bot, message) => {
  bot.reply(message, "I'm chewing on a mouse head. He's still twitching. How rude.");
});

// get bot to greet you by name
controller.hears(['my name is (.*)', 'call me (.*)'], 'direct_message,direct_mention,mention', (bot, message) => {
  var name = message.match[1];
  controller.storage.users.get(message.user, (err, user) => {
    if (!user) {
      user = {
        id: message.user,
      };
    }
    user.name = name;
    controller.storage.users.save(user, (err, id) => {
      bot.reply(message, "Good, I know your name. Hey, " + user.name + " do you have any catnip? I'm having a long day.");
    });
  });
});

controller.hears('what time is it?', 'direct_message,direct_mention,mention', (bot, message) => {
  bot.reply(message, "It's mouse eating time!");
});

controller.hears(['I have a problem', 'question', 'oh no'], 'ambient,direct_message,direct_mention,mention', (bot, message) => {
  bot.reply(message, "Fire solves much. Have you tried fire?");
});

controller.hears(['Do you know any jokes?', 'jokes', 'lol'], 'direct_message,direct_mention,mention', (bot, message) => {
  bot.reply(message, "ur a joke");
});

controller.hears(['You are not nice', 'meany'], 'direct_message,direct_mention,mention', (bot, message) => {
  bot.reply(message, "whatever. Rub my belleh!");
});

controller.hears(['img', 'photo', 'inspiration'], 'ambient', (bot, message) => {
  var image = randomPick(catPics);
  bot.reply(message, image());
});
