import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  type ForwardRefRenderFunction,
} from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useSpreadSheetContext } from '../SpreadSheetContext';
import { u } from '../styles';

export type SideBarHandler = {
  scrollToOffset: (offsetY: number) => void;
};
type Props = {};

const Sidebar: ForwardRefRenderFunction<SideBarHandler, Props> = ({}, ref) => {
  const flatListRef = useRef(null);
  const { sheet } = useSpreadSheetContext();

  const rows = useMemo(() => {
    if (!sheet) return [];
    return sheet.rows;
  }, [sheet]);

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollToOffset(offsetY: number) {
          //@ts-ignore
          flatListRef?.current?.scrollToOffset({
            animated: false,
            offset: offsetY,
          });
        },
      };
    },
    []
  );

  return (
    <FlatList
      ref={flatListRef}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      scrollEnabled={false}
      renderItem={({ index, item }) => {
        return (
          <View key={index} style={[u.flex, u['flex-row'], u['flex-1']]}>
            <View
              style={[
                u['w-50'],
                u['border-1'],
                u['border-solid'],
                u.flex,
                u['h-36'],
                u['justify-center'],
                styles.leftFixTd,
              ]}
            >
              <Text style={u['text-center']}>{item ? item : ''}</Text>
            </View>
          </View>
        );
      }}
      data={rows}
    />
  );
};

export default forwardRef(Sidebar);

const borderColor = '#e3e3e3';
const styles = StyleSheet.create({
  leftFixTd: {
    borderColor,
    backgroundColor: '#d8d5d5',
  },
});
