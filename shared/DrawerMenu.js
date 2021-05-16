import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

const menuData = [
  { icon: "home", name: "Dashboard", screenName: "Home", key: '1' },
  { icon: "cogs", name: "Settings", screenName: "Settings", key: '2' },
  { icon: "users", name: "About", screenName: "About", key: '3' },
];

class DrawerMenu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={menuData}
          renderItem={({ item }) => (
            <DrawerItem
              navigation={this.props.navigation}
              screenName={item.screenName}
              icon={item.icon}
              name={item.name}
              key={item.key}
            />
          )}
        />
      </View>
    );
  }
}

const DrawerItem = ({ navigation, icon, name, screenName }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={() =>
      navigation.navigate(`${screenName}`, { isStatusBarHidden: false })
    }
  >
    <Icon name={icon} size={25} color="#333" style={{ margin: 15 }} />
    <Text style={styles.menuItemText}>{name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.43)",
    paddingTop: 70
  },
  menuItem: {
    flexDirection: "row"
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: "300",
    margin: 15
  },
  menuItem: {
    flexDirection: "row"
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: "300",
    margin: 15
  }
});

export default DrawerMenu;