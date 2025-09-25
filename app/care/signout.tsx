import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const SignOut = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <View>
        <Text>SignOut</Text>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
export default SignOut;
