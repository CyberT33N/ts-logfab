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
██              🎯 PRETTIFIER & SEMANTIC DEMO                                ██
██              COMPREHENSIVE DEMO FUNCTION                                  ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
███████████████████████████████████████████████████████████████████████████████
*/

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 PRETTIFIER & SEMANTIC DEMO
// ═══════════════════════════════════════════════════════════════════════════════

import { logger } from '@/logger/index.ts'
import { 
    getDevelopmentPrettifierConfig, 
    getProductionPrettifierConfig, 
    getDebugPrettifierConfig, 
    getAnalyticsPrettifierConfig, 
    getMasterPrettifierConfig 
} from './analysis-configs.ts'
import { 
    getBusinessDomainConfig, 
    getProductionSemanticConfig, 
    getDebugSemanticConfig 
} from './semantic-configs.ts'
import { EnterprisePrettifierSemanticService } from './semantic-service.ts'

// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 DEMONSTRATION FUNCTION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * 🎯 **Prettifier & Semantic Configuration Demo**
 *
 * Demonstrates all prettifier and semantic analysis configurations
 *
 * @returns Promise that resolves when demo completes
 *
 * @example
 * ```typescript
 * await runPrettifierSemanticDemo();
 * console.log('Demo completed!');
 * ```
 *
 * @throws {Error} When prettifier or semantic operations fail
 */
export async function runPrettifierSemanticDemo(): Promise<void> {
    logger.info('🎨 Starting Prettifier & Semantic Analysis Demo')

    const service = new EnterprisePrettifierSemanticService()

    try {
        // ═══════════════════════════════════════════════════════════════════════════════
        // 🎨 PRETTIFIER CONFIGURATION DEMOS
        // ═══════════════════════════════════════════════════════════════════════════════

        logger.info('🎨 Testing Development Prettifier Configuration')
        const devPrettifierResult = await service.developmentPrettifierDemo({
            name: 'Alice Johnson',
            email: 'alice@enterprise.com',
            department: 'Engineering'
        })
        logger.info('✅ Development prettifier result:', devPrettifierResult)

        logger.info('🏭 Testing Production Prettifier Configuration')
        const prodPrettifierResult = await service.productionPrettifierDemo({
            amount: 1500.75,
            currency: 'USD',
            type: 'purchase'
        })
        logger.info('✅ Production prettifier result:', prodPrettifierResult)

        logger.info('🔍 Testing Debug Prettifier Configuration')
        const debugPrettifierResult = await service.debugPrettifierDemo({
            operationId: 'debug-op-12345',
            debugLevel: 'VERBOSE',
            contextData: {
                requestId: 'req-67890',
                userId: 'user-123',
                sessionId: 'session-456',
                metadata: { source: 'enterprise-demo' }
            }
        })
        logger.info('✅ Debug prettifier result:', debugPrettifierResult)

        // ═══════════════════════════════════════════════════════════════════════════════
        // 🎯 SEMANTIC ANALYSIS DEMOS
        // ═══════════════════════════════════════════════════════════════════════════════

        logger.info('🎯 Testing Business Semantic Analysis')
        const businessSemanticResult = await service.businessSemanticDemo({
            customerName: 'Enterprise Customer',
            productCatalog: ['laptop', 'monitor', 'keyboard', 'mouse'],
            orderProcessing: true,
            paymentValidation: true
        })
        logger.info('✅ Business semantic result:', businessSemanticResult)

        logger.info('💰 Testing Financial Semantic Analysis')
        const financialSemanticResult = await service.financialSemanticDemo({
            transactionAmount: 25_000,
            currency: 'USD',
            paymentMethod: 'wire-transfer',
            invoiceGeneration: true,
            complianceValidation: true
        })
        logger.info('✅ Financial semantic result:', financialSemanticResult)

        logger.info('👤 Testing User Operation Semantic Analysis')
        const userOperationResult = await service.userOperationSemanticDemo({
            userId: 123,
            operationType: 'authentication',
            securityLevel: 'HIGH',
            auditRequired: true
        })
        logger.info('✅ User operation result:', userOperationResult)

        // ═══════════════════════════════════════════════════════════════════════════════
        // 🎯 MASTER CONFIGURATION DEMO
        // ═══════════════════════════════════════════════════════════════════════════════

        logger.info('🎯 Testing Master Configuration (Prettifier + Semantic)')
        const masterConfigResult = await service.masterConfigurationDemo({
            configurationName: 'enterprise-master-config',
            prettifierSettings: {
                colorOutput: true,
                verboseMode: false,
                compressionLevel: 'MEDIUM'
            },
            semanticSettings: {
                domainDetection: true,
                operationInference: true,
                complexityAnalysis: true
            },
            environmentSettings: {
                environment: 'production',
                adaptiveLogging: true,
                performanceOptimization: true
            }
        })
        logger.info('✅ Master configuration result:', masterConfigResult)

        // ═══════════════════════════════════════════════════════════════════════════════
        // 📊 SERVICE STATISTICS
        // ═══════════════════════════════════════════════════════════════════════════════

        logger.info('📊 Service Statistics')
        const stats = service.getServiceStatistics()
        logger.info('✅ Final statistics:', stats)

        // ═══════════════════════════════════════════════════════════════════════════════
        // 🎯 CONFIGURATION OVERVIEW
        // ═══════════════════════════════════════════════════════════════════════════════

        logger.info('🎯 Configuration Overview')
        const configOverview = {
            prettifierConfigurations: {
                development: getDevelopmentPrettifierConfig(),
                production: getProductionPrettifierConfig(),
                debug: getDebugPrettifierConfig(),
                analytics: getAnalyticsPrettifierConfig(),
                master: getMasterPrettifierConfig()
            },
            semanticConfigurations: {
                businessDomain: getBusinessDomainConfig(),
                production: getProductionSemanticConfig(),
                debug: getDebugSemanticConfig()
            },
            supportedFeatures: {
                domainDetection: true,
                operationInference: true,
                complexityAnalysis: true,
                businessKeyExtraction: true,
                tagClassification: true,
                adaptiveFormatting: true
            }
        }

        logger.info('✅ Configuration overview:', {
            prettifierTypes: Object.keys(configOverview.prettifierConfigurations),
            semanticTypes: Object.keys(configOverview.semanticConfigurations),
            supportedFeatures: Object.keys(configOverview.supportedFeatures),
            totalConfigurations: 8
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            logger.error('❌ Prettifier & Semantic Demo failed:', { error: error.message })
        } else {
            logger.error('❌ Prettifier & Semantic Demo failed:', { error: String(error) })
        }
    }

    logger.info('🎉 Prettifier & Semantic Analysis Demo completed!')
} 