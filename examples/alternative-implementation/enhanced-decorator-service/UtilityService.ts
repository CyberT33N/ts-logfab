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

// ═══════════════════════════════════════════════════════════════════════════════
// 🛠️ UTILITY SERVICE - SHARED DATA AND HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

import { IUser, IProduct, createUsers, createProducts } from '../../core/models.ts'

/**
 * 🛠️ **Utility Service**
 * 
 * Manages shared data and utility functions for the Enhanced Decorator Service
 */
export class UtilityService {
    [key: string]: unknown
    private readonly _users: IUser[] = createUsers(8)
    private readonly _products: IProduct[] = createProducts(15)
    private readonly _analytics: { event: string; timestamp: Date; data: unknown }[] = []

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🛠️ DATA ACCESS METHODS
    // ═══════════════════════════════════════════════════════════════════════════════

    public getUsers(): readonly IUser[] {
        return this._users
    }

    public getProducts(): readonly IProduct[] {
        return this._products
    }

    public getAnalytics(): readonly { event: string; timestamp: Date; data: unknown }[] {
        return this._analytics
    }

    public addUser(user: IUser): void {
        this._users.push(user)
    }

    public findUserById(userId: Readonly<number>): IUser | null {
        return this._users.find(u => u.id === userId) ?? null
    }

    public addAnalyticsEvent(event: string, data: unknown): void {
        this._analytics.push({
            event,
            timestamp: new Date(),
            data
        })
    }

    public getNextUserId(): number {
        return this._users.length + 1
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🛠️ UTILITY METHODS
    // ═══════════════════════════════════════════════════════════════════════════════

    public async delay(ms: Readonly<number>): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
} 