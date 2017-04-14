// Libraries
require('dotenv').config();
const Botkit = require('botkit');
const os = require('os');
const randomPick = require('unique-random-array');
const request = require('request');
const rp = require('request-promise');

// Other stuff
const commands = require('./commands.json');
const customInteractions = require('./custom.json');
const catPics = require('./catPics.json');
const catFactUrl = 'http://catfacts-api.appspot.com/api/facts';

var controller = Botkit.slackbot({
  debug: false
});

// connect the bot to a stream of messages
controller.spawn({
  token: process.env.TOKEN,
}).startRTM();


// greeting
controller.hears(['hello', 'hi', 'hey'], 'direct_message,direct_mention,mention', (bot, message) => {
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


// cat facts
controller.hears(['fact', 'tell me something'], 'direct_message,direct_mention,mention',
    function (bot, message) {
        catQuote(bot, message);
    });

function catQuote(bot, message) {
    var options = {
        uri: catFactUrl,
        json: true
    };

    rp(options)  // request-promise
        .then(function (data) {
            bot.reply(message,
                "Did you know?\n" + data.facts[0]
            );
        })
        .catch(function (err) {
        });
}

// uptime
controller.hears(['/uptime'],
    'direct_message,direct_mention,mention', function (bot, message) {

        var hostname = os.hostname();
        var uptime = formatUptime(process.uptime());

        bot.reply(message,
            ':cat: I am a bot named <@' + bot.identity.name +
            '>. I have been running for ' + uptime + '.');
    });

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime.toFixed(2) + ' ' + unit;
    return uptime;
}

// help 
controller.hears(['/help'], ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
    let commandsStr = "*Commands* \n```";
    for (var i in commands) {
        commandsStr += i + ' --- ' + commands[i] + '\n';
    }
    bot.reply(message, botHelp());

});

function botHelp() {
    let commandsStr = '', responsesStr = '';
    for (var i in commands) {
        commandsStr += i + '\n';
        responsesStr += commands[i] + '\n';
    };
    let messageFormat = {
        "attachments": [{
        "fields": [
            {
                "title": "Commands", 
                "value": commandsStr, // after 32 characters, the values will overflow to the next line
                "short": "true" // lets the two fields be side by side
            },
            {
                "title": "Responses",
                "value": responsesStr, // after 32 characters, the values will overflow to the next line
                "short": "true" // lets the two fields be side by side
            }
        ],
        "footer": "https://github.com/Cyclokitty/badkittybot.git",
        "footer_icon": "https://avatars2.githubusercontent.com/u/14623520?v=3&s=40"

    }]};
    return messageFormat;
}

// list custom interactions
controller.hears('/custom', 'direct_message,direct_mention,mention', (bot, message) => {
  bot.reply(message, botCustom());
});

function botCustom() {
    let customStr = '', customRes = '', attachmentArr = [];
    for (var i in customInteractions) {
        attachmentArr.push({"pretext":i, "text":customInteractions[i], "color": "#36a64f"});
    };
    let customFormat = {
        "attachments": attachmentArr
    };
    return customFormat;
}

// git
controller.hears('/git', 'direct_message,direct_mention,mention', (bot, message) => {
  bot.reply(message, "https://github.com/Cyclokitty/badkittybot.git");
});

// cat pictures
controller.hears(['img', 'photo', 'inspiration'], ['ambient','direct_message', 'direct_mention', 'mention'], (bot, message) => {
  var image = randomPick(catPics);
  bot.reply(message, image());
});


// custom interactions
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
controller.hears(['You\'re a wild cat'], 'direct_message,direct_mention,mention', (bot, message) => {
  bot.reply(message, "Tell me something I don't know.");
});