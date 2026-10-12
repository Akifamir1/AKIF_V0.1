/**
 * ⚡ Akif-V1 ⚡
 * Uptime Command
 * Developed by Akif (ixxAkif)
 */
module.exports = {
    name: 'uptime',
    category: 'Information',
    desc: 'Show the bot uptime',
    Akif_handler: async (Akif_sock, Akif_origin, context) => {
        const uptimeSeconds = process.uptime();
        const days = Math.floor(uptimeSeconds / (3600 * 24));
        const hours = Math.floor((uptimeSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = Math.floor(uptimeSeconds % 60);

        let uptimeStr = `*⏰ Bot Uptime*\n\n`;
        if (days > 0) uptimeStr += `*Days:* ${days}d `;
        if (hours > 0) uptimeStr += `*Hours:* ${hours}h `;
        if (minutes > 0) uptimeStr += `*Minutes:* ${minutes}m `;
        uptimeStr += `*Seconds:* ${seconds}s\n\n`;
        uptimeStr += `📞 *Contact Us:* wa.me/923189664554 (+923189664554)`;

        await Akif_sock.sendMessage(Akif_origin, { text: uptimeStr });
    }
};
