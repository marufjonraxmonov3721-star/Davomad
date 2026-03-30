const { Bot, webhookCallback } = require("grammy");

// @BotFather dan yangi token oling (bu safar hech kimga ko'rsatmang!)
const bot = new Bot(process.env.BOT_TOKEN);

bot.command("start", (ctx) => {
  return ctx.reply("Instagram video linkini yuboring yoki Web App-ni oching!", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Ilovani ochish", web_app: { url: `https://${process.env.VERCEL_URL}` } }]
      ]
    }
  });
});

// Web App yoki oddiy xabar orqali kelgan linkni qayta ishlash
const handleVideo = async (ctx, url) => {
  if (url.includes("instagram.com")) {
    await ctx.reply("Video tayyorlanmoqda...");
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

// Vercel uchun eksport
module.exports = webhookCallback(bot, "http");
