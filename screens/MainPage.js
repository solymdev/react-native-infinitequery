/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
} from 'react-native';

import { useQuery, useInfiniteQuery } from 'react-query';
import { List, Colors, ActivityIndicator } from 'react-native-paper';

import {
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import warsAPI from '../api';

const MainPage: () => Node = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery('repo', warsAPI.fetchCharacters, {
      getNextPageParam: lastPage => {
        if (lastPage.next !== null) {
          console.log('next:' + lastPage.next);
          return lastPage.next;
        }
        return lastPage;
      },
    });

  const extractorKey = (item, index) => {
    return index.toString();
  };

  const loadMore = () => {
    console.log('toload...');
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const renderSpinner = () => {
    return <ActivityIndicator />;
  };

  console.log('data;' + Object.keys(data));

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <FlatList
          data={data.pages.map(page => page.results).flat()}
          keyExtractor={extractorKey}
          onEndReachedThreshold={0.3}
          onEndReached={loadMore}
          renderItem={({ item }) => (
            <>
              <List.Item
                button
                title={item.name}
                onPress={() => navigation.navigate('Detail')}
                ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
                left={props => (
                  <List.Icon color={Colors.blue500} icon="account" />
                )}
                right={props => (
                  <List.Icon color={Colors.blue500} icon="arrow-right" />
                )}
              />
            </>
          )}
        />
      </View>
    </>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
