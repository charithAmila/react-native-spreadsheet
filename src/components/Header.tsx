import React, { useMemo } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useSpreadSheetContext } from '../SpreadSheetContext';
import { defaultHeaderColumns } from '../defaultSheetData';

import { u } from '../styles';

export const Header = () => {
  const { sheet } = useSpreadSheetContext();

  const columns = useMemo(() => {
    return sheet?.columns ?? defaultHeaderColumns;
  }, [sheet]);

  return (
    <View style={[u.flex, u['flex-row']]}>
      {[...columns].map((col, i) => {
        return (
          <Pressable
            key={`header-${i}`}
            onPress={() => {}}
            style={[
              styles.th,
              u.flex,
              u['justify-center'],
              u['border-1'],
              u['h-36'],
              u['items-center'],
            ]}
          >
            <Text style={styles.thText}>{col}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const borderColor = '#e3e3e3';

const styles = StyleSheet.create({
  th: {
    width: 120,
    borderColor,
    backgroundColor: '#d8d5d5',
  },

  thText: {
    textAlign: 'center',
  },
});
