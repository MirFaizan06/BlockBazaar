import { signInWithEmailAndPassword, signOut as fbSignOut } from 'firebase/auth';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export async function adminSignIn(displayId: string, password: string): Promise<void> {
  if (!displayId?.trim() || !password?.trim()) {
    throw new Error('All fields are required');
  }

  const q = query(
    collection(db, 'admins'),
    where('displayId', '==', displayId.trim()),
    limit(1),
  );
  const snap = await getDocs(q);
  if (snap.empty) {
    throw new Error('Invalid credentials');
  }

  const adminDoc = snap.docs[0];
  const email = adminDoc.data().email as string;
  if (!email) {
    throw new Error('Invalid credentials');
  }

  const credential = await signInWithEmailAndPassword(auth, email, password);
  if (credential.user.uid !== adminDoc.id) {
    await fbSignOut(auth);
    throw new Error('Unauthorized');
  }
}

export async function adminSignOut(): Promise<void> {
  await fbSignOut(auth);
}
