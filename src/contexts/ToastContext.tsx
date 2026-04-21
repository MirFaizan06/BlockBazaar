import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration: number;
}

interface ToastCtx {
  toasts: ToastItem[];
  add: (type: ToastType, title: string, message?: string, duration?: number) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const add = useCallback((type: ToastType, title: string, message?: string, duration = 4000) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts(p => [...p, { id, type, title, message, duration }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), duration + 400);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts(p => p.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, add, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToastCtx() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToastCtx must be inside ToastProvider');
  return ctx;
}

export function useToast() {
  const { add } = useToastCtx();
  return {
    success: (title: string, message?: string) => add('success', title, message),
    error: (title: string, message?: string) => add('error', title, message),
    warning: (title: string, message?: string) => add('warning', title, message),
    info: (title: string, message?: string) => add('info', title, message),
  };
}
