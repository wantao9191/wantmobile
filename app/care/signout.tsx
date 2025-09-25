import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const SignOut = () => {
  return (
    <View>
      <SafeAreaView style={styles.safeArea} edges={[]}>
        <ScrollView>
          <View>
            <Text>服务信息</Text>
          </View>
          <View>
            <View>
              <Text>服务对象</Text>
              <Text>张三</Text>
            </View>
            <View>
              <Text>服务时间</Text>
              <Text>09:00 - 11:00</Text>
            </View>
            <View>
              <Text>服务时长</Text>
              <Text>2小时</Text>
            </View>
            <View>
              <Text>服务地点</Text>
              <Text>北京市海淀区</Text>
            </View>
            <View>
              <Text>完成项目</Text>
              <Text>生活护理</Text>
              <Text>康复护理</Text>
              <Text>心理护理</Text>
              <Text>营养护理</Text>
              <Text>其他护理</Text>
            </View>
          </View>
          <View>
            <Text>拍照签退</Text>
            <Text>请拍照确认离开服务地点</Text>
          </View>
          <View>
            <Text>点击拍照签退</Text>
            <Button title="拍照签退" onPress={() => { }} />
          </View>
          <View>
            <Text>位置验证成功</Text>
            <Text>南京市江宁区东山街道</Text>
          </View>
          <View>
          <Text>特情上报</Text>
          <Text>如需上报特情，请选择特情类型，上传口述录音，点击提交特情上报</Text>
          </View>
          <View>
            <Text>点击特情上报</Text>
            <Button title="特情上报" onPress={() => { }} />
          </View>
        </ScrollView>
        <View>
          <Button title="完成签退" onPress={() => { }} />
        </View>
      </SafeAreaView>
    </View>
  )
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
export default SignOut;
