import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import { Prediction, BoundingBox } from './../../objects/streamEvents';

const styles = () => ({});

interface PredictionListProps extends WithStyles<typeof styles> {
    predictions: Prediction[];
}

interface PredictionListState {}

class PredictionList extends React.Component<PredictionListProps, PredictionListState> {
    constructor(props: PredictionListProps) {
        super(props);
    }

    render(): React.ReactNode {
        return 'TODO';
    }
}

export default withStyles(styles, { withTheme: true })(PredictionList);
