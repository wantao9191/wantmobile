import React from "react";
import { Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InsuredContainer, NurseContainer } from "../../components/tabs-index";
import { useAuth } from "../../contexts/AuthContext";
const Index: React.FC = () => {
  const { state } = useAuth();
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
          {state.role === 'insured' && <InsuredContainer></InsuredContainer>}
          {state.role === 'nurse' && <NurseContainer userData={state.user} userPlan={state.userPlan}></NurseContainer>}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
export default Index