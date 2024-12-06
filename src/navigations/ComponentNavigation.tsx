import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  View,
  Image,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoard from '../screens/dashBoard/DashBoard';
import AddEmployee from '../screens/addEmployee/AddEmployee';

interface MainProps {
  logout: () => void;
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Define Stack Navigation for `AddEmployee`
const AddEmployeeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AddEmployee"
      component={AddEmployee}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const ComponentNavigation: React.FC<MainProps> = ({ logout }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const hideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: isKeyboardVisible
            ? { display: 'none' } // Hide tab bar when keyboard is visible
            : { backgroundColor: '#3B9678' },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          tabBarIcon: ({ focused }) => {
            let iconSource;
            if (route.name === 'Home') {
              iconSource = require('../assets/Home.png');
            } else if (route.name === 'Add') {
              iconSource = require('../assets/add.png');
            }
            return (
              <Image
                source={iconSource}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'black' : '#ffffff',
                }}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Home" children={() => <DashBoard logout={logout} />} />
        <Tab.Screen name="Add" component={AddEmployeeStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ComponentNavigation;


