/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
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

const MainPage: () => Node = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery('repo', warsAPI.fetchCharacters, {
      getNextPageParam: lastPage => {
        if (lastPage.next !== null) {
          return lastPage.next;
        }
        return lastPage;
      },
    });

  const extractorKey = (item, index) => {
    return index.toString();
  };

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

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const renderSpinner = () => {
    return <ActivityIndicator />;
  };

  const renderData = item => {
    return (
      <List.Item
        button
        title={item.item.name}
        onPress={() => navigation.navigate('Detail', { item: item.item })}
        ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
        left={props => <List.Icon color={Colors.blue500} icon="account" />}
        right={props => <List.Icon color={Colors.blue500} icon="arrow-right" />}
      />
    );
  };

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
          renderItem={renderData}
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
  loadIndicatorBox: {
    flex: 1,
    justifyContent: 'center',
  },
});
