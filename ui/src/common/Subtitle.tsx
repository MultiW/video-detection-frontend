import React from 'react';
import Typography from '@material-ui/core/Typography';

interface SubtitleProps {
    children: React.ReactNode;
}

export default class Subtitle extends React.Component<SubtitleProps> {
    constructor(props: SubtitleProps) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <Typography component="div" align="center" color="textSecondary" variant="body1">
                {this.props.children}
            </Typography>
        );
    }
}
