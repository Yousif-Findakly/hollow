import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  TextStyle,
  ScrollViewProps,
} from 'react-native';
import { Colors, FontFamily } from '@/constants/theme';
import { Icons } from '@/components/icons';

// ── Screen ───────────────────────────────────────────────────────
interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  scroll?: boolean;
  bg?: string;
  scrollProps?: Omit<ScrollViewProps, 'children'>;
}

export function Screen({ children, style, contentStyle, scroll = true, bg = Colors.ink, scrollProps }: ScreenProps) {
  if (!scroll) {
    return (
      <View style={[{ flex: 1, backgroundColor: bg }, style]}>
        {children}
      </View>
    );
  }
  return (
    <ScrollView
      style={[{ flex: 1, backgroundColor: bg }, style]}
      contentContainerStyle={contentStyle}
      showsVerticalScrollIndicator={false}
      {...scrollProps}
    >
      {children}
    </ScrollView>
  );
}

// ── Typography ────────────────────────────────────────────────────
interface DisplayTitleProps {
  children: React.ReactNode;
  size?: number;
  style?: TextStyle;
}

export function DisplayTitle({ children, size = 36, style }: DisplayTitleProps) {
  return (
    <Text style={[{
      fontFamily: FontFamily.serifDisplay,
      fontSize: size,
      lineHeight: size * 1.08,
      letterSpacing: -0.5,
      color: Colors.bone,
    }, style]}>
      {children}
    </Text>
  );
}

interface EyebrowProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export function Eyebrow({ children, style }: EyebrowProps) {
  return (
    <Text style={[{
      fontFamily: FontFamily.mono,
      fontSize: 10,
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: Colors.boneFade,
    }, style]}>
      {children}
    </Text>
  );
}

// ── Buttons ───────────────────────────────────────────────────────
interface PrimaryButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  muted?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function PrimaryButton({ children, onPress, disabled, muted, style, textStyle }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      style={[{
        height: 54,
        backgroundColor: muted ? 'transparent' : Colors.bone,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: muted ? 1 : 0,
        borderColor: muted ? Colors.ink4 : undefined,
        opacity: disabled ? 0.4 : 1,
      }, style]}
    >
      <Text style={[{
        fontFamily: FontFamily.serifDisplay,
        fontSize: 20,
        color: muted ? Colors.bone : Colors.ink,
        letterSpacing: 0.2,
      }, textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

interface GhostButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function GhostButton({ children, onPress, style, textStyle }: GhostButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[{ padding: 10, alignItems: 'center' }, style]}>
      <Text style={[{
        fontFamily: FontFamily.mono,
        fontSize: 11,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: Colors.boneFade,
      }, textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

// ── TopBar ─────────────────────────────────────────────────────────
interface TopBarProps {
  title?: string;
  onBack?: () => void;
  trailing?: React.ReactNode;
  dim?: boolean;
}

export function TopBar({ title, onBack, trailing, dim }: TopBarProps) {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 14,
      minHeight: 56,
    }}>
      {onBack ? (
        <TouchableOpacity
          onPress={onBack}
          style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}
          activeOpacity={0.7}
        >
          <Icons.ChevLeft size={20} color={Colors.bone} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 36 }} />
      )}
      <Text style={{
        flex: 1,
        textAlign: 'center',
        fontFamily: FontFamily.mono,
        fontSize: 11,
        letterSpacing: 1.8,
        textTransform: 'uppercase',
        color: dim ? Colors.boneFade : Colors.bone,
      }}>
        {title}
      </Text>
      <View style={{ width: 36, alignItems: 'flex-end' }}>
        {trailing}
      </View>
    </View>
  );
}

// ── Card ───────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

export function Card({ children, style, onPress }: CardProps) {
  const base: ViewStyle = {
    backgroundColor: Colors.ink2,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.ink4,
    padding: 20,
  };
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[base, style]}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={[base, style]}>{children}</View>;
}

// ── Divider ────────────────────────────────────────────────────────
interface DividerProps {
  label?: string;
}

export function Divider({ label }: DividerProps) {
  if (!label) {
    return <View style={{ height: 1, backgroundColor: Colors.ink4, marginVertical: 20 }} />;
  }
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 24 }}>
      <View style={{ flex: 1, height: 1, backgroundColor: Colors.ink4 }} />
      <Eyebrow>{label}</Eyebrow>
      <View style={{ flex: 1, height: 1, backgroundColor: Colors.ink4 }} />
    </View>
  );
}
