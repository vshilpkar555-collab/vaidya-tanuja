// ─── CONSULTATION TYPES ───────────────────────────────────────────────────────
export const CONSULTATION_TYPES = [
  {
    id: 'pulse',
    name: 'Nadi Pariksha',
    subtitle: 'Pulse Diagnosis',
    duration: '60 min',
    price: 800,
    icon: '🫀',
    desc: 'Ancient pulse reading to determine your dosha imbalances and health status with precision.',
  },
  {
    id: 'prakriti',
    name: 'Prakriti Assessment',
    subtitle: 'Body Constitution',
    duration: '90 min',
    price: 1200,
    icon: '🔬',
    desc: 'Comprehensive evaluation of your unique mind-body constitution with a personalized protocol.',
  },
  {
    id: 'followup',
    name: 'Follow-up Consultation',
    subtitle: 'Progress Review',
    duration: '30 min',
    price: 400,
    icon: '📋',
    desc: 'Review your progress and fine-tune your herbal and lifestyle protocol with Vaidya Ji.',
  },
  {
    id: 'online',
    name: 'Online Teleconsultation',
    subtitle: 'Secure Video Call',
    duration: '45 min',
    price: 600,
    icon: '💻',
    desc: 'Consult with Vaidya Ji from the comfort of your home via a secure, encrypted video call.',
  },
];

// ─── PRE-BOOKED SLOTS (demo data) ─────────────────────────────────────────────
export const BOOKED_SLOTS = {
  '2026-02-25': ['10:00 AM', '2:00 PM'],
  '2026-02-26': ['11:00 AM', '4:00 PM', '5:00 PM'],
  '2026-03-02': ['9:00 AM', '3:00 PM'],
};

// ─── AVAILABLE TIME SLOTS ─────────────────────────────────────────────────────
export const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
];
