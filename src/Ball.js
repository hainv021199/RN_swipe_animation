import { StyleSheet, Text, View, Animated } from "react-native";
import React from "react";

const Ball = () => {
  const position = new Animated.ValueXY(0, 0);
  console.log("position", position);
  Animated.spring(position, {
    toValue: { x: 200, y: 500 },
    useNativeDriver: false,
  }).start();
  return (
    <Animated.View style={position.getLayout()}>
      <View style={styles.ball}></View>
    </Animated.View>
  );
};

export default Ball;

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    borderColor: "black",
    borderWidth: 30,
  },
});
