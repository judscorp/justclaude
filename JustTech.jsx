import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
const FILTERS = ["Todos", "Automação", "Sistemas internos", "Landing pages", "Dashboards", "Ferramentas de gestão"];

const PROJECTS = [
  {
    id: 1,
    title: "AutoAtend — Atendimento Automático",
    category: "Automação",
    description: "Bot inteligente que responde clientes no WhatsApp 24/7 com integração a CRM.",
    tools: ["n8n", "OpenAI", "WhatsApp API"],
    color: "#0d3320",
    icon: "⚡",
    problem: "Uma clínica recebia mais de 200 mensagens por dia e não conseguia responder rápido o suficiente, perdendo pacientes.",
    solution: "Implantamos um fluxo automatizado no n8n integrado ao WhatsApp e GPT-4, capaz de agendar, responder dúvidas e encaminhar casos urgentes para atendentes humanos.",
    possibilities: "Redução de 80% do tempo de resposta, atendimento 24/7, histórico centralizado e relatórios automáticos de atendimento."
  },
  {
    id: 2,
    title: "PedidoFácil — Sistema de Pedidos",
    category: "Sistemas internos",
    description: "App de pedidos para restaurantes com painel admin e relatórios em tempo real.",
    tools: ["Glide", "Google Sheets", "Make"],
    color: "#0a2e1a",
    icon: "🧾",
    problem: "Uma rede de restaurantes perdia pedidos por anotar tudo em papel, causando confusão na cozinha e clientes insatisfeitos.",
    solution: "Sistema mobile feito no Glide integrado a Google Sheets e Make para automação de notificações, controle de estoque e relatórios de vendas.",
    possibilities: "Zero pedidos perdidos, visibilidade total do estoque e relatórios automáticos diários para o gestor."
  },
  {
    id: 3,
    title: "NexDash — Dashboard de Controle",
    category: "Dashboards",
    description: "Painel visual de KPIs com dados em tempo real para tomada de decisão rápida.",
    tools: ["Looker Studio", "Google Sheets", "Make"],
    color: "#0d2e10",
    icon: "📊",
    problem: "Um e-commerce não sabia quais produtos vendiam mais, quais campanhas retornavam lucro nem qual era a margem real.",
    solution: "Dashboard interativo no Looker Studio conectado às planilhas de vendas, campanhas e custos, atualizado automaticamente a cada hora.",
    possibilities: "Decisões baseadas em dados, identificação rápida de gargalos e aumento de 30% na margem após otimizações guiadas pelos dados."
  },
  {
    id: 4,
    title: "Portfólio Visual — Landing Page",
    category: "Landing pages",
    description: "Site de apresentação de alto impacto para agência criativa, com animações e portfólio filtrado.",
    tools: ["Lovable", "Vercel", "GitHub"],
    color: "#0a2610",
    icon: "🌐",
    problem: "Uma agência de design usava apenas Instagram para apresentar seu trabalho, perdendo clientes que buscavam mais credibilidade.",
    solution: "Landing page moderna com portfólio filtrado, formulário de contato, animações fluidas e deploy automático via GitHub + Vercel.",
    possibilities: "Conversão 3x maior em leads qualificados, presença profissional online e autonomia para atualizar projetos sem programar."
  },
  {
    id: 5,
    title: "StockSync — Gestão de Estoque",
    category: "Ferramentas de gestão",
    description: "Ferramenta de controle de estoque com alertas automáticos e previsão de reabastecimento.",
    tools: ["Google Sheets", "n8n", "Make"],
    color: "#0b2b14",
    icon: "📦",
    problem: "Uma loja física ficava constantemente sem itens-chave por falta de controle, gerando vendas perdidas e frustração dos clientes.",
    solution: "Planilha inteligente com alertas automáticos via WhatsApp quando estoque cai abaixo do mínimo, além de relatório semanal de reabastecimento.",
    possibilities: "Eliminação de rupturas de estoque, redução de desperdício e gestão proativa ao invés de reativa."
  },
  {
    id: 6,
    title: "ConnectFlow — Integrações de Sistemas",
    category: "Automação",
    description: "Hub de integrações que conecta CRM, ERP, WhatsApp e e-commerce em um fluxo único.",
    tools: ["n8n", "Make", "OpenAI"],
    color: "#0f3318",
    icon: "🔗",
    problem: "Uma empresa usava 6 sistemas diferentes que não conversavam entre si, obrigando colaboradores a inserir dados manualmente em cada um.",
    solution: "Fluxo de integrações no n8n conectando todos os sistemas via API, sincronizando dados em tempo real e eliminando entradas manuais.",
    possibilities: "Economia de 15h semanais por colaborador, dados sempre sincronizados e eliminação total de erros de digitação."
  }
];

const TOOLS = [
  { name: "n8n", icon: "⚙️", color: "#1a4a2a" },
  { name: "Make", icon: "🔮", color: "#162e20" },
  { name: "Google Sheets", icon: "📗", color: "#123d1e" },
  { name: "Looker Studio", icon: "📈", color: "#0f3018" },
  { name: "Glide", icon: "📱", color: "#162e20" },
  { name: "Lovable", icon: "❤️", color: "#1a3a22" },
  { name: "Vercel", icon: "▲", color: "#0d2a16" },
  { name: "GitHub", icon: "🐙", color: "#112616" },
  { name: "OpenAI", icon: "🤖", color: "#163520" },
];

const SOLUTIONS = [
  { icon: "💬", title: "Automação de atendimento", desc: "Bots inteligentes que respondem, qualificam e encaminham clientes automaticamente." },
  { icon: "🧾", title: "Sistema de pedidos", desc: "Apps mobile para receber pedidos, controlar cozinha e gerar relatórios." },
  { icon: "📊", title: "Dashboard de controle", desc: "Painéis visuais com KPIs em tempo real para decisões mais rápidas." },
  { icon: "🌐", title: "Landing page / Portfólio", desc: "Sites de alto impacto que convertem visitantes em clientes." },
  { icon: "🔍", title: "Diagnósticos digitais", desc: "Mapeamento completo dos processos do seu negócio com recomendações práticas." },
  { icon: "🔗", title: "Integrações entre sistemas", desc: "Conecte seus sistemas e elimine tarefas manuais repetitivas." },
];

// ─── Styles ────────────────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #071A0F;
    --bg2: #091e12;
    --green: #22c55e;
    --green-dim: #16a34a;
    --green-muted: rgba(34,197,94,0.12);
    --green-glow: rgba(34,197,94,0.25);
    --white: #f0faf4;
    --gray: #8fac9a;
    --border: rgba(34,197,94,0.15);
    --card-bg: rgba(10,30,18,0.8);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--white);
    font-family: 'Instrument Sans', sans-serif;
    overflow-x: hidden;
    line-height: 1.6;
  }

  .font-display { font-family: 'Syne', sans-serif; }
  .font-mono { font-family: 'DM Mono', monospace; }

  /* Grid background */
  .grid-bg {
    background-image:
      linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  /* Glow effects */
  .glow-text { text-shadow: 0 0 40px rgba(34,197,94,0.5); }
  .glow-border { box-shadow: 0 0 0 1px var(--border), 0 0 30px rgba(34,197,94,0.08); }
  .glow-card:hover { box-shadow: 0 0 0 1px rgba(34,197,94,0.3), 0 0 40px rgba(34,197,94,0.1); }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.05); }
  }
  @keyframes scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-16px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .animate-fadeUp { animation: fadeUp 0.8s ease forwards; }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }

  /* Nav blur */
  .glass-nav {
    background: rgba(7,26,15,0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  /* Button styles */
  .btn-primary {
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: #071A0F;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    letter-spacing: 0.02em;
    padding: 14px 28px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.25s ease;
    font-size: 14px;
    position: relative;
    overflow: hidden;
  }
  .btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.1);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .btn-primary:hover::before { opacity: 1; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(34,197,94,0.35); }

  .btn-outline {
    background: transparent;
    color: var(--green);
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    letter-spacing: 0.02em;
    padding: 14px 28px;
    border-radius: 8px;
    border: 1px solid rgba(34,197,94,0.35);
    cursor: pointer;
    transition: all 0.25s ease;
    font-size: 14px;
  }
  .btn-outline:hover {
    border-color: var(--green);
    background: rgba(34,197,94,0.06);
    transform: translateY(-2px);
  }

  /* Card */
  .project-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
  }
  .project-card::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    border: 1px solid transparent;
    transition: border-color 0.3s;
    pointer-events: none;
  }
  .project-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(34,197,94,0.25);
  }
  .project-card:hover::after { border-color: rgba(34,197,94,0.3); }

  /* Modal */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(8px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    animation: fadeUp 0.2s ease;
  }
  .modal-box {
    background: #091e12;
    border: 1px solid rgba(34,197,94,0.2);
    border-radius: 20px;
    width: 100%;
    max-width: 680px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 40px 120px rgba(0,0,0,0.6), 0 0 60px rgba(34,197,94,0.06);
  }

  /* Filter tab */
  .filter-tab {
    padding: 8px 18px;
    border-radius: 100px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--gray);
    font-family: 'Instrument Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }
  .filter-tab:hover { color: var(--green); border-color: rgba(34,197,94,0.3); }
  .filter-tab.active {
    background: rgba(34,197,94,0.12);
    border-color: rgba(34,197,94,0.4);
    color: var(--green);
  }

  /* Section label */
  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--green);
    opacity: 0.8;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(34,197,94,0.2); border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(34,197,94,0.4); }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-title { font-size: clamp(36px, 10vw, 64px) !important; }
    .hero-btns { flex-direction: column; }
    .hero-btns button { width: 100%; }
  }
`;

// ─── Components ───────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 48px",
      borderBottom: scrolled ? "1px solid rgba(34,197,94,0.12)" : "1px solid transparent",
      transition: "all 0.3s ease",
      ...(scrolled ? {} : {}),
    }} className="glass-nav">
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 900, color: "#071A0F",
            fontFamily: "Syne, sans-serif",
            boxShadow: "0 0 20px rgba(34,197,94,0.4)"
          }}>J</div>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "#f0faf4", letterSpacing: "-0.01em" }}>
            Just <span style={{ color: "#22c55e" }}>Tech</span>
          </span>
        </div>

        <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="font-display">
          {["Soluções", "Portfólio", "Ferramentas", "Contato"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              color: "#8fac9a", fontSize: 14, fontWeight: 500, textDecoration: "none",
              transition: "color 0.2s", letterSpacing: "0.01em",
              fontFamily: "Instrument Sans, sans-serif"
            }}
              onMouseEnter={e => e.target.style.color = "#22c55e"}
              onMouseLeave={e => e.target.style.color = "#8fac9a"}
            >{item}</a>
          ))}
          <button className="btn-primary" style={{ padding: "10px 20px", fontSize: 13 }}>
            Solicitar diagnóstico
          </button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="grid-bg" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      padding: "120px 24px 80px",
      position: "relative", overflow: "hidden"
    }}>
      {/* Ambient glow blobs */}
      <div style={{
        position: "absolute", top: "20%", left: "15%",
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(40px)",
        pointerEvents: "none"
      }} className="animate-pulse-glow" />
      <div style={{
        position: "absolute", bottom: "20%", right: "15%",
        width: 300, height: 300,
        background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)",
        pointerEvents: "none", animationDelay: "1.5s"
      }} className="animate-pulse-glow" />

      {/* Floating orb */}
      <div style={{
        position: "absolute", top: "30%", right: "20%",
        width: 120, height: 120,
        border: "1px solid rgba(34,197,94,0.2)",
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none"
      }} className="animate-float">
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          border: "1px solid rgba(34,197,94,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(34,197,94,0.15)" }} />
        </div>
      </div>

      {/* Corner decorations */}
      <div style={{
        position: "absolute", top: 80, left: 48,
        width: 100, height: 100,
        borderLeft: "1px solid rgba(34,197,94,0.2)",
        borderTop: "1px solid rgba(34,197,94,0.2)",
        borderRadius: "4px 0 0 0",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", bottom: 60, right: 48,
        width: 100, height: 100,
        borderRight: "1px solid rgba(34,197,94,0.2)",
        borderBottom: "1px solid rgba(34,197,94,0.2)",
        borderRadius: "0 0 4px 0",
        pointerEvents: "none"
      }} />

      {/* Content */}
      <div style={{ textAlign: "center", maxWidth: 900, position: "relative", zIndex: 2 }}>
        <div className="section-label" style={{ marginBottom: 24, animation: "fadeUp 0.6s ease forwards" }}>
          ◆ Tecnologia para pequenos negócios
        </div>

        <h1 className="font-display hero-title" style={{
          fontSize: "clamp(48px, 7vw, 88px)",
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          marginBottom: 24,
          animation: "fadeUp 0.7s ease 0.1s both"
        }}>
          Transformamos processos
          <br />empresariais com{" "}
          <span style={{ color: "#22c55e", position: "relative", display: "inline-block" }}
            className="glow-text">
            tecnologia
            <svg style={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: 8, overflow: "visible" }} viewBox="0 0 200 8">
              <path d="M0 6 Q50 0 100 5 Q150 10 200 4" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeDasharray="4 2" opacity="0.6" />
            </svg>
          </span>
        </h1>

        <p style={{
          fontSize: 20, color: "#8fac9a", maxWidth: 520, margin: "0 auto 48px",
          lineHeight: 1.7, fontWeight: 400,
          animation: "fadeUp 0.7s ease 0.2s both"
        }}>
          Automação, sistemas e inteligência para pequenos negócios.
        </p>

        <div className="hero-btns" style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
          animation: "fadeUp 0.7s ease 0.3s both"
        }}>
          <button className="btn-primary">
            🔍 Solicitar diagnóstico
          </button>
          <button className="btn-outline">
            💬 Falar com especialista
          </button>
        </div>

        {/* Stats bar */}
        <div style={{
          display: "flex", gap: 0, justifyContent: "center", marginTop: 80,
          border: "1px solid rgba(34,197,94,0.12)",
          borderRadius: 16, overflow: "hidden",
          background: "rgba(10,30,18,0.5)",
          backdropFilter: "blur(12px)",
          animation: "fadeUp 0.7s ease 0.45s both",
          flexWrap: "wrap"
        }}>
          {[
            { n: "50+", label: "Projetos entregues" },
            { n: "98%", label: "Clientes satisfeitos" },
            { n: "9", label: "Ferramentas integradas" },
            { n: "15h", label: "Economia média/semana" },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: "24px 36px",
              borderRight: i < 3 ? "1px solid rgba(34,197,94,0.1)" : "none",
              flex: "1 1 140px"
            }}>
              <div className="font-display" style={{ fontSize: 32, fontWeight: 800, color: "#22c55e", letterSpacing: "-0.02em" }}>{stat.n}</div>
              <div style={{ fontSize: 12, color: "#8fac9a", marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: "32px 32px 24px",
          borderBottom: "1px solid rgba(34,197,94,0.1)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div className="section-label" style={{ marginBottom: 12 }}>Case de sucesso</div>
              <h2 className="font-display" style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em" }}>
                <span style={{ marginRight: 12 }}>{project.icon}</span>
                {project.title}
              </h2>
            </div>
            <button onClick={onClose} style={{
              background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)",
              color: "#22c55e", borderRadius: 8, width: 36, height: 36,
              cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center"
            }}>×</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
            {project.tools.map(t => (
              <span key={t} className="font-mono" style={{
                padding: "4px 12px", borderRadius: 100,
                background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)",
                color: "#22c55e", fontSize: 12
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "28px 32px 32px", display: "flex", flexDirection: "column", gap: 24 }}>
          {[
            { label: "🔴 Problema", content: project.problem },
            { label: "🟢 Solução", content: project.solution },
            { label: "✨ Possibilidades", content: project.possibilities },
          ].map(({ label, content }) => (
            <div key={label} style={{
              padding: "20px 22px", borderRadius: 12,
              background: "rgba(34,197,94,0.04)",
              border: "1px solid rgba(34,197,94,0.1)"
            }}>
              <div className="font-display" style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: "#22c55e" }}>{label}</div>
              <p style={{ color: "#c5dece", lineHeight: 1.7, fontSize: 15 }}>{content}</p>
            </div>
          ))}
          <button className="btn-primary" style={{ marginTop: 8 }}>
            Quero algo assim para meu negócio →
          </button>
        </div>
      </div>
    </div>
  );
}

function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [modalProject, setModalProject] = useState(null);

  const filtered = activeFilter === "Todos"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <section id="portfólio" style={{ padding: "120px 24px", position: "relative" }}>
      {modalProject && <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />}

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 64, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 32 }}>
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>◆ Portfólio</div>
            <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Projetos reais,<br />
              <span style={{ color: "#22c55e" }}>resultados reais</span>
            </h2>
          </div>
          <p style={{ color: "#8fac9a", maxWidth: 320, lineHeight: 1.7 }}>
            Cada projeto é construído sob medida para resolver problemas reais com as melhores ferramentas disponíveis.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
          {FILTERS.map(f => (
            <button key={f} className={`filter-tab ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}>{f}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 24
        }}>
          {filtered.map((project, i) => (
            <div key={project.id} className="project-card"
              style={{ animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}
              onClick={() => setModalProject(project)}>
              {/* Image area */}
              <div style={{
                height: 180, background: project.color,
                position: "relative", overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <div style={{ fontSize: 64, opacity: 0.4 }}>{project.icon}</div>
                <div style={{
                  position: "absolute", inset: 0,
                  background: `radial-gradient(circle at 70% 30%, rgba(34,197,94,0.12), transparent 70%)`
                }} />
                <div style={{
                  position: "absolute", top: 16, right: 16,
                  padding: "4px 10px", borderRadius: 100,
                  background: "rgba(7,26,15,0.8)", border: "1px solid rgba(34,197,94,0.2)",
                  fontSize: 11, color: "#22c55e", fontFamily: "DM Mono, monospace"
                }}>{project.category}</div>
                {/* Grid overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: "linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }} />
              </div>

              {/* Content */}
              <div style={{ padding: "24px" }}>
                <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>
                  {project.title}
                </h3>
                <p style={{ color: "#8fac9a", fontSize: 14, lineHeight: 1.65, marginBottom: 18 }}>
                  {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                  {project.tools.map(t => (
                    <span key={t} style={{
                      padding: "3px 10px", borderRadius: 100, fontSize: 12,
                      background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)",
                      color: "#7fd4a8", fontFamily: "DM Mono, monospace"
                    }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#22c55e", fontSize: 13, fontWeight: 600 }}>
                  Ver detalhes <span style={{ transition: "transform 0.2s" }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolsSection() {
  return (
    <section id="ferramentas" style={{
      padding: "120px 24px",
      borderTop: "1px solid rgba(34,197,94,0.08)",
      borderBottom: "1px solid rgba(34,197,94,0.08)",
      background: "rgba(10,30,18,0.3)",
      position: "relative", overflow: "hidden"
    }}>
      {/* Ambient */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600, height: 300,
        background: "radial-gradient(ellipse, rgba(34,197,94,0.05) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>◆ Stack de ferramentas</div>
          <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
            As melhores ferramentas,
            <br /><span style={{ color: "#22c55e" }}>integradas para você</span>
          </h2>
        </div>

        <div style={{
          display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center"
        }}>
          {TOOLS.map((tool, i) => (
            <div key={tool.name} style={{
              padding: "16px 28px",
              background: tool.color,
              border: "1px solid rgba(34,197,94,0.15)",
              borderRadius: 12,
              display: "flex", alignItems: "center", gap: 12,
              cursor: "default",
              transition: "all 0.25s ease",
              animation: `fadeUp 0.5s ease ${i * 0.06}s both`,
              minWidth: 140
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(34,197,94,0.12)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(34,197,94,0.15)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
              <span style={{ fontSize: 24 }}>{tool.icon}</span>
              <span className="font-display" style={{ fontWeight: 600, fontSize: 15 }}>{tool.name}</span>
            </div>
          ))}
        </div>

        {/* Bottom label */}
        <p style={{ textAlign: "center", color: "#8fac9a", marginTop: 48, fontSize: 14 }}>
          + dezenas de outras integrações via API disponíveis sob demanda
        </p>
      </div>
    </section>
  );
}

function SolutionsSection() {
  return (
    <section id="soluções" style={{ padding: "120px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 32, marginBottom: 80 }}>
          <div>
            <div className="section-label" style={{ marginBottom: 16 }}>◆ Soluções</div>
            <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              O que podemos construir<br />
              <span style={{ color: "#22c55e" }}>para o seu negócio</span>
            </h2>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 2
        }}>
          {SOLUTIONS.map((sol, i) => (
            <div key={sol.title} style={{
              padding: "36px",
              border: "1px solid rgba(34,197,94,0.08)",
              background: "rgba(10,30,18,0.4)",
              position: "relative", overflow: "hidden",
              transition: "all 0.3s ease",
              cursor: "default",
              animation: `fadeUp 0.5s ease ${i * 0.08}s both`
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(34,197,94,0.05)";
                e.currentTarget.style.borderColor = "rgba(34,197,94,0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(10,30,18,0.4)";
                e.currentTarget.style.borderColor = "rgba(34,197,94,0.08)";
              }}>

              {/* Number */}
              <div className="font-mono" style={{
                position: "absolute", top: 20, right: 24,
                fontSize: 11, color: "rgba(34,197,94,0.3)",
                letterSpacing: "0.1em"
              }}>0{i + 1}</div>

              <div style={{ fontSize: 36, marginBottom: 20 }}>{sol.icon}</div>
              <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.01em" }}>
                {sol.title}
              </h3>
              <p style={{ color: "#8fac9a", lineHeight: 1.7, fontSize: 14 }}>{sol.desc}</p>

              {/* Bottom line accent */}
              <div style={{
                position: "absolute", bottom: 0, left: 0,
                height: 2, width: "0%",
                background: "linear-gradient(90deg, #22c55e, transparent)",
                transition: "width 0.3s ease"
              }} className="sol-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="contato" style={{
      padding: "120px 24px",
      position: "relative", overflow: "hidden"
    }}>
      {/* BG pattern */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.07) 0%, transparent 70%)"
      }} />

      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative" }}>
        {/* Corner frames */}
        <div style={{
          position: "absolute", top: -24, left: 0,
          width: 60, height: 60,
          borderLeft: "1px solid rgba(34,197,94,0.3)",
          borderTop: "1px solid rgba(34,197,94,0.3)",
          borderRadius: "4px 0 0 0"
        }} />
        <div style={{
          position: "absolute", bottom: -24, right: 0,
          width: 60, height: 60,
          borderRight: "1px solid rgba(34,197,94,0.3)",
          borderBottom: "1px solid rgba(34,197,94,0.3)",
          borderRadius: "0 0 4px 0"
        }} />

        <div className="section-label" style={{ marginBottom: 24 }}>◆ Próximo passo</div>

        <h2 className="font-display" style={{
          fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 800,
          letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 24
        }}>
          Quer implementar algo assim<br />
          <span style={{ color: "#22c55e" }} className="glow-text">no seu negócio?</span>
        </h2>

        <p style={{ color: "#8fac9a", fontSize: 18, lineHeight: 1.7, marginBottom: 48, maxWidth: 520, margin: "0 auto 48px" }}>
          Começamos com um diagnóstico gratuito para entender seu negócio e propor as melhores soluções.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" style={{ fontSize: 16, padding: "18px 36px" }}>
            🔍 Solicitar diagnóstico gratuito
          </button>
          <button className="btn-outline" style={{ fontSize: 16, padding: "18px 36px" }}>
            💬 Falar com especialista
          </button>
        </div>

        {/* Trust bar */}
        <div style={{
          marginTop: 64, padding: "24px", borderRadius: 16,
          border: "1px solid rgba(34,197,94,0.1)",
          background: "rgba(10,30,18,0.5)",
          backdropFilter: "blur(12px)",
          display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap"
        }}>
          {["✅ Diagnóstico gratuito", "⚡ Resposta em 24h", "🔒 Sem compromisso", "🎯 Foco em resultados"].map(item => (
            <span key={item} style={{ color: "#8fac9a", fontSize: 14 }}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(34,197,94,0.1)",
      padding: "48px 48px 32px",
      background: "rgba(5,14,9,0.8)"
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24, marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 6,
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 900, color: "#071A0F", fontFamily: "Syne, sans-serif"
            }}>J</div>
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#f0faf4" }}>
              Just <span style={{ color: "#22c55e" }}>Tech</span>
            </span>
          </div>
          <p style={{ color: "#8fac9a", fontSize: 13 }}>Tecnologia que transforma pequenos negócios</p>
        </div>
        <div style={{
          borderTop: "1px solid rgba(34,197,94,0.06)",
          paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16
        }}>
          <p className="font-mono" style={{ color: "rgba(143,172,154,0.5)", fontSize: 12 }}>
            © 2025 Just Tech. Todos os direitos reservados.
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Política de privacidade", "Termos de uso"].map(item => (
              <a key={item} href="#" style={{ color: "rgba(143,172,154,0.5)", fontSize: 12, textDecoration: "none" }}
                onMouseEnter={e => e.target.style.color = "#22c55e"}
                onMouseLeave={e => e.target.style.color = "rgba(143,172,154,0.5)"}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function JustTechLanding() {
  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ background: "#071A0F", minHeight: "100vh" }}>
        <Navbar />
        <HeroSection />
        <PortfolioSection />
        <ToolsSection />
        <SolutionsSection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}
