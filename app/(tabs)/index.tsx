import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/context/AppContext';
import { COPY, t } from '@/constants/copy';
import { Colors, FontFamily } from '@/constants/theme';
import { Icons } from '@/components/icons';
import { DisplayTitle, Eyebrow } from '@/components/primitives';

export default function HomeScreen() {
  const app = useApp();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Redirect to onboarding if first launch
  useEffect(() => {
    if (!app.profile.onboarded) {
      router.replace('/onboarding');
    }
  }, []);

  if (!app.profile.onboarded) return null;

  const c = COPY[app.tone].home;
  const name = app.profile.name || 'friend';
  const hour = new Date().getHours();
  const greeting = hour < 14 ? c.greetingMorning : c.greetingEvening;
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });
  const lastMood = app.moodLog[0];

  const proofCopy = app.tone === 'savage'
    ? `You haven't texted ${app.profile.them || 'them'} in ${app.noContactDays} days. You have written in your journal ${app.entries.length} ${app.entries.length === 1 ? 'time' : 'times'} this week. You are doing the work even when it doesn't feel like it.`
    : `You've held the line for ${app.noContactDays} days. ${app.entries.length} ${app.entries.length === 1 ? 'entry' : 'entries'} this week. Small and steady — this is what mending looks like.`;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.ink }}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Masthead ── */}
      <View style={[s.section, { paddingTop: insets.top + 20 }]}>
        <View style={s.mastheadRow}>
          <View>
            <Text style={s.dateLabel}>{dateStr}</Text>
            <Text style={s.dayLabel}>Day {app.dayN} · the slow unmaking</Text>
          </View>
          <TouchableOpacity style={s.settingsBtn} activeOpacity={0.7}>
            <Icons.Gear size={18} color={Colors.boneFade} />
          </TouchableOpacity>
        </View>

        <View style={s.hairline} />

        <DisplayTitle size={40}>{t(greeting, { name })}</DisplayTitle>
        <Text style={s.promptText}>{c.prompt}</Text>
      </View>

      {/* ── Check-in button ── */}
      <View style={s.section}>
        <TouchableOpacity style={s.checkinCard} activeOpacity={0.85}>
          <View style={s.checkinOrb} />
          <View style={{ flex: 1 }}>
            <Text style={s.checkinEyebrow}>Today's check-in</Text>
            <Text style={s.checkinTitle}>How are you, really?</Text>
          </View>
          <View style={s.checkinArrow}>
            <Icons.Arrow size={16} color={Colors.bone} />
          </View>
        </TouchableOpacity>
      </View>

      {/* ── Stats row ── */}
      <View style={s.section}>
        <View style={s.statsRow}>
          <StatCell
            label="No-contact"
            num={app.noContactDays}
            unit="days"
            accent={Colors.lilac}
          />
          <View style={s.statsDivider} />
          <StatCell
            label="Journal"
            num={app.entries.length}
            unit="entries"
            accent={Colors.sage}
          />
          <View style={s.statsDivider} />
          <StatCell
            label="Mood"
            num={lastMood?.label ?? '—'}
            unit="last"
            accent={Colors.rust}
            isText
          />
        </View>
      </View>

      {/* ── Proof line ── */}
      <View style={s.section}>
        <Text style={s.proofLine}>
          <Text style={{ color: Colors.rust }}>{'\u201C'} </Text>
          {proofCopy}
        </Text>
      </View>

      {/* ── Companion hero card ── */}
      <View style={s.section}>
        <TouchableOpacity
          onPress={() => router.navigate('/(tabs)/companion')}
          style={s.companionCard}
          activeOpacity={0.85}
        >
          {/* Ambient glow */}
          <View style={s.companionGlow} />

          <View style={s.companionInner}>
            {/* Orb */}
            <View style={s.orb} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Icons.Dot size={6} color={Colors.sage} />
                <Text style={s.listeningLabel}>Hollow is listening</Text>
              </View>
              <Text style={s.companionTitle}>{c.companionTitle}</Text>
              <Text style={s.companionBody}>{c.companionBody}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* ── Rituals shelf ── */}
      <View style={s.section}>
        <View style={s.shelfHeader}>
          <Eyebrow>For tonight</Eyebrow>
          <TouchableOpacity onPress={() => router.navigate('/(tabs)/rituals')} activeOpacity={0.7}>
            <Text style={s.seeAll}>All rituals →</Text>
          </TouchableOpacity>
        </View>

        <RitualRow
          icon={<Icons.Flame size={18} color={Colors.rust} />}
          title="The burn box"
          body="Write what's pressing. Let it go."
          onPress={() => router.navigate('/(tabs)/rituals')}
        />
        <View style={{ height: 10 }} />
        <RitualRow
          icon={<Icons.Wind size={18} color={Colors.lilac} />}
          title="4-7-8 breath"
          body="Three minutes. Nervous system reset."
          onPress={() => router.navigate('/(tabs)/rituals')}
        />
      </View>

      {/* ── Plans upsell ── */}
      <View style={s.section}>
        <TouchableOpacity style={s.plansCard} activeOpacity={0.85}>
          <View style={s.plansAccent}>
            <LinearGradient
              colors={[Colors.rust, Colors.lilac]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.plansEyebrow}>Hollow Deep · 7 days free</Text>
            <Text style={s.plansTitle}>
              {app.tone === 'savage'
                ? 'Talk to Hollow without a timer'
                : 'Stay with Hollow, without a timer'}
            </Text>
            <Text style={s.plansBody}>
              Unlimited companion · voice sessions · full ritual library
            </Text>
          </View>
          <Icons.ChevRight size={14} color={Colors.bone} />
        </TouchableOpacity>
      </View>

      {/* ── Footer ── */}
      <View style={s.footer}>
        <Text style={s.footerText}>You're allowed to feel all of it.</Text>
      </View>
    </ScrollView>
  );
}

// ── Sub-components ─────────────────────────────────────────────────

function StatCell({
  label, num, unit, accent, isText = false,
}: {
  label: string; num: string | number; unit: string;
  accent: string; isText?: boolean;
}) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={s.statLabel}>{label}</Text>
      <Text style={[s.statNum, { color: accent, fontSize: isText ? 22 : 30, lineHeight: isText ? 26 : 34 }]}>
        {num}
      </Text>
      <Text style={s.statUnit}>{unit}</Text>
    </View>
  );
}

function RitualRow({
  icon, title, body, onPress,
}: {
  icon: React.ReactNode; title: string; body: string; onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={s.ritualRow} activeOpacity={0.8}>
      <View style={s.ritualIcon}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={s.ritualTitle}>{title}</Text>
        <Text style={s.ritualBody}>{body}</Text>
      </View>
      <Icons.ChevRight size={14} color={Colors.boneGhost} />
    </TouchableOpacity>
  );
}

// ── Styles ─────────────────────────────────────────────────────────
const s = StyleSheet.create({
  section: { paddingHorizontal: 24, marginTop: 22 },

  // Masthead
  mastheadRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  dateLabel: { fontFamily: FontFamily.mono, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: Colors.boneFade },
  dayLabel: { fontFamily: FontFamily.serifDisplay, fontSize: 13, color: Colors.rust, marginTop: 2, letterSpacing: 0.3 },
  settingsBtn: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: Colors.ink4, alignItems: 'center', justifyContent: 'center' },
  hairline: { height: 1, backgroundColor: Colors.ink4, marginTop: 18, marginBottom: 22 },
  promptText: { fontFamily: FontFamily.serifBody, fontSize: 15, lineHeight: 23, color: Colors.boneDim, marginTop: 14, maxWidth: 320 },

  // Check-in
  checkinCard: { backgroundColor: Colors.bone, borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14 },
  checkinOrb: { width: 42, height: 42, borderRadius: 21, backgroundColor: Colors.rust, flexShrink: 0 },
  checkinEyebrow: { fontFamily: FontFamily.mono, fontSize: 9, letterSpacing: 2, color: 'rgba(14,14,16,0.5)', textTransform: 'uppercase' },
  checkinTitle: { fontFamily: FontFamily.serifDisplay, fontSize: 22, color: Colors.ink, marginTop: 2, lineHeight: 24 },
  checkinArrow: { width: 34, height: 34, borderRadius: 17, backgroundColor: Colors.ink, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },

  // Stats
  statsRow: { flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, borderColor: Colors.ink4 },
  statsDivider: { width: 1, backgroundColor: Colors.ink4 },
  statLabel: { fontFamily: FontFamily.mono, fontSize: 9, letterSpacing: 1.8, color: Colors.boneFade, textTransform: 'uppercase' },
  statNum: { fontFamily: FontFamily.serifDisplay, letterSpacing: -0.5, marginTop: 8 },
  statUnit: { fontFamily: FontFamily.mono, fontSize: 9, letterSpacing: 1.2, color: Colors.boneFade, textTransform: 'uppercase', marginTop: 6 },

  // Proof
  proofLine: { fontFamily: FontFamily.serifDisplay, fontSize: 18, lineHeight: 26, color: Colors.boneDim },

  // Companion card
  companionCard: { backgroundColor: '#1a1318', borderRadius: 20, borderWidth: 1, borderColor: Colors.ink4, padding: 22, overflow: 'hidden' },
  companionGlow: { position: 'absolute', top: -60, right: -60, width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(200,111,93,0.18)' },
  companionInner: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  orb: { width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.rust, flexShrink: 0, shadowColor: Colors.rust, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 14, elevation: 8 },
  listeningLabel: { fontFamily: FontFamily.mono, fontSize: 9, letterSpacing: 2, color: Colors.sage, textTransform: 'uppercase' },
  companionTitle: { fontFamily: FontFamily.serifDisplay, fontSize: 22, color: Colors.bone, marginTop: 4, lineHeight: 25 },
  companionBody: { fontFamily: FontFamily.serifBody, fontSize: 13, color: Colors.boneFade, marginTop: 3 },

  // Rituals shelf
  shelfHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 },
  seeAll: { fontFamily: FontFamily.mono, fontSize: 10, color: Colors.boneFade, letterSpacing: 1.5, textTransform: 'uppercase' },
  ritualRow: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14, borderRadius: 14, backgroundColor: Colors.ink2, borderWidth: 1, borderColor: Colors.ink4 },
  ritualIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: Colors.ink3, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  ritualTitle: { fontFamily: FontFamily.serifDisplay, fontSize: 17, color: Colors.bone, lineHeight: 19 },
  ritualBody: { fontFamily: FontFamily.serifBody, fontSize: 12, color: Colors.boneFade, marginTop: 2 },

  // Plans upsell
  plansCard: { borderRadius: 18, borderWidth: 1, borderColor: Colors.ink4, backgroundColor: Colors.ink2, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14, overflow: 'hidden' },
  plansAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, overflow: 'hidden' },
  plansEyebrow: { fontFamily: FontFamily.mono, fontSize: 9, letterSpacing: 2, color: Colors.rust, textTransform: 'uppercase' },
  plansTitle: { fontFamily: FontFamily.serifDisplay, fontSize: 20, color: Colors.bone, marginTop: 6, lineHeight: 22 },
  plansBody: { fontFamily: FontFamily.serifBody, fontSize: 12, color: Colors.boneFade, marginTop: 6 },

  // Footer
  footer: { paddingHorizontal: 24, paddingTop: 36, paddingBottom: 20, alignItems: 'center' },
  footerText: { fontFamily: FontFamily.serifDisplay, fontSize: 13, color: Colors.boneGhost },
});
