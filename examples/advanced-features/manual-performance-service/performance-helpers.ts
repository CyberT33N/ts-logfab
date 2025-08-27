/*
 *███████████████████████████████████████████████████████████████████████████████
 *██******************** PRESENTED BY t33n Software ***************************██
 *██                                                                           ██
 *██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
 *██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
 *██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
 *██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
 *██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
 *██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
 *██                                                                           ██
 *███████████████████████████████████████████████████████████████████████████████
 *███████████████████████████████████████████████████████████████████████████████
 */

// ==== Imports ====
import { setTimeout } from 'node:timers/promises'

import { createUsers } from '../../core/models'

/**
 * ⚙️ Concrete implementation of performance testing helper operations.
 *
 * @remarks
 * This class provides realistic performance testing scenarios for benchmarking and
 * monitoring systems. Each method simulates different types of computational and
 * I/O workloads that are commonly found in real-world applications.
 *
 * 🔧 **Operation Categories:**
 * - **Data Processing:** Large dataset manipulation with user generation and checksum calculation
 * - **CPU-Intensive:** Complex mathematical computations with nested loops
 * - **I/O Simulation:** Variable-timing operations to simulate database or network calls
 * - **Baseline Testing:** Simple operations for establishing performance baselines
 * @example
 * Basic usage for performance testing:
 * ```typescript
 * const helpers = new PerformanceHelpers();
 *
 * // Test data processing performance
 * const dataResult = await helpers.processLargeDataset(10000);
 * console.log(`Processed ${dataResult.processed} items, checksum: ${dataResult.checksum}`);
 *
 * // Test computational performance
 * const compResult = await helpers.performComplexComputation(5000);
 * console.log(`Result: ${compResult.result}, operations: ${compResult.operations}`);
 *
 * // Test I/O simulation
 * const ioResult = await helpers.simulateIOOperations(100);
 * console.log(`Completed ${ioResult.operations} I/O ops in ${ioResult.totalTime}ms`);
 * ```
 */
export class PerformanceHelpers {
    /**
     * 📊 Processes a large dataset of generated users with checksum validation.
     *
     * @remarks
     * This method creates a specified number of user objects and processes them
     * sequentially, calculating a checksum based on user properties. Each user
     * processing includes a small delay to simulate realistic processing time.
     *
     * The checksum calculation incorporates user ID, age, name length, and email
     * length to provide a meaningful computational workload during data processing.
     * @param size - Number of user objects to generate and process.
     * @returns Promise resolving to processing results with total processed count
     * and calculated checksum value.
     * @see {@link createUsers} for user generation implementation
     */
    public async processLargeDataset(
        size: number
    ): Promise<{
        checksum: number
        processed: number
    }> {
        const data = createUsers(
            size
        )
        let checksum = 0

        for (const user of data) {
            checksum += user.id + user.age + user.name.length + user.email.length
            await setTimeout(
                1
            )
        }

        return {
            checksum,
            processed: data.length
        }
    }

    /**
     * 🧮 Performs intensive mathematical computations with nested loop operations.
     *
     * @remarks
     * This method executes complex mathematical calculations involving square roots,
     * trigonometric functions, and nested iterations to create a CPU-intensive workload.
     *
     * The computation uses nested loops where the outer loop runs for the specified
     * complexity and the inner loop performs 100 mathematical operations per iteration.
     * Periodic delays are introduced to prevent overwhelming the system.
     * @param complexity - Number of outer loop iterations (directly affects computation time).
     * @returns Promise resolving to computation results with final result value
     * and total number of mathematical operations performed.
     */
    public async performComplexComputation(
        complexity: number
    ): Promise<{
        operations: number
        result: number
    }> {
        let result = 0
        let operations = 0

        for (let i = 0; i < complexity; i++) {
            for (let j = 0; j < 100; j++) {
                result += Math.sqrt(
                    i * j
                ) * Math.sin(
                    i
                ) * Math.cos(
                    j
                )
                operations++
            }

            if (i % 1000 === 0) {
                await setTimeout(
                    1
                )
            }
        }

        return {
            operations,
            result
        }
    }

    /**
     * 🔄 Simulates I/O operations with variable timing patterns.
     *
     * @remarks
     * This method simulates database queries, network requests, or file system operations
     * by introducing random delays that mimic real-world I/O latency patterns.
     *
     * Each simulated I/O operation has a random delay between 5-15ms to represent
     * the variable nature of actual I/O operations in production environments.
     * @param operations - Number of I/O operations to simulate.
     * @returns Promise resolving to simulation results with operation count
     * and total elapsed time for all operations.
     */
    public async simulateIOOperations(
        operations: number
    ): Promise<{
        operations: number
        totalTime: number
    }> {
        const startTime = Date.now()

        for (let i = 0; i < operations; i++) {
            // Simulate I/O delay with variable timing
            const ioDelay = Math.random() * 10 + 5

            await setTimeout(
                ioDelay
            )
        }

        const totalTime = Date.now() - startTime

        return {
            operations,
            totalTime
        }
    }

    /**
     * ⚙️ Executes a simple default operation for baseline performance testing.
     *
     * @remarks
     * This method provides a straightforward operation with predictable timing
     * for establishing performance baselines and comparing against more complex operations.
     *
     * The delay is directly proportional to the workload parameter (workload * 10ms),
     * providing consistent and predictable performance characteristics.
     * @param workload - Workload multiplier that directly affects operation duration.
     * @returns Promise resolving to operation results with workload confirmation
     * and completion message.
     */
    public async defaultOperation(
        workload: number
    ): Promise<{
        result: string
        workload: number
    }> {
        await setTimeout(
            workload * 10
        )

        return {
            result: `Default operation completed with workload ${String(
                workload
            )}`,
            workload
        }
    }
}
