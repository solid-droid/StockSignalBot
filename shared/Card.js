import React from 'react'
import { StyleSheet, View, Animated, Dimensions} from 'react-native'
const { height: wHeight } = Dimensions.get("window");
const height = wHeight - 64;


export default function Card({children, y , index}) {

    const CARD_HEIGHT = 120
    const position = Animated.subtract(index * CARD_HEIGHT, y);
    const isDisappearing = -CARD_HEIGHT;
    const isTop = 0;
    const isBottom = height - CARD_HEIGHT;
    const isAppearing = height;
    const translateY = Animated.add(
        Animated.add(
          y,
          y.interpolate({
            inputRange: [0, 0.00001 + index * CARD_HEIGHT],
            outputRange: [0, -index * CARD_HEIGHT],
            extrapolateRight: "clamp",
          })
        ),
        position.interpolate({
          inputRange: [isBottom, isAppearing],
          outputRange: [0, -CARD_HEIGHT / 4],
          extrapolate: "clamp",
        })
      );
      const scale = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
        extrapolate: "clamp",
      });
      const opacity = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
      });
    return (
        <Animated.View style={[styles.card,{ opacity, transform: [{ translateY }, { scale }] }]}>
            <View style={styles.cardComponent}>
                    {children}
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    card:{
        borderRadius:10,
        elevation:3,
        backgroundColor:'#fff',
        shadowOffset: {width:1, height:1},
        shadowColor:'#333',
        shadowOpacity:0.3,
        shadowRadius:2,
        marginHorizontal:4,
        marginVertical:6
    },
    cardComponent:{
        marginHorizontal:18,
        marginVertical: 10,
    }
})