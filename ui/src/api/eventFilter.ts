import { NumberRange } from '../objects/numberRange';

export default interface EventFilter {
    label?: string;
    scoreRange?: NumberRange;
}
