import React, { useCallback, useMemo } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Sidebar, { type SideBarHandler } from './Sidebar';
import { useSpreadSheetContext } from '../SpreadSheetContext';
import { Header } from './Header';

import { u } from '../styles';
import { Text } from 'react-native';
import { defaultHeaderColumns } from '../defaultSheetData';

export function SpreadSheetBase() {
  const sidebarRef = React.useRef<SideBarHandler>(null);
  const { sheet } = useSpreadSheetContext();

  const rows = useMemo(() => {
    return sheet?.rows ?? [...Array(100)].map((_, i) => String(i + 1));
  }, [sheet]);

  const columns = useMemo(() => {
    return sheet?.columns ?? defaultHeaderColumns;
  }, [sheet]);

  const data = useMemo(() => {
    return sheet?.data ?? [];
  }, [sheet]);

  const handleScrollMain = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    // Scroll side bar with main FlatList
    sidebarRef?.current?.scrollToOffset(offsetY);
  };

  const renderItem = useCallback(
    ({ index }: { index: number; item: any }) => {
      //@ts-ignore
      var cellValue: any = null;

      return (
        <View style={[u.flex, u['flex-row'], u['flex-1']]}>
          {columns.map((_, key) => {
            const r = data[index];
            if (r) {
              if (r[key]) {
                cellValue = r[key];
              } else {
                cellValue = null;
              }
            }
            return (
              <Pressable
                style={[
                  u['w-120'],
                  u['border-1'],
                  u['border-solid'],
                  u['h-36'],
                  u.flex,
                  u['items-center'],
                  u['justify-center'],
                  styles.td,
                ]}
                key={`${index}-${key}`}
              >
                <Text>
                  {cellValue && cellValue.value ? cellValue.value : ''}
                </Text>
              </Pressable>
            );
          })}
        </View>
      );
    },
    [columns, data]
  );

  return (
    <View style={[u.flex, u['flex-row']]}>
      <View style={[u['w-50']]}>
        <Sidebar ref={sidebarRef} />
      </View>
      <ScrollView
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
      >
        <FlatList
          onScroll={handleScrollMain}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Header />}
          stickyHeaderIndices={[0]}
          bounces={false}
          data={rows}
          keyExtractor={(index) => `row-${index}`}
          renderItem={({ index, item }) => renderItem({ index, item })}
        />
      </ScrollView>
    </View>
  );
}

const borderColor = '#e3e3e3';

const styles = StyleSheet.create({
  td: {
    backgroundColor: '#d8d5d5',
    borderColor,
  },
});
