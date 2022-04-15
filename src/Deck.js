import {
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  View,
  PanResponder,
} from "react-native";
import React from "react";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;
const Deck = ({ data, renderCard }) => {
  let [position, setPosition] = React.useState(new Animated.ValueXY());
  let [panResponder, setPanResponder] = React.useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({
          x: gesture.dx,
          y: gesture.dy,
        });
        console.log("gesture ", gesture);
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          console.log("swipe right");
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
          console.log("swipe left");
        } else {
          resetPosition();
        }
      },
    })
  );
  const resetPosition = () => {
    Animated.spring(position, {
      toValue: {
        x: 0,
        y: 0,
      },
      useNativeDriver: false, // Add This line
    }).start();
  };
  const forceSwipe = (direction, onSwipeRight, onSwipeLeft) => {
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
    direction === "right" ? onSwipeRight() : onSwipeLeft();
  };
  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return { ...position.getLayout(), transform: [{ rotate: rotate }] };
  };
  return (
    <View>
      {data.map((item, i) => {
        if (i === 0) {
          return (
            <Animated.View
              key={item.id}
              style={getCardStyle()}
              {...panResponder.panHandlers}
            >
              {renderCard(item)}
            </Animated.View>
          );
        }
        return renderCard(item);
      })}
    </View>
  );
};

export default Deck;

const styles = StyleSheet.create({});
