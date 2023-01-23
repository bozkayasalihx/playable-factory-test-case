import crypto from "crypto";

export const fileExtensionRegex = new RegExp(".([a-z]{2,})$", "gi");
export const randomText = (bytes = 32) =>
    crypto.randomBytes(bytes).toString("hex");
