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
██                      🎨 AWARD-WINNING TERMINAL LOGGER                    ██
██                         ENTERPRISE-GRADE • TABLE-POWERED                 ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ==== Imports ====
import { readFileSync } from 'fs'
import { join } from 'path'
import { PackageJson } from 'zod-package-json'
import env, { Environment } from '@/env.ts'

// ==== Types ====
interface IAppMetadata {
    name: PackageJson['name'];
    version: PackageJson['version'];
    author: PackageJson['author'];
    environment: Environment['NODE_ENV'];
}

/**
 * 🎨 Gets the application metadata
 * @returns The application metadata
 */
export function getAppMetadata(): IAppMetadata {
    const currentDir = process.cwd()
    const packagePath = join(currentDir, 'package.json')
     
    // 🎯 Professional package.json validation with zod-package-json
    const packageJson = PackageJson.parse(JSON.parse(readFileSync(packagePath, 'utf-8')))
        
    return {
        name: packageJson.name,
        version: packageJson.version,
        author:  packageJson.author,
        environment: env.NODE_ENV
    }
} 