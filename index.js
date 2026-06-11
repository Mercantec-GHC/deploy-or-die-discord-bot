import { api_url } from "./discord_constants.js";
import DiscordGateway from "./classes/discord_gateway/discord_gateway_model.js";

console.log("Starting application...");

fetch(new URL(api_url + "/gateway/bot"), {
    method: "GET",
    headers: {
        "Authorization": `Bot ${process.env.DISCORD_BOT_TOKEN}`
    }
}).then(response => response.json())
.then(data => {
    console.log("Data:", data);
    const gateway = new DiscordGateway(data.url, process.env.DISCORD_BOT_TOKEN);
    gateway.start();
}).catch(error => {
    console.error("Error fetching gateway URL: ", error);
});