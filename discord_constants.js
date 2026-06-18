// Discord API documentation
// https://docs.discord.com/developers/reference

/** The version of the Discord API to use. */
export const discord_api_version = "v10";
/** The base URL for the Discord API. */
export const base_api_url = new URL("https://discord.com/api");
/** The full URL for the Discord API, including the version. */
export const api_url = new URL(`${base_api_url}/${discord_api_version}/`, base_api_url);