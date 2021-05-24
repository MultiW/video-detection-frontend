export interface StreamEvents {
    events: StreamEvent[];
}

export interface StreamEvent {
    videoStream: string;
    timestamp: number;
    imageSource: string;
    predictions: Prediction[];
}

export interface Prediction {
    boundingBox: BoundingBox;
    scores: Score[];
    color?: string;
}

export interface BoundingBox {
    top: number;
    left: number;
    height: number;
    width: number;
}

export interface Score {
    label: string;
    score: number;
}
