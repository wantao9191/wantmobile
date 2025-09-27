import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CareServiceLogo from '../../components/ui/CareServiceLogo';
import { colors, commonStyles, createShadow, spacing } from "../../styles/commonStyles";

const Login = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // 登录逻辑
        console.log('登录', { account, password });
    };

    return (
        <SafeAreaView style={[commonStyles.safeArea]} edges={[]}>
            <LinearGradient
                colors={['#E0F2FE', '#BFDBFE', '#3B82F6']}
                locations={[0, 0.6, 1]}
                style={styles.gradientBackground}
            >
                {/* 装饰性背景元素 */}
                <View style={styles.backgroundDecoration1} />
                <View style={styles.backgroundDecoration2} />
                <View style={styles.backgroundDecoration3} />
                
                <KeyboardAvoidingView 
                    style={styles.keyboardAvoidingView}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={styles.mainContainer}>
                        {/* Logo和标题区域 */}
                        <View style={styles.headerContainer}>
                            <View style={styles.logoContainer}>
                                <View style={styles.logoGlow}>
                                    <CareServiceLogo size={100} />
                                </View>
                            </View>
                            <View style={styles.titleContainer}>
                                <Text style={styles.mainTitle}>护理服务平台</Text>
                                <Text style={styles.subtitle}>专业护理，贴心服务</Text>
                            </View>
                        </View>

                        {/* 登录表单区域 */}
                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>账号</Text>
                                <TextInput 
                                    style={styles.textInput}
                                    placeholder="请输入您的账号"
                                    placeholderTextColor={colors.textLight}
                                    value={account}
                                    onChangeText={setAccount}
                                    autoCapitalize="none"
                                    returnKeyType="next"
                                />
                            </View>
                            
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>密码</Text>
                                <TextInput 
                                    style={styles.textInput}
                                    placeholder="请输入您的密码"
                                    placeholderTextColor={colors.textLight}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    returnKeyType="done"
                                    onSubmitEditing={handleLogin}
                                />
                            </View>
                            
                             <LinearGradient
                                colors={[colors.primary, colors.primaryDark]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.loginButton}
                            >
                                <TouchableOpacity 
                                    style={styles.loginButtonTouchable}
                                    onPress={handleLogin}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.loginButtonText}>登录</Text>
                                </TouchableOpacity>
                            </LinearGradient> 
                        </View>

                        {/* 版权信息区域 */}
                        <View style={styles.footerContainer}>
                            <Text style={styles.copyrightText}>
                                © 2025 护理服务平台 版权所有
                            </Text>
                            <Text style={styles.footerDescription}>
                                致力于为您提供专业可靠的护理服务
                            </Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
        position: 'relative',
    },
    // 装饰性背景元素
    backgroundDecoration1: {
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        opacity: 0.6,
        zIndex: 100,
    },
    backgroundDecoration2: {
        position: 'absolute',
        top: '30%',
        left: '-15%',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        opacity: 0.4,
        zIndex: 10,
    },
    backgroundDecoration3: {
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        opacity: 0.3,
        zIndex: 100,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
    },
    headerContainer: {
        alignItems: 'center',
        paddingTop: spacing.lg,
    },
    logoContainer: {
        marginBottom: spacing.md,
        alignItems: 'center',
    },
    logoGlow: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 70,
        padding: spacing.md,
        ...createShadow('#fff', 3, 0.3),
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.white,
        marginBottom: spacing.xs,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 20,
        padding: spacing.xl,
        marginHorizontal: spacing.sm,
        ...createShadow('#000', 4, 0.15),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    inputContainer: {
        marginBottom: spacing.lg,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
        marginBottom: spacing.sm,
        marginLeft: spacing.xs,
    },
    textInput: {
        height: 48,
        backgroundColor: 'rgba(248, 250, 252, 0.8)',
        borderRadius: 12,
        paddingHorizontal: spacing.lg,
        fontSize: 16,
        color: colors.text,
        borderWidth: 1,
        borderColor: 'rgba(229, 231, 235, 0.6)',
        ...createShadow('#000', 1, 0.05),
    },
    loginButton: {
        borderRadius: 12,
        height: 48,
        marginTop: spacing.md,
        ...createShadow(colors.primary, 3, 0.4),
    },
    loginButtonTouchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.white,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
    },
    footerContainer: {
        alignItems: 'center',
        paddingTop: spacing.lg,
        paddingBottom: spacing.sm,
    },
    copyrightText: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        marginBottom: spacing.xs,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
    },
    footerDescription: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 1,
    },
});

export default Login;
