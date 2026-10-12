/**
 * ⚡ AKIF-V1 ⚡
 * Groups JID Utility with Member Counter
 * Developed by Akif (ixxakif)
 */
module.exports = {
    name: 'gjids',
    aliases: ['gjid', 'groups', 'groupjids'],
    category: 'Tools',
    desc: 'List all participating groups, member count, and their JIDs',
    kaif_handler: async (Akif_sock, Akif_origin) => {
        try {
            const allGroupsObj = await Akif_sock.groupFetchAllParticipating(); 
            const groupChats = Object.values(allGroupsObj);

            if (groupChats.length === 0) {
                return await Akif_sock.sendMessage(Akif_origin, { text: '⚠️ You are not a member of any groups.' });
            }

            let msg = `📋 *YOUR GROUPS & JIDs* (Total: ${groupChats.length})\n\n`;
            groupChats.forEach((group, index) => {
                const memberCount = group.participants ? group.participants.length : (group.size || 'N/A');
                msg += `${index + 1}. *${group.subject}*\n`;
                msg += `   👥 *Members:* ${memberCount}\n`;
                msg += `   🆔 \`${group.id}\`\n\n`;
            });

            msg += `📞 *Contact Us:* wa.me/923189664554 (+923189664554)`;

            await Akif_sock.sendMessage(Akif_origin, { text: msg.trim() });
        } catch (error) {
            console.error('Error fetching group JIDs:', error);
            await Akif_sock.sendMessage(Akif_origin, { text: '❌ Error fetching groups list.' });
        }
    }
};
