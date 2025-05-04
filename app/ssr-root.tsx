/**
 * This is a special version of the root component that's
 * extremely simplified to avoid React child errors during SSR
 */
import React from "react";
import { View } from "react-native";
import { Slot } from "expo-router";

export default function SSRRoot() {
  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <Slot />
    </View>
  );
}
