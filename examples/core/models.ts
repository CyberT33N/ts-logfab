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
 */
export interface IUser {
    readonly id: number
    readonly name: string
    readonly email: string
    readonly age: number
}

/**
 * 🛍️ **Product Interface**
 */
export interface IProduct {
    readonly id: string
    readonly name: string
    readonly price: number
    readonly category: string
}

/**
 * 📦 **Order Interface**
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
 * 🎨 **Sample Data Factory**
 */
export class SampleDataFactory {
    public static createUsers(count = 10): IUser[] {
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

    public static createProducts(count = 20): IProduct[] {
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

    public static createOrders(users: readonly IUser[], products: readonly IProduct[], count = 15): IOrder[] {
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

    public static createTransactions(orders: readonly IOrder[], count = 25): ITransaction[] {
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
}
