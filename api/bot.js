const { Bot, webhookCallback } = require("grammy");

// Bot tokeningizni Vercel Settings -> Environment Variables qismiga qo'shasiz
const bot = new Bot(process.env.BOT_TOKEN);

bot.command("start", (ctx) => {
    return ctx.reply("Salom! Instagramdan video yuklash uchun ilovani oching:", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Ilovani ochish", web_app: { url: `https://${process.env.VERCEL_URL}` } }]
            ]
        }
    });
});

// Web App-dan kelgan linkni tutish
bot.on("message:web_app_data", async (ctx) => {
    const url = ctx.message.web_app_data.data;
    await ctx.reply("Yuklanmoqda...");

    try {
        // ddinstagram xizmati orqali videoni yuklash
        const videoUrl = url.replace("instagram.com", "ddinstagram.com");
        await ctx.replyWithVideo(videoUrl, {
            caption: "Video tayyor! ✅"
        });
    } catch (e) {
        await ctx.reply("Xatolik: Videoni yuklab bo'lmadi. Profil yopiq bo'lishi mumkin.");
    }
});

// Vercel webhook xizmati uchun eksport
module.exports = webhookCallback(bot, "http");
