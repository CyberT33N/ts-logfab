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
 *██               🏢 ENTERPRISE MONITORING SERVICE                             ██
 *██                  COMPREHENSIVE MONITORING SERVICE                         ██
 *██                                                                           ██
 *███████████████████████████████████████████████████████████████████████████████
 *███████████████████████████████████████████████████████████████████████████████
 */

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🏢 ENTERPRISE MONITORING SERVICE
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import type { ReadonlyDeep } from 'type-fest'
import { log } from '@/decorators/index.ts'
import { logger } from '@/logger/index.ts'

import {
    getSecurityMonitoringConfig,
    getDatabasePerformanceConfig,
    getAPIGatewayConfig,
    getMasterMonitoringConfig
} from './infrastructure-configs.ts'
import {
    getCriticalPerformanceConfig,
    getBusinessMetricsConfig,
    getRealTimeAnalyticsConfig
} from './performance-configs.ts'

/*
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🏢 ENTERPRISE MONITORING & ALERTING SERVICE
 * ═══════════════════════════════════════════════════════════════════════════════
 */

/**
 * 🏢 **Enterprise Monitoring & Alerting Service**
 *
 * Comprehensive monitoring and alerting service implementation
 *
 * @see {@link EnterpriseMonitoringService.criticalPerformanceOperation} for critical monitoring
 * @see {@link EnterpriseMonitoringService.masterMonitoringOperation} for comprehensive monitoring
 */
export class EnterpriseMonitoringService {
    [key: string]: unknown

    private readonly _performanceMetrics: Record<string, number[]> = {}

    private readonly _alertHistory: {
        timestamp: Date
        level: string
        message: string
        source: string
        resolved: boolean
    }[] = []

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * 🔍 CRITICAL PERFORMANCE MONITORING
     * ═══════════════════════════════════════════════════════════════════════════════
     */
    /**
     * 🔍 **Critical Performance Operation**
     *
     * Executes critical performance monitoring with SLA compliance tracking
     *
     * @param operationData - Performance operation configuration
     *
     * @returns Promise resolving to performance operation results
     *
     * @throws {Error} When performance operation fails
     *
     * @example
     * ```typescript
     * const result = await service.criticalPerformanceOperation({
     *   operationType: 'transaction-processing',
     *   priority: 'CRITICAL',
     *   expectedSLA: 500
     * });
     * ```
     */

    @log(
        getCriticalPerformanceConfig()
    )
    public async criticalPerformanceOperation(
        operationData: ReadonlyDeep<{
            operationType: string
            priority: 'CRITICAL' | 'HIGH' | 'MEDIUM'
            expectedSLA: number
            metadata: Record<string, unknown>
        }>
    ): Promise<{
        operationId: string
        completed: boolean
        slaCompliance: boolean
        performanceMetrics: {
            executionTime: number
            memoryUsage: number
            cpuUsage: number
        }
    }> {
        const operationId = `critical-op-${String(
            Date.now()
        )}`
        const startTime = performance.now()

        // Simulate critical operation with variable performance
        const isSlowOperation = Math.random() > 0.8
        const processingTime = isSlowOperation ? 800 : 150

        await this._delay(
            processingTime
        )

        const endTime = performance.now()
        const executionTime = endTime - startTime
        const slaCompliance = executionTime <= operationData.expectedSLA

        const performanceMetrics = {
            executionTime,
            memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024,
            cpuUsage: Math.random() * 100
        }

        // Record performance metrics
        this._recordPerformanceMetrics(
            'criticalPerformance', executionTime
        )

        // Generate alert if SLA is violated
        if (!slaCompliance) {
            this._generateAlert(
                'CRITICAL',
                `SLA violation detected: ${executionTime.toString()}ms > ${operationData.expectedSLA.toString()}ms`,
                'CriticalPerformanceService'
            )
        }

        return {
            operationId,
            completed: true,
            slaCompliance,
            performanceMetrics
        }
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * 📊 BUSINESS METRICS MONITORING
     * ═══════════════════════════════════════════════════════════════════════════════
     */
    /**
     * 📊 **Business Metrics Operation**
     *
     * Processes business metrics and KPI performance tracking
     *
     * @param metricsData - Business metrics configuration
     *
     * @returns Promise resolving to business metrics analysis
     *
     * @throws {Error} When metrics processing fails
     *
     * @example
     * ```typescript
     * const result = await service.businessMetricsOperation({
     *   kpiName: 'revenue-per-customer',
     *   targetValue: 1000,
     *   actualValue: 850
     * });
     * ```
     */

    @log(
        getBusinessMetricsConfig()
    )
    public async businessMetricsOperation(
        metricsData: ReadonlyDeep<{
            kpiName: string
            targetValue: number
            actualValue: number
            timeframe: string
            businessUnit: string
        }>
    ): Promise<{
        kpiId: string
        variance: number
        performanceRating: 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'POOR'
        businessImpact: 'HIGH' | 'MEDIUM' | 'LOW'
        recommendations: readonly string[]
    }> {
        const kpiId = `kpi-${metricsData.kpiName}-${String(
            Date.now()
        )}`

        await this._delay(
            100
        )

        const variance = ((metricsData.actualValue - metricsData.targetValue) / metricsData.targetValue) * 100

        let performanceRating: 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'POOR'
        let businessImpact: 'HIGH' | 'MEDIUM' | 'LOW'

        if (variance >= 10) {
            performanceRating = 'EXCELLENT'
            businessImpact = 'HIGH'
        }
        else if (variance >= 0) {
            performanceRating = 'GOOD'
            businessImpact = 'MEDIUM'
        }
        else if (variance >= -10) {
            performanceRating = 'AVERAGE'
            businessImpact = 'MEDIUM'
        }
        else {
            performanceRating = 'POOR'
            businessImpact = 'HIGH'
        }

        const recommendations: string[] = []

        if (performanceRating === 'POOR') {
            recommendations.push(
                'Immediate action required'
            )
            recommendations.push(
                'Investigate root causes'
            )
            recommendations.push(
                'Implement corrective measures'
            )
            this._generateAlert(
                'CRITICAL',
                `Poor KPI performance: ${metricsData.kpiName} variance ${variance.toFixed(
                    2
                )}%`,
                'BusinessMetricsService'
            )
        }
        else if (performanceRating === 'AVERAGE') {
            recommendations.push(
                'Monitor closely'
            )
            recommendations.push(
                'Consider optimization opportunities'
            )
            this._generateAlert(
                'WARNING',
                `Average KPI performance: ${metricsData.kpiName} variance ${variance.toFixed(
                    2
                )}%`,
                'BusinessMetricsService'
            )
        }

        return {
            kpiId,
            variance,
            performanceRating,
            businessImpact,
            recommendations
        }
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * 🛡️ SECURITY MONITORING
     * ═══════════════════════════════════════════════════════════════════════════════
     */
    /**
     * 🛡️ **Security Monitoring Operation**
     *
     * Monitors security events with risk assessment and compliance tracking
     *
     * @param securityData - Security event configuration
     *
     * @returns Promise resolving to security assessment results
     *
     * @throws {Error} When security monitoring fails
     *
     * @example
     * ```typescript
     * const result = await service.securityMonitoringOperation({
     *   eventType: 'LOGIN',
     *   userId: 'user-123',
     *   riskScore: 75
     * });
     * ```
     */

    @log(
        getSecurityMonitoringConfig()
    )
    public async securityMonitoringOperation(
        securityData: ReadonlyDeep<{
            eventType: 'LOGIN' | 'ACCESS' | 'PERMISSION' | 'BREACH_ATTEMPT'
            userId: string
            ipAddress: string
            userAgent: string
            riskScore: number
            geolocation: string
        }>
    ): Promise<{
        securityEventId: string
        riskAssessment: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
        actionTaken: readonly string[]
        complianceStatus: 'COMPLIANT' | 'NON_COMPLIANT' | 'REVIEW_REQUIRED'
        auditTrail: string
    }> {
        const securityEventId = `security-event-${String(
            Date.now()
        )}`

        await this._delay(
            80
        )

        let riskAssessment: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
        const actionTaken: string[] = []
        let complianceStatus: 'COMPLIANT' | 'NON_COMPLIANT' | 'REVIEW_REQUIRED'

        if (securityData.riskScore >= 80) {
            riskAssessment = 'CRITICAL'
            actionTaken.push(
                'Account locked'
            )
            actionTaken.push(
                'Security team notified'
            )
            actionTaken.push(
                'Incident response initiated'
            )
            complianceStatus = 'NON_COMPLIANT'
            this._generateAlert(
                'CRITICAL',
                `Critical security event: ${securityData.eventType} from ${securityData.ipAddress}`,
                'SecurityMonitoringService'
            )
        }
        else if (securityData.riskScore >= 60) {
            riskAssessment = 'HIGH'
            actionTaken.push(
                'Additional authentication required'
            )
            actionTaken.push(
                'Security monitoring increased'
            )
            complianceStatus = 'REVIEW_REQUIRED'
            this._generateAlert(
                'WARNING',
                `High-risk security event: ${securityData.eventType} from ${securityData.ipAddress}`,
                'SecurityMonitoringService'
            )
        }
        else if (securityData.riskScore >= 40) {
            riskAssessment = 'MEDIUM'
            actionTaken.push(
                'Event logged'
            )
            actionTaken.push(
                'Monitoring continued'
            )
            complianceStatus = 'COMPLIANT'
        }
        else {
            riskAssessment = 'LOW'
            actionTaken.push(
                'Standard processing'
            )
            complianceStatus = 'COMPLIANT'
        }

        const auditTrail = `audit-${securityEventId}-${String(
            Date.now()
        )}`

        return {
            securityEventId,
            riskAssessment,
            actionTaken,
            complianceStatus,
            auditTrail
        }
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * 📈 REAL-TIME ANALYTICS MONITORING
     * ═══════════════════════════════════════════════════════════════════════════════
     */
    /**
     * 📈 **Real-Time Analytics Operation**
     *
     * Processes real-time analytics with throughput and quality assessment
     *
     * @param analyticsData - Analytics operation configuration
     *
     * @returns Promise resolving to analytics operation results
     *
     * @throws {Error} When analytics processing fails
     *
     * @example
     * ```typescript
     * const result = await service.realTimeAnalyticsOperation({
     *   streamId: 'user-events-stream',
     *   eventCount: 5000,
     *   processingLatency: 85
     * });
     * ```
     */

    @log(
        getRealTimeAnalyticsConfig()
    )
    public async realTimeAnalyticsOperation(
        analyticsData: ReadonlyDeep<{
            streamId: string
            eventCount: number
            processingLatency: number
            dataVolume: number
            qualityScore: number
        }>
    ): Promise<{
        analyticsId: string
        throughput: number
        latencyCompliance: boolean
        qualityAssessment: 'EXCELLENT' | 'GOOD' | 'POOR'
        scalingRecommendation: string
    }> {
        const analyticsId = `analytics-${analyticsData.streamId}-${String(
            Date.now()
        )}`

        // Minimal delay for real-time processing
        await this._delay(
            20
        )

        const throughput = analyticsData.eventCount / (analyticsData.processingLatency / 1000)
        const latencyCompliance = analyticsData.processingLatency <= 100 // 100ms SLA

        let qualityAssessment: 'EXCELLENT' | 'GOOD' | 'POOR'

        if (analyticsData.qualityScore >= 90) {
            qualityAssessment = 'EXCELLENT'
        }
        else if (analyticsData.qualityScore >= 70) {
            qualityAssessment = 'GOOD'
        }
        else {
            qualityAssessment = 'POOR'
            this._generateAlert(
                'WARNING',
                `Poor data quality: ${String(
                    analyticsData.qualityScore
                )}% for stream ${analyticsData.streamId}`,
                'RealTimeAnalyticsService'
            )
        }

        let scalingRecommendation: string

        if (throughput > 10_000) {
            scalingRecommendation = 'Consider scaling up'
        }
        else if (throughput < 1000) {
            scalingRecommendation = 'Consider scaling down'
        }
        else {
            scalingRecommendation = 'Current scaling is optimal'
        }

        // Record analytics metrics
        this._recordPerformanceMetrics(
            'realTimeAnalytics', analyticsData.processingLatency
        )

        return {
            analyticsId,
            throughput,
            latencyCompliance,
            qualityAssessment,
            scalingRecommendation
        }
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * 💾 DATABASE PERFORMANCE MONITORING
     * ═══════════════════════════════════════════════════════════════════════════════
     */
    /**
     * 💾 **Database Performance Operation**
     *
     * Monitors database performance with query optimization analysis
     *
     * @param dbData - Database operation configuration
     *
     * @returns Promise resolving to database performance results
     *
     * @throws {Error} When database monitoring fails
     *
     * @example
     * ```typescript
     * const result = await service.databasePerformanceOperation({
     *   queryType: 'SELECT',
     *   executionTime: 350,
     *   rowsAffected: 1000
     * });
     * ```
     */

    @log(
        getDatabasePerformanceConfig()
    )
    public async databasePerformanceOperation(
        dbData: ReadonlyDeep<{
            queryType: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE'
            executionTime: number
            rowsAffected: number
            connectionPoolSize: number
            indexUsage: boolean
        }>
    ): Promise<{
        queryId: string
        performanceRating: 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'POOR'
        optimizationSuggestions: readonly string[]
        connectionPoolHealth: 'HEALTHY' | 'STRESSED' | 'CRITICAL'
    }> {
        const queryId = `db-query-${String(
            Date.now()
        )}`

        await this._delay(
            dbData.executionTime
        )

        let performanceRating: 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'POOR'
        const optimizationSuggestions: string[] = []

        if (dbData.executionTime <= 50) {
            performanceRating = 'EXCELLENT'
        }
        else if (dbData.executionTime <= 200) {
            performanceRating = 'GOOD'
        }
        else if (dbData.executionTime <= 500) {
            performanceRating = 'AVERAGE'
            optimizationSuggestions.push(
                'Consider query optimization'
            )
        }
        else {
            performanceRating = 'POOR'
            optimizationSuggestions.push(
                'Urgent query optimization needed'
            )
            optimizationSuggestions.push(
                'Review database schema'
            )
            this._generateAlert(
                'WARNING',
                `Slow database query: ${String(
                    dbData.executionTime
                )}ms for ${dbData.queryType}`,
                'DatabasePerformanceService'
            )
        }

        if (!dbData.indexUsage) {
            optimizationSuggestions.push(
                'Consider adding database indexes'
            )
        }

        let connectionPoolHealth: 'HEALTHY' | 'STRESSED' | 'CRITICAL'

        if (dbData.connectionPoolSize >= 80) {
            connectionPoolHealth = 'CRITICAL'
            this._generateAlert(
                'CRITICAL',
                `Database connection pool critical: ${String(
                    dbData.connectionPoolSize
                )}% usage`,
                'DatabasePerformanceService'
            )
        }
        else if (dbData.connectionPoolSize >= 60) {
            connectionPoolHealth = 'STRESSED'
            this._generateAlert(
                'WARNING',
                `Database connection pool stressed: ${String(
                    dbData.connectionPoolSize
                )}% usage`,
                'DatabasePerformanceService'
            )
        }
        else {
            connectionPoolHealth = 'HEALTHY'
        }

        // Record database performance metrics
        this._recordPerformanceMetrics(
            'databasePerformance', dbData.executionTime
        )

        return {
            queryId,
            performanceRating,
            optimizationSuggestions,
            connectionPoolHealth
        }
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * 🌐 API GATEWAY MONITORING
     * ═══════════════════════════════════════════════════════════════════════════════
     */
    /**
     * 🌐 **API Gateway Operation**
     *
     * Monitors API gateway performance with routing and rate limiting
     *
     * @param apiData - API gateway operation configuration
     *
     * @returns Promise resolving to API gateway operation results
     *
     * @throws {Error} When API gateway monitoring fails
     *
     * @example
     * ```typescript
     * const result = await service.apiGatewayOperation({
     *   endpoint: '/api/v1/users',
     *   method: 'GET',
     *   responseTime: 250
     * });
     * ```
     */

    @log(
        getAPIGatewayConfig()
    )
    public async apiGatewayOperation(
        apiData: ReadonlyDeep<{
            endpoint: string
            method: 'GET' | 'POST' | 'PUT' | 'DELETE'
            responseTime: number
            statusCode: number
            requestSize: number
            responseSize: number
            clientId: string
        }>
    ): Promise<{
        requestId: string
        routingDecision: string
        rateLimitStatus: 'WITHIN_LIMIT' | 'APPROACHING_LIMIT' | 'EXCEEDED'
        cacheHit: boolean
        loadBalancingTarget: string
        performanceScore: number
    }> {
        const requestId = `api-request-${String(
            Date.now()
        )}`

        await this._delay(
            apiData.responseTime
        )

        const routingDecision = `route-${apiData.endpoint.replace(
            /\//g, '-'
        )}`

        let rateLimitStatus: 'WITHIN_LIMIT' | 'APPROACHING_LIMIT' | 'EXCEEDED'
        const requestRate = Math.random() * 100

        if (requestRate >= 90) {
            rateLimitStatus = 'EXCEEDED'
            this._generateAlert(
                'CRITICAL',
                `Rate limit exceeded for client ${apiData.clientId} on ${apiData.endpoint}`,
                'APIGatewayService'
            )
        }
        else if (requestRate >= 70) {
            rateLimitStatus = 'APPROACHING_LIMIT'
            this._generateAlert(
                'WARNING',
                `Rate limit approaching for client ${apiData.clientId} on ${apiData.endpoint}`,
                'APIGatewayService'
            )
        }
        else {
            rateLimitStatus = 'WITHIN_LIMIT'
        }

        const cacheHit = Math.random() > 0.3
        const loadBalancingTarget = `server-${String(
            Math.floor(
                Math.random() * 3
            ) + 1
        )}`

        let performanceScore = 100

        if (apiData.responseTime > 1000) {
            performanceScore -= 30
        }

        if (apiData.statusCode >= 400) {
            performanceScore -= 20
        }

        if (apiData.requestSize > 1_000_000) {
            performanceScore -= 10
        }

        if (!cacheHit) {
            performanceScore -= 5
        }

        if (performanceScore < 50) {
            this._generateAlert(
                'WARNING',
                `Poor API performance: ${String(
                    performanceScore
                )}% for ${apiData.endpoint}`,
                'APIGatewayService'
            )
        }

        // Record API performance metrics
        this._recordPerformanceMetrics(
            'apiGateway', apiData.responseTime
        )

        return {
            requestId,
            routingDecision,
            rateLimitStatus,
            cacheHit,
            loadBalancingTarget,
            performanceScore
        }
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * 🎯 MASTER MONITORING OPERATION
     * ═══════════════════════════════════════════════════════════════════════════════
     */
    /**
     * 🎯 **Master Monitoring Operation**
     *
     * Comprehensive monitoring operation with system health assessment
     *
     * @param masterData - Master monitoring configuration
     *
     * @returns Promise resolving to comprehensive monitoring results
     *
     * @throws {Error} When master monitoring fails
     *
     * @example
     * ```typescript
     * const result = await service.masterMonitoringOperation({
     *   operationName: 'enterprise-health-check',
     *   systemHealth: { cpu: 65, memory: 80 },
     *   businessMetrics: { revenue: 95000 }
     * });
     * ```
     */

    @log(
        getMasterMonitoringConfig()
    )
    public async masterMonitoringOperation(
        masterData: ReadonlyDeep<{
            operationName: string
            systemHealth: Record<string, unknown>
            businessMetrics: Record<string, number>
            securityEvents: readonly Record<string, unknown>[]
            performanceBaseline: Record<string, number>
        }>
    ): Promise<{
        monitoringId: string
        systemHealthScore: number
        businessHealthScore: number
        securityHealthScore: number
        performanceHealthScore: number
        overallHealthScore: number
        alerts: readonly string[]
        recommendations: readonly string[]
    }> {
        const monitoringId = `master-monitoring-${String(
            Date.now()
        )}`

        await this._delay(
            200
        )

        // Calculate health scores
        const systemHealthScore = Math.min(
            100, Math.max(
                0, 85 + (Math.random() - 0.5) * 30
            )
        )
        const businessHealthScore = Math.min(
            100, Math.max(
                0, 80 + (Math.random() - 0.5) * 40
            )
        )
        const securityHealthScore = Math.min(
            100, Math.max(
                0, 90 + (Math.random() - 0.5) * 20
            )
        )
        const performanceHealthScore = Math.min(
            100, Math.max(
                0, 75 + (Math.random() - 0.5) * 50
            )
        )

        const overallHealthScore = (systemHealthScore + businessHealthScore + securityHealthScore + performanceHealthScore) / 4

        const alerts: string[] = []
        const recommendations: string[] = []

        if (overallHealthScore < 70) {
            alerts.push(
                'System health degraded'
            )
            recommendations.push(
                'Immediate investigation required'
            )
            this._generateAlert(
                'CRITICAL',
                `System health degraded: ${overallHealthScore.toFixed(
                    2
                )}%`,
                'MasterMonitoringService'
            )
        }
        else if (overallHealthScore < 80) {
            alerts.push(
                'System health below optimal'
            )
            recommendations.push(
                'Proactive maintenance recommended'
            )
            this._generateAlert(
                'WARNING',
                `System health below optimal: ${overallHealthScore.toFixed(
                    2
                )}%`,
                'MasterMonitoringService'
            )
        }

        if (systemHealthScore < 75) {
            alerts.push(
                'System infrastructure needs attention'
            )
            recommendations.push(
                'Check system resources'
            )
        }

        if (businessHealthScore < 75) {
            alerts.push(
                'Business metrics underperforming'
            )
            recommendations.push(
                'Review business processes'
            )
        }

        if (securityHealthScore < 85) {
            alerts.push(
                'Security posture needs improvement'
            )
            recommendations.push(
                'Strengthen security measures'
            )
        }

        if (performanceHealthScore < 70) {
            alerts.push(
                'Performance optimization needed'
            )
            recommendations.push(
                'Implement performance improvements'
            )
        }

        logger.info(
            'Master monitoring data', { masterData }
        )

        return {
            monitoringId,
            systemHealthScore,
            businessHealthScore,
            securityHealthScore,
            performanceHealthScore,
            overallHealthScore,
            alerts,
            recommendations
        }
    }

    /**
     * 🚨 **Get Recent Alerts**
     *
     * Retrieves recent alert history sorted by timestamp
     *
     * @param limit - Maximum number of alerts to return
     * @defaultValue limit = 10
     *
     * @returns Array of recent alert objects
     *
     * @example
     * ```typescript
     * const alerts = service.getRecentAlerts(5);
     * console.log(alerts.length); // <= 5
     * ```
     */

    public getRecentAlerts(
        limit = 10
    ): readonly {
        timestamp: Date
        level: string
        message: string
        source: string
        resolved: boolean
    }[] {
        return this._alertHistory
            .sort(
                (
                    a: ReadonlyDeep<{ timestamp: Readonly<Date> }>,
                    b: ReadonlyDeep<{ timestamp: Readonly<Date> }>
                ) => b.timestamp.getTime() - a.timestamp.getTime()
            )
            .slice(
                0, limit
            )
    }

    /**
     * 📊 **Get Monitoring Statistics**
     *
     * Retrieves comprehensive monitoring statistics and system health
     *
     * @returns Monitoring statistics including performance metrics and alerts
     *
     * @example
     * ```typescript
     * const stats = service.getMonitoringStatistics();
     * console.log(stats.alertsSummary.total);
     * ```
     */

    public getMonitoringStatistics(): {
        performanceMetrics: Record<
            string,
            {
                count: number
                average: number
                min: number
                max: number
            }
        >
        alertsSummary: {
            total: number
            critical: number
            warning: number
            info: number
            unresolved: number
        }
        systemHealth: {
            monitoringActive: boolean
            lastUpdate: Date
            componentsMonitored: number
        }
    } {
        const performanceMetrics: Record<
            string,
            {
                count: number
                average: number
                min: number
                max: number
            }
        > = {}

        for (const [category, values] of Object.entries(
            this._performanceMetrics
        )) {
            if (values.length > 0) {
                performanceMetrics[category] = {
                    count: values.length,
                    average: values.reduce(
                        (
                            sum, val
                        ) => sum + val, 0
                    ) / values.length,
                    min: Math.min(
                        ...values
                    ),
                    max: Math.max(
                        ...values
                    )
                }
            }
        }

        const alertsSummary = {
            total: this._alertHistory.length,
            critical: this._alertHistory.filter(
                (
                    a: ReadonlyDeep<{ level: string }>
                ) => a.level === 'CRITICAL'
            ).length,
            warning: this._alertHistory.filter(
                (
                    a: ReadonlyDeep<{ level: string }>
                ) => a.level === 'WARNING'
            ).length,
            info: this._alertHistory.filter(
                (
                    a: ReadonlyDeep<{ level: string }>
                ) => a.level === 'INFO'
            ).length,
            unresolved: this._alertHistory.filter(
                (
                    a: ReadonlyDeep<{ resolved: boolean }>
                ) => !a.resolved
            ).length
        }

        return {
            performanceMetrics,
            alertsSummary,
            systemHealth: {
                monitoringActive: true,
                lastUpdate: new Date(),
                componentsMonitored: 6
            }
        }
    }

    /*
     * ═══════════════════════════════════════════════════════════════════════════════
     * 🛠️ UTILITY METHODS
     * ═══════════════════════════════════════════════════════════════════════════════
     */

    private async _delay(
        ms: number
    ): Promise<void> {
        await new Promise(
            resolve => setTimeout(
                resolve, ms
            )
        )
    }

    private _recordPerformanceMetrics(
        category: string, value: number
    ): void {
        this._performanceMetrics[category] = []
        const metrics = this._performanceMetrics[category]

        if (metrics.length > 0) {
            metrics.push(
                value
            )
        }

        // Keep only last 100 measurements
        if (metrics.length > 100) {
            metrics.shift()
        }
    }

    private _generateAlert(
        level: string, message: string, source: string
    ): void {
        this._alertHistory.push(
            {
                timestamp: new Date(),
                level,
                message,
                source,
                resolved: false
            }
        )

        // Keep only last 50 alerts
        if (this._alertHistory.length > 50) {
            this._alertHistory.shift()
        }
    }
}
