import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface CareServiceLogoProps {
  className?: string;
  size?: number;
}

const CareServiceLogo: React.FC<CareServiceLogoProps> = ({ 
  className, 
  size = 40 
}) => {
  const logoSize = size;
  const iconSize = size * 0.6;
  
  return (
    <View style={[
      styles.container,
      {
        width: logoSize,
        height: logoSize,
        borderRadius: logoSize / 2,
      }
    ]}>
      {/* 主背景圆形 */}
      <View style={[
        styles.backgroundCircle,
        {
          width: logoSize,
          height: logoSize,
          borderRadius: logoSize / 2,
        }
      ]}>
        {/* 护理图标 */}
        <MaterialIcons 
          name="local-hospital" 
          size={iconSize} 
          color="white" 
          style={styles.icon}
        />
        
        {/* 小爱心装饰 */}
        <View style={[styles.heartContainer, { top: logoSize * 0.15, right: logoSize * 0.2 }]}>
          <MaterialIcons 
            name="favorite" 
            size={logoSize * 0.25} 
            color="#EF4444" 
          />
        </View>
      </View>
      
      {/* 外圈装饰 */}
      <View style={[
        styles.outerRing,
        {
          width: logoSize + 4,
          height: logoSize + 4,
          borderRadius: (logoSize + 4) / 2,
          top: -2,
          left: -2,
        }
      ]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundCircle: {
    backgroundColor: '#0EA5E9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heartContainer: {
    position: 'absolute',
  },
  outerRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default CareServiceLogo;