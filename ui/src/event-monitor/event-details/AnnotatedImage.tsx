import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import { Prediction, BoundingBox } from './../../api/streamEvents';

const styles = () =>
    createStyles({
        root: {
            display: 'grid',
            position: 'relative',
        },
        image: {
            maxHeight: '100%',
            maxWidth: '100%',

            // Overlap image with bounding box
            gridColumn: 1,
            gridRow: 1,
        },
        boundingBox: {
            // Overlaps bounding box with image
            gridColumn: 1,
            gridRow: 1,

            borderStyle: 'dashed',
            borderWidth: 'medium',
            position: 'absolute',
        },
    });

interface AnnotatedImageProps extends WithStyles<typeof styles> {
    predictions: Prediction[];
    imageSource: string;
}

interface AnnotatedImageState {}

class AnnotatedImage extends React.Component<AnnotatedImageProps, AnnotatedImageState> {
    constructor(props: AnnotatedImageProps) {
        super(props);
    }

    render(): React.ReactNode {
        const { imageSource, classes } = this.props;

        return (
            <Box className={classes.root}>
                {/* Render image */}
                <CardMedia className={classes.image} component="img" image={imageSource} />
                {/* Render annotations */}
                {this.renderBoundingBoxes()}
            </Box>
        );
    }

    private renderBoundingBoxes = (): React.ReactNode => {
        const { predictions, classes } = this.props;
        return (
            <React.Fragment>
                {predictions.map((prediction: Prediction) => {
                    const boundingBox: BoundingBox = prediction.boundingBox;
                    const uniqueKey = `${boundingBox.top} ${boundingBox.left} ${boundingBox.height} ${boundingBox.width}`;
                    return (
                        // Bounding box
                        <Box
                            key={uniqueKey}
                            className={classes.boundingBox}
                            style={{
                                color: prediction.color,
                                height: `${100 * boundingBox.height}%`,
                                width: `${100 * boundingBox.width}%`,
                                top: `${100 * boundingBox.top}%`,
                                left: `${100 * boundingBox.left}%`,
                            }}
                        />
                    );
                })}
            </React.Fragment>
        );
    };
}

export default withStyles(styles, { withTheme: true })(AnnotatedImage);
