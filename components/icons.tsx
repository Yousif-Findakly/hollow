import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { Colors } from '@/constants/theme';

interface IconProps {
  size?: number;
  color?: string;
}

export const Icons = {
  Home: ({ size = 20, color = Colors.bone }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V11z"
        stroke={color} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  Heart: ({ size = 20, color = Colors.bone }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z"
        stroke={color} strokeWidth={1.2} />
    </Svg>
  ),
  Flame: ({ size = 20, color = Colors.bone }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2c1 4 4 5 4 9a4 4 0 01-8 0c0-2 1-3 2-4-1 3 1 4 2 4 0-3-2-5 0-9z"
        stroke={color} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  Chat: ({ size = 20, color = Colors.bone }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M21 12a8 8 0 01-11.5 7.2L4 21l1.8-5.3A8 8 0 1121 12z"
        stroke={color} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  Compass: ({ size = 20, color = Colors.bone }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={1.2} />
      <Path d="M15 9l-2 6-4 1 2-6 4-1z" stroke={color} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  Gear: ({ size = 20, color = Colors.bone }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={1.2} />
      <Path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
        stroke={color} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  ChevLeft: ({ size = 20, color = Colors.bone }: IconProps) => (
    <Svg width={size * 0.6} height={size} viewBox="0 0 12 20" fill="none">
      <Path d="M10 2L2 10l8 8" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  ChevRight: ({ size = 14, color = Colors.bone }: IconProps) => (
    <Svg width={size * 0.57} height={size} viewBox="0 0 8 14" fill="none">
      <Path d="M1 1l6 6-6 6" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  Plus: ({ size = 20, color = Colors.bone }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  ),
  Close: ({ size = 18, color = Colors.bone }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  ),
  Check: ({ size = 18, color = Colors.bone }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12l5 5 9-11" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  Arrow: ({ size = 18, color = Colors.bone }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12h14M13 5l7 7-7 7" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  Wind: ({ size = 20, color = Colors.bone }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 9h12a3 3 0 100-6M3 15h16a3 3 0 110 6M3 12h8"
        stroke={color} strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  ),
  Leaf: ({ size = 20, color = Colors.bone }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M20 4C10 4 4 10 4 20c10 0 16-6 16-16z"
        stroke={color} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M4 20L14 10" stroke={color} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  Mail: ({ size = 20, color = Colors.bone }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="5" width="18" height="14" rx="1" stroke={color} strokeWidth={1.2} />
      <Path d="M3 7l9 6 9-6" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  ),
  Dot: ({ size = 6, color = Colors.bone }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 6 6" fill={color}>
      <Circle cx="3" cy="3" r="3" />
    </Svg>
  ),
  SOS: ({ size = 18, color = Colors.bone }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"
        stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={1.4} />
    </Svg>
  ),
  Pencil: ({ size = 18, color = Colors.bone }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M17 3l4 4-13 13H4v-4L17 3z"
        stroke={color} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
  Moon: ({ size = 20, color = Colors.bone }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M21 13A9 9 0 1111 3a7 7 0 0010 10z"
        stroke={color} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ),
};
