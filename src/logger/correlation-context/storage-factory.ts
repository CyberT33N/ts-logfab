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

    // 🧪 For testing: allows storage replacement
    public static resetInstance(): void {
        ContextStorageFactory._instance = null
    }

    public static getInstance(): ContextStorageFactory {
        ContextStorageFactory._instance ??= new ContextStorageFactory()
        return ContextStorageFactory._instance
    }

    public getStorage(): AsyncLocalStorage<ICorrelationContext> {
        return this._storage
    }
} 