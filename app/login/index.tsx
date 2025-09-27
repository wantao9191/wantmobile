import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "../../styles/commonStyles";
const Login = () => {
    return (
        <SafeAreaView style={commonStyles.safeArea} edges={[]}>
            <View>
                <Text>Login</Text>
            </View>
        </SafeAreaView>
    )
}

export default Login;
