import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Icons } from '@/components/icons';
import { Colors, FontFamily } from '@/constants/theme';

type TabName = 'index' | 'companion' | 'rituals' | 'progress';

const TAB_CONFIG: Record<TabName, { label: string; Icon: React.ComponentType<{ size: number; color: string }> }> = {
  index:     { label: 'Today',   Icon: Icons.Home },
  companion: { label: 'Listen',  Icon: Icons.Chat },
  rituals:   { label: 'Rituals', Icon: Icons.Flame },
  progress:  { label: 'Path',    Icon: Icons.Compass },
};

function HollowTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const visibleRoutes = state.routes.filter(r => r.name in TAB_CONFIG);

  return (
    <View style={styles.container} pointerEvents="box-none">
      <LinearGradient
        colors={[Colors.ink, 'transparent']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      <View style={[styles.tabs, { paddingBottom: Math.max(insets.bottom, 12) + 8 }]}>
        {visibleRoutes.map(route => {
          const config = TAB_CONFIG[route.name as TabName];
          const isFocused = state.routes[state.index].name === route.name;
          const color = isFocused ? Colors.bone : Colors.boneFade;
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <config.Icon size={20} color={color} />
              <Text style={[styles.label, { color }]}>{config.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  tab: {
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  label: {
    fontFamily: FontFamily.mono,
    fontSize: 9,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
});

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <HollowTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="companion" />
      <Tabs.Screen name="rituals" />
      <Tabs.Screen name="progress" />
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}
