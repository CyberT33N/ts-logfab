/*
███████████████████████████████████████████████████████████████████████████████
██******************** PRESENTED BY t33n Software ***************************██
██                                                                           ██
██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
██                                                                           ██
██            🌍 ADAPTIVE LOGGING - ENVIRONMENT DETECTION                    ██
██                    UNIFIED ENVIRONMENT DETECTION LOGIC                    ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🌍 ENVIRONMENT DETECTION - UNIFIED LOGIC
// ═══════════════════════════════════════════════════════════════════════════════

import { type EnvironmentType } from './types.ts'

/**
 * 🌍 **Detect current environment**
 * Checks NODE_ENV and other environment indicators
 */
export function detectEnvironment(): EnvironmentType {
    const nodeEnv = process.env.NODE_ENV?.toLowerCase()
    
    // Check explicit environment settings
    if (nodeEnv === 'production' || nodeEnv === 'prod') {
        return 'production'
    }
    
    if (nodeEnv === 'staging' || nodeEnv === 'stage') {
        return 'staging'
    }
    
    if (nodeEnv === 'test' || nodeEnv === 'testing') {
        return 'test'
    }
    
    // Check for production cloud indicators
    if (hasProductionIndicators()) {
        return 'production'
    }
    
    // Default to development
    return 'development'
}

/**
 * 🔍 **Check for production cloud indicators**
 * Helper function to detect cloud production environments
 */
function hasProductionIndicators(): boolean {
    const nodeEnv = process.env.NODE_ENV
    const vercel = process.env.VERCEL
    const netlify = process.env.NETLIFY  
    const heroku = process.env.HEROKU
    const awsLambda = process.env.AWS_LAMBDA_FUNCTION_NAME
    
    return Boolean(
        nodeEnv === 'production' ||
        (vercel !== undefined && vercel !== '') ||
        (netlify !== undefined && netlify !== '') ||
        (heroku !== undefined && heroku !== '') ||
        (awsLambda !== undefined && awsLambda !== '')
    )
}

/**
 * 🔍 **Check if environment is development**
 */
export function isDevelopmentEnvironment(): boolean {
    return detectEnvironment() === 'development'
}

/**
 * 🔍 **Check if environment is production**
 */
export function isProductionEnvironment(): boolean {
    return detectEnvironment() === 'production'
}

/**
 * 🔍 **Check if environment is test**
 */
export function isTestEnvironment(): boolean {
    return detectEnvironment() === 'test'
}

/**
 * 🔍 **Check if environment is staging**
 */
export function isStagingEnvironment(): boolean {
    return detectEnvironment() === 'staging'
} 