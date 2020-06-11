import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Table, TableHead, TableBody, TableCell } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
// import { Button } from "@material-ui/core";
import TableRow from '@material-ui/core/TableRow';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

class AssumptionInput extends React.Component {
    constructor() {
        super()
        this.sendAssumptions = this.sendAssumptions.bind(this)
        this.state = {
            date: '',
            dollar_parity: '',
            us_cpi: '',
            local_cpi: '',
            kibor: '',
            libor: '',
            sinsoure_fee: '',
            open: true,
            submitted: false,
            email: '',
            password: ''
        }

    }

    componentDidMount() {
        console.log(this.props.open)
        this.setState({
            date: this.props.date
        })
    }

    changeHandler_dollar = (event) => {
        this.setState(
            { dollar_parity: event.target.value }
        )
    }
    changeHandler_usCpi = (event) => {
        this.setState(
            { us_cpi: event.target.value }
        )
    }
    changeHandler_localCpi = (event) => {
        this.setState(
            { local_cpi: event.target.value }
        )
    }
    changeHandler_kibor = (event) => {
        this.setState(
            { kibor: event.target.value }
        )
    }
    changeHandler_libor = (event) => {
        this.setState(
            { libor: event.target.value }
        )
    }
    changeHandler_sinsoureFee = (event) => {
        this.setState(
            { sinsoure_fee: event.target.value }
        )
    }

    sendAssumptions() {
        const assmumption = {
            date: this.props.date,
            dollar_parity: this.state.dollar_parity,
            us_cpi: this.state.us_cpi,
            local_cpi: this.state.local_cpi,
            kibor: this.state.kibor,
            libor: this.state.libor,
            sinsoure_fee: this.state.sinsoure_fee,
        }
        this.props.getAssumptionInput(assmumption)
        this.handleClose()
    }

    handleClose = () => {
        this.setState({ open: false });
    };
    handleSubmit = () => {
        this.sendAssumptions();
        console.log("submitted")
        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });
    }


    render() {

        return (
            <Dialog aria-labelledby="customized-dialog-title" open={this.state.open} onClose={this.handleClose} >
                <DialogTitle id="customized-dialog-title">
                    {this.props.period}
                </DialogTitle>
                <DialogContent>

                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit} >
                        <h5>Assumption Parameters</h5>
                        <TextValidator
                            label="Dollar Parity"
                            onChange={this.changeHandler_dollar}
                            name="dollar_parity"
                            value={this.state.dollar_parity}
                            validators={['required', 'isNumber', 'minNumber:0']}
                            errorMessages={['this field is required', 'Invalid Number', 'Value must be positive']}
                        />
                        <br />
                        <TextValidator
                            label="US CPI"
                            onChange={this.changeHandler_usCpi}
                            name="us_cpi"
                            value={this.state.us_cpi}
                            validators={['required', 'isNumber', 'minNumber:0']}
                            errorMessages={['this field is required', 'Invalid Number', 'Value must be positive']}
                        />
                        <br />
                        <TextValidator
                            label="Local CPI"
                            onChange={this.changeHandler_localCpi}
                            name="local_cpi"
                            value={this.state.local_cpi}
                            validators={['required', 'isNumber', 'minNumber:0']}
                            errorMessages={['this field is required', 'Invalid Number', 'Value must be positive']}
                        />
                        <br />
                        <TextValidator
                            label="Kibor"
                            onChange={this.changeHandler_kibor}
                            name="kibor"
                            value={this.state.kibor}
                            validators={['required', 'isNumber', 'minNumber:0']}
                            errorMessages={['this field is required', 'Invalid Number', 'Value must be positive']}
                        />
                        <br />
                        <TextValidator
                            label="Libor"
                            onChange={this.changeHandler_libor}
                            name="libor"
                            value={this.state.libor}
                            validators={['required', 'isNumber', 'minNumber:0']}
                            errorMessages={['this field is required', 'Invalid Number', 'Value must be positive']}
                        />
                        <br />
                        <br /><br />
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            disabled={this.state.submitted}
                        >
                            {
                                (this.state.submitted && 'Your form is submitted!')
                                || (!this.state.submitted && 'Submit')
                            }
                        </Button>
                    </ValidatorForm>

                </DialogContent>
                {/* <DialogActions>
                    <Button autoFocus color="primary" disabled={this.state.submitted}>{
                        (this.state.submitted && 'Your form is submitted!')
                        || (!this.state.submitted && 'Submit')
                    }
                    </Button>
                </DialogActions> */}
            </Dialog>


        )
    }
}

export default withStyles(styles)(AssumptionInput);