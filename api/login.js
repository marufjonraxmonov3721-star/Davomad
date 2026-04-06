const { IgApiClient } = require('instagram-private-api');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Faqat POST so'rovi qabul qilinadi" });
    }

    const { username, password } = req.body;
    const ig = new IgApiClient();
    ig.state.generateDevice(username);

    try {
        // Instagramga kirish jarayoni
        await ig.simulate.preLoginFlow();
        const loggedInUser = await ig.account.login(username, password);
        process.nextTick(async () => await ig.simulate.postLoginFlow());

        // Ma'lumotlarni olish
        const followersFeed = ig.feed.accountFollowers(loggedInUser.pk);
        const followingFeed = ig.feed.accountFollowing(loggedInUser.pk);

        const followers = await followersFeed.items();
        const following = await followingFeed.items();

        const followerNames = followers.map(u => u.username);
        const followingNames = following.map(u => u.username);

        // Qaytarmaganlarni hisoblash
        const dontFollowBack = followingNames.filter(u => !followerNames.includes(u));

        return res.status(200).json({
            success: true,
            followers: followers.length,
            following: following.length,
            dontFollowBack: dontFollowBack.length,
            mutual: followers.length - (followerNames.filter(u => !followingNames.includes(u)).length)
        });

    } catch (err) {
        return res.status(400).json({ 
            success: false, 
            error: "Instagram xatosi: " + err.message 
        });
    }
}
