import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, commonStyles, textVariants } from "../styles/commonStyles";

const SignOut = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={[]}>
        <ScrollView style={commonStyles.scrollView} contentContainerStyle={commonStyles.scrollContent}>
          {/* 服务信息卡片 */}
          <View style={commonStyles.card}>
            <View style={commonStyles.cardHeader}>
              <View style={[commonStyles.iconContainer, { backgroundColor: colors.primaryLight }]}>
                <Ionicons name="information-circle" size={24} color={colors.primary} />
              </View>
              <Text style={commonStyles.cardTitle}>服务信息</Text>
            </View>
            
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>服务对象</Text>
                <Text style={styles.infoValue}>张三</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>服务时间</Text>
                <Text style={styles.infoValue}>09:00 - 11:00</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>服务时长</Text>
                <Text style={styles.infoValue}>2小时</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>服务地点</Text>
                <Text style={styles.infoValue}>北京市海淀区</Text>
              </View>
            </View>

            <View style={styles.completedSection}>
              <Text style={styles.completedTitle}>完成项目</Text>
              <View style={styles.tagsContainer}>
                {['生活护理', '康复护理', '心理护理', '营养护理', '其他护理'].map((item, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* 拍照签退卡片 */}
          <View style={commonStyles.card}>
            <View style={commonStyles.cardHeader}>
              <View style={[commonStyles.iconContainer, { backgroundColor: colors.warningLight }]}>
                <Ionicons name="camera" size={24} color={colors.warning} />
              </View>
              <View style={commonStyles.cardTitleContainer}>
                <Text style={commonStyles.cardTitle}>拍照签退</Text>
                <Text style={commonStyles.cardDescription}>请拍照确认离开服务地点</Text>
              </View>
            </View>
            
            <TouchableOpacity style={commonStyles.secondaryButton} onPress={() => {}}>
              <Ionicons name="camera-outline" size={20} color={colors.textSecondary} />
              <Text style={commonStyles.secondaryButtonText}>拍照签退</Text>
            </TouchableOpacity>
          </View>

          {/* 位置验证卡片 */}
          <View style={commonStyles.card}>
            <View style={styles.statusContainer}>
              <View style={[commonStyles.iconContainer, { backgroundColor: colors.successLight }]}>
                <Ionicons name="checkmark-circle" size={24} color={colors.success} />
              </View>
              <View style={styles.statusInfo}>
                <Text style={styles.statusTitle}>位置验证成功</Text>
                <Text style={styles.statusDescription}>南京市江宁区东山街道</Text>
              </View>
            </View>
          </View>

          {/* 特情上报卡片 */}
          <View style={commonStyles.card}>
            <View style={commonStyles.cardHeader}>
              <View style={[commonStyles.iconContainer, { backgroundColor: colors.dangerLight }]}>
                <Ionicons name="alert" size={24} color={colors.danger} />
              </View>
              <View style={commonStyles.cardTitleContainer}>
                <Text style={commonStyles.cardTitle}>特情上报</Text>
                <Text style={commonStyles.cardDescription}>如需上报特情，请选择特情类型，上传口述录音，点击提交特情上报</Text>
              </View>
            </View>
            
            <TouchableOpacity style={commonStyles.secondaryButton} onPress={() => {}}>
              <Ionicons name="alert-circle-outline" size={20} color={colors.textSecondary} />
              <Text style={commonStyles.secondaryButtonText}>特情上报</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        
        {/* 底部按钮 */}
        <View style={commonStyles.bottomButtonContainer}>
          <TouchableOpacity style={commonStyles.primaryButton} onPress={() => {}}>
            <Text style={commonStyles.primaryButtonText}>完成签退</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  infoContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  infoLabel: {
    ...textVariants.description,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  completedSection: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  completedTitle: {
    ...textVariants.title18,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: colors.successLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  tagText: {
    ...textVariants.statusSuccess,
    fontSize: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    ...textVariants.statusSuccess,
    fontSize: 16,
    marginBottom: 4,
  },
  statusDescription: {
    ...textVariants.description,
  },
});
export default SignOut;
