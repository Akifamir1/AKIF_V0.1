/**
 * Akif-V1 - Reset Session Script* Clears current session from MongoDB and resets .session_id file
 */
require('dotenv').config();
const { Akif_connectDatabase } = require('./Akiflib/database');
const { Akif_clearSession } = require('./Akiflib/session');
const config = require('./Akif');
const fs = require('fs');
const path = require('path');

async function reset() {
    console.log('🔄 Resetting session...');
    const sessionId = config.sessionId || 'Akif_session';

    if (config.mongoDbUrl) {
        await Akif_connectDatabase(config.mongoDbUrl);
        await Akif_clearSession(sessionId);
        console.log(`✅ MongoDB session state cleared for: ${sessionId}`);
    }

    const sessionIdFile = path.join(__dirname, '.session_id');
    if (fs.existsSync(sessionIdFile)) {
        fs.unlinkSync(sessionIdFile);
        console.log('✅ Removed local .session_id file');
    }

    console.log('🎉 Reset complete! Restart the bot with `npm start` to generate a fresh QR code.');
    process.exit(0);
}

reset();
