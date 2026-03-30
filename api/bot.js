const { Bot, webhookCallback } = require("grammy");

const bot = new Bot("8034357680:AAHiJgpdI5kcnHDxK2jqHXtSZyAz1gAzMOw");

bot.on("message", async (ctx) => {
    let url = ctx.message.text || (ctx.message.web_app_data ? ctx.message.web_app_data.data : "");

    if (url.includes("instagram.com")) {
        // Linkni Telegram "hazm" qila oladigan ko'rinishga keltiramiz
        // Bu usulda Telegram serveri videoni o'zi tortib oladi
        let downloadLink = url.replace("www.", "").replace("instagram.com", "ddinstagram.com");

        try {
            await ctx.replyWithVideo(downloadLink, {
                caption: "Mana videongiz! ✅",
                reply_markup: {
                    inline_keyboard: [[{ text: "Qayta yuklash", url: downloadLink }]]
                }
            });
        } catch (e) {
            // Agar video sifatida keta olmasa, shunchaki linkni o'zini chiroyli qilib beramiz
            await ctx.reply(`Videoni to'g'ridan-to'g'ri yuborib bo'lmadi.\n\nMana bu link ustiga bosing, u o'zi ochiladi:\n${downloadLink}`);
        }
    }
});

module.exports = webhookCallback(bot, "http");
