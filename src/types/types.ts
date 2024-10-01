export interface EmbeddingModel {
    name: string;
    vendor: string;
    dimensionality: number;
    contextSize: number;
    id: string;
    version?: string;
    tokenizer?: string;
    description?: string;
    variableDimensionality?: boolean;
    architecture?: string;
    url?: string;

}

export enum CalculationMode {
    DOCUMENT = "document",
    VECTOR = "vector"
}

export enum GrowthPeriod {
    MONTHLY = "monthly",
    YEARLY = "yearly"
}

export interface CalculationMetrics {
    vectorCount: number;
    dimensionality: number;
    vectorSize: number; //size in bytes
    systemMemoryOverhead: number; //percentage, max 100
    hnsw_m: number;
    hnsw_ef: number;
    hnsw_ef_construction: number;
    documentCount: number;
    pagesPerDocument: number;
    wordsPerPage: number;
    chunkOverlap: number; //expressed as a percentage 5-20%
    calculationMode: CalculationMode;
    metadataFieldCount: number;
    growthFactor: number; // percentage, max 100
    growthPeriod: GrowthPeriod;
}

export function calculateMemoryUsage(metrics: CalculationMetrics): number {
    // convert the below from bytes to GB
    const memoryBytes = metrics.vectorCount * metrics.dimensionality * metrics.vectorSize * (1 + metrics.systemMemoryOverhead / 100);
    return memoryBytes / (1024 ** 3);
}

export function calculateCPU(metrics: CalculationMetrics): number {
    // CPU formula is such - 1 vCPU per 4GB of memory
    return Math.max(1, Math.ceil(calculateMemoryUsage(metrics) / 4));
}