export const generatePassword = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";

  return Array.from(
    { length: 14 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};
