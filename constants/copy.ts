export type Tone = 'soft' | 'savage';

export interface ToneOption {
  id: Tone;
  title: string;
  body: string;
}

export interface OnboardingCopy {
  welcomeTitle: string;
  welcomeBody: string;
  welcomeCta: string;
  namePrompt: string;
  nameHint: string;
  themPrompt: string;
  themHint: string;
  whenPrompt: string;
  whenHint: string;
  storyPrompt: string;
  storyHint: string;
  tonePrompt: string;
  toneOptions: ToneOption[];
  readyTitle: string;
  readyBody: string;
  readyCta: string;
}

interface ToneCopy {
  brandTagline: string;
  onboarding: OnboardingCopy;
  home: {
    greetingMorning: string;
    greetingEvening: string;
    dayLabel: string;
    prompt: string;
    moodCta: string;
    noContactTitle: string;
    journalTitle: string;
    companionTitle: string;
    companionBody: string;
  };
  noContact: {
    title: string;
    streakUnit: string;
    reset: string;
    resetConfirm: string;
    motivations: string[];
  };
  mood: {
    title: string;
    values: string[];
    reflect: string;
    save: string;
  };
  ritual: {
    title: string;
    intro: string;
    burnBox: { title: string; body: string; cta: string; placeholder: string; burn: string; afterBurn: string };
    letter: { title: string; body: string; cta: string; placeholder: string };
  };
  companion: {
    title: string;
    greeting: string;
    placeholder: string;
    thinking: string;
  };
  progress: {
    title: string;
    intro: string;
  };
}

export const COPY: Record<Tone, ToneCopy> = {
  soft: {
    brandTagline: 'a companion for the in-between',
    onboarding: {
      welcomeTitle: 'Something ended.',
      welcomeBody: "You're in the hollow now — that strange, soft place where grief keeps house. Hollow will sit with you here.",
      welcomeCta: 'Begin gently',
      namePrompt: 'What should I call you?',
      nameHint: 'A name, a letter, anything.',
      themPrompt: 'And what was their name?',
      themHint: "We'll only use this between us.",
      whenPrompt: 'When did it end?',
      whenHint: 'Even a guess is fine.',
      storyPrompt: 'Tell me, in your own words, what happened.',
      storyHint: 'A sentence. A paragraph. Nothing at all. No one will read this but you.',
      tonePrompt: 'How would you like me to speak with you?',
      toneOptions: [
        { id: 'soft', title: 'Gently', body: 'Warm, patient, tender with you.' },
        { id: 'savage', title: 'Honestly', body: "Kind, but unafraid to tell the truth." },
      ],
      readyTitle: "Then we'll begin here.",
      readyBody: "There's no right way to grieve. We'll go at your pace — one small, honest thing at a time.",
      readyCta: 'Enter Hollow',
    },
    home: {
      greetingMorning: 'Good morning, {name}.',
      greetingEvening: 'Gentle evening, {name}.',
      dayLabel: 'Day {n} in the hollow.',
      prompt: 'How are you, really?',
      moodCta: "Begin today's check-in",
      noContactTitle: 'Still holding the line.',
      journalTitle: 'Something to write about',
      companionTitle: 'If you need to be heard',
      companionBody: "I'm here, whenever.",
    },
    noContact: {
      title: 'No-contact',
      streakUnit: 'days held',
      reset: 'I reached out',
      resetConfirm: "That's okay. Grief doesn't move in straight lines.",
      motivations: [
        'Every day is a small act of self-respect.',
        "The ache doesn't mean you were wrong to stop.",
        'You are learning to be kind to yourself again.',
      ],
    },
    mood: {
      title: 'How are you sitting with yourself today?',
      values: ['Underwater', 'Heavy', 'Tender', 'Drifting', 'Quiet', 'Something'],
      reflect: "Say a little more, if you'd like.",
      save: 'Keep this',
    },
    ritual: {
      title: 'Rituals',
      intro: 'Small ceremonies to help you put things down.',
      burnBox: {
        title: 'The burn box',
        body: "Write what you can't say aloud. Watch it turn to ember.",
        cta: 'Light a match',
        placeholder: 'Write what needs to burn…',
        burn: 'Let it go',
        afterBurn: "It's gone. You can make another, if you need.",
      },
      letter: {
        title: 'The unsent letter',
        body: 'Say the whole thing. Then decide what to do with it.',
        cta: 'Open the envelope',
        placeholder: 'Dear…',
      },
    },
    companion: {
      title: 'Listen',
      greeting: "I'm here. What weight are you carrying today?",
      placeholder: "Say anything. I'll meet you there.",
      thinking: 'thinking',
    },
    progress: {
      title: 'Your path',
      intro: "Grief moves in tides, not milestones. Here's where you've been.",
    },
  },

  savage: {
    brandTagline: 'a companion for the in-between',
    onboarding: {
      welcomeTitle: "It's over. Let's work.",
      welcomeBody: "You didn't open this app for platitudes. You opened it because something broke and you need to get through it. Good — that's the first honest thing.",
      welcomeCta: 'Start',
      namePrompt: 'Who are you?',
      nameHint: "Your name. Or what you'd rather I call you.",
      themPrompt: 'Who broke your heart?',
      themHint: "Their name. We're going to talk about them a lot.",
      whenPrompt: 'When did it end?',
      whenHint: 'Ballpark works.',
      storyPrompt: 'Tell me what actually happened.',
      storyHint: 'Not the clean version. The real one. No one reads this but you and me.',
      tonePrompt: 'How do you want me to talk to you?',
      toneOptions: [
        { id: 'soft', title: 'Gently', body: 'Soft hands. Patience. Slow work.' },
        { id: 'savage', title: 'Honestly', body: 'No pity, no bullshit, no flinching.' },
      ],
      readyTitle: "Alright. Let's begin.",
      readyBody: "I won't lie to you. I won't rush you. I won't tell you they were secretly a good person. We're going to do the actual work.",
      readyCta: "Let's go",
    },
    home: {
      greetingMorning: "Morning, {name}. You're still here. Good.",
      greetingEvening: 'Evening, {name}. Made it through.',
      dayLabel: 'Day {n}. Keep going.',
      prompt: 'How are you, really?',
      moodCta: 'Check in',
      noContactTitle: 'Still not texting them.',
      journalTitle: 'Write it down. All of it.',
      companionTitle: 'Need to talk?',
      companionBody: 'No advice. No fixing. Just honest.',
    },
    noContact: {
      title: 'No-contact',
      streakUnit: 'days clean',
      reset: 'I caved',
      resetConfirm: 'It happens. Reset. Keep going.',
      motivations: [
        'They are not going to save you. You are.',
        "The urge passes. The regret doesn't.",
        'You already know what a reply from them looks like.',
      ],
    },
    mood: {
      title: 'How bad is it?',
      values: ['Wrecked', 'Heavy', 'Tender', 'Numb', 'Okay-ish', 'Actually fine'],
      reflect: "What's behind the number?",
      save: 'Log it',
    },
    ritual: {
      title: 'Rituals',
      intro: 'Small, strange, effective. Pick one.',
      burnBox: {
        title: 'The burn box',
        body: 'Put it in writing. Set it on fire. Watch the words die.',
        cta: 'Strike a match',
        placeholder: 'What are you still carrying?',
        burn: 'Burn it',
        afterBurn: "Gone. Doesn't mean it's gone-gone. But it's a start.",
      },
      letter: {
        title: 'The unsent letter',
        body: "Everything you wish you'd said. No send button on this one.",
        cta: 'Open it',
        placeholder: 'Dear you,',
      },
    },
    companion: {
      title: 'Listen',
      greeting: "What's going on. Give me the real version.",
      placeholder: 'Tell me the truth.',
      thinking: 'thinking',
    },
    progress: {
      title: 'The path',
      intro: "This is what the work looks like. Not a straight line — that's normal.",
    },
  },
};

export function t(str: string, vars: Record<string, string | number> = {}): string {
  return str.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
