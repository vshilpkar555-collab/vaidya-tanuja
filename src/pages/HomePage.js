import Mandala from '../components/Mandala';
import ProductCard from '../components/ProductCard';
import Icon from '../components/Icon';
import { useApp } from '../context/AppContext';
import PRODUCTS from '../data/products';
import IMAGES from '../data/images';

// ─── HERO ─────────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const { setCurrentPage } = useApp();
  return (
    <section style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <img src={IMAGES.hero_bg} alt="Ayurvedic nature" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(13,31,12,0.92) 0%,rgba(45,90,39,0.85) 40%,rgba(45,90,39,0.6) 70%,rgba(0,0,0,0.3) 100%)', zIndex: 1 }} />
      <Mandala size={600} style={{ top: -100, right: -100, zIndex: 2 }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 32px 80px', position: 'relative', zIndex: 3 }}>
        <div style={{ maxWidth: 680 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, animation: 'fadeUp 0.8s ease' }}>
            <div style={{ width: 32, height: 1, background: 'var(--gold)' }} />
            <span style={{ color: 'var(--gold)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>Ancient Wisdom · Modern Science</span>
          </div>

          <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(48px,7vw,88px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.05, marginBottom: 8, animation: 'fadeUp 0.8s 0.1s ease both' }}>
            Healing Rooted
          </h1>
          <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(48px,7vw,88px)', fontWeight: 600, fontStyle: 'italic', lineHeight: 1.05, marginBottom: 24, animation: 'fadeUp 0.8s 0.2s ease both', background: 'linear-gradient(135deg,var(--gold-light),var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            in Nature's Truth
          </h1>

          <p style={{ fontSize: 18, color: 'rgba(253,251,247,0.8)', lineHeight: 1.8, marginBottom: 40, maxWidth: 520, animation: 'fadeUp 0.8s 0.3s ease both' }}>
            Welcome to Vaidya Tanuja Jatav's digital clinic. Discover your Prakriti, book a personal consultation, and shop curated Ayurvedic remedies.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', animation: 'fadeUp 0.8s 0.4s ease both' }}>
            <button className="btn-gold" onClick={() => setCurrentPage('book')}>
              <Icon name="calendar" size={16} color="white" /> Book Appointment
            </button>
            <button className="btn-outline" onClick={() => setCurrentPage('quiz')} style={{ borderColor: 'rgba(253,251,247,0.4)', color: 'var(--cream)' }}>
              Discover Your Dosha
            </button>
          </div>

          <div style={{ display: 'flex', gap: 48, marginTop: 64, animation: 'fadeUp 0.8s 0.5s ease both' }}>
            {[['5000+', 'Patients Healed'], ['15+', 'Years Practice'], ['100%', 'Natural Herbs']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 36, fontWeight: 600, color: 'var(--gold)' }}>{num}</div>
                <div style={{ fontSize: 12, color: 'rgba(253,251,247,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <svg style={{ position: 'absolute', bottom: -1, left: 0, right: 0, width: '100%', zIndex: 3 }} viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,80 C360,20 720,60 1080,20 C1260,0 1360,40 1440,20 L1440,80 Z" fill="#FDFBF7" />
      </svg>
    </section>
  );
};

// ─── DOSHA SECTION ────────────────────────────────────────────────────────────
const DoshaSection = () => {
  const { setCurrentPage } = useApp();
  const doshas = [
    { name: 'Vata',  emoji: '💨', elements: 'Air & Ether',   color: '#4338CA', bg: '#EEF2FF', traits: ['Creative','Energetic','Quick-minded'],  imbalance: 'Anxiety, insomnia, dry skin' },
    { name: 'Pitta', emoji: '🔥', elements: 'Fire & Water',  color: '#B45309', bg: '#FEF3C7', traits: ['Focused','Ambitious','Passionate'],      imbalance: 'Irritability, inflammation, acidity' },
    { name: 'Kapha', emoji: '🌊', elements: 'Earth & Water', color: '#065F46', bg: '#ECFDF5', traits: ['Calm','Nurturing','Grounded'],           imbalance: 'Lethargy, weight gain, congestion' },
  ];
  return (
    <section style={{ padding: '80px 32px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <p style={{ color: 'var(--gold)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>The Three Energies</p>
        <h2 style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 400, color: 'var(--green)', marginBottom: 16 }}>What is Your <em>Prakriti</em>?</h2>
        <div className="divider" />
        <p style={{ maxWidth: 560, margin: '16px auto 0', color: 'var(--text-muted)', lineHeight: 1.8 }}>
          Ayurveda teaches that every individual is a unique combination of three fundamental energies — the Tridosha. Understanding yours is the key to lasting health.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="grid-cols-3">
        {doshas.map(d => (
          <div key={d.name} className="card" style={{ padding: '36px 28px', border: `1px solid ${d.color}20` }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{d.emoji}</div>
            <h3 style={{ fontSize: 28, fontWeight: 500, color: d.color, marginBottom: 4 }}>{d.name}</h3>
            <p style={{ fontSize: 12, letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 20 }}>{d.elements}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
              {d.traits.map(t => <span key={t} style={{ background: d.bg, color: d.color, padding: '4px 10px', borderRadius: 12, fontSize: 12, fontWeight: 500 }}>{t}</span>)}
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}><strong>When imbalanced:</strong> {d.imbalance}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <button className="btn-primary" onClick={() => setCurrentPage('quiz')}>
          <Icon name="quiz" size={16} /> Take the Dosha Assessment
        </button>
      </div>
    </section>
  );
};

// ─── APPOINTMENT BANNER ───────────────────────────────────────────────────────
const AppointmentBanner = () => {
  const { setCurrentPage } = useApp();
  return (
    <section style={{ padding: '0 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg,var(--green) 0%,#1a3a17 50%,#3d7a33 100%)', borderRadius: 20, padding: '48px 56px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center', position: 'relative', overflow: 'hidden', margin: '80px 0' }} className="grid-cols-2">
          <Mandala size={300} style={{ right: 200, top: -80 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ color: 'var(--gold)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Personalized Ayurvedic Care</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(24px,3vw,40px)', fontWeight: 400, color: 'white', marginBottom: 12, lineHeight: 1.3 }}>
              Consult with Vaidya Tanuja Jatav — In Person or Online
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.7, maxWidth: 540 }}>
              Get a personalised Nadi Pariksha (pulse diagnosis), Prakriti assessment, and herbal prescription from a certified Ayurvedic physician with 15+ years of experience.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
              {[{ icon: '🫀', text: 'Pulse Diagnosis' }, { icon: '🌿', text: 'Custom Herbs' }, { icon: '💻', text: 'Online Available' }].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: 20 }}>
                  {icon} {text}
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', zIndex: 1, flexShrink: 0, textAlign: 'center' }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', width: 220, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', border: '3px solid rgba(201,168,76,0.4)', margin: '0 auto' }}>
              <img src={IMAGES.doctor} alt="Vaidya" style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }} />
            </div>
            <button className="btn-gold" onClick={() => setCurrentPage('book')} style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 24px rgba(201,168,76,0.5)' }}>
              <Icon name="calendar" size={16} color="white" /> Book Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── FEATURED PRODUCTS ────────────────────────────────────────────────────────
const FeaturedProducts = () => {
  const { setCurrentPage } = useApp();
  const featured = PRODUCTS.filter(p => p.featured);
  return (
    <section style={{ padding: '80px 32px', background: 'var(--cream-dark)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ color: 'var(--gold)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Curated Formulations</p>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--green)' }}>Vaidya's <em>Selections</em></h2>
          <div className="divider" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }} className="grid-cols-4">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button className="btn-outline" onClick={() => setCurrentPage('shop')}>
            View All Remedies <Icon name="arrow" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────
const AboutSection = () => (
  <section style={{ padding: '80px 32px', maxWidth: 1280, margin: '0 auto' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="grid-cols-2">
      <div>
        <p style={{ color: 'var(--gold)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>About Vaidya Tanuja Jatav</p>
        <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--green)', lineHeight: 1.2, marginBottom: 20 }}>
          Healing Through the <em>Science of Life</em>
        </h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 20, fontSize: 15 }}>
          With over 15 years of clinical Ayurvedic practice, Vaidya Tanuja Jatav combines the ancient wisdom of Charaka Samhita with modern diagnostics to offer truly personalised healthcare.
        </p>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 32, fontSize: 15 }}>
          Every formulation in our collection is personally curated by Vaidya Ji — sourced from ethical farms, prepared using traditional methods, and tested for potency before reaching you.
        </p>
        <div style={{ display: 'flex', gap: 32 }}>
          {[['BAMS','Degree'], ['MD','Ayurveda'], ['15+','Years']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 32, fontWeight: 600, color: 'var(--gold)' }}>{val}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-lg)', position: 'relative' }}>
        <img src={IMAGES.ayurveda_bg} alt="Ayurvedic practice" style={{ width: '100%', height: 400, objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 40%,rgba(13,31,12,0.75))', display: 'flex', alignItems: 'flex-end', padding: '32px' }}>
          <blockquote style={{ fontFamily: 'Cormorant Garamond', fontSize: 20, fontStyle: 'italic', color: 'rgba(253,251,247,0.95)', lineHeight: 1.5 }}>
            "Ayurveda is not merely a system of medicine — it is the art of living in harmony with nature."
            <cite style={{ display: 'block', color: 'var(--gold)', fontSize: 14, marginTop: 12, fontStyle: 'normal' }}>— Vaidya Tanuja Jatav</cite>
          </blockquote>
        </div>
      </div>
    </div>
  </section>
);

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const Testimonials = () => (
  <section style={{ padding: '80px 32px', background: 'var(--green)', position: 'relative', overflow: 'hidden' }}>
    <Mandala size={500} style={{ right: -100, top: -100 }} />
    <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <p style={{ color: 'var(--gold)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Patient Stories</p>
        <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 400, color: 'var(--cream)' }}>Lives <em>Transformed</em></h2>
        <div className="divider" style={{ background: 'linear-gradient(90deg,var(--gold),var(--gold-light))' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="grid-cols-3">
        {[
          { name: 'Meera R.',  city: 'Bhopal',  text: 'After 3 months on Vaidya Ji\'s protocol, my chronic digestive issues have completely resolved. Triphala is miraculous.' },
          { name: 'Suresh K.', city: 'Indore',  text: 'The Dosha quiz was an eye-opener. Understanding my Vata nature transformed my sleep and anxiety completely.' },
          { name: 'Kavita M.', city: 'Delhi',   text: 'Chyawanprash Gold has given my family a new lease on health. My children haven\'t had a cold in 6 months!' },
        ].map(t => (
          <div key={t.name} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: '28px' }}>
            <div style={{ color: 'var(--gold)', fontSize: 20, marginBottom: 16 }}>★★★★★</div>
            <p style={{ color: 'rgba(253,251,247,0.85)', lineHeight: 1.8, marginBottom: 20, fontSize: 15, fontStyle: 'italic' }}>"{t.text}"</p>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--cream)' }}>{t.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(253,251,247,0.5)' }}>{t.city}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── CTA + FOOTER ─────────────────────────────────────────────────────────────
const CtaSection = () => {
  const { setCurrentPage } = useApp();
  return (
    <section style={{ padding: '80px 32px', textAlign: 'center', background: 'var(--gold-pale)' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(28px,4vw,48px)', color: 'var(--green)', marginBottom: 16 }}>Begin Your Healing Journey</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>Take the Dosha quiz, book an appointment, or consult Dr. Tanuja AI — all paths lead to balance, health, and vitality.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => setCurrentPage('book')}><Icon name="calendar" size={16} /> Book Appointment</button>
          <button className="btn-outline" onClick={() => setCurrentPage('quiz')}><Icon name="quiz" size={16} /> Take Dosha Quiz</button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { setCurrentPage } = useApp();
  return (
    <footer style={{ background: '#0D1F0C', padding: '48px 32px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }} className="grid-cols-4">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 24 }}>🌿</span>
              <div>
                <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 18, color: 'var(--cream)', fontWeight: 600 }}>Vaidya Tanuja Jatav</div>
                <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Ayurvedic Wellness</div>
              </div>
            </div>
            <p style={{ color: 'rgba(253,251,247,0.5)', fontSize: 14, lineHeight: 1.8 }}>Ancient Ayurvedic wisdom, curated for the modern soul. Heal from within.</p>
          </div>
          {[
            { title: 'Healing', links: [['Shop All','shop'],['Dosha Quiz','quiz'],['AI Consult','consult']] },
            { title: 'Consult', links: [['Book Appointment','book'],['Nadi Pariksha','book'],['Online Consult','book']] },
            { title: 'Account', links: [['My Account','account'],['My Orders','account'],['Wishlist','account']] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: 18, color: 'var(--cream)', marginBottom: 16 }}>{col.title}</h4>
              {col.links.map(([label, page]) => (
                <div key={label} onClick={() => setCurrentPage(page)} style={{ fontSize: 14, color: 'rgba(253,251,247,0.5)', marginBottom: 8, cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.target.style.color = 'var(--gold)'; }}
                  onMouseLeave={e => { e.target.style.color = 'rgba(253,251,247,0.5)'; }}>
                  {label}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: 'rgba(253,251,247,0.3)' }}>© 2026 Vaidya Tanuja Jatav. All rights reserved.</p>
          <p style={{ fontSize: 13, color: 'rgba(253,251,247,0.3)' }}>Crafted with 🌿 and Ayurvedic wisdom</p>
        </div>
      </div>
    </footer>
  );
};

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
const HomePage = () => (
  <>
    <HeroSection />
    <DoshaSection />
    <FeaturedProducts />
    <AppointmentBanner />
    <AboutSection />
    <Testimonials />
    <CtaSection />
    <Footer />
  </>
);

export default HomePage;
