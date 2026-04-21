import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
  query,
  orderBy,
  limit,
  where,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Mod } from '../types';

const COL = 'mods';

export async function getAllMods(): Promise<Mod[]> {
  const snapshot = await getDocs(collection(db, COL));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Mod));
}

export async function getModBySlug(slug: string): Promise<Mod | null> {
  const q = query(collection(db, COL), where('slug', '==', slug), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const d = snapshot.docs[0];
  return { id: d.id, ...d.data() } as Mod;
}

export async function getFeaturedMods(): Promise<Mod[]> {
  const q = query(collection(db, COL), orderBy('downloadCount', 'desc'), limit(3));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Mod));
}

export async function getLatestMods(): Promise<Mod[]> {
  const q = query(collection(db, COL), orderBy('createdAt', 'desc'), limit(8));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Mod));
}

export async function getTrendingMods(): Promise<Mod[]> {
  const q = query(collection(db, COL), orderBy('downloadCount', 'desc'), limit(6));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Mod));
}

export async function incrementDownloadCount(modId: string): Promise<void> {
  const modRef = doc(db, COL, modId);
  await updateDoc(modRef, { downloadCount: increment(1) });
}

export async function createMod(data: Omit<Mod, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, COL), data);
  return ref.id;
}

export async function updateMod(id: string, data: Partial<Omit<Mod, 'id'>>): Promise<void> {
  await updateDoc(doc(db, COL, id), data);
}

export async function deleteMod(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}

export async function getModById(id: string): Promise<Mod | null> {
  const { getDoc } = await import('firebase/firestore');
  const snap = await getDoc(doc(db, COL, id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Mod) : null;
}

export async function isSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  const q = query(collection(db, COL), where('slug', '==', slug), limit(2));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return false;
  if (excludeId) {
    return snapshot.docs.some(d => d.id !== excludeId);
  }
  return true;
}
