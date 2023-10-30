import * as React from 'react';

import { SafeAreaView, StyleSheet } from 'react-native';
import { SpreadSheet } from 'react-native-spreadsheet';

type Item = { value?: number | string | Date; borderColor?: string } | '';
type NestedArray = Item[];
const data: NestedArray[] = [
  [],
  [
    { value: 234, borderColor: 'green' },
    { value: 111, borderColor: 'green' },
  ],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  ['', { value: 'First Name' }, { value: 'Last Name' }, { value: 'DOB' }],
  ['', { value: 'Charith' }, { value: 'Dissanayaka' }, { value: '1988/11/26' }],
];

console.log('data', data);

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SpreadSheet
        sheets={[
          {
            id: '1',
            rows: [...Array(50)].map((_, index) => String(index + 1)),
            // data: [...data],
          },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
