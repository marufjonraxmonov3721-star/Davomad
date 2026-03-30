const { Bot, webhookCallback } = require("grammy");
const axios = require("axios");

const bot = new Bot("8034357680:AAHiJgpdI5kcnHDxK2jqHXtSZyAz1gAzMOw");

bot.on("message", async (ctx) => {
    const url = ctx.message.text || (ctx.message.web_app_data ? ctx.message.web_app_data.data : "");

    if (url.includes("instagram.com")) {
        await ctx.reply("Video yuklanmoqda... ⏳");

        try {
            // Instagram yuklovchi mutlaqo boshqa bepul manba
            const res = await axios.get(`https://instasave.org/api/instagram?url=${url}`);
            
            // Video silkasini topish
            const videoUrl = res.data.video || (res.data.media && res.data.media[0].url);

            if (videoUrl) {
                await ctx.replyWithVideo(videoUrl, { caption: "Marhamat! ✅" });
            } else {
                // Agar u usul ishlamasa, zaxira varianti
                const backupUrl = url.replace("instagram.com", "ddinstagram.com");
                await ctx.replyWithVideo(backupUrl, { caption: "Zaxira usulida yuklandi ✅" });
            }
        } catch (e) {
            // Eng oxirgi chora: shunchaki silkasini o'zgartirib yuborish
            try {
                const finalTry = url.replace("instagram.com", "ddinstagram.com");
                await ctx.replyWithVideo(finalTry, { caption: "Tayyor! ✅" });
            } catch (err) {
                await ctx.reply("Kechirasiz, Instagram bu videoni bloklab qo'ydi. Boshqa link bilan urinib ko'ring.");
            }
        }
    }
});

module.exports = webhookCallback(bot, "http");
