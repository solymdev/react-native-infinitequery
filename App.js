/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DetailPage from './screens/DetailPage';
import MainPage from './screens/MainPage';

const queryClient = new QueryClient();
const Stack = createStackNavigator();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Star Wars Wiki" component={MainPage} />
          <Stack.Screen name="Detail" component={DetailPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
