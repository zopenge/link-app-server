// Generate a random hex string of a given length
function generateRandomHex(length = 32) {
    const array = new Uint8Array(length / 2);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Generate random secret for session
const defaultSecret = generateRandomHex(64);

// Safely get environment variable with fallback
const getEnvVar = (key: string, defaultValue: any = undefined) =>
    ((process.env || {})[key] || defaultValue);

// Create configuration with fallbacks
const authConfig = {
    // Server config
    port: getEnvVar('PORT', 3000),
    nodeEnv: getEnvVar('NODE_ENV', 'development'),
    debug: getEnvVar('NODE_ENV', 'development') === 'development',

    // Database config (Supabase)
    database: {
        enabled: !!(getEnvVar('SUPABASE_URL') && getEnvVar('SUPABASE_KEY')),
        url: getEnvVar('SUPABASE_URL'),
        key: getEnvVar('SUPABASE_KEY')
    },

    // Session config
    session: {
        secret: getEnvVar('SESSION_SECRET', defaultSecret),
        secure: getEnvVar('NODE_ENV') === 'production'
    },

    // JWT config
    jwt: {
        secret: getEnvVar('JWT_SECRET', defaultSecret),
        expirationTime: getEnvVar('JWT_EXPIRATION', '24h'),
        issuer: getEnvVar('JWT_ISSUER', 'unknown'),
        algorithm: getEnvVar('JWT_ALGORITHM', 'HS256')
    },

    // Encryption config
    encryption: {
        publicKey: getEnvVar('ENCRYPTION_PUBLIC_KEY'),
        privateKey: getEnvVar('ENCRYPTION_PRIVATE_KEY')
    },

    // AI configuration
    ai: {
        enabled: !!getEnvVar('AI_API_KEY'),
        provider: getEnvVar('AI_PROVIDER', 'default'),
        apiKey: getEnvVar('AI_API_KEY'),
        options: {
            maxRetries: parseInt(getEnvVar('AI_MAX_RETRIES', '3')),
            timeout: parseInt(getEnvVar('AI_TIMEOUT', '30000'))
        }
    }
};

// Log configuration (hide sensitive data)
if (authConfig.debug) {
    console.log('Server configuration:', {
        port: authConfig.port,
        nodeEnv: authConfig.nodeEnv,
        debug: authConfig.debug,
        database: {
            enabled: authConfig.database.enabled,
            url: authConfig.database.enabled ? authConfig.database.url : 'not configured',
            key: authConfig.database.enabled ? '***' : 'not configured'
        },
        session: {
            secret: '***',
            secure: authConfig.session.secure
        },
        jwt: {
            secret: '***',
            expirationTime: authConfig.jwt.expirationTime,
            issuer: authConfig.jwt.issuer,
            algorithm: authConfig.jwt.algorithm
        },
        encryption: {
            publicKey: authConfig.encryption.publicKey ? '***' : 'not configured',
            privateKey: '***'
        },
        ai: {
            enabled: authConfig.ai.enabled,
            provider: authConfig.ai.provider,
            apiKey: authConfig.ai.enabled ? '***' : 'not configured',
            options: authConfig.ai.options
        }
    });
}

export default authConfig; 