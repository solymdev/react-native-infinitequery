/* eslint-disable react/function-component-definition */
import React from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';

import { List, Colors, Button } from 'react-native-paper';

interface Props {
  children: any;
  title: string;
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 9,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  itemContainer: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  list: {
    marginBottom: 24,
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

function Section({ children, title } : Props) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
}

interface PropsDetailPage{
  navigation: any;
  route: any;
}

function DetailPage({ navigation, route } : PropsDetailPage) {
  const isDarkMode = useColorScheme() === 'dark';
  const { item } = route.params;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function prettifyText(string) {
    if (string instanceof Array) {
      if (string.length === 0) {
        return '0';
      }
      return string.length;
    }
    const replace = string.replace('_', ' ');
    return string.charAt(0).toUpperCase() + replace.slice(1);
  }

  const extractorKey = (index) => index.toString();

  const renderData = (itemList) => (
    <List.Item
      title={prettifyText(itemList.item)}
      description={prettifyText(item[itemList.item])}
      style={styles.itemContainer}
    />
  );

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
      }}
    >
      <Button onPress={() => navigation.goBack()}>
        <Text>Go back</Text>
      </Button>
      <Section title={item.name}>
        <Text>{capitalizeFirstLetter(item.gender)}</Text>
      </Section>
      <FlatList
        data={Object.keys(item)}
        keyExtractor={extractorKey}
        onEndReachedThreshold={0.3}
        renderItem={renderData}
        style={styles.list}
      />
    </View>
  );
}

export default DetailPage;
