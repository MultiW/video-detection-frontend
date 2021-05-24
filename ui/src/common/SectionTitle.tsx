import React from 'react';
import Typography from '@material-ui/core/Typography';

interface SectionTitleProps {
    children: React.ReactNode;
    gutterBottom?: boolean;
}

export default class SectionTitle extends React.Component<SectionTitleProps> {
    constructor(props: SectionTitleProps) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <Typography component="h2" variant="h6" color="primary" gutterBottom={this.props.gutterBottom}>
                {this.props.children}
            </Typography>
        );
    }
}
