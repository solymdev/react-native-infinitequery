/* eslint-disable import/no-named-as-default */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';

import { useInfiniteQuery } from 'react-query';
import { List, Colors, ActivityIndicator } from 'react-native-paper';

import warsAPI from '../api';

interface Navigation {
  navigation: any
}

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
  loadIndicatorBox: {
    flex: 1,
    justifyContent: 'center',
  },
});

function RightItem() {
  return <List.Icon color={Colors.blue500} icon="account" />;
}

function MainPage({ navigation }: Navigation) {
  const isDarkMode = useColorScheme() === 'dark';
  const {
    isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage,
  } = useInfiniteQuery('repo', warsAPI.fetchCharacters, {
    getNextPageParam: (lastPage) => {
      if (lastPage.next !== null) {
        return lastPage.next;
      }
      return lastPage;
    },
  });

  const extractorKey = (item, index) => index.toString();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadIndicatorBox}>
        <ActivityIndicator />
      </View>
    );
  }

  const renderSpinner = () => <ActivityIndicator />;

  const renderData = (item) => (
    <List.Item
      title={item.item.name}
      description={capitalizeFirstLetter(item.item.gender)}
      onPress={() => navigation.navigate('Detail', { item: item.item })}
      ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
      right={() => RightItem()}
    />
  );

  const backgroundColor = isDarkMode ? Colors.black : Colors.white;

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{ backgroundColor }}
      >
        <FlatList
          data={data.pages.map((page) => page.results).flat()}
          keyExtractor={extractorKey}
          onEndReachedThreshold={0.3}
          onEndReached={loadMore}
          renderItem={renderData}
        />
      </View>
    </>
  );
}

export default MainPage;
