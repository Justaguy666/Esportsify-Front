"use client"

import React from 'react';

interface Team {
  name: string;
  abbr: string;
  color: string;
}

interface MatchCardProps {
  id?: string;
  teamA: Team;
  teamB: Team;
  scoreA: number;
  scoreB: number;
  winner?: string;
  rightStub?: boolean;
  stubHighlight?: boolean;
  leftStub?: boolean;
  leftStubHighlight?: boolean;
  champion?: boolean;
  status?: 'completed' | 'live' | 'upcoming';
}

export const MatchCard: React.FC<MatchCardProps> = ({ id, teamA, teamB, scoreA, scoreB, winner, rightStub, stubHighlight, leftStub, leftStubHighlight, champion, status }) => {
  const isWinnerA = winner === teamA.name;
  const isWinnerB = winner === teamB.name;

  const isHighlighted = status === 'live';

  return (
    <div id={id} className={`relative w-[200px] h-[80px] bg-[rgba(39,39,42,0.6)] ${
      champion
        ? 'border-2 border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.3)]'
        : isHighlighted
        ? 'border-2 border-[#EF4444] shadow-[0_0_12px_rgba(239,68,68,0.45)]'
        : 'border border-[rgba(63,63,70,0.3)]'
    } rounded-md overflow-visible`}>
      {/* Team A */}
      <div className="flex items-center justify-between px-3 py-2 h-10">
        <div className="flex items-center gap-2">
          <span className={`w-6 h-6 rounded-full ${teamA.color} text-white text-[10px] font-bold flex items-center justify-center`}>
            {teamA.abbr}
          </span>
          <span className={`text-sm ${isWinnerA ? 'text-white font-semibold' : 'text-gray-400'}`}>
            {teamA.name}
          </span>
        </div>
        <span className={`font-bold text-lg ${isWinnerA ? 'text-white' : 'text-gray-400'}`}>
          {scoreA}
        </span>
      </div>
      
      {/* Divider */}
      <div className="h-px bg-[#3D4A7A] mx-3" />
      
      {/* Team B */}
      <div className="flex items-center justify-between px-3 py-2 h-10">
        <div className="flex items-center gap-2">
          <span className={`w-6 h-6 rounded-full ${teamB.color} text-white text-[10px] font-bold flex items-center justify-center`}>
            {teamB.abbr}
          </span>
          <span className={`text-sm ${isWinnerB ? 'text-white font-semibold' : 'text-gray-400'}`}>
            {teamB.name}
          </span>
        </div>
        <span className={`font-bold text-lg ${isWinnerB ? 'text-white' : 'text-gray-400'}`}>
          {scoreB}
        </span>
      </div>
    </div>
  );
};

interface BracketConnectorProps {
  type: 'L-shape' | 'final';
  highlight?: boolean;
  branch?: 'top' | 'bottom' | 'both' | 'none';
  champion?: boolean;
}

export const BracketConnector: React.FC<BracketConnectorProps> = ({ type, highlight, branch = 'both', champion }) => {
  const rootCls = `bracket-connector${highlight ? ' is-highlight' : ''}${champion ? ' is-champion' : ''}`;
  
  if (type === 'L-shape') {
    return (
      <div className={rootCls}>
        <div className={`bracket-l-connector ${branch === 'top' ? 'only-top' : branch === 'bottom' ? 'only-bottom' : ''}`}>
          <div className="vertical-connector"></div>
          <div className="horizontal-connector"></div>
        </div>
      </div>
    );
  }

  if (type === 'final') {
    return (
      <div className={rootCls}>
        <div className={`bracket-final-connector ${branch === 'top' ? 'final-only-top' : 'final-only-bottom'}`}>
          <div className="final-vertical"></div>
          <div className="final-horizontal"></div>
        </div>
      </div>
    );
  }

  return null;
};
