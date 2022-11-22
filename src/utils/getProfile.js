import { AUTHORS } from "./constants.js";

export async function profileOf(address) {
  try {
    const profile = AUTHORS.find((author) => author.address === address);
    // TODOL handle empty profiles in tipping/index.ejs (e.g 404 page)
    return profile ? profile : {};
  } catch (error) {
    return {};
  }
}
