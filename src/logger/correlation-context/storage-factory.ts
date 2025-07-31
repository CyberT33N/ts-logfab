/*
███████████████████████████████████████████████████████████████████████████████
██******************** PRESENTED BY t33n Software ***************************██
██                                                                           ██
██                  ████████╗██████╗ ██████╗ ███╗   ██║                      ██
██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🏭 CONTEXT STORAGE FACTORY
// ═══════════════════════════════════════════════════════════════════════════════

import { AsyncLocalStorage } from 'async_hooks'
import type { ICorrelationContext } from './types.ts'

/**
 * 🏭 **Context Storage Factory**
 * 
 * Singleton factory for managing AsyncLocalStorage instance
 * Pattern for dependency injection and testing
 */
export class ContextStorageFactory {
    private static _instance: ContextStorageFactory | null = null
    private readonly _storage: AsyncLocalStorage<ICorrelationContext>

    private constructor() {
        this._storage = new AsyncLocalStorage<ICorrelationContext>()
    }

    /**
     * 🧪 **Reset factory instance for testing**
     * 
     * Allows storage replacement for testing purposes.
     * Should only be used in test environments.
     */
    public static resetInstance(): void {
        ContextStorageFactory._instance = null
    }

    /**
     * 🏭 **Get singleton factory instance**
     * 
     * @returns The singleton ContextStorageFactory instance
     */
    public static getInstance(): ContextStorageFactory {
        ContextStorageFactory._instance ??= new ContextStorageFactory()
        return ContextStorageFactory._instance
    }

    /**
     * 📦 **Get AsyncLocalStorage instance**
     * 
     * @returns The AsyncLocalStorage instance for correlation context
     */
    public getStorage(): AsyncLocalStorage<ICorrelationContext> {
        return this._storage
    }
} 