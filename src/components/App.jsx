import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import { bindActionCreators } from 'redux';
import moment from 'moment';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:'',
            dueDate: ''
        };
    }

    addReminder () {
        console.log('this.state.dueDate', this.state.dueDate);
        if(this.state.text === '' || this.state.dueDate === '') {
            alert('Please add a title and a date for the reminder!');
        }
        else {
            this.props.addReminder(this.state.text, this.state.dueDate);
        }
        
    }
    deleteReminder (id) {
        this.props.deleteReminder(id);
    }
    clearReminders () {
        this.props.clearReminders();
    }

    renderReminders() {
        const { reminders } = this.props;
        return(
            <ul className="list-group col-sm-4">
            {
                reminders.map( reminder =>{
                    return(
                        <li key={reminder.id} className="list-group-item">
                            <div className="list-item">
                                <div><b>{reminder.text}</b></div>
                                <div><em>{ moment(new Date(reminder.dueDate)).fromNow() }</em></div>
                            </div>
                           <div 
                                className="list-item delete-button"
                                onClick={ () => this.deleteReminder(reminder.id)}>
                            &#x2715;
                            </div>
                        </li>
                    )
                })
            }
            </ul>
        );
    }
    showClearReminders() {
        const { reminders } = this.props;
        if(reminders.length > 0) {
            return(
                 <div>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={ () => this.clearReminders()}
                    >
                   Clear all Reminders
                    </button>
                </div>
            )
        }
    }

    render () {
        return (
            <div className="App">
                <div className="title">
                    Reminder Pro
                </div>
                <div className="form-inline reminder-form">
                    <div className="form-group">
                        <input 
                            className="form-control"
                            placeholder="I Have to..."
                            value={this.state.value}
                            onChange={event => this.setState({text: event.target.value})}
                        />
                        <input 
                            className="form-control"
                            type="datetime-local"
                            onChange={ (event) => this.setState({dueDate: event.target.value})}
                            />
                    </div>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={ () => this.addReminder()}
                    >
                    Add Reminder
                    </button>
                </div>
                <br />
                { this.renderReminders() }
                <br />
                { this.showClearReminders()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        reminders: state
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addReminder, deleteReminder, clearReminders}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
