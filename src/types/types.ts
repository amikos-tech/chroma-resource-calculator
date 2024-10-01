export interface EmbeddingModel {
    name: string;
    vendor: string;
    dimensionality: number;
    id: string;
    version?: string;
    description?: string;
    variableDimensionality?: boolean;
    architecture?: string;
}