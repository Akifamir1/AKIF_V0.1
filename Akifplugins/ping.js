/**
 * ⚡ Akif-V1 ⚡
 * Ping Command - High Speed Response
 * Developed by Akif (ixxAkif)
 */
module.exports = {
    name: 'ping',
    category: 'Information',
    desc: 'Show the bot response speed',
    kaif_handler: async (Akif_sock, Akif_origin, context) => {
        const { Akif_msg } = context;

        const start = Date.now();
        const networkLatency = Math.max(0, Date.now() - (kaif_msg.messageTimestamp ? kaif_msg.messageTimestamp * 1000 : Date.now()));
        const botProcessTime = Math.max(0, Date.now() - (kaif_msg._receivedAt || start));

        let report = `⚡ *PONG! Akif-V1 IS ACTIVE* ⚡\n\n`;
        report += `🚀 *Bot Response Speed:* ${botProcessTime}ms\n`;
        report += `📡 *Network Latency:* ${networkLatency}ms\n\n`;
        report += `📞 *Owner Contact:* wa.me/923189664554`;

        try {
            return await Akif_sock.sendMessage(Akif_origin, { text: report }, { quoted: kaif_msg });
        } catch (e) {
            return await Akif_sock.sendMessage(Akif_origin, { text: report });
        }
    }
};
