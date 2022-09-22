import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Modal,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { ClockItColors } from '../../constants/styles';

// Helpers
import { generateWeekForFlatList } from '../../utils/DateTimeHelpers/DateTimeHelpers';
import { findDay } from '../../utils/DateTimeHelpers/getDay';
import ReusableUIButton from '../buttons/ReusableUIButton';
import GradientView from '../UI/BackgroundContainer';
//Components
import DateItem from './DateItem';
import DatesLabel from './DatesLabel';
const DatePickerFlatList = ({ dateCreated, closeModal, setUserDateInputHandler }) => {
  const [dates, setDates] = useState(generateWeekForFlatList(findDay(), dateCreated));
  const oldestDateInList = useRef(new Date(dates[dates.length - 1].day));
  const { height } = useWindowDimensions();
  const [selected, setSelected] = useState(dates[0]);
  const indexOfDateRef = useRef(0);
  const dateItemHeight = (height / 10) | 0;
  const reference = useRef();
  const offsets = dates.map((date, i) => i * dateItemHeight);
  const [flatListContainerHeight, setFlatListContainerHeight] = useState({
    open: true,
    closed: false,
    openHeight: dateItemHeight * 3,
    closedHeight: dateItemHeight,
  });
  function setSelectedItemHandler(item) {
    setSelected(item);
  }

  function onConfirmDateHandler() {
    // closeModal(selected);
    reference.current.scrollToItem(selected);
  }
  async function refreshHandler() {
    setRefreshing(true);
  }
  // const renderItem = ({ item, index, separators }) => {
  //   const updateProps = (item) => {
  //     reference.current.scrollToItem({ item });
  //     setSelected(item);
  //   };

  //   return (
  //     <DateItem
  //       item={item}
  //       leadingItem={item}
  //       selected={selected}
  //       setSelectedItemHandler={updateProps}
  //       height={flatListContainerHeight.closedHeight}
  //     />
  //   );
  // };
  // console.log(Math.ceil(3 / 2));
  return (
    <SafeAreaView>
      <DatesLabel itemHeight={dateItemHeight} />

      <View
        style={[
          styles.flatListContainer,
          {
            height: dateItemHeight * 3,
          },
        ]}>
        <DateList data={dates} height={dateItemHeight} dateCreated={dateCreated} />
        {/* <FlatList
          ref={reference}
          data={dates}
          getItemLayout={(data, index) => {
            const layout = {
              length: flatListContainerHeight.closedHeight,
              offset: flatListContainerHeight.closedHeight * index,
              index,
            };

            return layout;
          }}
          pagingEnabled={true}
          onEndReachedThreshold={0.3}
          onMomentumScrollEnd={() => {
            console.log(dates[dates.length - 2] === selected);
          }}
          onEndReached={() => {
            if (oldestDateInList.current.valueOf() > new Date(dateCreated).valueOf()) {
              oldestDateInList.current.setDate(oldestDateInList.current.getDate() - 1);
              let newDates = generateWeekForFlatList(oldestDateInList.current, dateCreated, 6);

              setDates((prevState) => {
                const newState = prevState.concat(newDates);
                oldestDateInList.current = new Date(newState[newState.length - 1].day);
                return newState;
              });
            }
          }}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id + index.toString()}
          snapToOffsets={offsets}
          showsVerticalScrollIndicator={false}
          extraData={flatListContainerHeight}
          scrollEventThrottle={16}
          decelerationRate="fast"
        /> */}
      </View>
      <View style={styles.reusableUIButtonContainer}>
        {/* <ReusableUIButton
          onPress={() => {
            setFlatListContainerHeight((prevState) => {
              return prevState.closed
                ? { ...prevState, open: true, closed: false }
                : { ...prevState, open: false, closed: true };
            });

            onConfirmDateHandler();
          }}
          // onPress={onConfirmDateHandler}
          buttonStyle={[styles.buttonStyle, { height: dateItemHeight / 1.5 }]}
          buttonTextStyle={styles.buttonTextStyle}
          buttonTextContainerStyles={styles.buttonTextContainerStyle}>
          {flatListContainerHeight.open ? 'Ok' : 'Edit'}
        </ReusableUIButton> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pressableWrapper: { flex: 4, justifyContent: 'flex-start', marginVertical: 12 },
  flatListContainer: { backgroundColor: 'transparent', justifyContent: 'center' },
  reusableUIButtonContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  buttonStyle: {
    marginVertical: 22,
    flex: 0.45,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonTextContainerStyle: { justifyContent: 'space-between' },
  buttonTextStyle: { fontFamily: 'Manrope_500Medium', fontSize: 22 },
});
/**        s------------------------------------------- */
/**        s------------------------------------------- */
/**        s------------------------------------------- */
/**        s------------------------------------------- */
/**        s------------------------------------------- */
/**        s------------------------------------------- */
/**        s------------------------------------------- */
/**        s------------------------------------------- */
class DateList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      days: [
        { item: 'Sunday', key: 'asdfsdfsf' },
        { item: 'Monday', key: 'sdfsvsfsd' },
        { item: 'Tueday', key: 'ae3rxdf' },
        { item: 'Wednesday', key: 'asdfsdfe23' },
        { item: 'Thursday', key: 'asdfsdf2323' },
        { item: 'Friday', key: 'asv42' },
        { item: 'Saturday', key: 'azgfb' },
      ],
      months: [
        { item: 'January', key: 'jan' },
        { item: 'February', key: 'fffffff' },
        { item: 'March', key: 'marccc' },
        { item: 'April', key: 'aprsss' },
        { item: 'May', key: 'mayyyyy' },
        { item: 'June', key: 'jununnnn' },
        { item: 'July', key: 'julylyy' },
        { item: 'August', key: 'aususu' },
        { item: 'September', key: 'sessmm' },
        { item: 'October', key: 'occoo' },
        { item: 'November', key: 'noovoo' },
        { item: 'December', key: 'dddecc' },
      ],
      numDays: [
        { m: 'January', item: 31, key: '31Jan' },
        { m: 'February', item: 28, key: '28Feb' },
        { m: 'March', item: 31, key: '30Mar' },
        { m: 'April', item: 30, key: '30Apr' },
        { m: 'May', item: 31, key: '31May' },
        { m: 'June', item: 30, key: '30June' },
        { m: 'July', item: 31, key: '31July' },
        { m: 'August', item: 31, key: '31Aug' },
        { m: 'September', item: 30, key: '30Sep' },
        { m: 'October', item: 31, key: '31Oct' },
        { m: 'November', item: 30, key: '30Nov' },
        { m: 'December', item: 31, key: '31Dec' },
      ],
      oldest: new Date(props.data[props.data.length - 1].day),
    };
    this.viewabilityConfig = {
      waitForInteraction: false,
      viewAreaCoveragePercentThreshold: 95,
      minimumViewTime: 100,
    };
    this.dateCreated = props.dateCreated;
    this.oldestDateInList = new Date(props.data[props.data.length - 1].day);
    this.data = props.data;
    this.height = props.height;
    this.offsets = props.data.map((date, i) => i * props.height);
    this.dayOffsets = this.state.days.map((day, i) => i * (props.height + 3));
    this.monthOffsets = this.state.months.map((month, i) => (props.height + 3) * i);
    this.viewableItems = props.data.slice(0, 3);

    this.renderItem = this.renderItem.bind(this);
    this.renderDay = this.renderDay.bind(this);
    this.test = this.state.months.slice();

    this.test.push('null', 'null');
    this.testOffsets = this.test.map((month, i) => (props.height + 3) * i);
  }

  renderItem({ item, index, separators }) {
    return (
      <Pressable style={[{ height: this.height, backgroundColor: 'green', marginBottom: 3 }]}>
        <Text style={[Dstyles.text]}>{item.item}</Text>
      </Pressable>
    );
  }

  renderDay({ item, index, separators }) {
    return (
      <Pressable style={[Dstyles.pressableWrapper, { height: this.height }]}>
        <Text style={[Dstyles.text]}>{item.m}</Text>
      </Pressable>
    );
  }
  onViewableItemsChanged = ({ viewableItems, changed }) => {
    // this.setState({ viewableItems });
    console.log('Visible items are', viewableItems);
    // console.log('item in The Middle = ', viewableItems[1]);
    // console.log('Changed in this iteration', changed);
  };
  render() {
    return (
      <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'pink' }}>
        <View style={{ flex: 1, marginHorizontal: 8 }}>
          <FlatList
            decelerationRate="fast"
            scrollEventThrottle={16}
            horizontal={false}
            snapToEnd={false}
            snapToStart={false}
            onEndReachedThreshold={0.2}
            // extraData={this.viewableItems}
            data={this.state.months}
            viewabilityConfig={this.viewabilityConfig}
            onViewableItemsChanged={this.onViewableItemsChanged}
            keyExtractor={(item) => item.key}
            renderItem={this.renderItem}
            snapToOffsets={this.testOffsets}
          />
        </View>
        <View style={{ flex: 1, marginHorizontal: 8 }}>
          <FlatList
            style={{ height: this.height }}
            decelerationRate="fast"
            scrollEventThrottle={16}
            horizontal={false}
            snapToEnd={false}
            snapToStart={false}
            onEndReachedThreshold={0.2}
            // extraData={this.viewableItems}
            data={this.state.days}
            viewabilityConfig={this.viewabilityConfig}
            onViewableItemsChanged={this.onViewableItemsChanged}
            keyExtractor={(item) => item.key}
            renderItem={this.renderItem}
            snapToOffsets={this.dayOffsets}
          />
        </View>

        <View style={{ flex: 1, marginHorizontal: 8 }}>
          <FlatList
            decelerationRate="fast"
            scrollEventThrottle={16}
            horizontal={false}
            snapToEnd={false}
            snapToStart={false}
            onEndReachedThreshold={0.2}
            data={this.state.numDays}
            viewabilityConfig={this.viewabilityConfig}
            onViewableItemsChanged={this.onViewableItemsChanged}
            keyExtractor={(item) => item.id}
            renderItem={this.renderItem}
            snapToOffsets={this.offsets}
          />
        </View>
      </View>
    );
  }
}

const DItem = ({ item, height, selected, setSelectedItemHandler }) => {
  // let isSelected = item === selected;

  return (
    <Pressable
      style={({ pressed }) => [Dstyles.pressableWrapper, pressed && { opacity: 0.3 }]}
      onPress={(pressed) => {
        // setSelectedItemHandler(item);
      }}>
      <Text style={[Dstyles.text]}>{item.day}</Text>
    </Pressable>
  );
};

const Dstyles = StyleSheet.create({
  pressableWrapper: {
    justifyContent: 'center',

    marginVertical: 10,
  },
  dateContainer: {
    flex: 0.5,
  },
  text: {
    flex: 1,
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 22,
    textAlign: 'center',
  },
});

// const DatePickerFlatList = ({ dateCreated, setUserDateInputHandler }) => {
//   const [dates, setDates] = useState(generateWeekForFlatList(findDay(), dateCreated));
//   const oldestDateInList = useRef(new Date(dates[dates.length - 1].day));
//   const { height } = useWindowDimensions();
//   const [selected, setSelected] = useState(dates[0]);
//   const indexOfDateRef = useRef(0);
//   const dateItemHeight = (height / 10) | 0;
//   const reference = useRef();
//   const offsets = dates.map((date, i) => i * dateItemHeight);
//   const [flatListContainerHeight, setFlatListContainerHeight] = useState({
//     open: true,
//     closed: false,
//     openHeight: dateItemHeight * 3,
//     closedHeight: dateItemHeight,
//   });
//   function setSelectedItemHandler(item) {
//     setSelected(item);
//   }

//   function onConfirmDateHandler() {
//     // closeModal(selected);
//     // reference.current.scrollToItem(selected);
//   }
//   async function refreshHandler() {
//     setRefreshing(true);
//   }
//   const renderItem = ({ item, index, separators }) => {
//     const updateProps = (item) => {
//       reference.current.scrollToItem({ item });
//       setSelected(item);
//     };

//     return (
//       <DateItem
//         item={item}
//         leadingItem={item}
//         selected={selected}
//         setSelectedItemHandler={updateProps}
//         height={flatListContainerHeight.closedHeight}
//       />
//     );
//   };

//   return (
//     <SafeAreaView>
//       <DatesLabel itemHeight={dateItemHeight} />
//       {/* <Pressable style={styles.pressableWrapper}> */}
//       <View
//         style={[
//           styles.flatListContainer,
//           {
//             height: flatListContainerHeight.open
//               ? flatListContainerHeight.openHeight
//               : flatListContainerHeight.closedHeight,
//           },
//         ]}>
//         <FlatList
//           ref={reference}
//           data={dates}
//           getItemLayout={(data, index) => {
//             const layout = {
//               length: flatListContainerHeight.open
//                 ? flatListContainerHeight.openHeight
//                 : flatListContainerHeight.closedHeight,
//               offset: flatListContainerHeight.open
//                 ? flatListContainerHeight.openHeight * index
//                 : flatListContainerHeight.closedHeight * index,
//               index,
//             };

//             return layout;
//           }}
//           onEndReachedThreshold={0.3}
//           onEndReached={() => {
//             if (oldestDateInList.current.valueOf() > new Date(dateCreated).valueOf()) {
//               oldestDateInList.current.setDate(oldestDateInList.current.getDate() - 1);
//               let newDates = generateWeekForFlatList(oldestDateInList.current, dateCreated, 6);

//               setDates((prevState) => {
//                 const newState = prevState.concat(newDates);
//                 oldestDateInList.current = new Date(newState[newState.length - 1].day);
//                 return newState;
//               });
//             }
//           }}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => item.id + index.toString()}
//           snapToOffsets={offsets}
//           showsVerticalScrollIndicator={false}
//           extraData={flatListContainerHeight.open}
//           scrollEventThrottle={16}
//           decelerationRate="fast"
//         />
//       </View>
//       <View style={styles.reusableUIButtonContainer}>
//         <ReusableUIButton
//           onPress={() => {
//             setFlatListContainerHeight((prevState) => {
//               return prevState.closed
//                 ? { ...prevState, open: true, closed: false }
//                 : { ...prevState, open: false, closed: true };
//             });

//             onConfirmDateHandler();
//           }}
//           // onPress={onConfirmDateHandler}
//           buttonStyle={[styles.buttonStyle, { height: dateItemHeight / 1.5 }]}
//           buttonTextStyle={styles.buttonTextStyle}
//           buttonTextContainerStyles={styles.buttonTextContainerStyle}>
//           {flatListContainerHeight.open ? 'Ok' : 'Edit'}
//         </ReusableUIButton>
//       </View>
//       {/* </Pressable> */}
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   pressableWrapper: { flex: 4, justifyContent: 'flex-start', marginVertical: 12 },
//   flatListContainer: { backgroundColor: 'transparent', justifyContent: 'center' },
//   reusableUIButtonContainer: { flexDirection: 'row', justifyContent: 'space-around' },
//   buttonStyle: {
//     marginVertical: 22,
//     flex: 0.45,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 8,
//   },
//   buttonTextContainerStyle: { justifyContent: 'space-between' },
//   buttonTextStyle: { fontFamily: 'Manrope_500Medium', fontSize: 22 },
// });

export default DatePickerFlatList;
