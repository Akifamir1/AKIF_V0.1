/**
 * 👑 Akif-V1 👑
 * Mode Command (Worktype / Public / Private Toggle)
 * Developed by Akif (ixxAkif)
 */
const { Akif_updateBotConfig } = require('../Akiflib/database');
const config = require('../Akif');

module.exports = {
    name: 'mode',
    aliases: ['worktype', 'workmode', 'setmode'],
    category: 'SETTINGS',
    desc: 'Switch bot work mode between private and public',
    Akif_handler: async (Akif_sock, Akif_origin, context) => {
        const { Akif_msg, Akif_args, Akif_isOwner, sessionId } = context;

        if (!Akif_isOwner) {
            return await Akif_sock.sendMessage(Akif_origin, {
                text: '❌ *Access Denied!* This command is restricted to the bot owner.'
            }, { quoted: Akif_msg });
        }

        const currentMode = (config.workMode || 'private').toLowerCase();
        const arg = (Akif_args[0] || '').toLowerCase();

        if (!arg) {
            return await Akif_sock.sendMessage(Akif_origin, {
                text: `🔒 *CURRENT BOT WORK MODE*: *${currentMode.toUpperCase()}*\n\n` +
                      `Usage:\n` +
                      `• \`.mode private\` - Only owner/superowners can use bot commands\n` +
                      `• \`.mode public\` - All users can use bot commands`
            }, { quoted: Akif_msg });
        }

        if (arg === 'private' || arg === 'self') {
            config.workMode = 'private';
            await Akif_updateBotConfig(sessionId, { workMode: 'private' });
            if (global.invalidateConfigCaches) global.invalidateConfigCaches(sessionId);
            return await Akif_sock.sendMessage(Akif_origin, {
                text: '🔒 *Bot work mode set to PRIVATE.* Only owner and superowners can use bot commands.'
            }, { quoted: Akif_msg });
        } else if (arg === 'public') {
            config.workMode = 'public';
            await Akif_updateBotConfig(sessionId, { workMode: 'public' });
            if (global.invalidateConfigCaches) global.invalidateConfigCaches(sessionId);
            return await Akif_sock.sendMessage(kaif_origin, {
                text: '🌐 *Bot work mode set to PUBLIC.* All users can use bot commands.'
            }, { quoted: Akif_msg });
        } else {
            return await Akif_sock.sendMessage(kaif_origin, {
                text: '❌ *Invalid mode!* Choose either `private` or `public`.'
            }, { quoted: Akif_msg });
        }
    }
};
