import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import { Prediction, BoundingBox, Score } from './../../objects/streamEvents';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { ScrollTable } from '../../common/ScrollTable';

const styles = () =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            overflow: 'hidden',
        },
        gridList: {
            margin: '0 auto',
            flexWrap: 'nowrap',
            width: '100%',
        },
        scoreBox: {
            borderStyle: 'solid',
            borderWidth: 'thick',
        },
    });

interface PredictionListProps extends WithStyles<typeof styles> {
    predictions: Prediction[];
}

interface PredictionListState {}

class PredictionList extends React.Component<PredictionListProps, PredictionListState> {
    constructor(props: PredictionListProps) {
        super(props);
    }

    render(): React.ReactNode {
        const { classes, predictions } = this.props;

        return (
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={2} spacing={20}>
                    {predictions.map((prediction: Prediction, index: number) => {
                        const uniqueKey = `${index} ${prediction.color ?? ''}`;
                        return <GridListTile key={uniqueKey}>{this.renderScores(prediction)}</GridListTile>;
                    })}
                </GridList>
            </div>
        );
    }

    private renderScores = (prediction: Prediction): React.ReactNode => {
        return (
            <ScrollTable
                className={this.props.classes.scoreBox}
                style={{ color: prediction.color }}
                columns={[
                    { id: 'label', label: 'Label', align: 'left' },
                    { id: 'score', label: 'Score', align: 'center' },
                ]}
                data={prediction.scores.map((score: Score) => {
                    return {
                        id: score.label,
                        label: score.label,
                        score: score.score,
                    };
                })}
                disableHeader={true}
            />
        );
    };
}

export default withStyles(styles, { withTheme: true })(PredictionList);
