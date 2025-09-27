import { Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NurseContainer } from "../../components/tabs-index";

const Index = () => {
  return (
    <View className="flex-1" style={{ backgroundColor: '#F8FAFC' }}>
      <SafeAreaView
        className="flex-1"
        style={{ backgroundColor: '#F8FAFC' }}
        edges={['left', 'right']}
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'ios' ? 30 : 20,
            paddingTop: 0,
            flexGrow: 1
          }}
          style={{ backgroundColor: '#F8FAFC' }}
          bounces={true}
          alwaysBounceVertical={false}
          automaticallyAdjustContentInsets={false}
          contentInsetAdjustmentBehavior="never"
        >
          {/* <InsuredContainer></InsuredContainer> */}
          <NurseContainer></NurseContainer>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
export default Index