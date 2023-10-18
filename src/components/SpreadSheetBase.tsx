import React from 'react';
import { View } from 'react-native';
import { ScrollView, FlatList } from 'react-native';
import Sidebar, { type SideBarHandler } from './Sidebar';
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

import { u } from '../styles';

export function SpreadSheetBase() {
  const sidebarRef = React.useRef<SideBarHandler>(null);

  const handleScrollMain = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    // Scroll side bar with main FlatList
    sidebarRef?.current?.scrollToOffset(offsetY);
  };

  return (
    <View style={[u.flex, u['flex-row']]}>
      <Sidebar ref={sidebarRef} />
      <ScrollView
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
      >
        <FlatList
          onScroll={handleScrollMain}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // ListHeaderComponent={<Header />} // TODO <Header /> implement
          stickyHeaderIndices={[0]}
          bounces={false}
          data={[]}
          renderItem={() => <></>}
        />
      </ScrollView>
    </View>
  );
}
