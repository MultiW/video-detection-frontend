import React from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { StreamEvent } from '../../objects/streamEvents';
import { Prediction, BoundingBox } from '../../objects/streamEvents';
import Grid, { GridSize } from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { formatEpochTime, longDateTimeFormat } from '../../utils/dateTimeUtil';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AnnotatedImage from './AnnotatedImage';
import Subtitle from './Subtitle';

const styles = (theme: Theme) => ({
    // Main structure
    root: {
        display: 'contents',
    },
    imageGrid: {
        paddingTop: '0 !important',
        display: 'flex',
        flex: '70%',
    },
    scoresGrid: {
        paddingBottom: '0 !important',
        display: 'flex',
        flex: '30%',
    },

    // Image card
    imageCard: {
        height: 'auto', // match children size
        width: '100%', // fill up remaining space
    },
    imageCardContent: {
        margin: 'auto',
        maxWidth: '30vw',
        maxHeight: 'auto',
    },

    // Scores card
    scoresCard: {
        height: '100%',
    },
});

interface EventDetailsProps extends WithStyles<typeof styles> {
    streamEvent?: StreamEvent;
    predictionColors?: string[]; // should be usable as an input into the CSS color attribute
}

interface EventDetailsState {}

class EventDetails extends React.Component<EventDetailsProps, EventDetailsState> {
    constructor(props: EventDetailsProps) {
        super(props);
    }

    render(): React.ReactNode {
        const { streamEvent, classes } = this.props;

        return (
            <Grid container spacing={1} className={classes.root}>
                <Grid item xs={12} md={12} lg={12} className={classes.imageGrid}>
                    <Card className={classes.imageCard}>
                        {streamEvent == null ? this.renderBlankImageCard() : this.renderImageCard()}
                    </Card>
                </Grid>
                <Grid className={classes.scoresGrid} direction="column" item xs={12} md={12} lg={12}>
                    <Card className={classes.scoresCard}>
                        {streamEvent == null ? this.renderBlankScoresCard() : this.renderScoresCard()}
                    </Card>
                </Grid>
            </Grid>
        );
    }

    private renderBlankImageCard = (): React.ReactNode => {
        return (
            <CardContent>
                <Subtitle>{'No event selected'}</Subtitle>
            </CardContent>
        );
    };

    private renderImageCard = (): React.ReactNode => {
        const { streamEvent, classes } = this.props;

        if (streamEvent == null) {
            // This should already be handled. streamEvent shouldn't be null
            return '';
        }

        return (
            <React.Fragment>
                {/* Render image title */}
                <CardContent>
                    <Subtitle>
                        {`${streamEvent.videoStream} (${formatEpochTime(streamEvent.timestamp, longDateTimeFormat)})`}
                    </Subtitle>
                </CardContent>

                {/* Render image */}
                <CardContent className={classes.imageCardContent}>
                    <AnnotatedImage predictions={streamEvent.predictions} imageSource={streamEvent.imageSource} />
                </CardContent>
            </React.Fragment>
        );
    };

    private renderScoresCard = (): React.ReactNode => {
        const { classes } = this.props;
        return <CardContent>asdf</CardContent>;
    };

    private renderBlankScoresCard = (): React.ReactNode => {
        return (
            <CardContent>
                <Subtitle>{'No event selected'}</Subtitle>
            </CardContent>
        );
    };
}

export default withStyles(styles, { withTheme: true })(EventDetails);
