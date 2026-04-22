import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import type { Tone } from '@/context/AppContext';
import { COPY, type OnboardingCopy } from '@/constants/copy';
import { Colors, FontFamily } from '@/constants/theme';
import { PrimaryButton, GhostButton, DisplayTitle, Eyebrow } from '@/components/primitives';

const TOTAL_STEPS = 7;
const WHEN_OPTIONS = ['Today', 'This week', '1 week ago', '3 weeks ago', 'A month+', 'Longer'];

export default function OnboardingScreen() {
  const app = useApp();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [them, setThem] = useState('');
  const [when, setWhen] = useState('3 weeks ago');
  const [story, setStory] = useState('');
  const [tone, setToneState] = useState<Tone>('soft');

  const c = COPY[tone].onboarding;

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => Math.max(0, s - 1));

  const finish = () => {
    app.setProfile({ name: name.trim() || 'friend', them: them.trim(), when, story, onboarded: true });
    app.setTone(tone);
    router.replace('/(tabs)');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.ink }}>
      {/* Progress dots */}
      <View style={[styles.dots, { top: insets.top + 18 }]}>
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                width: i === step ? 18 : 5,
                backgroundColor: i <= step ? Colors.bone : Colors.ink4,
              },
            ]}
          />
        ))}
      </View>

      {/* Back button */}
      {step > 0 && step < TOTAL_STEPS - 1 && (
        <TouchableOpacity
          onPress={back}
          style={[styles.backBtn, { top: insets.top + 40 }]}
          activeOpacity={0.7}
        >
          <Text style={styles.backChev}>‹</Text>
        </TouchableOpacity>
      )}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Animated.View
          key={step}
          entering={FadeInDown.duration(350).springify()}
          style={[styles.content, { paddingTop: insets.top + 84, paddingBottom: Math.max(insets.bottom, 20) + 20 }]}
        >
          {step === 0 && <StepWelcome c={c} onNext={next} />}
          {step === 1 && <StepInput prompt={c.namePrompt} hint={c.nameHint} value={name} onChange={setName} onNext={next} canNext={!!name.trim()} />}
          {step === 2 && <StepInput prompt={c.themPrompt} hint={c.themHint} value={them} onChange={setThem} onNext={next} canNext={!!them.trim()} placeholder="Their name" />}
          {step === 3 && <StepWhen prompt={c.whenPrompt} hint={c.whenHint} value={when} onChange={setWhen} onNext={next} />}
          {step === 4 && <StepStory prompt={c.storyPrompt} hint={c.storyHint} value={story} onChange={setStory} onNext={next} />}
          {step === 5 && <StepTone prompt={c.tonePrompt} options={c.toneOptions} value={tone} onChange={setToneState} onNext={next} />}
          {step === 6 && <StepReady c={COPY[tone].onboarding} name={name} them={them} onFinish={finish} />}
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

// ── Step components ────────────────────────────────────────────────

function StepWelcome({ c, onNext }: { c: OnboardingCopy; onNext: () => void }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Eyebrow style={{ marginBottom: 24 }}>Welcome to Hollow</Eyebrow>
        <DisplayTitle size={44}>{c.welcomeTitle}</DisplayTitle>
        <Text style={s.body}>{c.welcomeBody}</Text>
      </View>

      {/* Ornament */}
      <View style={{ alignItems: 'center', marginBottom: 28, marginTop: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ height: 1, width: 60, backgroundColor: Colors.rust, opacity: 0.4 }} />
          <View style={{ width: 8, height: 8, borderRadius: 4, borderWidth: 1, borderColor: Colors.rust, opacity: 0.6 }} />
          <View style={{ height: 1, width: 60, backgroundColor: Colors.rust, opacity: 0.4 }} />
        </View>
      </View>

      <PrimaryButton onPress={onNext}>{c.welcomeCta}</PrimaryButton>
      <GhostButton style={{ marginTop: 4 }}>I've been here before</GhostButton>
    </View>
  );
}

function StepInput({
  prompt, hint, value, onChange, onNext, canNext, placeholder = 'Type here',
}: {
  prompt: string; hint: string; value: string;
  onChange: (v: string) => void; onNext: () => void;
  canNext: boolean; placeholder?: string;
}) {
  const ref = useRef<TextInput>(null);
  useEffect(() => { setTimeout(() => ref.current?.focus(), 300); }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <DisplayTitle size={32}>{prompt}</DisplayTitle>
        <Text style={[s.hint, { marginTop: 14 }]}>{hint}</Text>
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={Colors.ink4}
          style={s.bigInput}
          returnKeyType="done"
          onSubmitEditing={canNext ? onNext : undefined}
          autoCapitalize="words"
        />
      </View>
      <PrimaryButton onPress={onNext} disabled={!canNext}>Continue</PrimaryButton>
    </View>
  );
}

function StepWhen({
  prompt, hint, value, onChange, onNext,
}: {
  prompt: string; hint: string; value: string;
  onChange: (v: string) => void; onNext: () => void;
}) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <DisplayTitle size={32}>{prompt}</DisplayTitle>
        <Text style={[s.hint, { marginTop: 14 }]}>{hint}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 32 }}>
          {WHEN_OPTIONS.map(o => {
            const active = value === o;
            return (
              <TouchableOpacity
                key={o}
                onPress={() => onChange(o)}
                activeOpacity={0.8}
                style={[s.pill, {
                  borderColor: active ? Colors.bone : Colors.ink4,
                  backgroundColor: active ? Colors.bone : 'transparent',
                }]}
              >
                <Text style={[s.pillText, { color: active ? Colors.ink : Colors.boneDim }]}>{o}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <PrimaryButton onPress={onNext}>Continue</PrimaryButton>
    </View>
  );
}

function StepStory({
  prompt, hint, value, onChange, onNext,
}: {
  prompt: string; hint: string; value: string;
  onChange: (v: string) => void; onNext: () => void;
}) {
  return (
    <View style={{ flex: 1 }}>
      <DisplayTitle size={30}>{prompt}</DisplayTitle>
      <Text style={[s.hint, { marginTop: 12 }]}>{hint}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Begin…"
        placeholderTextColor={Colors.ink4}
        multiline
        style={s.storyInput}
        textAlignVertical="top"
      />
      <View style={{ marginTop: 20, gap: 4 }}>
        <PrimaryButton onPress={onNext}>Continue</PrimaryButton>
        <GhostButton onPress={onNext}>Skip for now</GhostButton>
      </View>
    </View>
  );
}

function StepTone({
  prompt, options, value, onChange, onNext,
}: {
  prompt: string;
  options: { id: Tone; title: string; body: string }[];
  value: Tone;
  onChange: (t: Tone) => void;
  onNext: () => void;
}) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <DisplayTitle size={32}>{prompt}</DisplayTitle>
        <View style={{ marginTop: 28, gap: 12 }}>
          {options.map(o => {
            const active = value === o.id;
            return (
              <TouchableOpacity
                key={o.id}
                onPress={() => onChange(o.id)}
                activeOpacity={0.8}
                style={[s.toneCard, {
                  borderColor: active ? Colors.bone : Colors.ink4,
                  backgroundColor: active ? 'rgba(232,228,217,0.04)' : Colors.ink2,
                }]}
              >
                <Text style={[s.toneTitle]}>{o.title}</Text>
                <Text style={s.toneBody}>{o.body}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <PrimaryButton onPress={onNext} style={{ marginTop: 24 }}>Continue</PrimaryButton>
    </View>
  );
}

function StepReady({
  c, name, them, onFinish,
}: {
  c: OnboardingCopy; name: string; them: string; onFinish: () => void;
}) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Eyebrow style={{ marginBottom: 20, color: Colors.rust }}>Hollow is ready</Eyebrow>
        <DisplayTitle size={38}>{c.readyTitle}</DisplayTitle>
        <Text style={[s.body, { marginTop: 20 }]}>{c.readyBody}</Text>

        <View style={[s.summaryCard, { marginTop: 30 }]}>
          <Eyebrow style={{ marginBottom: 10 }}>Your story</Eyebrow>
          <Text style={{ fontFamily: FontFamily.serifDisplay, fontSize: 16, color: Colors.bone, lineHeight: 24 }}>
            {name || 'You'} and {them || 'them'}.
          </Text>
          <Text style={{ fontFamily: FontFamily.serifBody, fontSize: 14, color: Colors.boneFade, marginTop: 4 }}>
            Kept just between us.
          </Text>
        </View>
      </View>
      <PrimaryButton onPress={onFinish}>{c.readyCta}</PrimaryButton>
    </View>
  );
}

// ── Shared styles ──────────────────────────────────────────────────
const s = StyleSheet.create({
  body: {
    fontFamily: FontFamily.serifBody,
    fontSize: 16,
    lineHeight: 25,
    color: Colors.boneDim,
    marginTop: 22,
  },
  hint: {
    fontFamily: FontFamily.mono,
    fontSize: 11,
    color: Colors.boneFade,
    letterSpacing: 0.8,
  },
  bigInput: {
    marginTop: 32,
    borderBottomWidth: 1,
    borderBottomColor: Colors.boneGhost,
    color: Colors.bone,
    fontFamily: FontFamily.serifDisplay,
    fontSize: 28,
    paddingVertical: 10,
  },
  storyInput: {
    marginTop: 20,
    flex: 1,
    minHeight: 180,
    backgroundColor: Colors.ink2,
    borderWidth: 1,
    borderColor: Colors.ink4,
    borderRadius: 12,
    padding: 16,
    color: Colors.bone,
    fontFamily: FontFamily.serifBody,
    fontSize: 15,
    lineHeight: 24,
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 100,
    borderWidth: 1,
  },
  pillText: {
    fontFamily: FontFamily.serifBody,
    fontSize: 14,
  },
  toneCard: {
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
  },
  toneTitle: {
    fontFamily: FontFamily.serifDisplay,
    fontSize: 22,
    color: Colors.bone,
  },
  toneBody: {
    fontFamily: FontFamily.serifBody,
    fontSize: 13,
    color: Colors.boneDim,
    marginTop: 4,
    lineHeight: 19,
  },
  summaryCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.ink4,
    borderRadius: 14,
    backgroundColor: Colors.ink2,
  },
});

const styles = StyleSheet.create({
  dots: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    height: 3,
    borderRadius: 2,
  },
  backBtn: {
    position: 'absolute',
    left: 18,
    zIndex: 10,
    padding: 8,
  },
  backChev: {
    color: Colors.boneFade,
    fontSize: 28,
    lineHeight: 28,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
  },
});
