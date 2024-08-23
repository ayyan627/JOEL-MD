const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOENDY21uNUR4TUJ2SE4vamlUczdWSnBNSEVnSWU5ZzVibWlwUTE0L29uZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZGZJcjhSNkNtVjUrWUQrUnVRbW5wZU1HTFhCWG5uS1FzQ2Z2amdxQmQzVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVQ0pLL3VBRm5MOEkxYzhSVU9iazlhdC9UckRhUHpyQlRpOXBQK09aRDAwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmTTJaTTFzVXBrS3l6SDA4Z1R2cUNpYmkyUG9SWTJKZFhLVHgrUDQxaWs0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9MOTRmSys1cmE3aGV3QVVxZlJlWGN0T09TemlxSkVTT1ozWGliUUVmRTQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxHUnk2M2hmZktZYk9mVUhaU09GMGtLYk9ZRHc4Z09PU0FCTU8ycDBYVE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ01MZ1kvRERuV1lEc04wRW9lWFlEaFJsa3hBL016R0RDdXhqZzVEZTYzND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUnRTQnRQazRETHpQUEJYbmt2cmtCZGRxUEU3Z29RU081WmNYalZweWoyTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZwUXl4OThoczJYR2ZMT3pyTndzTlB2bjlLWVdQZGw0bXQyVWw2Q1NqTlVITm5pMjg0VlExWnNNYWt4NlkyWExQdTN6YUM2Z2REZ253ak5DQjFaMmh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYsImFkdlNlY3JldEtleSI6InhDVVpSbytxYkF6TWF0K2dzV21NVVFBb0RUdVFRbFNVbXZvUTVrcUhPSlU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMTM0MzQzMDAwNzJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQzI0NUJGNTIyNzJGQjYxQkVFQThBQjI3MDRFNTNERkUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNDM5NzI1MH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMTM0MzQzMDAwNzJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQzk5RDY3NjE4RTI0Nzk0OUREOEU0QzIxRUY5MUEwODEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNDM5NzI1MH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoidGYwTWpPa0lSbm0xS1NqdTU5NGI4QSIsInBob25lSWQiOiJjYzI5MmJjMS00Mjc0LTQzNGYtOGIzNy01MTY3Mzc5OTc1MjUiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNStVZnBXQzFOSXRyY2JEdzZ2MnpUSS9xWURVPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBCb0RwVTl3ODBVZ2JOdzhmUzQ4MW1McmhrRT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiIyREVMVFo0NCIsIm1lIjp7ImlkIjoiMTM0MzQzMDAwNzI6MUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT1NSaHRJREVMUHRvTFlHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZXNYSmdrWFczRFNlZU1Eamdqa2grUkVmSGk0clAxMjlQSHNab1BpVDVrMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiU1hVcEo3WHpoQkVHMThyblFTVjE3ZmQ2Y3VlcHVNNjA3WjZLTVBQTHEwbW01L1lvYnRoek40cE5UUVRSenBkdEZ2WUpqdWdMMnVtcU1iV3RtMDh5RHc9PSIsImRldmljZVNpZ25hdHVyZSI6IjJndGlCay90Y2dEZDZRamdHMmlOZENLNEk4L2h0b1pFNWVNQTBFTm5PZVRVaTRGTzMxWDZUWG9RUDRLQjlNaUxPZjlwTjRiaG1XVzhxNkRCazVCRGpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTM0MzQzMDAwNzI6MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYckZ5WUpGMXR3MG5uakE0NEk1SWZrUkh4NHVLejlkdlR4N0dhRDRrK1pOIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI0Mzk3MjQ4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU1xTSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "joel_it",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255714595078",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'joel bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/7fad220f8082eaff5eb1d.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '1',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   DB: process.env.DB || 'postgres://neoverse:pomrleUMXwlmlpIcW2oFJmMX0CXzaFkf@dpg-combonun7f5s73d7uoog-a.oregon-postgres.render.com/neoverse_wz98',
                  /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
