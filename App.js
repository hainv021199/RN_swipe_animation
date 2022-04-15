import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import Ball from "./src/Ball";
import Deck from "./src/Deck";
const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri: "https://www.bestofbirthdays.com/images-with-name/create-happy-birthday-urishilla-card-online-free-4",
  },
  {
    id: 2,
    text: "Card #2",
    uri: "https://img.freepik.com/free-vector/abstract-blue-geometric-shapes-background_1035-17545.jpg?w=2000",
  },
  {
    id: 3,
    text: "Card #3",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg",
  },
  {
    id: 4,
    text: "Card #4",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg",
  },
  {
    id: 5,
    text: "Card #5",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg",
  },
  {
    id: 6,
    text: "Card #6",
    uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg",
  },
  {
    id: 7,
    text: "Card #7",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg",
  },
  {
    id: 8,
    text: "Card #8",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg",
  },
];

import { Card, Button } from "react-native-elements";
export default function App() {
  const renderCard = (item) => {
    return (
      <Card key={item.id} title={item.text} image={{ uri: item.uri }}>
        <Card.Image
          style={{ padding: 0 }}
          source={{
            uri: item.uri,
          }}
        ></Card.Image>
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

  return (
    <View style={styles.container}>
      {/* <Ball /> */}
      <Deck data={DATA} renderCard={renderCard}></Deck>
      <Image
        style={{ height: 30, width: 100 }}
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      ></Image>
      <Text>abc</Text>
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
