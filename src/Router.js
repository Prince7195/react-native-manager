import React from 'react';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

const RouterComponent = () => {
    const { titleStyle } = styles;
    return (
        <Router titleStyle={titleStyle}>
            <Stack key='root' hideNavBar >
                <Scene key='auth'>
                    <Scene key='login' component={LoginForm} title='Login' initial />
                </Scene>
                <Scene key='main'>
                    <Scene 
                        onRight={() => Actions.employeeCreate()}
                        rightTitle='Add'
                        key='employeeList' 
                        component={EmployeeList} 
                        title='Employees' 
                    />
                    <Scene 
                        key='employeeCreate' 
                        component={EmployeeCreate} 
                        title='Create Employee' 
                    />
                    <Scene
                        key='employeeEdit'
                        component={EmployeeEdit}
                        title='Edit Employee'
                    />
                </Scene>             
            </Stack>
        </Router>
    );
};

const styles = {
    titleStyle: {
        alignSelf: 'center'
    }
};

export default RouterComponent;
