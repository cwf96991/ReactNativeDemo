import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  FlatList,
  Platform,
  Alert,
  Dimensions, Keyboard, TouchableWithoutFeedback
} from 'react-native';

import { SearchBar } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import AppModel from '../appModel';
import {  GrossFlatList, AppFlatList } from "../component";


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const MainPage = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const [grossingList, setGrossingList] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const [filteredList, setFilteredList] = useState([]);
  const [isLoadingGross, setIsLoadingGross] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        LoadData();
        LoadGrossingData();
      } else {
        Alert.alert(
          'Maybe Please check your internet connection or try again later',
        );
      }
    });
  }, []);
  onRefresh = () => {
    setIsRefresh(true);
    setIsLoadingData(true);
    setList([]);
    LoadData();
  };
  
  LoadData = () => {
    var resultList = list ?? [];
    axios
      .get('https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json')
      .then(function (response) {
        var data = response['data']['feed']['entry'];

        data.forEach((element) => {
          var id = element['id']['attributes']['im:id'];
          var appDetail = 'https://itunes.apple.com/hk/lookup?id=' + id;
          var category = element['category']['attributes']['label'];
          var imageUrl = element['im:image'][1]['label'];
          var appName = element['im:name']['label'];
          var rating = '';
          var ratingCount = '';
          var detailUrl = '';
          axios.get(appDetail).then(function (result) {
            rating =
              result.data['results'][0]['averageUserRatingForCurrentVersion'];

            detailUrl = result.data['results'][0]['trackViewUrl'];
            ratingCount =
              result.data['results'][0]['userRatingCountForCurrentVersion'];
            var app = new AppModel(
              appName,
              category,
              imageUrl,
              rating,
              ratingCount,
              detailUrl,
            );

            resultList = [...resultList, app];
            setList(resultList);
          });
        });

        setIsRefresh(false);

        setIsLoadingData(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  LoadGrossingData = () => {
    var resultList = grossingList ?? [];
    axios
      .get(
        'https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json',
      )
      .then(function (response) {
        var data = response['data']['feed']['entry'];

        data.forEach((element) => {
          var id = element['id']['attributes']['im:id'];
          var appDetail = 'https://itunes.apple.com/hk/lookup?id=' + id;
          var category = element['category']['attributes']['label'];
          var imageUrl = element['im:image'][1]['label'];
          var appName = element['im:name']['label'];

          var rating = '';

          var ratingCount = '';
          var detailUrl = '';
          axios.get(appDetail).then(function (result) {
            rating =
              result.data['results'][0]['averageUserRatingForCurrentVersion'];
            detailUrl = result.data['results'][0]['trackViewUrl'];

            ratingCount =
              result.data['results'][0]['userRatingCountForCurrentVersion'];
            var app = new AppModel(
              appName,
              category,
              imageUrl,
              rating,
              ratingCount,
              detailUrl,
            );

            resultList = [...resultList, app];
            setGrossingList(resultList);
          });
        });

        setIsLoadingGross(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
    >
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar barStyle="default" />
        <SafeAreaView >
          <View style={{height:screenHeight/6}}>
          <SearchBar
            platform={Platform.OS}
            placeholder="Type Here..."
            onChangeText={(value) => {
              const tempList = list.filter((item) => {
                const info = `${item.name.toLowerCase()}${item.category.toLowerCase()}`;
                return info.includes(value.toLowerCase());
              });
              setSearch(value);
              setFilteredList(tempList);
            }}
            onClear={(value) => {
              setFilteredList([]);
            }}
            value={search}
          />
          <Text style={styles.headerText}>推介</Text>
          </View>
          <View>
            <View style={styles.suggestContainer}>
              <GrossFlatList
                data={grossingList ?? []}
                isLoading={isLoadingGross}
                navigation={navigation}
              />
            </View>
            <View style={styles.freeAppContainer}>
              <AppFlatList
                data={
                  filteredList.length == 0
                    ? search != ''
                      ? filteredList
                      : list
                    : filteredList
                }
                isLoading={isLoadingData}
                onRefresh={() => {
                  setIsLoadingData(true);

                  this.onRefresh();
                }}
                refreshing={isRefresh}
                navigation={navigation}
              // onEndReached={this.LoadMoreData}
              />

            </View>
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  appContain: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
  },

  suggestContainer: {
    height: screenHeight *1.5/6,
    width: screenWidth,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 32,
    padding: 16,
    fontWeight: 'bold',
  },

  freeAppContainer: {
    height: (screenHeight * 3.5) / 6,
    width: screenWidth,
    backgroundColor: 'white',
  },
});

export default MainPage;


