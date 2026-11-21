import React, { useMemo } from 'react';
import { MalaBeadVisualType } from '../types';

interface RotatingMalaRosaryProps {
  currentBead: number;          // 0 to 107
  completedMalas: number;
  targetMalas: number;
  beadType: MalaBeadVisualType;
  onBeadTap: (e: React.TouchEvent | React.MouseEvent) => void;
  isAutoRunning?: boolean;
  isSpeaking?: boolean;
  mantraText?: string;
  timerInterval?: number;
  timerSecondsLeft?: number;
  chantProgress?: number; // 0.0 to 1.0 representing progress of current mantra
}

const TOTAL_BEADS = 108;
const RADIUS = 145; // Radius of mala circle in SVG units
const CENTER = 175; // Center of SVG viewport (350x350)

export const RotatingMalaRosary: React.FC<RotatingMalaRosaryProps> = ({
  currentBead,
  completedMalas,
  targetMalas,
  beadType,
  onBeadTap,
  isAutoRunning = false,
  isSpeaking = false,
  timerInterval = 5,
  timerSecondsLeft = 5,
  chantProgress = 0
}) => {
  // Pre-calculate positions of all 108 beads along circle
  const beads = useMemo(() => {
    return Array.from({ length: TOTAL_BEADS }, (_, i) => {
      // Angle in radians (0 at top)
      const angleDeg = (i * 360) / TOTAL_BEADS;
      const angleRad = ((angleDeg - 90) * Math.PI) / 180;
      const cx = CENTER + RADIUS * Math.cos(angleRad);
      const cy = CENTER + RADIUS * Math.sin(angleRad);
      // Classical milestones in Hindu rosaries: beads 27, 54, 81 have golden marker caps
      const isQuarterMarker = i === 27 || i === 54 || i === 81;
      return { index: i, cx, cy, angleDeg, isQuarterMarker };
    });
  }, []);

  // REAL-TIME BEAD TURNING ACCORDING TO MANTRA TIME:
  // When timer is running, the bead continuously turns smoothly across the duration of the mantra!
  const progressRatio = isAutoRunning ? Math.max(0, Math.min(1, chantProgress)) : 0;
  const effectiveBeadPosition = currentBead + progressRatio;
  const rotationDegrees = -(effectiveBeadPosition * (360 / TOTAL_BEADS));

  // Determine bead styling based on chosen visual type
  const beadColors = useMemo(() => {
    switch (beadType) {
      case 'tulsi':
        return {
          fill: 'url(#tulsiGradient)',
          stroke: '#78350f',
          activeFill: '#fbbf24',
          threadColor: '#d97706'
        };
      case 'sphatik':
        return {
          fill: 'url(#sphatikGradient)',
          stroke: '#94a3b8',
          activeFill: '#38bdf8',
          threadColor: '#cbd5e1'
        };
      case 'kamalgatta':
        return {
          fill: 'url(#kamalgattaGradient)',
          stroke: '#1e293b',
          activeFill: '#f59e0b',
          threadColor: '#f59e0b'
        };
      case 'chandan':
        return {
          fill: 'url(#chandanGradient)',
          stroke: '#881337',
          activeFill: '#f43f5e',
          threadColor: '#e11d48'
        };
      case 'rudraksha':
      default:
        return {
          fill: 'url(#rudrakshaGradient)',
          stroke: '#451a03',
          activeFill: '#f59e0b',
          threadColor: '#ea580c'
        };
    }
  }, [beadType]);

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[370px] aspect-square mx-auto flex items-center justify-center select-none my-1">
      {/* Interactive touch/click surface covering entire rosary */}
      <div
        onTouchStart={onBeadTap}
        onClick={onBeadTap}
        className="absolute inset-0 z-20 cursor-pointer rounded-full active:scale-[0.98] transition-transform duration-75 flex items-center justify-center"
        title="स्पर्श करें या जाप आगे बढ़ाएं"
      >
        {/* Center Sacred Sanctum Dial */}
        <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-gradient-to-b from-[#FFFDF9] via-amber-50/90 to-orange-100/90 border-4 border-amber-300 shadow-2xl flex flex-col items-center justify-center p-3 text-center relative overflow-hidden backdrop-blur-xs ring-4 ring-orange-500/20">
          {/* Circular Countdown Progress Stroke around the Dial */}
          {isAutoRunning && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="74"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4"
                strokeDasharray={2 * Math.PI * 74}
                strokeDashoffset={2 * Math.PI * 74 * (1 - progressRatio)}
                strokeLinecap="round"
                className="transition-all duration-100"
              />
            </svg>
          )}

          {/* Subtle Sacred Om Watermark in Center Background */}
          <span className="absolute text-7xl font-sanskrit text-amber-500/10 select-none pointer-events-none transform -translate-y-1">
            ॐ
          </span>

          {/* Active Status Badge */}
          <div className="relative z-10 flex items-center gap-1.5 mb-1">
            <span
              className={`w-2 h-2 rounded-full ${
                isAutoRunning || isSpeaking ? 'bg-emerald-500 animate-ping' : 'bg-orange-500'
              }`}
            />
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded-full">
              {isAutoRunning ? `समय: ${timerSecondsLeft}s` : isSpeaking ? 'वाणी पाठ' : 'कर माला स्पर्श'}
            </span>
          </div>

          {/* Large Glorious Current Bead Counter */}
          <div className="relative z-10 my-0.5">
            <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-700 via-amber-600 to-orange-800 tracking-tight font-mono">
              {String(currentBead === 0 && completedMalas > 0 ? 108 : currentBead).padStart(3, '0')}
            </span>
            <span className="text-xs font-black text-orange-900/60 block -mt-1 tracking-widest">
              / १०८ मणके
            </span>
          </div>

          {/* Completed Mala & Target Counter */}
          <div className="relative z-10 mt-1 pt-1 border-t border-orange-300/60 w-full flex items-center justify-around text-xs">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-amber-950/70 font-black">पूर्ण माला</span>
              <span className="text-sm font-black text-orange-950 font-mono">
                {completedMalas}
              </span>
            </div>
            <span className="text-orange-400 font-bold">|</span>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-amber-950/70 font-black">लक्ष्य</span>
              <span className="text-sm font-black text-amber-700 font-mono">
                {targetMalas}
              </span>
            </div>
          </div>

          {/* Subtle touch prompt */}
          <span className="text-[9px] font-black text-orange-700 mt-1 animate-pulse tracking-wide">
            👆 स्पर्श करें
          </span>
        </div>
      </div>

      {/* SVG Container holding the entire rotating rosary */}
      <svg
        viewBox="0 0 350 350"
        className="w-full h-full pointer-events-none drop-shadow-xl"
      >
        <defs>
          {/* 1. Rudraksha Bead Radial Texture */}
          <radialGradient id="rudrakshaGradient" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#c2410c" />
            <stop offset="45%" stopColor="#7c2d12" />
            <stop offset="85%" stopColor="#451a03" />
            <stop offset="100%" stopColor="#1c0a02" />
          </radialGradient>

          {/* 2. Tulsi Wood Radial Texture */}
          <radialGradient id="tulsiGradient" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="50%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>

          {/* 3. Sphatik Crystal Prism Gradient */}
          <radialGradient id="sphatikGradient" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#e0f2fe" />
            <stop offset="70%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#7dd3fc" />
          </radialGradient>

          {/* 4. Kamal Gatta Dark Seed Gradient */}
          <radialGradient id="kamalgattaGradient" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>

          {/* 5. Chandan Red Sandalwood Gradient */}
          <radialGradient id="chandanGradient" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="45%" stopColor="#be123c" />
            <stop offset="100%" stopColor="#4c0519" />
          </radialGradient>

          {/* Active Glowing Bead Aura */}
          <radialGradient id="activeGlowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </radialGradient>

          {/* Golden Sumeru Bead Gradient */}
          <radialGradient id="sumeruGradient" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#facc15" />
            <stop offset="80%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#713f12" />
          </radialGradient>
        </defs>

        {/* 1. Golden Sacred Thread Circle */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke={beadColors.threadColor}
          strokeWidth="2.5"
          strokeDasharray="4 2"
          opacity="0.85"
        />

        {/* 2. THE ROTATING ROSARY GROUP (Rotates smoothly in sync with mantra time!) */}
        <g
          style={{
            transform: `rotate(${rotationDegrees}deg)`,
            transformOrigin: `${CENTER}px ${CENTER}px`,
            transition: isAutoRunning ? 'transform 0.12s linear' : 'transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {beads.map((bead) => {
            const isActive = bead.index === currentBead;
            const isJustPassed = bead.index === (currentBead - 1 + TOTAL_BEADS) % TOTAL_BEADS;

            return (
              <g key={bead.index}>
                {/* Active Bead Glorious Glow Aura */}
                {isActive && (
                  <circle
                    cx={bead.cx}
                    cy={bead.cy}
                    r="12"
                    fill="url(#activeGlowGradient)"
                    className="animate-pulse"
                  />
                )}

                {/* Individual 3D Sacred Bead */}
                <circle
                  cx={bead.cx}
                  cy={bead.cy}
                  r={isActive ? '6.8' : bead.isQuarterMarker ? '5.6' : '4.6'}
                  fill={isActive ? beadColors.activeFill : beadColors.fill}
                  stroke={isActive ? '#d97706' : beadColors.stroke}
                  strokeWidth={isActive ? '1.8' : '0.8'}
                  filter={isActive ? 'drop-shadow(0 0 4px #f59e0b)' : undefined}
                />

                {/* Tiny Bead Highlight Specular Dot */}
                <circle
                  cx={bead.cx - 1.4}
                  cy={bead.cy - 1.4}
                  r={isActive ? '1.8' : '1.1'}
                  fill="#ffffff"
                  opacity={isActive ? '0.9' : '0.45'}
                />

                {/* Quarter Milestone Golden Marker Rings */}
                {bead.isQuarterMarker && !isActive && (
                  <circle
                    cx={bead.cx}
                    cy={bead.cy}
                    r="6.8"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="0.9"
                    strokeDasharray="2 1.5"
                  />
                )}
              </g>
            );
          })}

          {/* 3. Golden Sumeru Bead Marker on the Rosary (Positioned at Bead 0 / Top) */}
          <g transform={`translate(${CENTER}, ${CENTER - RADIUS})`}>
            {/* Silk Saffron Tassel under Sumeru */}
            <path
              d="M -3 6 L 3 6 L 5 18 L -5 18 Z"
              fill="#ea580c"
              stroke="#ca8a04"
              strokeWidth="0.8"
            />
            {/* Tassel fringe lines */}
            <line x1="-3" y1="18" x2="-4" y2="22" stroke="#ea580c" strokeWidth="1" />
            <line x1="0" y1="18" x2="0" y2="23" stroke="#f59e0b" strokeWidth="1" />
            <line x1="3" y1="18" x2="4" y2="22" stroke="#ea580c" strokeWidth="1" />

            {/* Sumeru Golden Bead Cap */}
            <circle
              cx="0"
              cy="0"
              r="9"
              fill="url(#sumeruGradient)"
              stroke="#713f12"
              strokeWidth="1.5"
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
            />
            {/* Sumeru Crown Crest */}
            <text
              x="0"
              y="3"
              textAnchor="middle"
              fontSize="8"
              fontWeight="bold"
              fill="#451a03"
            >
              👑
            </text>
          </g>
        </g>

        {/* 4. Top Physical Hand/Finger Indicator at Apex */}
        <g transform={`translate(${CENTER}, 14)`}>
          {/* Downward Golden Pointer showing active chant bead */}
          <polygon
            points="0,8 -5,-2 5,-2"
            fill="#ea580c"
            stroke="#fef08a"
            strokeWidth="1"
            filter="drop-shadow(0 2px 3px rgba(0,0,0,0.3))"
          />
        </g>
      </svg>
    </div>
  );
};
