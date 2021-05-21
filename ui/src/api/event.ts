interface StreamEvents {
    events: StreamEvent[];
}

interface StreamEvent {
    videoStream: string;
    timestamp: number;
    imageSource: string;
    predictions: Prediction[];
}

interface Prediction {
    boundingBox: BoundingBox;
    scores: Score[];
}

interface BoundingBox {
    top: number;
    left: number;
    height: number;
    width: number;
}

interface Score {
    label: string;
    score: number;
}