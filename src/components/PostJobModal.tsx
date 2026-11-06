import React, { useState } from 'react';
import { X, Briefcase, Sparkles, Coins, Clock, MapPin, Globe2, ShieldCheck } from 'lucide-react';
import { ProfessionalCategory, TrustTier, JobPosting } from '../lib/types';

interface PostJobModalProps {
  onClose: () => void;
  onJobCreated: (job: JobPosting) => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({ onClose, onJobCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ProfessionalCategory>('trades');
  const [budget, setBudget] = useState<number>(1500000);
  const [deadline, setDeadline] = useState<'24_hours' | '3_days' | '1_week' | '2_weeks' | '1_month'>('1_week');
  const [city, setCity] = useState('Lagos');
  const [remoteAllowed, setRemoteAllowed] = useState(false);
  const [minTrustScore, setMinTrustScore] = useState(90);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newJob: JobPosting = {
      id: `job-${Date.now()}`,
      clientId: 'client-user-current',
      clientName: 'Adewale Johnson (Client)',
      title,
      description,
      category,
      field: category === 'trades' ? 'Structural Construction & Signage' : category === 'tech' ? 'Distributed Systems' : 'Design & Services',
      budget,
      currency: 'NGN',
      deadline,
      city,
      country: 'Nigeria',
      remoteAllowed,
      requiredTier: minTrustScore >= 95 ? 'Expert' : minTrustScore >= 90 ? 'Senior' : 'Verified',
      minTrustScore,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onJobCreated(newJob);
    alert('Job posted successfully! Process-verified professionals matching this criteria are alerted.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl text-slate-100 shadow-2xl p-6 sm:p-8 space-y-5">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Post a Verified Job</h2>
              <p className="text-xs text-slate-400">Escrow backed • Only vetted professionals with proven craft match</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-400 block mb-1 font-semibold">Job Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 14m Outdoor Gantry Signage Installation on Ozumba Mbadiwe"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 font-semibold">Plain Language Requirements</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe deliverables, required physical site presence, or specific Git commit / RAW photo expectations..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Discipline Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none"
              >
                <option value="trades">Trades & Construction</option>
                <option value="tech">Tech & Software</option>
                <option value="design">UI/UX & Product Design</option>
                <option value="creative">Creative & Photography</option>
                <option value="services">Finance & ICAN Accounting</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Budget (NGN)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Delivery Timeline</label>
              <select
                value={deadline}
                onChange={(e) => setDeadline(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none"
              >
                <option value="24_hours">Urgent (24 Hours)</option>
                <option value="3_days">Fast (3 Days)</option>
                <option value="1_week">Standard (1 Week)</option>
                <option value="2_weeks">Medium (2 Weeks)</option>
                <option value="1_month">Complex Project (1 Month)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Target Location</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none"
              >
                <option value="Lagos">Lagos (On-Site/Trades)</option>
                <option value="Abuja">Abuja</option>
                <option value="Port Harcourt">Port Harcourt</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remoteAllowed}
                onChange={(e) => setRemoteAllowed(e.target.checked)}
                className="rounded border-slate-700 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-slate-300">Allow Remote / International Pros</span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Min Trust Score:</span>
              <span className="text-emerald-400 font-bold font-mono">{minTrustScore}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-950/40"
            >
              Publish Job & Match Talent
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
