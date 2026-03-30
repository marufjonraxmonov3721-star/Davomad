const { Bot } = require("grammy");
const axios = require("axios");

// DIQQAT: Tokeningizni @BotFather'dan yangilab oling!
const bot = new Bot("8034357680:AAHiJgpdI5kcnHDxK2jqHXtSZyAz1gAzMOw");

bot.command("start", (ctx) => {
    ctx.reply("Instagram video yuklovchi botga xush kelibsiz!", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Ilovani ochish", web_app: { url: "https://sizning-saytingiz.uz" } }]
            ]
        }
    });
});

// Web App'dan kelgan ma'lumotni tutish
bot.on("message:web_app_data", async (ctx) => {
    const videoUrl = ctx.message.web_app_data.data;
    
    await ctx.reply("Video tayyorlanmoqda...");

    try {
        // Tekin yuklash xizmati (misol tariqasida DDInstagram API ishlatamiz)
        const downloadLink = videoUrl.replace("instagram.com", "ddinstagram.com");
        
        await ctx.replyWithVideo(downloadLink, {
            caption: "Mana videongiz! ✅"
        });
    } catch (e) {
        ctx.reply("Xatolik: Videoni yuklab bo'lmadi. Linkni tekshiring.");
    }
});

bot.start();
console.log("Bot ishga tushdi...");
