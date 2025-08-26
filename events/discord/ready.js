// triggers when the bot connects to discord's servers
import * as Discord from "discord.js";

export default async (client) => {

    await client.user.setPresence({
        activities: [
            {
                name: `sam through his window`,
                type: Discord.ActivityType.Watching,
            },
        ],
        status: "online",
    });

    console.log(`Logged in as ${client.user.tag}`);
}