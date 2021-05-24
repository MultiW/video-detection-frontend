import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Prediction, Score } from './../../api/streamEvents';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { ScrollTable, ScrollTableData, CellFormatter } from '../../common/ScrollTable';

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
                <GridList className={classes.gridList} cols={3} spacing={20}>
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
                    { id: 'label', label: 'Label', align: 'left', format: this.boldText as CellFormatter },
                    { id: 'score', label: 'Score', align: 'center', format: this.formatScore as CellFormatter },
                ]}
                data={prediction.scores
                    .sort((a: Score, b: Score) => {
                        return b.score - a.score;
                    })
                    .map((score: Score) => {
                        return {
                            id: score.label,
                            label: score.label,
                            score: score.score,
                            originalObject: score,
                        };
                    })}
                disableHeader={true}
            />
        );
    };

    private formatScore = (row: ScrollTableData, value: number) => {
        return this.colorText(row, `${value}%`);
    };

    private colorText = (row: ScrollTableData, value: string) => {
        if (!row.originalObject) {
            // This shouldn't occur
            return value;
        }
        return (
            <div style={{ color: this.scoreToColor((row.originalObject as Score).score) }}>
                <b>{value}</b>
            </div>
        );
    };

    private boldText = (row: ScrollTableData, value: string) => {
        return <b>{value}</b>;
    };

    private scoreToColor(score: number): string {
        if (score < 25) {
            return 'red';
        } else if (score < 75) {
            return 'yellow';
        } else {
            return 'green';
        }
    }
}

export default withStyles(styles, { withTheme: true })(PredictionList);
