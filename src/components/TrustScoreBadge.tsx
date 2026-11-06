import React from 'react';
import { ShieldCheck, ShieldAlert, Shield, Award } from 'lucide-react';
import { TrustTier } from '../lib/types';

export interface TrustScoreBadgeProps {
  score: number;
  tier?: TrustTier;
  size?: 'sm' | 'md' | 'lg';
  showMax?: boolean;
  showTier?: boolean;
  showStatusLabel?: boolean;
  className?: string;
}

export const TrustScoreBadge: React.FC<TrustScoreBadgeProps> = ({
  score,
  tier,
  size = 'md',
  showMax = true,
  showTier = true,
  showStatusLabel = false,
  className = '',
}) => {
  // Determine color theme based on trust score tiers
  const getVariant = (val: number) => {
    if (val >= 80) {
      return {
        badgeBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        ringGlow: 'group-hover:border-emerald-400/60',
        icon: ShieldCheck,
        iconColor: 'text-emerald-400',
        label: 'Verified Human Craft',
        statusColor: 'text-emerald-400',
      };
    } else if (val >= 60) {
      return {
        badgeBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        ringGlow: 'group-hover:border-amber-400/60',
        icon: Shield,
        iconColor: 'text-amber-400',
        label: 'Process Review Active',
        statusColor: 'text-amber-400',
      };
    } else {
      return {
        badgeBg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
        ringGlow: 'group-hover:border-rose-400/60',
        icon: ShieldAlert,
        iconColor: 'text-rose-400',
        label: 'Flagged / Sub-Threshold',
        statusColor: 'text-rose-400',
      };
    }
  };

  const variant = getVariant(score);
  const IconComponent = variant.icon;

  const sizeClasses = {
    sm: {
      container: 'px-2 py-0.5 text-xs',
      icon: 'w-3 h-3',
      scoreText: 'text-xs font-bold',
      maxText: 'text-[9px]',
      tierText: 'text-[9px]',
    },
    md: {
      container: 'px-2.5 py-1 text-sm',
      icon: 'w-4 h-4',
      scoreText: 'text-sm font-extrabold',
      maxText: 'text-[10px]',
      tierText: 'text-[10px]',
    },
    lg: {
      container: 'px-3.5 py-1.5 text-base',
      icon: 'w-5 h-5',
      scoreText: 'text-base font-black',
      maxText: 'text-xs',
      tierText: 'text-xs',
    },
  }[size];

  return (
    <div className={`inline-flex flex-col items-end ${className}`}>
      {/* Pill Badge */}
      <div
        className={`inline-flex items-center gap-1.5 rounded-full border transition-all duration-200 ${variant.badgeBg} ${variant.ringGlow} ${sizeClasses.container} shadow-sm backdrop-blur-xs`}
        title={`Vera Pro Trust Score: ${score}/100 - ${variant.label}`}
      >
        <IconComponent className={`${sizeClasses.icon} ${variant.iconColor} shrink-0`} />
        <span className={`font-mono tracking-tight ${sizeClasses.scoreText}`}>
          {score}
        </span>
        {showMax && (
          <span className={`text-slate-400 font-normal ${sizeClasses.maxText}`}>
            /100
          </span>
        )}
      </div>

      {/* Tier Label */}
      {showTier && tier && (
        <div className={`font-semibold text-slate-400 mt-1 flex items-center gap-1 ${sizeClasses.tierText}`}>
          <span>{tier} Tier</span>
        </div>
      )}

      {/* Optional Status Subtext */}
      {showStatusLabel && (
        <span className={`text-[9px] uppercase tracking-wider font-bold mt-0.5 ${variant.statusColor}`}>
          {variant.label}
        </span>
      )}
    </div>
  );
};
