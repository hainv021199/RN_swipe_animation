import {
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  View,
  PanResponder,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import React from "react";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;
const Deck = ({
  data,
  renderNoMoreCards,
  renderCard,
  onSwipeRight,
  onSwipeLeft,
}) => {
  let [position, setPosition] = React.useState(new Animated.ValueXY());
  let [index, setIndex] = React.useState(0);
  React.useMemo(() => {
    console.log("data changed");
    setIndex(0);
  }, [data]);
  let [panResponder, setPanResponder] = React.useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({
          x: gesture.dx,
          y: gesture.dy,
        });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else {
          resetPosition();
        }
      },
    })
  );
  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  LayoutAnimation.spring();
  const resetPosition = () => {
    Animated.spring(position, {
      toValue: {
        x: 0,
        y: 0,
      },
      useNativeDriver: false, // Add This line
    }).start();
  };
  const forceSwipe = (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: {
        x,
        y: 0,
      },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false, // Add This line
    }).start(() => onSwipeComplete(direction));
  };
  const onSwipeComplete = (direction) => {
    console.log("index here", index);
    const item = data[index];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    setIndex((index) => index + 1);
  };
  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return { ...position.getLayout(), transform: [{ rotate: rotate }] };
  };
  if (index >= data.length) {
    return renderNoMoreCards();
  }
  const x = data
    .map((item, i) => {
      if (i < index) {
        return null;
      }
      if (i === index) {
        console.log("index now", i, index, item.text);
        return (
          <Animated.View
            key={item.id}
            style={[getCardStyle(), styles.cardStyle, { zIndex: 5 }]}
            {...panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        );
      }
      return (
        <Animated.View
          key={item.id}
          style={[styles.cardStyle, { top: 10 * (i - index) }]}
        >
          {renderCard(item)}
        </Animated.View>
      );
    })
    .reverse();

  return <View>{x}</View>;
};
Deck.defaultProps = {
  onSwipeRight: () => {},
  onSwipeLeft: () => {},
};
export default Deck;

const styles = StyleSheet.create({
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
    zIndex: 0,
    // left: 0,
    // right: 0,
  },
});
