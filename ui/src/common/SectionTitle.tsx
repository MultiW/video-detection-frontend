import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

interface SectionTitleProps extends WithStyles {
    children?: React.ReactNode;
    gutterBottom?: boolean;
}

const styles = createStyles({
    root: { flex: '1 1 100%' },
});

class SectionTitle extends React.Component<SectionTitleProps> {
    constructor(props: SectionTitleProps) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <Typography
                className={this.props.classes.root}
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom={this.props.gutterBottom}
            >
                {this.props.children}
            </Typography>
        );
    }
}

export default withStyles(styles)(SectionTitle);
