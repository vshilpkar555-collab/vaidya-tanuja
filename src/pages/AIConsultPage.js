import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';
import BOT_RESPONSES from '../data/botResponses';
import IMAGES from '../data/images';

// ─── AI CONSULT PAGE ──────────────────────────────────────────────────────────
const AIConsultPage = () => {
  const { dosha, setCurrentPage } = useApp();
  const [messages, setMessages] = useState([{
    role: 'bot',
    text: `Namaste 🙏 I am Dr. Tanuja AI, your personalised Ayurvedic wellness guide. ${dosha ? `I see you are a ${dosha.charAt(0).toUpperCase() + dosha.slice(1)} type. ` : ''}How may I assist you today? Ask me about digestion, sleep, stress, immunity, skin health, or type "book appointment" to schedule a consultation.`,
  }]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef(null);

  const QUICK_PROMPTS = ['Improve digestion', 'Better sleep', 'Manage stress', 'Boost immunity', 'Clear skin', 'Book appointment'];

  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const getBotResponse = query => {
    const q = query.toLowerCase();
    if (q.includes('book') || q.includes('appointment')) return { text: BOT_RESPONSES.appointment, isBooking: true };
    if (q.includes('digest') || q.includes('stomach'))   return { text: BOT_RESPONSES.digestion };
    if (q.includes('sleep')  || q.includes('insomnia'))  return { text: BOT_RESPONSES.sleep };
    if (q.includes('stress') || q.includes('anxiety'))   return { text: BOT_RESPONSES.stress };
    if (q.includes('immun')  || q.includes('cold'))      return { text: BOT_RESPONSES.immunity };
    if (q.includes('skin')   || q.includes('acne'))      return { text: BOT_RESPONSES.skin };
    return { text: BOT_RESPONSES.default };
  };

  const sendMessage = (text = input) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const { text: botText, isBooking } = getBotResponse(text);
      setMessages(prev => [...prev, { role: 'bot', text: botText, isBooking }]);
      setLoading(false);
    }, 1200 + Math.random() * 600);
  };

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '100px 32px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <p style={{ color: 'var(--gold)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>AI-Powered Consultation</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 400, color: 'var(--green)', marginBottom: 8 }}>Dr. Tanuja AI</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Preliminary Ayurvedic guidance · Not a substitute for clinical consultation</p>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        {/* Chat header */}
        <div style={{ background: 'linear-gradient(135deg,var(--green),#1a3a17)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', position: 'relative', border: '2px solid rgba(255,255,255,0.3)', flexShrink: 0 }}>
            <img src={IMAGES.doctor} alt="Dr. Tanuja" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <span style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, background: '#4ADE80', borderRadius: '50%', border: '2px solid white' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 20, color: 'white', fontWeight: 500 }}>Dr. Tanuja AI</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Online · Powered by Ayurvedic Wisdom</div>
          </div>
          {dosha && (
            <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.15)', color: 'white', padding: '4px 12px', borderRadius: 12, fontSize: 12 }}>
              {dosha.charAt(0).toUpperCase() + dosha.slice(1)} Profile Active
            </span>
          )}
        </div>

        {/* Messages */}
        <div style={{ height: 400, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 16, background: '#FAFAF8' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', gap: 10, alignItems: 'flex-end', animation: 'fadeUp 0.3s ease' }}>
              {msg.role === 'bot' && (
                <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={IMAGES.doctor} alt="Dr." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div>
                <div className={`chat-bubble ${msg.role}`}>{msg.text}</div>
                {msg.isBooking && (
                  <button
                    onClick={() => setCurrentPage('book')}
                    style={{ marginTop: 8, background: 'var(--gold)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: 16, fontSize: 12, cursor: 'pointer', fontFamily: 'Jost', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <Icon name="calendar" size={14} color="white" /> Book Appointment →
                  </button>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden' }}>
                <img src={IMAGES.doctor} alt="Dr." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="chat-bubble bot" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{ width: 6, height: 6, background: 'var(--green)', borderRadius: '50%', animation: `pulseRing 1s ${i * 0.2}s ease-in-out infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEnd} />
        </div>

        {/* Quick prompts */}
        <div style={{ padding: '12px 24px', borderTop: '1px solid var(--green-pale)', display: 'flex', gap: 8, overflowX: 'auto' }}>
          {QUICK_PROMPTS.map(p => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              style={{ background: 'var(--green-pale)', border: 'none', padding: '6px 14px', borderRadius: 16, fontSize: 12, color: 'var(--green)', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Jost', fontWeight: 500, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.target.style.background = 'var(--green)'; e.target.style.color = 'white'; }}
              onMouseLeave={e => { e.target.style.background = 'var(--green-pale)'; e.target.style.color = 'var(--green)'; }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--green-pale)', display: 'flex', gap: 12 }}>
          <input
            className="input"
            placeholder="Ask about your health concerns..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            style={{ flex: 1 }}
          />
          <button className="btn-primary" onClick={() => sendMessage()} style={{ padding: '12px 20px' }}>
            <Icon name="send" size={16} />
          </button>
        </div>
      </div>

      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 16 }}>
        ⚠️ This AI provides general Ayurvedic information only. Please consult Vaidya Tanuja Jatav for clinical diagnosis and treatment.
      </p>
    </div>
  );
};

export default AIConsultPage;
