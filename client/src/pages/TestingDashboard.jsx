import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Wallet, BarChart3, Box, User, LogOut, Search, Bell,
  ArrowUpRight, ArrowDownLeft, TrendingUp, TrendingDown, Plus,
} from 'lucide-react';

/* ============================================================
   NEXUS HUB — private-ledger dashboard
   Design language: warm paper + ink navy + a single muted-gold
   accent, serif numerals for money, mono for ticker data.
   ============================================================ */

const ASSETS = [
  { symbol: 'BTC', name: 'Bitcoin', price: '64,231.09', delta: '+2.4%', up: true, bars: [4, 6, 5, 8, 7, 9, 11] },
  { symbol: 'ETH', name: 'Ethereum', price: '3,450.72', delta: '+1.1%', up: true, bars: [6, 5, 7, 6, 8, 7, 8] },
  { symbol: 'SOL', name: 'Solana', price: '178.44', delta: '-0.6%', up: false, bars: [9, 8, 8, 6, 7, 5, 5] },
];

const NAV = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: Wallet, label: 'Wallet' },
  { icon: BarChart3, label: 'Markets' },
  { icon: Box, label: 'Assets' },
  { icon: User, label: 'Profile' },
];

/* ---------- small building blocks ---------- */

const NavIcon = ({ icon: Icon, label, active }) => (
  <motion.div
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.94 }}
    className={`group relative flex items-center justify-center w-12 h-12 rounded-2xl cursor-pointer transition-colors duration-200
      ${active ? 'bg-[#C9A44C] text-[#14161F]' : 'text-[#6C7080] hover:text-[#F7F5EF] hover:bg-white/5'}`}
  >
    <Icon size={19} strokeWidth={2.25} />
    <span className="pointer-events-none absolute left-16 whitespace-nowrap rounded-lg bg-[#0B0D14] px-3 py-1.5 text-xs font-medium text-[#F7F5EF] opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 hidden lg:block">
      {label}
    </span>
  </motion.div>
);

const MobileNavIcon = ({ icon: Icon, active }) => (
  <div className={`flex flex-col items-center justify-center w-11 h-11 rounded-2xl transition-colors ${active ? 'bg-[#C9A44C] text-[#14161F]' : 'text-[#6C7080]'}`}>
    <Icon size={18} strokeWidth={2.25} />
  </div>
);

const MiniBars = ({ values, tone }) => {
  const max = Math.max(...values);
  const color = tone === 'up' ? '#2F6D52' : '#B5533C';
  return (
    <svg viewBox="0 0 60 24" className="w-14 h-6 shrink-0">
      {values.map((v, i) => {
        const h = (v / max) * 20 + 2;
        return (
          <rect key={i} x={i * 9} y={24 - h} width="5.5" rx="1.5" height={h} fill={color} opacity={0.35 + (i / values.length) * 0.65} />
        );
      })}
    </svg>
  );
};

const AssetRow = ({ a }) => (
  <motion.div
    whileHover={{ x: 4 }}
    className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 hover:bg-[#F7F5EF] transition-colors"
  >
    <div className="flex items-center gap-3 min-w-0">
      <div className="w-9 h-9 rounded-xl bg-[#14161F] text-[#EFE4C8] flex items-center justify-center font-mono text-[10px] font-bold tracking-tight shrink-0">
        {a.symbol}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#14161F] truncate">{a.name}</p>
        <p className="font-mono text-[11px] text-[#8B8E9B] tracking-wide">{a.symbol}/USD</p>
      </div>
    </div>
    <MiniBars values={a.bars} tone={a.up ? 'up' : 'down'} />
    <div className="text-right shrink-0 w-24">
      <p className="font-mono text-sm font-semibold text-[#14161F]">${a.price}</p>
      <p className={`inline-flex items-center gap-0.5 text-xs font-mono font-medium ${a.up ? 'text-[#2F6D52]' : 'text-[#B5533C]'}`}>
        {a.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}{a.delta}
      </p>
    </div>
  </motion.div>
);

const TickerTape = () => {
  const strip = [...ASSETS, ...ASSETS, ...ASSETS];
  return (
    <div className="relative overflow-hidden rounded-full border border-[#E7E3D8] bg-white/60 py-2.5 mb-8">
      <div className="flex w-max gap-8 pl-6 animate-[ticker_28s_linear_infinite] motion-reduce:animate-none">
        {strip.map((a, i) => (
          <div key={i} className="flex items-center gap-2 whitespace-nowrap font-mono text-xs">
            <span className="font-bold text-[#14161F] tracking-wide">{a.symbol}</span>
            <span className="text-[#5A5D6B]">${a.price}</span>
            <span className={a.up ? 'text-[#2F6D52]' : 'text-[#B5533C]'}>{a.delta}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#F7F5EF] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#F7F5EF] to-transparent" />
    </div>
  );
};

const AreaChart = ({ range }) => {
  const paths = {
    '1D': 'M0,120 C40,110 70,130 100,100 C140,60 170,90 210,70 C250,50 280,75 320,55 C360,35 390,45 430,20',
    '1W': 'M0,90 C40,100 70,60 100,80 C140,110 170,70 210,90 C250,50 280,60 320,30 C360,15 390,35 430,10',
    '1M': 'M0,60 C40,40 70,70 100,50 C140,30 170,55 210,35 C250,60 280,30 320,45 C360,20 390,40 430,15',
  };
  const d = paths[range];
  return (
    <svg viewBox="0 0 430 140" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A44C" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#C9A44C" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L430,140 L0,140 Z`} fill="url(#fillGrad)" />
      <path d={d} fill="none" stroke="#B5872E" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};

const BalanceSparkline = () => (
  <svg viewBox="0 0 320 90" className="w-full h-full" preserveAspectRatio="none">
    <defs>
      <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EFE4C8" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#EFE4C8" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0,70 C40,65 60,50 90,55 C120,60 140,35 170,38 C200,41 220,20 250,22 C275,24 295,10 320,8 L320,90 L0,90 Z" fill="url(#goldFill)" />
    <path d="M0,70 C40,65 60,50 90,55 C120,60 140,35 170,38 C200,41 220,20 250,22 C275,24 295,10 320,8" fill="none" stroke="#EFE4C8" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
  </svg>
);

/* ---------- page ---------- */

export default function PremiumDashboard() {
  const [range, setRange] = useState('1W');

  return (
    <div className="min-h-screen bg-[#F7F5EF] font-sans text-[#14161F]">
      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
      `}</style>

      <div className="flex min-h-screen p-2.5 sm:p-4 gap-3 sm:gap-4">

        {/* ---- Sidebar (desktop) ---- */}
        <aside className="hidden md:flex w-20 lg:w-24 bg-[#0B0D14] rounded-[2rem] flex-col items-center py-8 justify-between shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-[#C9A44C] flex items-center justify-center font-serif font-bold text-[#14161F] text-lg">N</div>
          <nav className="flex flex-col gap-2">
            {NAV.map((n) => <NavIcon key={n.label} {...n} />)}
          </nav>
          <NavIcon icon={LogOut} label="Sign out" />
        </aside>

        {/* ---- Main ---- */}
        <main className="flex-1 w-full min-w-0 bg-transparent pb-24 md:pb-0 overflow-y-auto">

          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#8B8E9B] uppercase mb-1">Nexus Hub · Ledger</p>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">Good evening, Alex</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-white border border-[#E7E3D8] rounded-full pl-4 pr-2 py-2 w-52 lg:w-64">
                <Search size={16} className="text-[#8B8E9B] shrink-0" />
                <span className="text-sm text-[#8B8E9B]">Search assets, txns…</span>
              </div>
              <button className="w-10 h-10 rounded-full bg-white border border-[#E7E3D8] flex items-center justify-center text-[#5A5D6B] shrink-0">
                <Bell size={17} />
              </button>
              <div className="w-10 h-10 rounded-full bg-[#14161F] flex items-center justify-center text-[#EFE4C8] font-serif font-semibold shrink-0">A</div>
            </div>
          </header>

          <TickerTape />

          {/* Hero grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">

            {/* Balance card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="lg:col-span-3 relative overflow-hidden rounded-[2rem] bg-[#0B0D14] text-[#F7F5EF] p-7 sm:p-10 flex flex-col justify-between min-h-[280px]"
            >
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-[#8B8E9B] uppercase mb-3">Total Balance</p>
                  <h2 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight">$17,643.41</h2>
                  <p className="text-[#7C9E8D] text-sm mt-2 font-medium">↑ $412.20 this week</p>
                </div>
                <div className="hidden sm:flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-xs font-mono text-[#EFE4C8]">
                  <TrendingUp size={13} /> +2.4%
                </div>
              </div>

              <div className="relative z-10 h-16 sm:h-20 -mx-2">
                <BalanceSparkline />
              </div>

              <div className="relative z-10 flex gap-3">
                <button className="flex items-center gap-2 bg-[#C9A44C] text-[#14161F] px-6 py-3 rounded-2xl font-semibold text-sm hover:brightness-105 active:scale-[0.98] transition">
                  <Plus size={16} /> Deposit
                </button>
                <button className="flex items-center gap-2 bg-white/10 backdrop-blur px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-white/15 active:scale-[0.98] transition">
                  <ArrowDownLeft size={16} /> Withdraw
                </button>
              </div>
            </motion.div>

            {/* Asset list */}
            <div className="lg:col-span-2 bg-white rounded-[2rem] border border-[#E7E3D8] p-5 sm:p-6 flex flex-col">
              <div className="flex items-center justify-between mb-1 px-1">
                <h3 className="font-serif font-semibold text-lg">Watchlist</h3>
                <span className="font-mono text-[10px] text-[#8B8E9B] uppercase tracking-widest">Live</span>
              </div>
              <div className="flex-1 flex flex-col divide-y divide-[#F0EEE6]">
                {ASSETS.map((a) => <AssetRow key={a.symbol} a={a} />)}
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

            {/* Analytics */}
            <div className="lg:col-span-2 bg-white rounded-[2rem] border border-[#E7E3D8] p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h3 className="font-serif font-semibold text-lg sm:text-xl">Portfolio Performance</h3>
                <div className="flex gap-1 bg-[#F7F5EF] rounded-full p-1">
                  {['1D', '1W', '1M'].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRange(r)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-colors ${range === r ? 'bg-[#14161F] text-[#EFE4C8]' : 'text-[#8B8E9B] hover:text-[#14161F]'}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-48 sm:h-64">
                <AreaChart range={range} />
              </div>
            </div>

            {/* Upgrade */}
            <div className="bg-[#0B0D14] text-[#F7F5EF] rounded-[2rem] p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-[#C9A44C] uppercase mb-3">Nexus Pro</p>
                <h3 className="text-xl sm:text-2xl font-serif font-bold leading-snug">Deeper market insight, on autopilot.</h3>
                <p className="text-[#8B8E9B] mt-3 text-sm leading-relaxed">Real-time signals, automated rebalancing, and priority execution across every asset you hold.</p>
              </div>
              <button className="mt-8 bg-[#C9A44C] text-[#14161F] w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition">
                Upgrade now <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* ---- Mobile bottom nav ---- */}
      <nav className="md:hidden fixed bottom-3 left-3 right-3 bg-[#0B0D14] rounded-[1.75rem] flex items-center justify-around py-2.5 shadow-2xl z-50">
        {NAV.map((n) => <MobileNavIcon key={n.label} {...n} />)}
      </nav>
    </div>
  );
}
