/**
 * 👑 Akif-V1 👑
 * Owner Information Command
 * Developed by Akif (ixxAkif)
 */
module.exports = {
    name: 'owner',
    aliases: ['creator', 'developer', 'dev'],
    category: 'Information',
    desc: 'Show bot owner & developer profile contact info',
    kaif_handler: async (Akif_sock, Akif_origin, context) => {
        const { Akif_msg } = context;

        const ownerText = `👑 *Akif-V1 OFFICIAL OWNER PROFILE* 👑\n\n` +
            `👨‍💻 *Developer & Creator:* Akif x Amir\n\n` +
            `📞 *Super Owner Contacts:*\n` +
            `  ✨ +92 318 9664554 (Primary)\n` +
            `  ✨ +92 318 9664554\n` +
            `  ✨ +92 318 9664554\n\n` +
            `📢 *Official WhatsApp Channel:*\n` +
            `  https://chat.whatsapp.com/KrzHPe9njLWEoepDO6nmeY\n\n` +
            `🔗 *Direct WhatsApp Links:*\n` +
            `  ✨ wa.me/923189664554\n` +
            `  ✨ wa.me/923189664554\n` +
            `  ✨ wa.me/923189664554\n\n` +
            `> _AKIF-V1 ✨ Developed with ❤️ by AKIF x AMIR_`;

        const vcard = `BEGIN:VCARD\n`
            + `VERSION:1.0\n`
            + `N:Amir;Akif;;;\n`
            + `FN:Akif x Akif\n`
            + `ORG:Akif-V1 Developer;\n`
            + `TEL;type=CELL;type=VOICE;waid=923189664554:+92 318 9664554\n`
            + `TEL;type=CELL;type=VOICE;waid=923189664554:+92 318 9664554\n`
            + `TEL;type=CELL;type=VOICE;waid=923466859436:+92 318 9664554\n`
            + `URL:https://whatsapp.com/channel/0029VbDMt1C3rZZaigDWAj1X\n`
            + `END:VCARD`;

        try {
            await Akif_sock.sendMessage(Akif_origin, {
                contacts: {
                    displayName: 'Akif x Amir',
                    contacts: [{ vcard }]
                }
            });
        } catch (e) {}

        await new Promise(r => setTimeout(r, 200));

        try {
            return await Akif_sock.sendMessage(kaif_origin, { text: ownerText }, { quoted: kaif_msg });
        } catch (e) {
            return await Akif_sock.sendMessage(kaif_origin, { text: ownerText });
        }
    }
};