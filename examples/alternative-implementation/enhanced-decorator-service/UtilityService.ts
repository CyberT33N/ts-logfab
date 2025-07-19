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
 * 🛠️ Central utility service providing shared data management and helper 
 * functions for Enhanced Decorator demonstrations.
 * 
 * @remarks
 * This service acts as a centralized data repository and utility provider for all Enhanced Decorator
 * demonstration scenarios. It manages collections of users, products, and analytics events while
 * providing convenient access methods and utility functions commonly needed across different
 * decorator implementation examples.
 * 
 * 📊 **Data Management:**
 * - Pre-populated user collection with 8 sample users
 * - Pre-populated product collection with 15 sample products  
 * - Dynamic analytics event tracking with automatic timestamping
 * - Immutable access patterns with readonly return types
 * 
 * 🛠️ **Utility Functions:**
 * - User management operations (add, find, ID generation)
 * - Analytics event tracking and storage
 * - Asynchronous delay utilities for testing scenarios
 * 
 * @see {@link IUser} for user data structure
 * @see {@link IProduct} for product data structure
 */
export class UtilityService {
    [key: string]: unknown
    private readonly _users: IUser[] = createUsers(8)
    private readonly _products: IProduct[] = createProducts(15)
    private readonly _analytics: { event: string; timestamp: Date; data: unknown }[] = []

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🛠️ DATA ACCESS METHODS
    // ═══════════════════════════════════════════════════════════════════════════════

    /**
     * 👥 Provides read-only access to the complete user collection.
     * 
     * @remarks
     * Returns an immutable view of all users currently managed by the service.
     * The collection is pre-populated with sample users during service initialization
     * and can be extended through the addUser method.
     * 
     * @returns Read-only array of all user objects in the collection
     */
    public getUsers(): readonly IUser[] {
        return this._users
    }

    /**
     * 📦 Provides read-only access to the complete product collection.
     * 
     * @remarks
     * Returns an immutable view of all products currently managed by the service.
     * The collection is pre-populated with sample products during service initialization
     * and remains static for demonstration consistency.
     * 
     * @returns Read-only array of all product objects in the collection
     */
    public getProducts(): readonly IProduct[] {
        return this._products
    }

    /**
     * 📊 Provides read-only access to all collected analytics events.
     * 
     * @remarks
     * Returns an immutable view of all analytics events that have been recorded through
     * the addAnalyticsEvent method. Each event includes the event name, timestamp,
     * and associated data payload for comprehensive tracking.
     * 
     * @returns Read-only array of all analytics event objects with timestamps
     */
    public getAnalytics(): readonly { event: string; timestamp: Date; data: unknown }[] {
        return this._analytics
    }

    /**
     * ➕ Adds a new user to the managed user collection.
     * 
     * @remarks
     * This method extends the user collection by adding the provided user object.
     * The operation modifies the internal collection state and makes the new user
     * immediately available through getUsers and findUserById methods.
     * 
     * @param user - The user object to add to the collection
     * 
     * @example
     * Adding a new user to the collection:
     * ```typescript
     * const utilityService = new UtilityService();
     * const newUser: IUser = {
     *     id: utilityService.getNextUserId(),
     *     name: 'John Doe',
     *     email: 'john.doe@example.com'
     * };
     * 
     * utilityService.addUser(newUser);
     * console.log(`Total users: ${utilityService.getUsers().length}`);
     * ```
     */
    public addUser(user: IUser): void {
        this._users.push(user)
    }

    /**
     * 🔍 Searches for a user by their unique identifier.
     * 
     * @remarks
     * This method performs a linear search through the user collection to find a user
     * with the specified ID. Returns null if no matching user is found, providing
     * safe null-handling patterns for calling code.
     * 
     * @param userId - The unique identifier of the user to find
     * @returns The user object if found, null otherwise
     * 
     * @example
     * Finding a user with proper null handling:
     * ```typescript
     * const utilityService = new UtilityService();
     * const foundUser = utilityService.findUserById(42);
     * 
     * if (foundUser) {
     *     console.log(`Found user: ${foundUser.name}`);
     * } else {
     *     console.log('User not found');
     * }
     * ```
     */
    public findUserById(userId: Readonly<number>): IUser | null {
        return this._users.find(u => u.id === userId) ?? null
    }

    /**
     * 📈 Records an analytics event with automatic timestamp generation.
     * 
     * @remarks
     * This method captures analytics events for tracking user interactions, system events,
     * or any other measurable activities within the Enhanced Decorator demonstrations.
     * Each event is automatically timestamped and stored for later analysis.
     * 
     * @param event - Descriptive name or identifier for the analytics event
     * @param data - Associated data payload for the event (can be any serializable data)
     * 
     * @example
     * Recording different types of analytics events:
     * ```typescript
     * const utilityService = new UtilityService();
     * 
     * // Record user interaction event
     * utilityService.addAnalyticsEvent('user.login', { userId: 123, method: 'oauth' });
     * 
     * // Record system performance event
     * utilityService.addAnalyticsEvent('decorator.execution', { 
     *     decoratorType: 'enhanced', 
     *     executionTime: 15.2 
     * });
     * 
     * // Review collected analytics
     * console.log(`Total events: ${utilityService.getAnalytics().length}`);
     * ```
     */
    public addAnalyticsEvent(event: string, data: unknown): void {
        this._analytics.push({
            event,
            timestamp: new Date(),
            data
        })
    }

    /**
     * 🔢 Generates the next available user ID based on current collection size.
     * 
     * @remarks
     * This method provides a simple ID generation strategy by returning a value
     * one greater than the current user collection length. Suitable for demonstration
     * purposes where unique ID generation doesn't require complex algorithms.
     * 
     * @returns The next available user ID as a positive integer
     */
    public getNextUserId(): number {
        return this._users.length + 1
    }

    // ═══════════════════════════════════════════════════════════════════════════════
    // 🛠️ UTILITY METHODS
    // ═══════════════════════════════════════════════════════════════════════════════

    /**
     * ⏱️ Creates an asynchronous delay for specified duration in milliseconds.
     * 
     * @remarks
     * This utility method provides a Promise-based delay mechanism commonly used in
     * testing scenarios, demonstration flows, and simulating realistic async operations.
     * The delay is implemented using setTimeout wrapped in a Promise for await compatibility.
     * 
     * @param ms - Duration of the delay in milliseconds
     * @returns Promise that resolves after the specified delay
     */
    public async delay(ms: Readonly<number>): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
} 