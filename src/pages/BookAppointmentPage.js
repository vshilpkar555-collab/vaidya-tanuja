import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';
import Mandala from '../components/Mandala';
import { CONSULTATION_TYPES, BOOKED_SLOTS, TIME_SLOTS } from '../data/appointmentData';
import IMAGES from '../data/images';

// ─── BOOK APPOINTMENT PAGE ────────────────────────────────────────────────────
const BookAppointmentPage = () => {
  const { showToast, user } = useApp();
  const [step, setStep]               = useState(1);
  const [selectedType, setSelectedType]   = useState(null);
  const [selectedDate, setSelectedDate]   = useState(null);
  const [selectedTime, setSelectedTime]   = useState(null);
  const [calendarDate, setCalendarDate]   = useState(new Date(2026, 1, 1));
  const [form, setForm] = useState({ name: user?.name || '', email: '', phone: '', concern: '', mode: 'in-person' });

  const today = new Date(2026, 1, 19);

  const year  = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const daysInMonth   = new Date(year, month + 1, 0).getDate();
  const firstDay      = new Date(year, month, 1).getDay();
  const MONTH_NAMES   = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DAY_NAMES     = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const fmtDate = (y, m, d) => `${y}-${String(m + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  const isPast  = day => new Date(year, month, day) < today;
  const isToday = day => year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
  const isBooked = slot => (BOOKED_SLOTS[selectedDate] || []).includes(slot);

  const confirmationId = `VT-${Math.random().toString(36).substr(2,8).toUpperCase()}`;

  // ── Step 4: Confirmed ────────────────────────────────────────────────────
  if (step === 4) {
    const typeInfo = CONSULTATION_TYPES.find(t => t.id === selectedType);
    return (
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '100px 32px 80px' }}>
        <div className="card" style={{ padding: '48px 40px', textAlign: 'center', animation: 'bounceIn 0.6s ease' }}>
          <div style={{ width: 80, height: 80, background: 'var(--green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 36, color: 'white' }}>✓</div>
          <p style={{ color: 'var(--gold)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Booking Confirmed</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 42, fontWeight: 400, color: 'var(--green)', marginBottom: 8 }}>
            Namaste, {form.name}! 🙏
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.7 }}>
            Your appointment has been booked. Vaidya Tanuja Jatav will be ready to guide your healing journey.
          </p>

          <div style={{ background: 'var(--cream-dark)', borderRadius: 12, padding: '28px', marginBottom: 32, textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[
                { label: 'Confirmation ID',   value: confirmationId },
                { label: 'Consultation Type', value: typeInfo?.name },
                { label: 'Date',              value: selectedDate },
                { label: 'Time',              value: selectedTime },
                { label: 'Duration',          value: typeInfo?.duration },
                { label: 'Mode',              value: form.mode === 'online' ? 'Online (Video Call)' : 'In-Person' },
                { label: 'Fee',               value: `₹${typeInfo?.price}` },
                { label: 'Status',            value: 'Confirmed ✓' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontWeight: 600, color: label === 'Status' ? 'var(--green)' : 'var(--text)', fontSize: 14 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--green-pale)', borderRadius: 8, padding: '16px', marginBottom: 28, borderLeft: '3px solid var(--green)', textAlign: 'left' }}>
            <p style={{ fontSize: 14, color: 'var(--green)', lineHeight: 1.7 }}>
              <strong>What to bring:</strong> Any previous medical reports, list of current medications, and a summary of your main health concerns. Please arrive 10 minutes early.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => showToast('Confirmation sent to ' + form.email)}>
              <Icon name="send" size={16} /> Email Confirmation
            </button>
            <button className="btn-outline" onClick={() => { setStep(1); setSelectedType(null); setSelectedDate(null); setSelectedTime(null); }}>
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 32px 80px' }}>
      {/* Header */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, marginBottom: 56, alignItems: 'center' }} className="grid-cols-2">
        <div>
          <p style={{ color: 'var(--gold)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Schedule a Consultation</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(32px,4vw,56px)', fontWeight: 400, color: 'var(--green)', lineHeight: 1.2, marginBottom: 16 }}>
            Book an Appointment with <em>Vaidya Ji</em>
          </h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 15, marginBottom: 24 }}>
            Experience personalised Ayurvedic care with Vaidya Tanuja Jatav — BAMS, MD (Ayurveda) with 15+ years of clinical practice.
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[{ icon: '🔒', text: 'Confidential' }, { icon: '📋', text: 'Personalised Protocol' }, { icon: '💻', text: 'Online Available' }].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>{icon} {text}</div>
            ))}
          </div>
        </div>
        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-lg)', position: 'relative' }}>
          <img src={IMAGES.doctor} alt="Vaidya Tanuja Jatav" style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent,rgba(13,31,12,0.85))', padding: '24px 20px 16px' }}>
            <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 20, color: 'white', fontWeight: 500 }}>Vaidya Tanuja Jatav</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>BAMS, MD (Ayurveda) · 15+ Years Practice</div>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 48 }}>
        {[{ num: 1, label: 'Consultation Type' }, { num: 2, label: 'Date & Time' }, { num: 3, label: 'Your Details' }].map(({ num, label }, i) => (
          <div key={num} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, background: step >= num ? 'var(--green)' : 'var(--green-pale)', color: step >= num ? 'white' : 'var(--text-muted)', transition: 'all 0.3s', flexShrink: 0 }}>
                {step > num ? '✓' : num}
              </div>
              <span className="hide-mobile" style={{ fontSize: 13, fontWeight: 500, color: step >= num ? 'var(--green)' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>{label}</span>
            </div>
            {i < 2 && <div style={{ flex: 1, height: 2, background: step > num ? 'var(--green)' : 'var(--green-pale)', margin: '0 12px', transition: 'all 0.3s' }} />}
          </div>
        ))}
      </div>

      {/* ── STEP 1: Type ────────────────────────────────────────────────────── */}
      {step === 1 && (
        <div style={{ animation: 'calSlide 0.4s ease' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 32, color: 'var(--green)', marginBottom: 8 }}>Choose Consultation Type</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Select the type of consultation that best fits your needs.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20, marginBottom: 40 }} className="grid-cols-2">
            {CONSULTATION_TYPES.map(type => (
              <div
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                style={{ padding: '28px', borderRadius: 12, border: `2px solid ${selectedType === type.id ? 'var(--green)' : '#e0e0e0'}`, cursor: 'pointer', transition: 'all 0.2s', background: selectedType === type.id ? 'var(--green-pale)' : 'white', transform: selectedType === type.id ? 'scale(1.01)' : 'scale(1)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ fontSize: 36 }}>{type.icon}</div>
                  {selectedType === type.id && (
                    <div style={{ width: 24, height: 24, background: 'var(--green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name="check" size={14} color="white" />
                    </div>
                  )}
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 22, fontWeight: 600, marginBottom: 4 }}>{type.name}</h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{type.subtitle}</p>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>{type.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)' }}>
                    <Icon name="clock" size={14} color="var(--gold)" /> {type.duration}
                  </div>
                  <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 22, fontWeight: 700, color: 'var(--green)' }}>₹{type.price}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={() => selectedType && setStep(2)} disabled={!selectedType}>
              Continue <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: Calendar & Time ──────────────────────────────────────────── */}
      {step === 2 && (
        <div style={{ animation: 'calSlide 0.4s ease' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 32, color: 'var(--green)', marginBottom: 8 }}>Pick a Date & Time</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Select your preferred slot. Greyed-out slots are already booked.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 40 }} className="grid-cols-2">
            {/* Calendar */}
            <div className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <button onClick={() => setCalendarDate(new Date(year, month - 1, 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: 'var(--green)', padding: '4px 8px' }}>‹</button>
                <span style={{ fontFamily: 'Cormorant Garamond', fontSize: 22, fontWeight: 500 }}>{MONTH_NAMES[month]} {year}</span>
                <button onClick={() => setCalendarDate(new Date(year, month + 1, 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: 'var(--green)', padding: '4px 8px' }}>›</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginBottom: 8 }}>
                {DAY_NAMES.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', padding: '4px 0' }}>{d}</div>)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day     = i + 1;
                  const dateStr = fmtDate(year, month, day);
                  const past    = isPast(day);
                  const isSun   = new Date(year, month, day).getDay() === 0;
                  const sel     = selectedDate === dateStr;
                  return (
                    <div
                      key={day}
                      className={`cal-day ${past || isSun ? 'past' : ''} ${sel ? 'selected' : ''} ${isToday(day) && !sel ? 'today' : ''}`}
                      onClick={() => !past && !isSun && (setSelectedDate(dateStr), setSelectedTime(null))}
                      style={{ opacity: isSun ? 0.3 : 1 }}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 16, textAlign: 'center' }}>Sundays closed · Past dates unavailable</p>
            </div>

            {/* Time slots */}
            <div className="card" style={{ padding: '28px' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 22, marginBottom: 6 }}>
                {selectedDate ? `Slots for ${selectedDate}` : 'Select a date first'}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Clinic hours: 9 AM – 6 PM (Mon – Sat)</p>
              {selectedDate ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      className={`time-slot ${isBooked(slot) ? 'booked' : ''} ${selectedTime === slot ? 'selected' : ''}`}
                      onClick={() => !isBooked(slot) && setSelectedTime(slot)}
                    >
                      {slot}{isBooked(slot) ? ' (Full)' : ''}
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200, color: 'var(--text-muted)' }}>
                  <Icon name="calendar" size={36} color="var(--green-pale)" />
                  <p style={{ marginTop: 12, fontSize: 14 }}>Choose a date to see available slots</p>
                </div>
              )}
              {selectedDate && selectedTime && (
                <div style={{ marginTop: 20, background: 'var(--green-pale)', borderRadius: 8, padding: '14px', borderLeft: '3px solid var(--green)' }}>
                  <p style={{ fontSize: 14, color: 'var(--green)', fontWeight: 600 }}>✦ Selected: {selectedDate} at {selectedTime}</p>
                </div>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn-outline" onClick={() => setStep(1)}>← Back</button>
            <button className="btn-primary" onClick={() => selectedDate && selectedTime && setStep(3)} disabled={!selectedDate || !selectedTime}>
              Continue <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Patient Details ──────────────────────────────────────────── */}
      {step === 3 && (
        <div style={{ animation: 'calSlide 0.4s ease' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 32, color: 'var(--green)', marginBottom: 8 }}>Your Details</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Fill in your information to complete the booking.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, alignItems: 'flex-start' }} className="grid-cols-2">
            {/* Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Mode */}
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 10, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Mode of Consultation</label>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[{ id: 'in-person', label: 'In-Person', icon: 'phone' }, { id: 'online', label: 'Online (Video)', icon: 'video' }].map(({ id, label, icon }) => (
                    <button
                      key={id}
                      onClick={() => setForm({ ...form, mode: id })}
                      style={{ flex: 1, padding: '14px', border: `2px solid ${form.mode === id ? 'var(--green)' : '#e0e0e0'}`, borderRadius: 8, background: form.mode === id ? 'var(--green-pale)' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'Jost', fontSize: 14, fontWeight: 500, color: form.mode === id ? 'var(--green)' : 'var(--text)', transition: 'all 0.2s' }}
                    >
                      <Icon name={icon} size={16} color={form.mode === id ? 'var(--green)' : 'var(--text-muted)'} /> {label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="grid-cols-2">
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Full Name *</label>
                  <input className="input" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Phone *</label>
                  <input className="input" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Email Address *</label>
                <input className="input" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Primary Health Concern</label>
                <textarea className="input" placeholder="Briefly describe your main health concern..." value={form.concern} onChange={e => setForm({ ...form, concern: e.target.value })}
                  style={{ minHeight: 100, resize: 'vertical', lineHeight: 1.6 }} />
              </div>

              <div style={{ background: 'var(--gold-pale)', borderRadius: 8, padding: '16px', borderLeft: '3px solid var(--gold)' }}>
                <p style={{ fontSize: 13, color: 'var(--brown)', lineHeight: 1.7 }}>
                  <strong>Privacy Notice:</strong> Your health information is kept strictly confidential and used only for your consultation.
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="card" style={{ padding: '28px', position: 'sticky', top: 100 }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 24, marginBottom: 20 }}>Booking Summary</h3>
              {(() => {
                const type = CONSULTATION_TYPES.find(t => t.id === selectedType);
                return (
                  <>
                    <div style={{ background: 'var(--cream-dark)', borderRadius: 8, padding: '16px', marginBottom: 20 }}>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>{type?.icon}</div>
                      <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{type?.name}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{type?.subtitle} · {type?.duration}</div>
                    </div>
                    {[
                      { label: 'Date', value: selectedDate, icon: 'calendar' },
                      { label: 'Time', value: selectedTime, icon: 'clock' },
                      { label: 'Mode', value: form.mode === 'online' ? 'Online Video' : 'In-Person', icon: 'video' },
                    ].map(({ label, value, icon }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--green-pale)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-muted)' }}>
                          <Icon name={icon} size={14} color="var(--gold)" /> {label}
                        </div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{value}</div>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderTop: '2px solid var(--green-pale)', marginTop: 8 }}>
                      <span style={{ fontFamily: 'Cormorant Garamond', fontSize: 20, fontWeight: 600 }}>Total</span>
                      <span style={{ fontFamily: 'Cormorant Garamond', fontSize: 24, fontWeight: 700, color: 'var(--green)' }}>₹{type?.price}</span>
                    </div>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 16 }}>Payment collected at clinic / via payment link</p>
                  </>
                );
              })()}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  className="btn-primary"
                  style={{ justifyContent: 'center' }}
                  onClick={() => {
                    if (!form.name || !form.email || !form.phone) { showToast('Please fill all required fields'); return; }
                    setStep(4);
                    showToast('Appointment booked successfully! 🙏');
                  }}
                >
                  <Icon name="check" size={16} /> Confirm Booking
                </button>
                <button className="btn-outline" onClick={() => setStep(2)}>← Change Date/Time</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointmentPage;
