import React, { createContext, useContext, useState } from 'react';
import type { Tone } from '@/constants/copy';

export type { Tone };

export interface Profile {
  name: string;
  them: string;
  when: string;
  story: string;
  onboarded: boolean;
}

export interface Entry {
  text: string;
  prompt?: string;
  at: string;
}

export interface MoodLog {
  value: number;
  label: string;
  note?: string;
  tags?: string[];
  at: string;
}

export interface ChatMessage {
  from: 'ai' | 'user';
  text: string;
  at: number;
}

interface AppState {
  tone: Tone;
  setTone: (t: Tone) => void;
  profile: Profile;
  setProfile: (p: Partial<Profile>) => void;
  entries: Entry[];
  addEntry: (e: Omit<Entry, 'at'> & { at?: string }) => void;
  moodLog: MoodLog[];
  logMood: (m: Omit<MoodLog, 'at'> & { at?: string }) => void;
  noContactDays: number;
  setNoContactDays: (n: number) => void;
  resetNoContact: () => void;
  dayN: number;
  chat: ChatMessage[];
  setChat: (c: ChatMessage[]) => void;
}

const AppCtx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tone, setTone] = useState<Tone>('soft');
  const [profile, setProfileState] = useState<Profile>({
    name: '',
    them: '',
    when: '',
    story: '',
    onboarded: false,
  });
  const [entries, setEntries] = useState<Entry[]>([]);
  const [moodLog, setMoodLog] = useState<MoodLog[]>([]);
  const [noContactDays, setNoContactDays] = useState(0);
  const [dayN] = useState(1);
  const [chat, setChat] = useState<ChatMessage[]>([]);

  const setProfile = (p: Partial<Profile>) =>
    setProfileState(prev => ({ ...prev, ...p }));

  const addEntry = (e: Omit<Entry, 'at'> & { at?: string }) =>
    setEntries(prev => [{ ...e, at: e.at ?? new Date().toISOString() }, ...prev]);

  const logMood = (m: Omit<MoodLog, 'at'> & { at?: string }) =>
    setMoodLog(prev => [{ ...m, at: m.at ?? new Date().toISOString() }, ...prev]);

  const resetNoContact = () => setNoContactDays(0);

  return (
    <AppCtx.Provider value={{
      tone, setTone,
      profile, setProfile,
      entries, addEntry,
      moodLog, logMood,
      noContactDays, setNoContactDays, resetNoContact,
      dayN,
      chat, setChat,
    }}>
      {children}
    </AppCtx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
