import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import Ball from "./src/Ball";
import Deck from "./src/Deck";
const DATA = [
  {
    id: 1,
    text: "Card #1",
    source: require("./assets/pic1.jpg"),
  },
  {
    id: 2,
    text: "Card #2",
    source: require("./assets/pic2.jpg"),
  },
  {
    id: 3,
    text: "Card #3",
    source: require("./assets/pic3.jpg"),
  },
  {
    id: 4,
    text: "Card #4",
    source: require("./assets/pic4.jpg"),
  },
  {
    id: 5,
    text: "Card #5",
    source: require("./assets/pic5.jpg"),
  },
];

import { Card, Button } from "react-native-elements";
export default function App() {
  const renderCard = (item) => {
    console.log("item text ", item.text);
    return (
      <Card key={item.id}>
        <Card.Image style={{ padding: 0 }} source={item.source}></Card.Image>

        <Card.Title>{item.text}</Card.Title>
        <Text>I can customized the Card further.</Text>
        <Button
          title="View Now"
          icon={{ name: "code" }}
          backgroundColor="#03A9F4"
        ></Button>
      </Card>
    );
  };
  const renderNoMoreCards = () => {
    return (
      <Card>
        <Card.Title>No more cards</Card.Title>
        <Text>There is no more content here!</Text>
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      {/* <Ball /> */}
      <Deck
        onSwipeRight={() => console.log("something was swiped")}
        data={DATA}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
      ></Deck>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
