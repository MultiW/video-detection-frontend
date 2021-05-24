import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FormikProps, Formik, Form } from 'formik';

const styles = () =>
    createStyles({
        title: {
            paddingBottom: 0,
        },
        formContent: {
            overflow: 'hidden',
        },
    });

interface FormikNumberRange {
    min?: number | '';
    max?: number | '';
}

export interface EventsFilterFormValues {
    label: string;
    scoreRange: FormikNumberRange;
}

interface EventsFilterDialogProps extends WithStyles<typeof styles> {
    handleClose: () => void;
    open: boolean;
    handleSubmit: (values: EventsFilterFormValues) => void;
    initialFormValues: EventsFilterFormValues;
}

interface EventFilterDialogState {}

class EventsFilterDialog extends React.Component<EventsFilterDialogProps, EventFilterDialogState> {
    constructor(props: EventsFilterDialogProps) {
        super(props);
    }

    render(): React.ReactNode {
        const { open, handleClose, classes, handleSubmit, initialFormValues } = this.props;

        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className={classes.title}>Events Filter</DialogTitle>
                <Formik initialValues={initialFormValues} onSubmit={handleSubmit} enablereinitialize>
                    {(formikProps: FormikProps<EventsFilterFormValues>) => {
                        const { values, isSubmitting, handleChange, handleBlur } = formikProps;
                        return (
                            <Form>
                                <DialogContent className={classes.formContent}>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="label"
                                                name="label"
                                                label="Label"
                                                value={values.label}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body1">Score Range</Typography>
                                            <Grid container spacing={1}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="min"
                                                        name="scoreRange.min"
                                                        label="Min"
                                                        type="number"
                                                        value={values.scoreRange.min}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id="max"
                                                        name="scoreRange.max"
                                                        label="Max"
                                                        type="number"
                                                        value={values.scoreRange.max}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit" onClick={handleClose} disabled={isSubmitting}>
                                        Apply
                                    </Button>
                                </DialogActions>
                            </Form>
                        );
                    }}
                </Formik>
            </Dialog>
        );
    }
}

export default withStyles(styles, { withTheme: true })(EventsFilterDialog);
