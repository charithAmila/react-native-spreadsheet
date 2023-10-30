import React, { forwardRef, useCallback, useMemo, useRef } from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native';
import { u } from '../styles';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';

const containerHeight: number = 500;
const elementHeight = 50;
const initialLoaded = (containerHeight / elementHeight) * 100;

const OptimizedFlatList = () => {
  const flatListRef = useRef(null);
  // const [offsetY, setOffSetY] = useState<number>(0);

  const rows = useMemo(() => {
    return [...Array(initialLoaded)].map((_, index) => String(index + 1));
  }, []);

  const columns = [...Array(24)].map((_, index) => String(index + 1));

  // const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   const _offsetY = event.nativeEvent.contentOffset.y;
  //   setOffSetY(_offsetY);
  //   // console.log(_offsetY / elementHeight);
  // };

  // const onViewableItemsChanged = ({ viewableItems }: any) => {
  //   // Do stuff
  //   console.log('viewableItems', JSON.stringify(viewableItems));
  // };

  // const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

  const elements = useMemo(() => {
    return rows.map((i) => {
      return (
        <View key={String(i)} style={styles.tr}>
          {columns.map((j) => {
            return (
              <View key={`${i}-${j}`} style={styles.td}>
                <Text>{i + ' - ' + j}</Text>
              </View>
            );
          })}
        </View>
      );
    });
  }, [columns, rows]);

  const renderElement = useCallback(
    (index: number) => {
      return <>{elements[index] ?? <></>}</>;
    },
    [elements]
  );

  return (
    <ScrollView
      style={styles.content}
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
    >
      <FlatList
        //@ts-ignore
        // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        // onScroll={onScroll}
        data={[...Array(1000)].map((_, index) => String(index + 1))}
        ref={flatListRef}
        renderItem={({ index }) => renderElement(index)}
        bounces={false}
      />
    </ScrollView>
  );
};

export default forwardRef(OptimizedFlatList);

const styles = StyleSheet.create({
  content: {
    height: containerHeight,
  },
  tr: {
    ...u.flex,
    // ...u['mb-6'],
    ...u['h-50'],
    ...u['justify-center'],
    ...u['items-center'],
    backgroundColor: '#98d0fe',
  },
  td: {
    height: elementHeight,
    ...u['w-120'],
    ...u['border-1'],
    ...u['border-solid'],
    ...u['justify-center'],
    ...u['items-center'],
    borderColor: 'gray',
  },
});

// [
//   { index: 0, item: '1', key: '0', isViewable: true },
//   { index: 2, item: '3', key: '2', isViewable: true },
//   { index: 3, item: '4', key: '3', isViewable: true },
//   { index: 5, item: '6', key: '5', isViewable: true },
//   { index: 6, item: '7', key: '6', isViewable: true },
//   { index: 7, item: '8', key: '7', isViewable: true },
//   { index: 8, item: '9', key: '8', isViewable: true },
//   { index: 9, item: '10', key: '9', isViewable: true },
// ];
