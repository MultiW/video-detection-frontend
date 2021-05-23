import React from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { StreamEvent, Prediction, BoundingBox } from '../api/streamEvents';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { formatEpochTime, longDateTimeFormat } from './../utils/dateTimeUtil';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const styles = (theme: Theme) => ({
    imageCard: {
        width: 'inherit',
        maxHeight: '55vh',
        overfill: 'auto',
    },
    imageContainer: {
        width: 'inherit',
        maxHeight: '50vh',
    },
    image: {
        maxWidth: '100%',
    },
});

interface EventDetailsProps extends WithStyles<typeof styles> {
    streamEvent?: StreamEvent;
}

interface EventDetailsState {}

class EventDetails extends React.Component<EventDetailsProps, EventDetailsState> {
    constructor(props: EventDetailsProps) {
        super(props);
    }

    render(): React.ReactNode {
        const { streamEvent, classes } = this.props;

        return (
            <Grid container>
                <Grid item xs={12} md={12} lg={12}>
                    <Card className={classes.imageCard}>
                        {streamEvent != null ? this.renderImageCard() : this.renderBlankCard}
                    </Card>
                </Grid>
            </Grid>
        );
    }

    renderBlankCard = (): React.ReactNode => {
        return <CardContent>Select an event</CardContent>;
    };

    renderImageCard = (): React.ReactNode => {
        const { streamEvent, classes } = this.props;

        if (streamEvent == null) {
            // This should already be handled. streamEvent shouldn't be null
            return '';
        }

        return (
            <React.Fragment>
                {/* Render image title */}
                <CardContent>
                    <Typography component="div" align="left" color="textSecondary" variant="body1">
                        {`${streamEvent.videoStream} (${formatEpochTime(streamEvent.timestamp, longDateTimeFormat)})`}
                    </Typography>
                </CardContent>

                {/* Render image */}
                {this.renderImageAndBoundingBoxes()}
            </React.Fragment>
        );
    };

    private renderImageAndBoundingBoxes = (): React.ReactNode => {
        const { streamEvent, classes } = this.props;

        if (streamEvent == null) {
            // This should already be handled. streamEvent shouldn't be null
            return '';
        }

        return (
            <Box style={{ display: 'grid' }}>
                <CardMedia
                    style={{ gridColumn: 1, gridRow: 1 }}
                    className={classes.image}
                    component="img"
                    image={streamEvent.imageSource}
                />
                {this.renderBoundingBoxes()}
            </Box>
        );
    };

    private renderBoundingBoxes = (): React.ReactNode => {
        const { streamEvent } = this.props;

        if (streamEvent) {
            return (
                <React.Fragment>
                    {streamEvent.predictions.map((prediction: Prediction) => {
                        const boundingBox: BoundingBox = prediction.boundingBox;
                        const uniqueKey = `${boundingBox.top} ${boundingBox.left} ${boundingBox.height} ${boundingBox.width}`;

                        return (
                            <div
                                key={uniqueKey}
                                style={{
                                    gridColumn: 1,
                                    gridRow: 1,

                                    borderStyle: 'dashed',
                                    marginTop: `${100 * boundingBox.top}%`,
                                    marginLeft: `${100 * boundingBox.left}%`,
                                    height: `${100 * boundingBox.height}%`,
                                    width: `${100 * boundingBox.width}%`,
                                }}
                            />
                        );
                    })}
                </React.Fragment>
            );
        }
    };
}

export default withStyles(styles, { withTheme: true })(EventDetails);
