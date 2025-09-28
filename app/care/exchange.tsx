import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ServicePlanCard } from '../../components/tabs-index';
import { TimeFilter } from '../../components/ui';

import {
    colors,
    combineStyles,
    commonStyles,
    iconVariants
} from '../../styles/commonStyles';
type Type = {
    value: number;
    label: string;
    reasons: string[];
    description: string;
}
const Exchange = () => {
    const [type, setType] = useState(1);
    const [selectType, setSelectType] = useState<Type | null>(null);
    const [selectedReason, setSelectedReason] = useState<string>('');

    // 获取不同类型的颜色主题
    const getDescriptionCardColor = (typeId: number) => {
        switch (typeId) {
            case 1: return { // 推迟 - 橙色主题
                backgroundColor: colors.warningLight,
                borderColor: colors.warning,
                textColor: '#EA580C' // 深橙色
            };
            case 2: return { // 取消 - 红色主题
                backgroundColor: colors.dangerLight,
                borderColor: colors.danger,
                textColor: '#DC2626' // 深红色
            };
            case 3: return { // 请假 - 紫色主题
                backgroundColor: '#EDE9FE',
                borderColor: '#7C3AED',
                textColor: '#6B21A8' // 深紫色
            };
            default: return {
                backgroundColor: colors.primaryLight,
                borderColor: colors.primary,
                textColor: colors.primaryDark
            };
        }
    };

    const [typeList] = useState<Type[]>([
        { value: 1, label: '推迟', description: '推迟服务需要重新安排时间，建议提前与参保人确认新的服务时间', reasons: ['交通原因', '身体原因', '参保人要求', '天气原因', '其他原因'] },
        { value: 2, label: '取消', description: '取消服务将无法恢复，请确认后再提交说明取消服务的具体情况', reasons: ['参保人住院', '参保人外出', '服务设备故障', '恶劣天气'] },
        { value: 3, label: '请假', description: '请假申请提交后将由管理员审核，审核通过后会安排其他护理员接替', reasons: ['个人事假', '病假', '突发事件'] },
    ])
    useEffect(() => {
        setSelectType(typeList.find(item => item.value === type) || null);
        setSelectedReason(''); // 重置选择的原因
    }, [type]);
    return (
        <View style={commonStyles.container}>
            <SafeAreaView style={commonStyles.safeArea} edges={[]}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <ServicePlanCard
                        title="居家护理服务"
                        time="09:00-11:00"
                        insuredName="张奶奶"
                        address="朝阳区建国路88号"
                        status="待服务"
                        items={["生活护理", "健康检测", "康复训练"]}
                    />
                    {/* 变更类型选择 */}
                    <View style={commonStyles.card} className='mt-4'>
                        <View style={commonStyles.cardHeader}>
                            <View style={combineStyles(commonStyles.iconContainer, iconVariants.warning)}>
                                <Ionicons name="swap-horizontal" size={24} color={colors.warning} />
                            </View>
                            <View style={commonStyles.cardTitleContainer}>
                                <Text style={commonStyles.cardTitle}>变更类型</Text>
                                <Text style={commonStyles.cardDescription}>请选择需要变更的类型</Text>
                            </View>
                        </View>
                        <View style={styles.typeContainer}>
                            <TimeFilter
                                options={typeList}
                                selectedValue={type}
                                onSelect={(value) => setType(value as number)}
                                containerStyle={styles.timeFilterContainer}
                            />
                        </View>
                    </View>
                    {/* 类型说明 */}
                    {selectType && (
                        <View style={[
                            styles.descriptionCard,
                            {
                                backgroundColor: getDescriptionCardColor(selectType.value).backgroundColor,
                                borderColor: getDescriptionCardColor(selectType.value).borderColor,
                            }
                        ]}>
                            <Text style={[
                                styles.descriptionText,
                                { color: getDescriptionCardColor(selectType.value).textColor }
                            ]}>{selectType.description}</Text>
                        </View>
                    )}
                    {/* 原因选择 */}
                    {selectType && (
                        <View style={commonStyles.card}>
                            <View style={commonStyles.cardHeader}>
                                <View style={combineStyles(commonStyles.iconContainer, iconVariants.primary)}>
                                    <Ionicons name="list" size={24} color={colors.primary} />
                                </View>
                                <View style={commonStyles.cardTitleContainer}>
                                    <Text style={commonStyles.cardTitle}>选择原因</Text>
                                    <Text style={commonStyles.cardDescription}>{selectType.label}原因</Text>
                                </View>
                            </View>
                            <View style={styles.reasonContainer}>
                                {selectType.reasons.map(item => (
                                    <TouchableOpacity
                                        key={item}
                                        style={[
                                            styles.reasonButton,
                                            selectedReason === item && styles.reasonButtonSelected
                                        ]}
                                        onPress={() => setSelectedReason(item)}
                                    >
                                        <Text style={[
                                            styles.reasonButtonText,
                                            selectedReason === item && styles.reasonButtonTextSelected
                                        ]}>{item}</Text>
                                        {selectedReason === item ? (
                                            <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                                        ) : (
                                            <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    )}
                    {/* 时间选择（推迟服务时显示） */}
                    {selectType?.value === 1 && (
                        <View style={commonStyles.card}>
                            <View style={commonStyles.cardHeader}>
                                <View style={combineStyles(commonStyles.iconContainer, iconVariants.success)}>
                                    <Ionicons name="time" size={24} color={colors.success} />
                                </View>
                                <View style={commonStyles.cardTitleContainer}>
                                    <Text style={commonStyles.cardTitle}>选择新的时间</Text>
                                    <Text style={commonStyles.cardDescription}>请选择推迟后的服务时间</Text>
                                </View>
                            </View>
                            <View style={styles.timeContainer}>
                                <TouchableOpacity style={styles.timeSelector}>
                                    <View style={styles.timeSelectorHeader}>
                                        <Ionicons name="calendar" size={20} color={colors.primary} />
                                        <Text style={styles.timeSelectorLabel}>日期</Text>
                                    </View>
                                    <Text style={styles.timeSelectorValue}>2025-09-27</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.timeSelector}>
                                    <View style={styles.timeSelectorHeader}>
                                        <Ionicons name="time" size={20} color={colors.primary} />
                                        <Text style={styles.timeSelectorLabel}>时间段</Text>
                                    </View>
                                    <Text style={styles.timeSelectorValue}>10:00-12:00</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {/* 补充说明 */}
                    <View style={commonStyles.card}>
                        <View style={commonStyles.cardHeader}>
                            <View style={combineStyles(commonStyles.iconContainer, iconVariants.purple)}>
                                <Ionicons name="document-text" size={24} color="#7C3AED" />
                            </View>
                            <View style={commonStyles.cardTitleContainer}>
                                <Text style={commonStyles.cardTitle}>补充说明</Text>
                                <Text style={commonStyles.cardDescription}>详细描述具体情况</Text>
                            </View>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            placeholder={`请详细说明${selectType?.label || ''}服务的具体情况`}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>
                </ScrollView>
                {/* 底部确认按钮 */}
                <View style={commonStyles.bottomButtonContainer}>
                    <TouchableOpacity
                        style={[
                            commonStyles.primaryButton,
                            styles.confirmButton,
                            (!selectType || !selectedReason) && styles.buttonDisabled
                        ]}
                        onPress={() => { }}
                        disabled={!selectType || !selectedReason}
                    >
                        <Ionicons name="checkmark" size={20} color="white" />
                        <Text style={commonStyles.primaryButtonText}>
                            确认{selectType?.label || '变更'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 20,
    },
    typeContainer: {
        width: '100%',
    },
    timeFilterContainer: {
        width: '100%',
        flexDirection: 'row',
    },
    typeButton: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        minWidth: 80,
        alignItems: 'center',
    },
    typeButtonSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    typeButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.text,
    },
    typeButtonTextSelected: {
        color: colors.white,
    },
    descriptionCard: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    descriptionText: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
    },
    reasonContainer: {
        gap: 12,
    },
    reasonButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 16,
    },
    reasonButtonSelected: {
        backgroundColor: colors.primaryLight,
        borderColor: colors.primary,
    },
    reasonButtonText: {
        fontSize: 14,
        color: colors.text,
        fontWeight: '500',
    },
    reasonButtonTextSelected: {
        color: colors.primary,
        fontWeight: '600',
    },
    timeContainer: {
        gap: 12,
    },
    timeSelector: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 16,
    },
    timeSelectorHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    timeSelectorLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.textSecondary,
        marginLeft: 8,
    },
    timeSelectorValue: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    textInput: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 16,
        fontSize: 14,
        color: colors.text,
        minHeight: 100,
    },
    confirmButton: {
        paddingVertical: 16,
        borderRadius: 12,
        gap: 8,
    },
    buttonDisabled: {
        backgroundColor: colors.textLight,
        opacity: 0.6,
    },
});

export default Exchange;