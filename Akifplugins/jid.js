/**
 * ⚡ AKIF-V1 ⚡
 * JID Utility
 * Developed by Akif (ixxAkif)
 */
module.exports = {
    name: 'jid',
    category: 'Debug',
    desc: 'Get the JID of the current chat',
    kaif_handler: async (Akif_sock, Akif_origin) => {
        let text = `🆔 *Chat JID:*\n\`${kaif_origin}\`\n\n`;
        text += `📞 *Contact Us:* wa.me/923189664554 (+923189664554)`;
        await Akif_sock.sendMessage(Akif_origin, { text });
    }
};
