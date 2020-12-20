import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import React from "react"
import { FlatList, StyleSheet, View,TouchableOpacity } from 'react-native'
import  AppCard  from './appCard'

const AppFlatList = React.forwardRef((props, ref) => {
    const { data, isLoading, onRefresh, refreshing, onEndReached } = props
    renderSeparator = () => (
        <View
            style={{
                backgroundColor: 'black',
                height: 0.5,
                marginLeft: 8,
            }}
        />

    );
    renderAppItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => detailPage(item.detailUrl)}>
            <AppCard
                item={item}
                index={index}
            />
            </TouchableOpacity>
        );
    };
    appPlaceholder = () => {
        var placeholder = [];
        for (let index = 0; index < 5; index++) {
            placeholder.push({
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 16,
                marginTop: 8,
                children: [
                    { key: 'index', ...styles.appIndexPlaceholder },
                    { key: 'image', ...styles.circleImage },
                    {
                        key: 'info',
                        flexDirection: 'column',
                        children: [
                            { key: 'name', ...styles.loadingName },
                            { key: 'category', ...styles.loadingCategory },
                            {
                                key: 'ratingRow',
                                flexDirection: 'row',
                                alignItems: 'center',
                                children: [
                                    { key: 'rating', ...styles.loadingRating },
                                    { key: 'ratingCount', ...styles.loadingRatingCount },
                                ],
                            },
                        ],
                    },
                ],
            });
        }
        return placeholder;
    }
    return (
        <SkeletonContent
            containerStyle={{ flexDirection: 'column' }}
            isLoading={isLoading}
            layout={appPlaceholder()}>
            <FlatList
                data={
                    data
                }
                ItemSeparatorComponent={renderSeparator}
                renderItem={(item, index) => renderAppItem(item, index)}
                onRefresh={onRefresh}
                refreshing={refreshing}
                keyExtractor={(item, index) => item.name + index.toString()}
                onEndReachedThreshold={0.1}
            // onEndReached={onEndReached}
            />
        </SkeletonContent>
    )
})

const styles = StyleSheet.create({
    appIndexPlaceholder: {
        height: 25,
        width: 15,
        marginRight: 8,
    },
    circleImage: {
        width: 62,
        height: 62,
        borderRadius: 62 / 2,
    },
    loadingName: {
        height: 15,
        width: 60,
        marginTop: 8,
        marginBottom: 8,
    },
    loadingCategory: {
        height: 10,
        width: 30,
    },
    loadingRating: {
        height: 15,
        width: 60,
        marginTop: 8,
        marginBottom: 8,
    },
    loadingRatingCount: {
        height: 15,
        width: 30,
        marginTop: 8,
        marginLeft: 8,
        marginBottom: 8,
    },
});
export default AppFlatList