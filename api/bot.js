const { Bot, webhookCallback } = require("grammy");
const axios = require("axios");

const bot = new Bot("8034357680:AAHiJgpdI5kcnHDxK2jqHXtSZyAz1gAzMOw");

bot.on("message", async (ctx) => {
    const url = ctx.message.text || (ctx.message.web_app_data ? ctx.message.web_app_data.data : "");

    if (url.includes("instagram.com")) {
        await ctx.reply("Video yuklanmoqda... ⏳");

        try {
            // Cobalt API - Mutlaqo tekin va kalit talab qilmaydi
            const response = await axios.post('https://api.cobalt.tools/api/json', {
                url: url,
                vQuality: '720'
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.data && response.data.url) {
                await ctx.replyWithVideo(response.data.url, { caption: "Marhamat! ✅" });
            } else {
                await ctx.reply("Xatolik: Videoni olib bo'lmadi. Linkni tekshiring.");
            }
        } catch (e) {
            console.error(e);
            await ctx.reply("Hozirda yuklashda muammo bor yoki link xato. Keyinroq urinib ko'ring.");
        }
    }
});

module.exports = webhookCallback(bot, "http");
