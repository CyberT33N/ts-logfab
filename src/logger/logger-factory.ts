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
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ==== Imports ====
import { readFileSync } from 'fs'
import { join } from 'path'
import { pino } from 'pino'
import pretty from 'pino-pretty'
import { PackageJson } from 'zod-package-json'
import { createEnterprisePrettyConfig } from '@/prettifiers/pino-prettifiers.ts'

/**
 * 🎯 Creates an enterprise logger instance
 * @returns The logger instance
 */
const createEnterpriseLogger = (): pino.Logger => {
    const isDevelopment = process.env.NODE_ENV === 'development'
    const isTest = process.env.NODE_ENV === 'test'

    const currentDir = process.cwd()
    const packagePath = join(currentDir, 'package.json')
    
    // 🎯 Professional package.json validation with zod-package-json
    const packageJson = PackageJson.parse(JSON.parse(readFileSync(packagePath, 'utf-8')))

    // 🎯 Create beautiful visual stream with enterprise styling
    const stream = pretty(createEnterprisePrettyConfig())
        
    return pino(
        {
            name: packageJson.name,
            level: isDevelopment ? 'debug' : (isTest ? 'debug' : 'info'),
            base: {
                author: packageJson.author,
                version: packageJson.version,
                environment: process.env.NODE_ENV,
                nodeVersion: process.version,
                platform: process.platform
            }
        },
        stream
    )
}

export const logger = createEnterpriseLogger() 