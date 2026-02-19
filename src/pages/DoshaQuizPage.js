import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';
import { QUIZ_QUESTIONS, DOSHA_INFO } from '../data/quizData';

// ─── DOSHA QUIZ PAGE ──────────────────────────────────────────────────────────
const DoshaQuizPage = () => {
  const { setDosha, setCurrentPage, showToast } = useApp();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult]   = useState(null);

  const handleAnswer = dosha => {
    const newAnswers = { ...answers, [current]: dosha };
    setAnswers(newAnswers);
    if (current < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => setCurrent(current + 1), 300);
    } else {
      const counts = { vata: 0, pitta: 0, kapha: 0 };
      Object.values(newAnswers).forEach(d => counts[d]++);
      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      setResult({ dosha: winner, counts });
    }
  };

  // ── Result screen ──────────────────────────────────────────────────────────
  if (result) {
    const info = DOSHA_INFO[result.dosha];
    return (
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '100px 32px 80px' }}>
        <div className="card" style={{ padding: '48px 40px', textAlign: 'center', animation: 'bounceIn 0.6s ease' }}>
          <div style={{ fontSize: 80, marginBottom: 16 }}>{info.emoji}</div>
          <p style={{ color: 'var(--gold)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>Your Prakriti is</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 52, fontWeight: 500, color: info.color, marginBottom: 16 }}>{info.title}</h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto 32px' }}>{info.desc}</p>

          {/* Score bars */}
          <div style={{ background: 'var(--cream-dark)', borderRadius: 12, padding: '24px', marginBottom: 32, textAlign: 'left' }}>
            {Object.entries(result.counts).map(([d, count]) => (
              <div key={d} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, textTransform: 'capitalize' }}>{d}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{count}/{QUIZ_QUESTIONS.length}</span>
                </div>
                <div style={{ height: 6, background: '#E0E0E0', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${(count / QUIZ_QUESTIONS.length) * 100}%`, background: d === 'vata' ? '#4338CA' : d === 'pitta' ? '#B45309' : '#065F46', borderRadius: 3, transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div style={{ textAlign: 'left', marginBottom: 32 }}>
            <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: 22, marginBottom: 16 }}>Lifestyle Recommendations</h4>
            {info.recommendations.map(r => (
              <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--green-pale)', fontSize: 14 }}>
                <Icon name="check" size={16} color="var(--green)" /> {r}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => { setDosha(result.dosha); showToast(`${result.dosha} Prakriti saved!`); setCurrentPage('book'); }}>
              <Icon name="calendar" size={16} /> Book Consultation
            </button>
            <button className="btn-outline" onClick={() => { setDosha(result.dosha); setCurrentPage('shop'); }}>
              Shop for {result.dosha.charAt(0).toUpperCase() + result.dosha.slice(1)}
            </button>
            <button className="btn-outline" onClick={() => { setCurrent(0); setAnswers({}); setResult(null); }}>
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Question screen ────────────────────────────────────────────────────────
  const q = QUIZ_QUESTIONS[current];
  const progress = (current / QUIZ_QUESTIONS.length) * 100;

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '100px 32px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <p style={{ color: 'var(--gold)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Prakriti Assessment</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 400, color: 'var(--green)' }}>Discover Your Dosha</h1>
      </div>

      <div className="card" style={{ padding: '40px' }}>
        {/* Progress */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Question {current + 1} of {QUIZ_QUESTIONS.length}</span>
            <span style={{ fontSize: 13, color: 'var(--green)', fontWeight: 500 }}>{Math.round(progress)}% Complete</span>
          </div>
          <div className="quiz-progress">
            <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: 26, fontWeight: 500, marginBottom: 32, lineHeight: 1.4 }}>
          {q.q}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt.dosha)}
              style={{
                background: answers[current] === opt.dosha ? 'var(--green)' : 'var(--cream)',
                color: answers[current] === opt.dosha ? 'white' : 'var(--text)',
                border: `1.5px solid ${answers[current] === opt.dosha ? 'var(--green)' : 'var(--green-pale)'}`,
                padding: '16px 20px', borderRadius: 8, cursor: 'pointer',
                fontFamily: 'Jost', fontSize: 14, lineHeight: 1.6, textAlign: 'left', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (answers[current] !== opt.dosha) { e.currentTarget.style.background = 'var(--green-pale)'; e.currentTarget.style.borderColor = 'var(--green)'; }}}
              onMouseLeave={e => { if (answers[current] !== opt.dosha) { e.currentTarget.style.background = 'var(--cream)'; e.currentTarget.style.borderColor = 'var(--green-pale)'; }}}
            >
              <span style={{ fontWeight: 600, marginRight: 8, color: 'var(--gold)' }}>{String.fromCharCode(65 + i)}.</span>
              {opt.text}
            </button>
          ))}
        </div>

        {current > 0 && (
          <button
            onClick={() => setCurrent(current - 1)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 13, marginTop: 20, display: 'flex', alignItems: 'center', gap: 6 }}
          >
            ← Previous Question
          </button>
        )}
      </div>
    </div>
  );
};

export default DoshaQuizPage;
