import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from "../components/Main.js";
import AAAGames from '../components/AAAGames.js';
import UnCrackedGames from "../components/UnCrackedGames.js"
import { FontAwesome , FontAwesome5 , Entypo} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <NavigationContainer>
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Lates Games') {
            iconName = focused
              ? 'gamepad'
              : 'gamepad';
          } else if (route.name === 'AAA Games') {
           // iconName = focused ? 'headphones' : 'headphones';
            return <Entypo name={"game-controller"} size={size} color={color} />
          }else if (route.name == "LeaderBorad")
          {
              iconName = focused ? 'list-ul' : 'list';
          }
          else if (route.name =="Uncracked Games")
          {
            iconName = focused ? 'calendar' : 'calendar';
          }

          
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#da1106',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Lates Games" component={Main} />
      <Tab.Screen name="AAA Games" component={AAAGames} />
      {/* <Tab.Screen name="Uncracked Games" component={UnCrackedGames} /> */}
    </Tab.Navigator>
    </NavigationContainer>

  );
}


