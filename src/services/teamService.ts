import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { TeamMember } from '../types';

const COL = 'teamMembers';

export async function getTeamMembers(): Promise<TeamMember[]> {
  const q = query(collection(db, COL), orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as TeamMember));
}

export async function createTeamMember(data: Omit<TeamMember, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, COL), data);
  return ref.id;
}

export async function updateTeamMember(
  id: string,
  data: Partial<Omit<TeamMember, 'id'>>
): Promise<void> {
  await updateDoc(doc(db, COL, id), data);
}

export async function deleteTeamMember(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
