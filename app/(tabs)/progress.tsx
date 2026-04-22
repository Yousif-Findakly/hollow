import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontFamily } from '@/constants/theme';

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.container, { paddingTop: insets.top + 20 }]}>
      <Text style={s.label}>The Path</Text>
      <Text style={s.sub}>Progress tracking coming soon</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.ink, alignItems: 'center', justifyContent: 'center' },
  label: { fontFamily: FontFamily.serifDisplay, fontSize: 28, color: Colors.bone },
  sub: { fontFamily: FontFamily.mono, fontSize: 10, letterSpacing: 2, color: Colors.boneFade, marginTop: 12, textTransform: 'uppercase' },
});
