import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { StreamEvent } from '../../objects/streamEvents';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { formatEpochTime, longDateTimeFormat } from '../../utils/dateTimeUtil';
import AnnotatedImage from './AnnotatedImage';
import Subtitle from './Subtitle';
import Predictions from './Predictions';
import SectionTitle from '../../common/SectionTitle';

const styles = () =>
    createStyles({
        // Main structure
        root: {
            display: 'contents',
        },
        imageGrid: {
            paddingTop: '0 !important',
            display: 'flex',
            flex: '70%',
        },
        predictionsGrid: {
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
            maxWidth: '25vw',
            maxHeight: 'auto',
        },

        // Predictions card
        predictionsCard: {
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
                        {streamEvent == null ? this.renderBlankImage() : this.renderImage()}
                    </Card>
                </Grid>
                <Grid className={classes.predictionsGrid} direction="column" item xs={12} md={12} lg={12}>
                    <Card className={classes.predictionsCard}>
                        {streamEvent == null ? this.renderBlankPredictions() : this.renderPredictions()}
                    </Card>
                </Grid>
            </Grid>
        );
    }

    private renderBlankImage = (): React.ReactNode => {
        return (
            <CardContent>
                <Subtitle>{'No event selected'}</Subtitle>
            </CardContent>
        );
    };

    private renderImage = (): React.ReactNode => {
        const { streamEvent, classes } = this.props;

        if (streamEvent == null) {
            // This should already be handled. streamEvent shouldn't be null
            return '';
        }

        return (
            <React.Fragment>
                {/* Render image title */}
                <CardContent>
                    <SectionTitle gutterBottom={false}>Detected Objects</SectionTitle>
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

    private renderPredictions = (): React.ReactNode => {
        const { streamEvent } = this.props;

        if (streamEvent == null) {
            // This should already be handled. streamEvent shouldn't be null
            return '';
        }

        return (
            <CardContent>
                <SectionTitle gutterBottom={true}>Scores</SectionTitle>
                <Predictions predictions={streamEvent.predictions}></Predictions>
            </CardContent>
        );
    };

    private renderBlankPredictions = (): React.ReactNode => {
        return (
            <CardContent>
                <Subtitle>{'No event selected'}</Subtitle>
            </CardContent>
        );
    };
}

export default withStyles(styles, { withTheme: true })(EventDetails);
