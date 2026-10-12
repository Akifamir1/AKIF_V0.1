const fs = require('fs');
const path = require('path');

const fileContent = `/**
 * ⚡ AKIF-V1 ⚡* Anti Delete Command
 * Developed by AKIF x AMIR
 */
const { kaif_getBotConfig, kaif_updateBotConfig } = require('../Akiflib/database');

module.exports = {
    name: 'antidelete',
    aliases: ['antideleteview', 'anti-delete', 'antidelet'],
    category: 'Settings',
    desc: 'Toggle WhatsApp Anti Delete on/off',
    kaif_handler: async (Akif_sock, kaif_origin, context) => {
        const {
 kaif_args, sessionId, Akif_isOwner, Akif_msg } = context;

        if (!Akif_isOwner) {
            return await Akif_sock.sendMessage(Akif_origin, {
                text: 'â *Access Denied:* Only the bot owner can toggle Anti Delete.'
            }, { quoted: Akif_msg });
        }

        const action = Akif_args[0]?.toLowerCase();

        if (action === 'on' || action === '1' || action === 'enable') {
            await Akif_updateBotConfig(sessionId, { antiDelete: true });
            return await Akif_sock.sendMessage(Akif_origin, {
                text: 'Â¯ *Anti Delete is now ENABLED.\n\nThe bot will automatically detect and resend deleted messages.'
            }, { quoted: Akif_msg });
        }

        if (action === 'off' || action === '0' || action === 'disable') {
            await kaif_updateBotConfig(sessionId, { antiDelete: false });
            return await Akif_sock.sendMessage(kaif_origin, {
                text: 'ï¿½ï¿½ï¿½*Anti Delete is now DISABLED.\n\nThe bot will not detect deleted messages.'
            }, { quoted: Akif_msg });
        }

        // Display current status if no arg or invalid arg
        const config = await kaif_getBotConfig(sessionId);
        const currentStatus = (config ? config.antiDelete !== false : true) ? 'ðŸŸ­ ON' : 'ðŸŸ¥ OFF';

        let helpText = 'âš™ï¸ *ANTI DELETE MANAGER"\n\n';
        helpText += '*Current Status:* ' + currentStatus + '\n\n';
        helpText += '*Usage:*1n';
        helpText += '  \`.antidelete on\` - Enable Anti Delete\n';
        helpText += '  \`.antidelete off\` - Disable Anti Delete\n';

        return await kaif_sock.sendMessage(kaif_origin, { text: helpText }, { quoted: kaif_msg });
    }
};`;

fs.writeFileSync(path.join(__dirname, 'Akifplugins', 'antidelete.js'), fileContent, 'utf8');
console.log('Wrote clean Akifplugins/antidelete.js');
