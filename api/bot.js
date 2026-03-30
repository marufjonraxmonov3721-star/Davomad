const { Bot, webhookCallback } = require("grammy");

const bot = new Bot("8034357680:AAHiJgpdI5kcnHDxK2jqHXtSZyAz1gAzMOw");

bot.on("message:web_app_data", async (ctx) => {
    const videoLink = ctx.message.web_app_data.data;
    
    try {
        await ctx.replyWithVideo(videoLink, {
            caption: "Siz so'ragan video! ✅"
        });
    } catch (e) {
        await ctx.reply("Kechirasiz, videoni to'g'ridan-to'g'ri yuborib bo'lmadi. Link orqali ko'ring:\n" + videoLink);
    }
});

module.exports = webhookCallback(bot, "http");
