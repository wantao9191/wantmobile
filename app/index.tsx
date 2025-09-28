import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import CareServiceLogo from '../components/ui/CareServiceLogo';

const SplashScreen: React.FC = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [pulseAnim] = useState(new Animated.Value(1));
  const [bounceAnim] = useState(new Animated.Value(0));
  const [rotateAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // 启动动画序列
    const startAnimations = () => {
      // Logo缩放入场动画
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();

      // 脉冲动画
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // 弹跳动画
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -10,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // 旋转动画
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    startAnimations();

    let timer: ReturnType<typeof setInterval>;
    
    // 模拟应用加载过程 - 更快的加载速度用于演示
    timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // 开始淡出动画
          setTimeout(() => {
            if (isMounted) {
              Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }).start((finished) => {
                if (finished && isMounted) {
                  // 导航到主标签页
                  router.replace('/login');
                }
              });
            }
          }, 3000);
          return 100;
        }
        return prev + 5; // 更快的进度增长
      });
    }, 1000); // 更短的间隔

    return () => {
      clearInterval(timer);
      setIsMounted(false);
    };
  }, [router, fadeAnim, pulseAnim, bounceAnim, rotateAnim, scaleAnim, isMounted]);

  const getLoadingText = () => {
    if (progress < 30) return "初始化应用...";
    if (progress < 60) return "加载服务模块...";
    if (progress < 90) return "配置用户界面...";
    if (progress < 100) return "准备就绪...";
    return "启动完成!";
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* 动态背景装饰圆形 */}
      <Animated.View style={[
        styles.decorativeCircle1, 
        { transform: [{ scale: pulseAnim }] }
      ]} />
      <Animated.View style={[
        styles.decorativeCircle2, 
        { transform: [{ translateY: bounceAnim }, { rotate: spin }] }
      ]} />
      <Animated.View style={[
        styles.decorativeCircle3, 
        { transform: [{ scale: pulseAnim }] }
      ]} />
      
      {/* 额外的装饰元素 */}
      <Animated.View style={[
        styles.decorativeCircle4,
        { transform: [{ scale: pulseAnim }, { rotate: spin }] }
      ]} />
      <Animated.View style={[
        styles.decorativeCircle5,
        { transform: [{ translateX: bounceAnim }] }
      ]} />

      {/* 网格背景 */}
      <View style={styles.gridBackground} />

      {/* 主要内容 */}
      <View style={styles.content}>
        {/* Logo容器 */}
        <View style={styles.logoContainer}>
          {/* 光环效果 */}
          <Animated.View style={[
            styles.logoHalo,
            { transform: [{ scale: pulseAnim }] }
          ]} />
          <Animated.View style={[
            styles.logoHalo2,
            { transform: [{ scale: scaleAnim }] }
          ]} />
          
          <Animated.View style={[
            styles.logoBackground,
            { transform: [{ scale: scaleAnim }] }
          ]}>
            <CareServiceLogo size={80} />
          </Animated.View>
        </View>

        {/* 品牌文字 */}
        <View style={styles.brandContainer}>
          <Text style={styles.title}>护理服务平台</Text>
          <Text style={styles.subtitle}>专业护理，贴心服务</Text>
          
          {/* 动画加载指示点 */}
          <View style={styles.dotsContainer}>
            <Animated.View style={[
              styles.dot,
              { transform: [{ translateY: bounceAnim }] }
            ]} />
            <Animated.View style={[
              styles.dot,
              { transform: [{ translateY: bounceAnim }] },
              { opacity: pulseAnim }
            ]} />
            <Animated.View style={[
              styles.dot,
              { transform: [{ translateY: bounceAnim }] }
            ]} />
          </View>
        </View>

        {/* 加载进度条 */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View 
              style={[
                styles.progressFill, 
                { 
                  width: `${progress}%`,
                  shadowOpacity: progress / 100
                }
              ]}
            />
          </View>
        </View>
        
        {/* 加载文字 */}
        <Text style={styles.loadingText}>{getLoadingText()}</Text>
      </View>

      {/* 底部信息 */}
      <View style={styles.footer}>
        <Text style={styles.copyright}>© 2025 护理服务平台 版权所有</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0EA5E9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -40,
    left: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  decorativeCircle2: {
    position: 'absolute',
    top: '25%',
    right: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  decorativeCircle3: {
    position: 'absolute',
    bottom: '25%',
    left: '25%',
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  decorativeCircle4: {
    position: 'absolute',
    top: '60%',
    right: '20%',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  decorativeCircle5: {
    position: 'absolute',
    top: '10%',
    left: '70%',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  gridBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 14px, rgba(255,255,255,0.03) 14px, rgba(255,255,255,0.03) 15px)',
  },
  content: {
    alignItems: 'center',
    zIndex: 10,
  },
  logoContainer: {
    marginBottom: 32,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoHalo: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: 1,
  },
  logoHalo2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 2,
  },
  logoBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 50,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
    zIndex: 3,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    width: 256,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 4,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 32,
    alignItems: 'center',
  },
  copyright: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  version: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    marginTop: 4,
  },
});

export default SplashScreen;