const { Bot, webhookCallback } = require("grammy");
const axios = require("axios");

// Bot tokeningiz
const bot = new Bot("8034357680:AAHiJgpdI5kcnHDxK2jqHXtSZyAz1gAzMOw");

bot.on("message", async (ctx) => {
    const url = ctx.message.text || (ctx.message.web_app_data ? ctx.message.web_app_data.data : "");

    if (url.includes("instagram.com")) {
        await ctx.reply("Video yuklanmoqda... ⏳");

        try {
            const options = {
                method: 'GET',
                url: 'https://social-media-video-downloader.p.rapidapi.com/smvd/get/all',
                params: { url: url },
                headers: {
                    // Skrinshotingizdagi kalitni bu yerga to'liq qo'ydim
                    'X-RapidAPI-Key': '7c5c5333b3mshe85b38ff410ef591p18d45ajsn7c5c5333b3m', 
                    'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com'
                }
            };

            const response = await axios.request(options);
            
            // API javobidan videoni sug'urib olish logikasi
            if (response.data && response.data.contents && response.data.contents[0].videos) {
                const videoUrl = response.data.contents[0].videos[0].url;
                await ctx.replyWithVideo(videoUrl, { caption: "Marhamat! ✅" });
            } else {
                await ctx.reply("Videoni topib bo'lmadi. Linkni tekshiring.");
            }
        } catch (e) {
            console.error(e);
            await ctx.reply("Xatolik: API limit tugagan bo'lishi mumkin.");
        }
    }
});

module.exports = webhookCallback(bot, "http");
