import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/Screens/SplashScreen';
import LoginScreen from './src/Screens/LoginScreen';
import DashboardScreen from './src/Screens/DashboardScreen';
import CityDetails from './src/Screens/CityDetails';
import EventList from './src/Screens/EventList';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                />
                <Stack.Screen
                    name="Dashboard"
                    component={DashboardScreen}
                />
                <Stack.Screen
                    name="CityList"
                    component={CityDetails}
                />
                <Stack.Screen
                    name="EventList"
                    component={EventList}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;