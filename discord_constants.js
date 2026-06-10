// Discord API documentation
// https://docs.discord.com/developers/reference

export const discord_api_version = "v10";
export const base_api_url = new URL("https://discord.com/api");
export const api_url = new URL(`${base_api_url}/${discord_api_version}/`, base_api_url);