import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Communications from 'react-native-communications';

import { Card, CardSection, Button, Confirm } from './common';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {

    state = { showModal: false };

    componentWillMount() {
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value });
        });
    }

    onButtonPress() {
        const { name, phone, shift } = this.props;
        this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
    }

    onTextPress() {
        const { name, phone, shift } = this.props;
        Communications.text(phone, `${name} - Your upcoming shift is on ${shift}`);
    }

    onAccept() {
        const { uid } = this.props.employee;
        this.props.employeeDelete({ uid });
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    onFireEmployee() {
        const { showModal } = this.state;
        this.setState({ showModal: !showModal });
    }

    render() {
        const { showModal } = this.state;
        return (
            <Card>
                <EmployeeForm />

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onTextPress.bind(this)}>
                        Text Schedule
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onFireEmployee.bind(this)}>
                        Fire Employee
                    </Button>
                </CardSection>
                <Confirm
                    visible={showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this?
                </Confirm>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;
    return { name, phone, shift };
};

export default connect(mapStateToProps, { 
    employeeUpdate, 
    employeeSave,
    employeeDelete 
})(EmployeeEdit);
