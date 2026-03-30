const { Bot, webhookCallback } = require("grammy");

// Sizning tokeningiz joylandi
const bot = new Bot("8034357680:AAHiJgpdI5kcnHDxK2jqHXtSZyAz1gAzMOw");

bot.command("start", (ctx) => {
  return ctx.reply("Instagram video linkini yuboring yoki Web App-ni oching!", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Ilovani ochish", web_app: { url: `https://${process.env.VERCEL_URL}` } }]
      ]
    }
  });
});

const handleVideo = async (ctx, url) => {
  if (url.includes("instagram.com")) {
    await ctx.reply("Video tayyorlanmoqda...");
    // ddinstagram orqali yuklash
    const videoLink = url.replace("instagram.com", "ddinstagram.com");
    try {
      await ctx.replyWithVideo(videoLink, { caption: "Tayyor! ✅" });
    } catch (e) {
      await ctx.reply("Xatolik! Video yopiq profildan bo'lishi mumkin.");
    }
  }
};

bot.on("message:text", (ctx) => handleVideo(ctx, ctx.message.text));
bot.on("message:web_app_data", (ctx) => handleVideo(ctx, ctx.message.web_app_data.data));

module.exports = webhookCallback(bot, "http");
