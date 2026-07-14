import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import {
  Menu, X, ChevronRight, Edit2, Trash2, PauseCircle, PlayCircle,
  Plus, Search, LogOut, Car, ArrowRight, Phone, Mail, MapPin,
} from "lucide-react";

/* ═══════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════ */
type Category = "Todos" | "Esportivos" | "SUV" | "Sedã";
type VehicleStatus = "active" | "paused";

interface Vehicle {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  km: number;
  category: Exclude<Category, "Todos">;
  status: VehicleStatus;
  image: string;
  description: string;
}

/* ═══════════════════════════════════════════════
   INITIAL DATA
═══════════════════════════════════════════════ */
const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 1,
    name: "488 GTB",
    brand: "Ferrari",
    year: 2021,
    price: 1890000,
    km: 12000,
    category: "Esportivos",
    status: "active",
    image: "https://images.unsplash.com/photo-1610847499832-918a1c3c6811?w=800&h=500&fit=crop&auto=format",
    description: "Motor V8 biturbo de 670 cv. 0–100 km/h em 3,0 s. Exemplar impecável, revisões em dia na concessionária oficial.",
  },
  {
    id: 2,
    name: "911 Carrera S",
    brand: "Porsche",
    year: 2022,
    price: 1250000,
    km: 8500,
    category: "Esportivos",
    status: "active",
    image: "https://images.unsplash.com/photo-1742056024894-c6245924874e?w=800&h=500&fit=crop&auto=format",
    description: "Flat-six de 450 cv, PDK de 8 marchas. Cinza Agate Metallic com interior em couro preto costurado à mão.",
  },
  {
    id: 3,
    name: "720S",
    brand: "McLaren",
    year: 2020,
    price: 2100000,
    km: 5200,
    category: "Esportivos",
    status: "active",
    image: "https://images.unsplash.com/photo-1578478412827-8c0ec4fdde15?w=800&h=500&fit=crop&auto=format",
    description: "V8 biturbo 720 cv com chassi monocoque de fibra de carbono. Desempenho puro em estado de arte.",
  },
  {
    id: 4,
    name: "Roma",
    brand: "Ferrari",
    year: 2023,
    price: 1650000,
    km: 3100,
    category: "Esportivos",
    status: "active",
    image: "https://images.unsplash.com/photo-1658140918789-fb22d2ad7e93?w=800&h=500&fit=crop&auto=format",
    description: "Grand tourer com V8 biturbo de 620 cv. Design que ressoa a dolce vita italiana em sua forma mais pura.",
  },
  {
    id: 5,
    name: "911 GT3 RS",
    brand: "Porsche",
    year: 2022,
    price: 1980000,
    km: 2800,
    category: "Esportivos",
    status: "active",
    image: "https://images.unsplash.com/photo-1758675704087-503c955e1763?w=800&h=500&fit=crop&auto=format",
    description: "O mais extremo 911 de uso civil. Motor atmosférico 525 cv, asa traseira ativa, caixa PDK de 7 marchas.",
  },
  {
    id: 6,
    name: "Defender V8",
    brand: "Land Rover",
    year: 2023,
    price: 780000,
    km: 15000,
    category: "SUV",
    status: "active",
    image: "https://images.unsplash.com/photo-1753030505007-98ceef668415?w=800&h=500&fit=crop&auto=format",
    description: "V8 superalimentado de 525 cv em carroceria icônica. Capaz em qualquer terreno, refinado em qualquer cenário.",
  },
  {
    id: 7,
    name: "DB11 V12",
    brand: "Aston Martin",
    year: 2021,
    price: 1450000,
    km: 9800,
    category: "Esportivos",
    status: "active",
    image: "https://images.unsplash.com/photo-1763165524644-a21524b47734?w=800&h=500&fit=crop&auto=format",
    description: "Grand tourer britânico com V12 biturbo de 608 cv e carroceria esculpida à mão. Elegância absoluta.",
  },
  {
    id: 8,
    name: "Continental GT V8",
    brand: "Bentley",
    year: 2022,
    price: 2350000,
    km: 6700,
    category: "Esportivos",
    status: "active",
    image: "https://images.unsplash.com/photo-1680553986778-e833de3ffd0b?w=800&h=500&fit=crop&auto=format",
    description: "Luxo supremo com V8 de 550 cv. Interior com madeiras nobres selecionadas e couro artesanal Mulliner.",
  },
];

/* ═══════════════════════════════════════════════
   UTILS
═══════════════════════════════════════════════ */
const formatPrice = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

const formatKm = (v: number) => `${v.toLocaleString("pt-BR")} km`;

const DISPLAY = { fontFamily: "'Barlow Condensed', sans-serif" };

/* ═══════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════ */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Coleção", href: "#colecao" },
    { label: "Sobre", href: "#sobre" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white border-b border-black/10 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex-none">
            <span
              className={`text-xl font-black tracking-[0.18em] uppercase transition-colors ${
                scrolled ? "text-black" : "text-white"
              }`}
              style={DISPLAY}
            >
              APEX MOTORS
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={`text-xs font-medium tracking-[0.2em] uppercase transition-opacity hover:opacity-60 ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contato"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-xs font-medium tracking-[0.15em] uppercase hover:bg-zinc-100 transition-colors whitespace-nowrap border border-transparent"
            >
              Solicitar Proposta
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden p-2 transition-colors ${scrolled ? "text-black" : "text-white"}`}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-black/10">
          <div className="px-5 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-xs font-medium tracking-[0.2em] uppercase text-black"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center px-5 py-3 bg-black text-white text-xs font-medium tracking-[0.15em] uppercase whitespace-nowrap"
            >
              Solicitar Proposta
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end bg-black overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1578478412827-8c0ec4fdde15?w=1920&h=1080&fit=crop&auto=format"
          alt="Supercar em fundo escuro"
          className="w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24 lg:pb-36 w-full">
        <div className="max-w-3xl">
          <p className="text-zinc-400 text-xs tracking-[0.35em] uppercase mb-5">
            Curadoria de Automóveis Premium
          </p>
          <h1
            className="text-5xl sm:text-7xl lg:text-[96px] font-black text-white leading-none tracking-tight mb-6"
            style={DISPLAY}
          >
            EXTRAORDINÁRIO
            <br />
            EM CADA
            <br />
            DETALHE
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg max-w-lg mb-10 leading-relaxed">
            Seleção rigorosa dos automóveis mais desejados do mundo. Procedência
            verificada, condições impecáveis, atendimento de excelência.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#colecao"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-xs font-medium tracking-[0.18em] uppercase hover:bg-zinc-100 transition-colors whitespace-nowrap"
            >
              Ver Coleção
              <ArrowRight size={14} />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white text-xs font-medium tracking-[0.18em] uppercase hover:border-white hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              Solicitar Proposta
            </a>
          </div>
        </div>

        <div className="mt-14 lg:mt-20 grid grid-cols-3 gap-6 sm:gap-10 border-t border-white/10 pt-8 max-w-sm sm:max-w-lg">
          {[
            { value: "8+", label: "Marcas" },
            { value: "100%", label: "Auditados" },
            { value: "12 anos", label: "Experiência" },
          ].map((s) => (
            <div key={s.label}>
              <p
                className="text-2xl sm:text-3xl font-black text-white mb-0.5"
                style={DISPLAY}
              >
                {s.value}
              </p>
              <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CAR CARD
═══════════════════════════════════════════════ */
function CarCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="group bg-white border border-black/8 hover:border-black/20 transition-all duration-300 flex flex-col">
      <div className="relative overflow-hidden bg-zinc-100" style={{ aspectRatio: "4/3" }}>
        <img
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-black text-white text-[10px] tracking-[0.2em] uppercase font-medium">
            {vehicle.category}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-1">
          {vehicle.brand} · {vehicle.year}
        </p>
        <h3 className="text-2xl font-black tracking-tight mb-2 leading-tight" style={DISPLAY}>
          {vehicle.name}
        </h3>
        <p className="text-zinc-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {vehicle.description}
        </p>
        <div className="flex items-center gap-3 mb-5 text-xs text-zinc-400">
          <span>{formatKm(vehicle.km)}</span>
          <span className="w-1 h-1 bg-zinc-300 rounded-full" />
          <span>{vehicle.year}</span>
        </div>
        <div className="flex items-end justify-between gap-3 pt-4 border-t border-black/6">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 mb-0.5">
              A partir de
            </p>
            <p className="text-2xl font-black tracking-tight leading-none" style={DISPLAY}>
              {formatPrice(vehicle.price)}
            </p>
          </div>
          <a
            href="#contato"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-black text-white text-[10px] font-medium tracking-[0.18em] uppercase hover:bg-zinc-800 transition-colors whitespace-nowrap flex-none"
          >
            Proposta
            <ChevronRight size={11} />
          </a>
        </div>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════
   GALLERY SECTION
═══════════════════════════════════════════════ */
function GallerySection({ vehicles }: { vehicles: Vehicle[] }) {
  const [activeFilter, setActiveFilter] = useState<Category>("Todos");
  const categories: Category[] = ["Todos", "Esportivos", "SUV", "Sedã"];

  const active = vehicles.filter((v) => v.status === "active");
  const filtered =
    activeFilter === "Todos"
      ? active
      : active.filter((v) => v.category === activeFilter);

  return (
    <section id="colecao" className="py-16 sm:py-24 lg:py-32 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 mb-10 lg:mb-14">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 mb-3">
              Coleção Exclusiva
            </p>
            <h2
              className="text-4xl sm:text-6xl font-black leading-none tracking-tight"
              style={DISPLAY}
            >
              NOSSOS
              <br />
              VEÍCULOS
            </h2>
          </div>

          {/* Filter */}
          <div className="flex items-center border border-black/12 self-start overflow-hidden">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 sm:px-5 py-2.5 text-[10px] font-medium tracking-[0.18em] uppercase transition-colors whitespace-nowrap ${
                  activeFilter === cat
                    ? "bg-black text-white"
                    : "bg-transparent text-zinc-500 hover:bg-zinc-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((v) => (
              <CarCard key={v.id} vehicle={v} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-zinc-400">
            <Car size={44} className="mx-auto mb-4 opacity-15" />
            <p className="text-xs tracking-[0.25em] uppercase">
              Nenhum veículo disponível nesta categoria
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   ABOUT SECTION
═══════════════════════════════════════════════ */
function AboutSection() {
  return (
    <section id="sobre" className="bg-black text-white py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 mb-4">
              Sobre a Apex Motors
            </p>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none tracking-tight mb-8"
              style={DISPLAY}
            >
              MAIS DE UMA
              <br />
              DÉCADA DE
              <br />
              EXCELÊNCIA
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-5">
              Fundada em 2012, a Apex Motors nasceu da paixão por automóveis
              extraordinários e do compromisso com a mais alta curadoria do mercado
              premium brasileiro.
            </p>
            <p className="text-zinc-500 leading-relaxed mb-10">
              Cada veículo passa por rigorosa auditoria técnica e histórica. Trabalhamos
              com Ferrari, Porsche, McLaren, Bentley, Aston Martin e outros ícones —
              garantindo procedência absoluta e condições impecáveis.
            </p>
            <div className="grid grid-cols-2 gap-6 border-t border-white/8 pt-8">
              {[
                { value: "500+", label: "Veículos comercializados" },
                { value: "100%", label: "Com procedência verificada" },
                { value: "12", label: "Anos de mercado" },
                { value: "NPS 98", label: "Satisfação dos clientes" },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="text-3xl font-black text-white mb-1"
                    style={DISPLAY}
                  >
                    {s.value}
                  </p>
                  <p className="text-zinc-500 text-[10px] tracking-[0.2em] uppercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden bg-zinc-900" style={{ aspectRatio: "3/4" }}>
              <img
                src="https://images.unsplash.com/photo-1778942855146-3a7c73f261f2?w=800&h=1066&fit=crop&auto=format"
                alt="Showroom Apex Motors"
                className="w-full h-full object-cover opacity-80"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 bg-white text-black p-5 lg:p-6 hidden sm:block">
              <p className="text-3xl font-black" style={DISPLAY}>
                2012
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 mt-1">
                Fundação
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CONTACT SECTION
═══════════════════════════════════════════════ */
function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  const contactInfo = [
    { Icon: Phone, label: "Telefone", value: "(11) 99999-0000" },
    { Icon: Mail, label: "E-mail", value: "contato@apexmotors.com.br" },
    { Icon: MapPin, label: "Endereço", value: "Av. Brig. Faria Lima, 3000 — São Paulo, SP" },
  ];

  return (
    <section id="contato" className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Left */}
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-400 mb-4">
              Fale Conosco
            </p>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none tracking-tight mb-8"
              style={DISPLAY}
            >
              SOLICITE
              <br />
              SUA PROPOSTA
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-10 max-w-sm">
              Nossa equipe de especialistas está pronta para orientá-lo na escolha
              do veículo ideal e apresentar condições exclusivas de aquisição.
            </p>
            <div className="flex flex-col gap-6">
              {contactInfo.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex-none w-10 h-10 border border-black/12 flex items-center justify-center">
                    <Icon size={15} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 mb-0.5">
                      {label}
                    </p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { id: "name", label: "Nome completo", type: "text", placeholder: "Seu nome" },
              { id: "phone", label: "WhatsApp / Telefone", type: "tel", placeholder: "(11) 99999-0000" },
              { id: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-2"
                >
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  value={form[id as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                  className="w-full border border-black/15 px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-black transition-colors placeholder:text-zinc-300"
                  required
                />
              </div>
            ))}
            <div>
              <label
                htmlFor="message"
                className="block text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-2"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Qual veículo te interessa? Alguma preferência específica?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-black/15 px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-black transition-colors placeholder:text-zinc-300 resize-none"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-4 text-sm font-medium tracking-[0.15em] uppercase transition-colors ${
                sent
                  ? "bg-zinc-700 text-white cursor-default"
                  : "bg-black text-white hover:bg-zinc-800"
              }`}
            >
              {sent ? "Mensagem Enviada ✓" : "Enviar Mensagem"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          <div>
            <p
              className="text-xl font-black tracking-[0.15em] uppercase mb-4"
              style={DISPLAY}
            >
              APEX MOTORS
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Curadoria de automóveis premium com procedência verificada e
              atendimento de excelência desde 2012.
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-5">
              Navegação
            </p>
            <div className="flex flex-col gap-3">
              {["Coleção", "Sobre", "Contato"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-zinc-500 hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-5">
              Contato
            </p>
            <div className="flex flex-col gap-3 text-sm text-zinc-500">
              <p>(11) 99999-0000</p>
              <p>contato@apexmotors.com.br</p>
              <p>São Paulo, SP — Brasil</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-zinc-700 text-xs tracking-widest">
            © 2024 Apex Motors. Todos os direitos reservados.
          </p>
          <Link
            to="/admin"
            className="text-zinc-700 text-xs hover:text-zinc-400 transition-colors tracking-[0.15em] uppercase"
          >
            Área Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════ */
function HomePage({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <>
      <Navbar />
      <HeroSection />
      <GallerySection vehicles={vehicles} />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
}

/* ═══════════════════════════════════════════════
   ADMIN LOGIN
═══════════════════════════════════════════════ */
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link to="/">
            <span
              className="text-xl font-black tracking-[0.15em] uppercase"
              style={DISPLAY}
            >
              APEX MOTORS
            </span>
          </Link>
          <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-400 mt-2">
            Área Administrativa
          </p>
        </div>
        <div className="bg-white border border-black/10 p-8">
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-2">
                Usuário
              </label>
              <input
                type="text"
                defaultValue="admin"
                className="w-full border border-black/15 px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-2">
                Senha
              </label>
              <input
                type="password"
                defaultValue="admin123"
                className="w-full border border-black/15 px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <button
              onClick={onLogin}
              className="w-full py-3.5 bg-black text-white text-xs font-medium tracking-[0.18em] uppercase hover:bg-zinc-800 transition-colors"
            >
              Entrar
            </button>
          </div>
        </div>
        <p className="text-center text-zinc-400 text-xs mt-4">
          Clique em Entrar para acessar o painel
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VEHICLE MODAL (Add / Edit)
═══════════════════════════════════════════════ */
interface VehicleModalProps {
  vehicle?: Vehicle | null;
  onSave: (v: Omit<Vehicle, "id"> & { id?: number }) => void;
  onClose: () => void;
}

function VehicleModal({ vehicle, onSave, onClose }: VehicleModalProps) {
  const [form, setForm] = useState({
    name: vehicle?.name ?? "",
    brand: vehicle?.brand ?? "",
    year: vehicle?.year ?? new Date().getFullYear(),
    price: vehicle?.price ?? 0,
    km: vehicle?.km ?? 0,
    category: vehicle?.category ?? ("Esportivos" as Exclude<Category, "Todos">),
    status: vehicle?.status ?? ("active" as VehicleStatus),
    image: vehicle?.image ?? "",
    description: vehicle?.description ?? "",
  });

  const field = (id: string, label: string, children: React.ReactNode) => (
    <div key={id}>
      <label
        htmlFor={id}
        className="block text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-2"
      >
        {label}
      </label>
      {children}
    </div>
  );

  const inputCls =
    "w-full border border-black/15 px-3 py-2.5 text-sm bg-transparent focus:outline-none focus:border-black transition-colors";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-black tracking-tight" style={DISPLAY}>
            {vehicle ? "EDITAR VEÍCULO" : "NOVO VEÍCULO"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-zinc-100 transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ ...form, ...(vehicle ? { id: vehicle.id } : {}) });
          }}
          className="p-6 flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field(
              "brand",
              "Marca",
              <input
                id="brand"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className={inputCls}
                placeholder="Ferrari"
                required
              />
            )}
            {field(
              "name",
              "Modelo",
              <input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
                placeholder="488 GTB"
                required
              />
            )}
            {field(
              "year",
              "Ano",
              <input
                id="year"
                type="number"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) || 0 })}
                className={inputCls}
                required
              />
            )}
            {field(
              "km",
              "Quilometragem",
              <input
                id="km"
                type="number"
                value={form.km}
                onChange={(e) => setForm({ ...form, km: parseInt(e.target.value) || 0 })}
                className={inputCls}
                required
              />
            )}
            {field(
              "price",
              "Preço (R$)",
              <input
                id="price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })}
                className={inputCls}
                required
              />
            )}
            {field(
              "category",
              "Categoria",
              <select
                id="category"
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as Exclude<Category, "Todos">,
                  })
                }
                className={inputCls + " bg-white"}
              >
                <option value="Esportivos">Esportivos</option>
                <option value="SUV">SUV</option>
                <option value="Sedã">Sedã</option>
              </select>
            )}
          </div>
          {field(
            "image",
            "URL da Imagem",
            <input
              id="image"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className={inputCls}
              placeholder="https://..."
            />
          )}
          {field(
            "description",
            "Descrição",
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className={inputCls + " resize-none"}
              placeholder="Descrição do veículo..."
            />
          )}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-black/20 text-xs font-medium tracking-[0.15em] uppercase hover:bg-zinc-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-black text-white text-xs font-medium tracking-[0.15em] uppercase hover:bg-zinc-800 transition-colors"
            >
              {vehicle ? "Salvar Alterações" : "Criar Veículo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ADMIN DASHBOARD
═══════════════════════════════════════════════ */
interface DashboardProps {
  vehicles: Vehicle[];
  onAdd: (v: Omit<Vehicle, "id">) => void;
  onEdit: (v: Vehicle) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onLogout: () => void;
}

function AdminDashboard({
  vehicles, onAdd, onEdit, onDelete, onToggleStatus, onLogout,
}: DashboardProps) {
  const [modal, setModal] = useState<{ open: boolean; vehicle: Vehicle | null }>({
    open: false,
    vehicle: null,
  });
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const filtered = vehicles.filter((v) =>
    `${v.brand} ${v.name}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (data: Omit<Vehicle, "id"> & { id?: number }) => {
    if (data.id != null) {
      onEdit(data as Vehicle);
    } else {
      onAdd(data as Omit<Vehicle, "id">);
    }
    setModal({ open: false, vehicle: null });
  };

  const handleDelete = (id: number) => {
    if (confirmDelete === id) {
      onDelete(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
      setTimeout(() => setConfirmDelete(null), 3000);
    }
  };

  const stats = [
    { label: "Total", value: vehicles.length },
    { label: "Ativos", value: vehicles.filter((v) => v.status === "active").length },
    { label: "Pausados", value: vehicles.filter((v) => v.status === "paused").length },
    { label: "Marcas", value: new Set(vehicles.map((v) => v.brand)).size },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-black/10 px-5 sm:px-8 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="font-black tracking-[0.12em] uppercase text-lg flex-none"
              style={DISPLAY}
            >
              APEX
            </span>
            <span className="text-black/15 hidden sm:block">|</span>
            <span className="text-xs text-zinc-500 tracking-[0.18em] uppercase hidden sm:block">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-black transition-colors hidden sm:block"
            >
              Ver Site
            </Link>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-black/15 text-xs font-medium tracking-[0.12em] uppercase hover:bg-black hover:text-white transition-colors whitespace-nowrap"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-8 flex-1 w-full">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white border border-black/8 p-5">
              <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 mb-2">
                {s.label}
              </p>
              <p className="text-4xl font-black" style={DISPLAY}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
          <h1 className="text-3xl font-black tracking-tight" style={DISPLAY}>
            VEÍCULOS
          </h1>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 border border-black/15 px-3 py-2.5 bg-white flex-1 sm:flex-none sm:min-w-56">
              <Search size={13} className="text-zinc-400 flex-none" />
              <input
                type="text"
                placeholder="Buscar veículo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm bg-transparent focus:outline-none w-full min-w-0"
              />
            </div>
            <button
              onClick={() => setModal({ open: true, vehicle: null })}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-black text-white text-xs font-medium tracking-[0.15em] uppercase hover:bg-zinc-800 transition-colors whitespace-nowrap flex-none"
            >
              <Plus size={13} />
              <span className="hidden sm:inline">Novo Veículo</span>
              <span className="sm:hidden">Novo</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-black/8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[680px]">
              <thead className="bg-zinc-50 border-b border-black/8">
                <tr>
                  {["Veículo", "Ano", "Preço", "KM", "Categoria", "Status", "Ações"].map(
                    (col) => (
                      <th
                        key={col}
                        className="text-left px-4 py-3.5 text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-medium whitespace-nowrap"
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filtered.map((v) => (
                  <tr
                    key={v.id}
                    className={`transition-colors ${
                      v.status === "paused" ? "opacity-50" : "hover:bg-zinc-50/60"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-10 bg-zinc-100 flex-none overflow-hidden">
                          {v.image && (
                            <img
                              src={v.image}
                              alt={v.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <p className="font-medium whitespace-nowrap">
                          {v.brand} {v.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-500 whitespace-nowrap">{v.year}</td>
                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                      {formatPrice(v.price)}
                    </td>
                    <td className="px-4 py-3 text-zinc-500 whitespace-nowrap">
                      {formatKm(v.km)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 bg-zinc-100 text-[10px] tracking-[0.15em] uppercase">
                        {v.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-[10px] tracking-[0.15em] uppercase ${
                          v.status === "active"
                            ? "bg-black text-white"
                            : "bg-zinc-200 text-zinc-600"
                        }`}
                      >
                        {v.status === "active" ? "Ativo" : "Pausado"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-0.5">
                        <button
                          onClick={() => setModal({ open: true, vehicle: v })}
                          className="p-2 hover:bg-zinc-100 transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => onToggleStatus(v.id)}
                          className="p-2 hover:bg-zinc-100 transition-colors"
                          title={v.status === "active" ? "Pausar" : "Ativar"}
                        >
                          {v.status === "active" ? (
                            <PauseCircle size={14} />
                          ) : (
                            <PlayCircle size={14} />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(v.id)}
                          className={`p-2 transition-colors ${
                            confirmDelete === v.id
                              ? "bg-red-600 text-white"
                              : "hover:bg-red-50 hover:text-red-600"
                          }`}
                          title={
                            confirmDelete === v.id
                              ? "Clique novamente para confirmar"
                              : "Excluir"
                          }
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-20 text-zinc-400">
                <Car size={40} className="mx-auto mb-3 opacity-15" />
                <p className="text-xs tracking-[0.25em] uppercase">
                  Nenhum veículo encontrado
                </p>
              </div>
            )}
          </div>
        </div>

        {confirmDelete !== null && (
          <p className="text-xs text-zinc-500 mt-3 text-center tracking-wide">
            Clique em{" "}
            <span className="text-red-600 font-medium">excluir novamente</span> para
            confirmar a remoção.
          </p>
        )}
      </main>

      {modal.open && (
        <VehicleModal
          vehicle={modal.vehicle}
          onSave={handleSave}
          onClose={() => setModal({ open: false, vehicle: null })}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ADMIN PAGE (Login guard)
═══════════════════════════════════════════════ */
interface AdminPageProps {
  vehicles: Vehicle[];
  onAdd: (v: Omit<Vehicle, "id">) => void;
  onEdit: (v: Vehicle) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

function AdminPage({ vehicles, onAdd, onEdit, onDelete, onToggleStatus }: AdminPageProps) {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <AdminDashboard
      vehicles={vehicles}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      onToggleStatus={onToggleStatus}
      onLogout={() => setLoggedIn(false)}
    />
  );
}

/* ═══════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════ */
export default function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);

  const addVehicle = (v: Omit<Vehicle, "id">) => {
    const newId = Math.max(0, ...vehicles.map((x) => x.id)) + 1;
    setVehicles((prev) => [...prev, { ...v, id: newId }]);
  };

  const editVehicle = (updated: Vehicle) =>
    setVehicles((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));

  const deleteVehicle = (id: number) =>
    setVehicles((prev) => prev.filter((v) => v.id !== id));

  const toggleStatus = (id: number) =>
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === id
          ? { ...v, status: v.status === "active" ? "paused" : "active" }
          : v
      )
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage vehicles={vehicles} />} />
        <Route
          path="/admin"
          element={
            <AdminPage
              vehicles={vehicles}
              onAdd={addVehicle}
              onEdit={editVehicle}
              onDelete={deleteVehicle}
              onToggleStatus={toggleStatus}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
