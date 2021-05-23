import React from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { StreamEvent } from '../../objects/streamEvents';
import { Prediction, BoundingBox } from '../../objects/streamEvents';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { formatEpochTime, longDateTimeFormat } from '../../utils/dateTimeUtil';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AnnotatedImage from './AnnotatedImage';

const styles = (theme: Theme) => ({
    imageCard: {
        height: '100%',
        width: '100%',
    },
    imageCardContent: {
        margin: 'auto',
        maxWidth: '30vw',
        maxHeight: 'auto',
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
                <CardContent className={classes.imageCardContent}>
                    <AnnotatedImage predictions={streamEvent.predictions} imageSource={streamEvent.imageSource} />
                </CardContent>
            </React.Fragment>
        );
    };
}

export default withStyles(styles, { withTheme: true })(EventDetails);
