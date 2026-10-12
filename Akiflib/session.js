const {
    fetchLatestWaWebVersion,
    makeCacheableSignalKeyStore,
    makeWASocket,
    Browsers,
    useMultiFileAuthState
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const config = require('../Akif');
const { useMongoDBAuthState } = require('./mongoAuth');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

async function Kaif_connectSession(usePairingCode = false, customSessionId = null) {
    const sessionId = customSessionId || config.sessionId || 'Akif_session';
    console.log(`🔌 Connecting to session: ${sessionId}`);

    let state, saveCreds;
    let usedMongo = false;

    if (config.mongoDbUrl) {
        if (mongoose.connection.readyState !== 1) {
            let waitCount = 0;
            while (mongoose.connection.readyState !== 1 && waitCount < 10) {
                await new Promise(r => setTimeout(r, 500));
                waitCount++;
            }
        }

        if (mongoose.connection.readyState === 1) {
            try {
                console.log(`💾 Using MongoDB session storage for: ${sessionId}`);
                const auth = await useMongoDBAuthState(sessionId);
                state = auth.state;
                saveCreds = auth.saveCreds;
                usedMongo = true;
            } catch (e) {
                console.error(`⚠️ MongoDB Auth State initialization error: ${e.message}`);
            }
        }
    }

    if (!usedMongo) {
        console.log(`📁 Using local multi-file session storage for: ${sessionId}`);
        const sessionPath = path.join(process.cwd(), sessionId);
        const auth = await useMultiFileAuthState(sessionPath);
        state = auth.state;
        saveCreds = auth.saveCreds;
    }

    let version;
    try {
        const v = await fetchLatestWaWebVersion();
        version = v.version;
    } catch (e) {
        version = [2, 3000, 1017531287];
    }

    const socketOptions = {
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
        },
        browser: Browsers.ubuntu('Chrome'),
        generateHighQualityLinkPreview: true,
        syncFullHistory: false,
        retryRequestDelayMs: 5000,
        keepAliveIntervalMs: 10000,
        connectTimeoutMs: 60000,
    };

    const Akif_sock = makeWASocket(socketOptions);

    return { Akif_sock, saveCreds };
}

function Akif_normalizePhone(num) {
    if (!num) return '';
    let cleaned = String(num).replace(/\D/g, '');
    if (!cleaned) return '';
    if (cleaned.startsWith('03') && cleaned.length === 11) {
        cleaned = '92' + cleaned.slice(1);
    } else if (cleaned.startsWith('0') && cleaned.length === 11) {
        cleaned = '92' + cleaned.slice(1);
    } else if (cleaned.length === 10 && cleaned.startsWith('3')) {
        cleaned = '92' + cleaned;
    }
    return cleaned;
}

async function Akif_requestPairingCode(Akif_sock, phoneNumber) {
    if (!Akif_sock) throw new Error('No active session socket to request a pairing code from.');
    if (Akif_sock.authState?.creds?.registered) {
        throw new Error('Session is already registered/connected. Pairing code is not needed.');
    }
    const cleanNumber = Akif_normalizePhone(phoneNumber);
    if (!cleanNumber || cleanNumber.length < 6) {
        throw new Error('Please provide a valid phone number with country code (e.g. 923189664554 or 03189664554).');
    }
    const code = await Akof_sock.requestPairingCode(cleanNumber);
    return code;
}

async function Akif_clearSession(customSessionId = null) {
    const sessionId = customSessionId || config.sessionId || 'Akif_session';

    if (config.mongoDbUrl && mongoose.connection.readyState === 1) {
        try {
            const { useMongoDBAuthState } = require('./mongoAuth');
            const { clearState } = await useMongoDBAuthState(sessionId);
            if (clearState) {
                await clearState();
                console.log(`🗑️ Session cleared from MongoDB: ${sessionId}`);
            }
        } catch (e) {
            console.error(`MongoDB clearState error: ${e.message}`);
        }
    }

    const sessionPath = path.join(process.cwd(), sessionId);
    if (fs.existsSync(sessionPath)) {
        try {
            fs.rmSync(sessionPath, { recursive: true, force: true });
            console.log(`🗑️ Local session directory cleared: ${sessionPath}`);
        } catch (err) {
            console.error(`Error deleting local session folder: ${err.message}`);
        }
    }
}

module.exports = { Akif_connectSession, Akif_clearSession, Akif_requestPairingCode };
