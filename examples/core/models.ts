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
// 📊 SHARED DATA MODELS FOR ALL EXAMPLE SERVICES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 👤 **User Interface**
 * 
 * @remarks
 * Represents a user entity in the demo system with essential identification
 * and contact information. All properties are readonly to ensure immutability
 * in the example scenarios and maintain consistent data integrity across
 * different service demonstrations.
 * 
 * @see {@link createUsers} for generating test user data
 * @see {@link IOrder} for user-related order associations
 */
export interface IUser {
    readonly id: number
    readonly name: string
    readonly email: string
    readonly age: number
}

/**
 * 🛍️ **Product Interface**
 * 
 * @remarks
 * Defines the structure for e-commerce product entities used throughout
 * the demonstration services. Designed for catalog management scenarios
 * and order composition workflows with comprehensive product information
 * including pricing and categorization.
 * 
 * @see {@link createProducts} for generating test product data
 * @see {@link IOrder} for product-order relationships
 */
export interface IProduct {
    readonly id: string
    readonly name: string
    readonly price: number
    readonly category: string
}

/**
 * 📦 **Order Interface**
 * 
 * @remarks
 * Represents a complete order entity with user association, product collection,
 * and status tracking. The status field follows a typical e-commerce workflow
 * from initial creation through completion or cancellation. Essential for
 * demonstrating business logic flows and state management patterns.
 * 
 * 🔄 **Status Workflow:** pending → processing → completed | cancelled
 * 
 * @see {@link createOrders} for generating test order data
 * @see {@link IUser} for user associations
 * @see {@link IProduct} for product collections
 * @see {@link ITransaction} for related financial operations
 */
export interface IOrder {
    readonly id: string
    readonly userId: number
    readonly products: readonly IProduct[]
    readonly total: number
    readonly status: 'pending' | 'processing' | 'completed' | 'cancelled'
    readonly createdAt: Readonly<Date>
}

/**
 * 💳 **Transaction Interface**
 * 
 * @remarks
 * Defines financial transaction records linked to orders with comprehensive
 * tracking of monetary operations. Supports multiple currencies and transaction
 * types for diverse business scenarios including payments, refunds, and transfers.
 * Essential for financial reporting and audit trail demonstrations.
 * 
 * 💱 **Supported Operations:** payment, refund, transfer
 * 🌍 **Multi-Currency:** USD, EUR, GBP
 * 
 * @see {@link createTransactions} for generating test transaction data
 * @see {@link IOrder} for order associations
 */
export interface ITransaction {
    readonly id: string
    readonly orderId: string
    readonly amount: number
    readonly currency: 'USD' | 'EUR' | 'GBP'
    readonly type: 'payment' | 'refund' | 'transfer'
    readonly status: 'pending' | 'completed' | 'failed'
    readonly timestamp: Readonly<Date>
}

/**
 * 🏭 Generates a collection of test user data for demonstration and testing purposes.
 * 
 * @remarks
 * Creates realistic user objects with sequential IDs, cycling through predefined
 * names and generating corresponding email addresses. Age values are randomized
 * within a realistic range to provide diverse test data for various scenarios.
 * 
 * 👥 **Data Characteristics:**
 * - Sequential ID assignment starting from 1
 * - Cycling through 10 predefined realistic names
 * - Auto-generated email addresses based on names
 * - Random age distribution between 20-59 years
 * 
 * @param count - Number of user objects to generate
 * @returns Array of user objects with complete profile information
 * 
 * @see {@link IUser} for the user data structure
 * @see {@link createOrders} for linking users to orders
 */
export function createUsers(count = 10): IUser[] {
    const users: IUser[] = []
    const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack']
    
    for (let i = 0; i < count; i++) {
        users.push({
            id: i + 1,
            name: names[i % names.length],
            email: `${names[i % names.length].toLowerCase()}@example.com`,
            age: 20 + Math.floor(Math.random() * 40)
        })
    }
    
    return users
}

/**
 * 🏭 Generates a collection of test product data with realistic e-commerce attributes.
 * 
 * @remarks
 * Creates product objects with formatted IDs, cycling through technology-focused
 * product names and categories. Prices are randomized within realistic ranges
 * to simulate real-world e-commerce catalog scenarios.
 * 
 * 🛒 **Product Characteristics:**
 * - Formatted product IDs with zero-padding (prod-001, prod-002, etc.)
 * - Technology and electronics-focused product names
 * - Realistic price distribution ($10-$1010)
 * - Categorized into logical product groups
 * 
 * @param count - Number of product objects to generate
 * @returns Array of product objects with complete catalog information
 * 
 * @see {@link IProduct} for the product data structure
 * @see {@link createOrders} for incorporating products into orders
 */
export function createProducts(count = 20): IProduct[] {
    const products: IProduct[] = []
    const names = [
        'Laptop', 'Mouse', 'Keyboard', 'Monitor',
        'Headphones', 'Webcam', 'Speakers', 'Tablet', 'Phone', 'Charger'
    ]
    const categories = ['Electronics', 'Accessories', 'Computers', 'Mobile', 'Audio']
    
    for (let i = 0; i < count; i++) {
        products.push({
            id: `prod-${String(i + 1).padStart(3, '0')}`,
            name: names[i % names.length],
            price: Math.round((Math.random() * 1000 + 10) * 100) / 100,
            category: categories[i % categories.length]
        })
    }
    
    return products
}

/**
 * 🏭 Generates realistic order data by linking users with products and calculating totals.
 * 
 * @remarks
 * Creates complex order relationships by randomly selecting users and products,
 * calculating accurate totals, and assigning realistic order statuses and timestamps.
 * This factory function demonstrates the interconnected nature of e-commerce data
 * and provides comprehensive test scenarios for business logic validation.
 * 
 * 🔗 **Relationship Management:**
 * - Random user assignment from provided user collection
 * - Random product selection (1-3 products per order)
 * - Automatic total calculation based on selected products
 * - Realistic order status distribution
 * - Historical timestamp generation (up to 30 days back)
 * 
 * @param users - Collection of available users for order assignment
 * @param products - Collection of available products for order composition
 * @param count - Number of order objects to generate
 * @returns Array of order objects with complete relationship data
 * 
 * @example
 * Creating a complete dataset with proper dependencies:
 * ```typescript
 * const users = createUsers(5);
 * const products = createProducts(10);
 * const orders = createOrders(users, products, 8);
 * // Orders now contain valid references to existing users and products
 * ```
 * 
 * @see {@link IOrder} for the order data structure
 * @see {@link createUsers} for generating user dependencies
 * @see {@link createProducts} for generating product dependencies
 * @see {@link createTransactions} for generating related transactions
 */
export function createOrders(users: readonly IUser[], products: readonly IProduct[], count = 15): IOrder[] {
    const orders: IOrder[] = []
    const statuses: IOrder['status'][] = ['pending', 'processing', 'completed', 'cancelled']
    
    for (let i = 0; i < count; i++) {
        const user = users[Math.floor(Math.random() * users.length)]
        const orderProducts = products.slice(0, Math.floor(Math.random() * 3) + 1)
        const total = orderProducts.reduce((sum, p) => sum + p.price, 0)
        
        orders.push({
            id: `order-${String(Date.now() + i)}`,
            userId: user.id,
            products: orderProducts,
            total,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        })
    }
    
    return orders
}

/**
 * 🏭 Generates financial transaction records linked to existing orders with comprehensive tracking.
 * 
 * @remarks
 * Creates realistic transaction data by establishing proper relationships with existing
 * orders, maintaining financial consistency through amount matching, and providing
 * diverse transaction scenarios across multiple currencies and operation types.
 * Essential for demonstrating financial workflows and audit trail capabilities.
 * 
 * 💰 **Financial Data Integrity:**
 * - Transaction amounts match associated order totals
 * - Multi-currency support for international scenarios
 * - Diverse transaction types for comprehensive testing
 * - Realistic status distribution reflecting real-world outcomes
 * - Historical timestamp generation for temporal analysis
 * 
 * @param orders - Collection of existing orders for transaction linking
 * @param count - Number of transaction objects to generate
 * @returns Array of transaction objects with complete financial tracking data
 * 
 * @example
 * Creating a complete financial dataset with proper order relationships:
 * ```typescript
 * const users = createUsers(3);
 * const products = createProducts(5);
 * const orders = createOrders(users, products, 4);
 * const transactions = createTransactions(orders, 6);
 * // Transactions now contain valid references to existing orders
 * ```
 * 
 * @see {@link ITransaction} for the transaction data structure
 * @see {@link createOrders} for generating order dependencies
 * @see {@link IOrder} for order-transaction relationships
 */
export function createTransactions(orders: readonly IOrder[], count = 25): ITransaction[] {
    const transactions: ITransaction[] = []
    const currencies: ITransaction['currency'][] = ['USD', 'EUR', 'GBP']
    const types: ITransaction['type'][] = ['payment', 'refund', 'transfer']
    const statuses: ITransaction['status'][] = ['pending', 'completed', 'failed']
    
    for (let i = 0; i < count; i++) {
        const order = orders[Math.floor(Math.random() * orders.length)]
        
        transactions.push({
            id: `txn-${String(Date.now() + i)}`,
            orderId: order.id,
            amount: order.total,
            currency: currencies[Math.floor(Math.random() * currencies.length)],
            type: types[Math.floor(Math.random() * types.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            timestamp: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000)
        })
    }
    
    return transactions
}
