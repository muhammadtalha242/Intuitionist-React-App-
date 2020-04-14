import React from 'react'
import AssumptionInput from './Dialog'
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TodayIcon from '@material-ui/icons/Today';
import { withStyles } from '@material-ui/core/styles';
const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);
class MonthButton extends React.Component {
    constructor() {
        super()
        this.showAssumptions = this.showAssumptions.bind(this)
        this.state = {
            displayAssumptions: false,
        }
    }



    showAssumptions = () => {
        this.setState({
            displayAssumptions: !this.state.displayAssumptions
        })
    }
    render() {
        const assumptionInput = ((this.state.displayAssumptions) ? <AssumptionInput period={this.props.month} date={this.props.date} getAssumptionInput={this.props.getAssumptionInput} /> : null)
        if (this.state.displayAssumptions) {
            return (<div>{assumptionInput}</div>)
        }
        else {
            return (
                <div>
                    <StyledMenuItem onClick={this.showAssumptions}>
                        <ListItemIcon>
                            <TodayIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={this.props.month} />
                    </StyledMenuItem>
                    {assumptionInput}
                </div>
                /* 
                {assumptionInput} */

                // <div>
                //     <button onClick={this.showAssumptions}> {this.props.month} </button>
                //     {assumptionInput}
                // </div>
            )
        }
    }
}

export default MonthButton;