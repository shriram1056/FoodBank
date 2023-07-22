require("dotenv").config();
// config look for the .env file, read the variables you defined and make them available to your application.

export const port = process.env.PORT || 3000;
