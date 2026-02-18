import React, { useState } from 'react';
import { Copy, Check, Info, Layout, PlayCircle, Download } from 'lucide-react';

interface Script {
  id: string;
  title: string;
  hook: string;
  visual: string;
  videoSrc?: string;
}

interface Angle {
  id: string;
  title: string;
  target: string;
  primaryText: string;
  headline: string;
  cta: string;
  scripts: Script[];
  hooks: string[];
}

const adAngles: Angle[] = [
  {
    id: 'luxury',
    title: 'Premium Outdoor Luxury',
    target: 'High-Income / Entertainers',
    primaryText: `Turn Your Backyard Into the Most Impressive Space on the Block. 🏔️✨

Your backyard shouldn’t feel like wasted space. It should be a private resort where friends gather and memories are made.

Introducing the **Outdoor Living Design Experience™** by Deck Masters AK.
✅ Custom 3D Design Renders
✅ Premium Composite & Cable Railing Options
✅ Built to Withstand Alaska’s Freeze-Thaw Cycles

Don't settle for a basic platform. Build a masterpiece.
👇 **Claim Your Free 3D Design Preview**`,
    headline: "Design Your Dream Deck in 3D 🏡",
    cta: "Book Design Preview",
    scripts: [
      { 
        id: 'l1', 
        title: "The Resort at Home", 
        hook: "Why fly to a resort when you can walk out your back door?", 
        visual: "Drone shot of stunning wraparound deck",
        videoSrc: "/images/drone-wraparound.mp4"
      },
      { id: 'l2', title: "The Host's Pride", hook: "Be honest. When friends come over, are you proud to show them the backyard?", visual: "POV walking onto deck with friends" },
      { id: 'l3', title: "The Visual Transformation", hook: "This... turned into THIS. (Split screen)", visual: "Fast Before/After cuts" },
      { id: 'l4', title: "The 3D Reveal", hook: "Don't build a deck until you see this.", visual: "Screen recording of 3D CAD software" },
    ],
    hooks: [
        "Turn your backyard into the private resort your neighbors will envy.",
        "Be honest: Is your backyard embarrassing when guests come over?",
        "Why fly to Hawaii when you can walk out your back door?",
        "The most impressive room in your house... isn't inside your house.",
        "Stop staring at a dirt patch. Start building your paradise.",
        "Your home deserves better than a 10x10 builder-grade square.",
        "This isn't just a deck. It's a statement.",
        "Imagine sipping your morning coffee right here.",
        "The ultimate upgrade for the Anchorage entertainer.",
        "Don't just build a deck. Build a legacy.",
        "Watch this backyard transformation in 15 seconds.",
        "You won't believe what this looked like before.",
        "This is what $50k of added home value looks like.",
        "Cable railing vs. Wood railing: The difference is shocking.",
        "See your dream deck in 3D before we drive a single nail."
    ]
  },
  {
    id: 'speed',
    title: 'Speed & Efficiency',
    target: 'Busy Professionals / Military',
    primaryText: `Custom Decks Built in 21 Days — Guaranteed. ⏱️🔨

Don’t Lose Another Alaska Summer to a Half-Finished Project.
Most projects drag on for months. Ours don't.

We helped Joshua replace his 45-year-old deck in *less than 24 hours* of build time.
👉 Pre-Scheduled Crews
👉 Materials On-Hand (No Supply Chain Excuses)
👉 Strict Timeline Guarantees

**Only 3 Priority Build Slots Open for This Month.**
Secure yours before the calendar fills.`,
    headline: "Custom Decks in 21 Days ⚡",
    cta: "Check Availability",
    scripts: [
      { id: 's1', title: "The 24-Hour Miracle", hook: "We tore this deck down in ONE hour.", visual: "Time-lapse of demo & build" },
      { id: 's2', title: "Don't Miss Summer", hook: "Don't Lose Another Alaska Summer to a Half-Finished Project.", visual: "Selfie video in snow/rain" },
      { id: 's3', title: "The Military Move", hook: "PCSing? Renting out your spot? You need this done FAST.", visual: "Moving boxes/Military gear" },
      { id: 's4', title: "The Process Reveal", hook: "Why are other contractors so slow?", visual: "Clipboard/Schedule close-up" },
    ],
    hooks: [
        "Summer in Alaska is 12 weeks long. Don't waste 8 of them waiting on a contractor.",
        "Don't lose another summer to a half-finished project.",
        "If you book in June, you'll be grilling in snow. Book now.",
        "The sun is out. Is your deck ready?",
        "3 months of sun. Do you really want to spend it chasing a builder?",
        "Custom decks built in 21 days. Guaranteed.",
        "We replaced this deck in less than 24 hours.",
        "The only contractor in Anchorage with a Timeline Guarantee.",
        "PCSing soon? We build fast so you can rent/sell fast.",
        "From permit to party in under 3 weeks.",
        "Why are other contractors so slow? (The Truth)",
        "Strict timelines. No excuses. No delays.",
        "Get on the 'Priority Build' list before it fills up."
    ]
  },
  {
    id: 'trust',
    title: 'Trust & No Surprises',
    target: 'Skeptics / Burned Homeowners',
    primaryText: `The Only Deck Builder in Anchorage With a No-Surprise Guarantee. 🤝

"Communication wasn't just good... they set up weekly in-person check-ins." — Rachel B.

We’ve all heard the contractor horror stories:
❌ Ghosting you halfway through
❌ Surprise "change orders" inflating the bill
❌ Messy jobsites left for weeks

At Deck Masters AK, we operate differently.
✅ Fixed-Price Contracts
✅ Weekly Progress Updates
✅ Clean Job Sites Every Day

Get the peace of mind you deserve.
👇 **Get Your Free Structural Safety Inspection**`,
    headline: "No Surprises. Fixed Price. 🛡️",
    cta: "Get Inspection",
    scripts: [
      { id: 't1', title: "The Mold Nightmare", hook: "We found BLACK MOLD in this client's garage.", visual: "Dramatic/Serious tone" },
      { id: 't2', title: "The Weekly Check-In", hook: "When was the last time a contractor asked YOU for a meeting?", visual: "Shaking hands/Meeting client" },
      { id: 't3', title: "The Clean Site", hook: "I hate messy contractors.", visual: "Sweeping up/Cleaning" },
      { id: 't4', title: "The Fixed Price", hook: "Stop paying for 'Surprise Change Orders'.", visual: "Contract/Paperwork close-up" },
    ],
    hooks: [
        "We are the contractor that actually shows up.",
        "Tired of being ghosted by tradesmen?",
        "The 'No-Horror-Story' Guarantee.",
        "Most contractors hate this video.",
        "We don't do 'Surprise Change Orders'.",
        "Finally. A builder who communicates better than your ex.",
        "Weekly in-person check-ins. Who else does that?",
        "We found BLACK MOLD behind this client's wall.",
        "Don't hire a deck builder until you ask these 3 questions.",
        "The mistake that cost this homeowner $5,000.",
        "Is your contractor licensed? Are you sure?",
        "Safety Alert: Is your deck attached correctly?"
    ]
  },
  {
    id: 'value',
    title: 'Smart Investment',
    target: 'Value Hunters / Long-Term',
    primaryText: `A Deck Isn’t an Expense. It’s an Investment. 📈🏠

Is your current deck hurting your home's value?
Rotting wood, heaving stairs, and wind-damaged railings aren't just ugly—they're liabilities.

We specialize in Alaskan-tough upgrades:
❄️ Frost-Heave Resistant Footings
🌪️ Wind-Rated Cable Railing Systems
🛡️ Low-Maintenance Composite (No more staining!)

Add usable square footage and resale value to your home.
**Financing Available. Build Now, Pay Later.**
👇 **Get Your Free Frost-Heave Assessment**`,
    headline: "Add Value to Your Home 🏠",
    cta: "Get Assessment",
    scripts: [
      { id: 'v1', title: "Wind vs. Railing", hook: "Stop Worrying Every Time the Wind Picks Up.", visual: "Wobbly railing vs. Sturdy cable" },
      { id: 'v2', title: "The Frost Heave", hook: "Why are your stairs crooked?", visual: "Crooked stairs/Ground close-up" },
      { id: 'v3', title: "Wood vs. Composite", hook: "How do you want to spend your summer? Painting or Relaxing?", visual: "Painting a deck vs. Relaxing" },
      { id: 'v4', title: "Home Value", hook: "The #1 way to boost curb appeal in Anchorage?", visual: "Real Estate sign/Sold sign" },
    ],
    hooks: [
        "Will your deck survive the next 90mph wind storm?",
        "Frost Heave is the #1 killer of Alaskan decks.",
        "Stop worrying every time the wind picks up.",
        "Build for the 907, not the lower 48.",
        "Why cable railing is the smartest investment for windy zones.",
        "A deck isn't an expense. It's an asset.",
        "The #1 way to boost curb appeal in Anchorage.",
        "Stop throwing money away on staining and sealing.",
        "Wood vs. Composite: The math doesn't lie.",
        "Financing available: Build the asset now, pay later."
    ]
  },
  {
    id: 'relief',
    title: 'Relief & Ease',
    target: 'Women 35-55 / Household Managers',
    primaryText: `Finally... A Contractor That Makes This Easy. 😌✨

Tired of chasing contractors?
Tired of "mansplaining" and ignored ideas?
Tired of the mess?

Deck Masters AK is the "Easy Button" for outdoor living.
We handle everything:
✅ Design & Permits
✅ Material Delivery
✅ Daily Cleanup (Zero Nail Policy)

Just pick your colors, and we handle the rest.
Collaborative. Respectful. Professional.

👇 **Experience the Difference. Book a Consult.**`,
    headline: "The Stress-Free Deck Build 🧘‍♀️",
    cta: "Book Consult",
    scripts: [
      { id: 'r1', title: "The Easy Button", hook: "Finally... A Contractor That Makes This Easy.", visual: "Woman relaxing with coffee on deck" },
      { id: 'r2', title: "The Wife's Review", hook: "My husband tried to fix the deck... for 3 years.", visual: "Husband with tools looking confused" },
      { id: 'r3', title: "The Clean Up", hook: "Watch how we leave your yard. (ASMR)", visual: "Satisfying cleanup montage" },
      { id: 'r4', title: "The No-Mansplain", hook: "We listen. We don't lecture.", visual: "Friendly design meeting" },
    ],
    hooks: [
        "Finally... A contractor that makes this easy.",
        "The 'Easy Button' for outdoor living.",
        "No mess. No stress. Just done.",
        "We handle the permits, the design, and the cleanup.",
        "You pick the colors. We handle the headache.",
        "We clean your yard every single day. Zero nails left behind.",
        "A construction crew you actually feel safe having at your home.",
        "No loud music. No swearing. Just professionalism.",
        "My husband tried to fix this for 3 years. We finished it in 3 days.",
        "We listen. We don't 'mansplain' construction."
    ]
  }
];

const FacebookAdPreview: React.FC<{ angle: Angle; selectedScript: Script }> = ({ angle, selectedScript }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Truncate primary text for preview "See More" effect
  const shortText = angle.primaryText.split('\n').slice(0, 3).join('\n');
  const hasMore = angle.primaryText.split('\n').length > 3;

  return (
    <div className="bg-white text-black rounded-lg shadow-sm border border-gray-300 w-full max-w-[400px] mx-auto font-sans overflow-hidden">
      {/* Header */}
      <div className="p-3 flex items-start gap-2">
        <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden border border-stone-100 flex-shrink-0">
             {/* Placeholder for Logo */}
             <div className="w-full h-full bg-orange-600 flex items-center justify-center text-white font-bold text-xs">DM</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-bold text-sm leading-tight text-gray-900 truncate">Deck Masters AK</span>
            {/* Verified Badge (optional visual fluff) */}
            <svg className="w-3 h-3 text-blue-500 fill-current" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
          </div>
          <div className="text-xs text-gray-500 leading-tight">Sponsored · 🌍</div>
        </div>
        <button className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
        </button>
      </div>

      {/* Primary Text */}
      <div className="px-3 pb-2 text-sm text-gray-900 whitespace-pre-wrap">
        {isExpanded ? angle.primaryText : shortText}
        {hasMore && !isExpanded && (
          <button onClick={() => setIsExpanded(true)} className="text-gray-500 font-semibold hover:underline ml-1">
            ...See more
          </button>
        )}
      </div>

      {/* Creative / Video Placeholder */}
      <div className="w-full aspect-[4/5] bg-stone-900 relative flex flex-col items-center justify-center text-center p-0 bg-gradient-to-br from-stone-800 to-stone-900 group cursor-pointer overflow-hidden">
          {selectedScript.videoSrc ? (
            <video 
              src={selectedScript.videoSrc} 
              className="w-full h-full object-cover" 
              controls 
              autoPlay 
              muted 
              loop 
              playsInline
            />
          ) : (
            <div className="p-6 flex flex-col items-center justify-center w-full h-full">
                <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:scale-110 transition-transform mb-4" />
                <p className="text-white font-bold text-lg uppercase tracking-wider mb-1">{selectedScript.title}</p>
                <p className="text-stone-400 text-xs uppercase tracking-widest border-t border-stone-600 pt-2 mt-2">Visual: {selectedScript.visual}</p>
            </div>
          )}
          
          <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded text-left border border-white/10 pointer-events-none">
              <p className="text-orange-400 text-xs font-bold uppercase mb-1">Hook (0-3s)</p>
              <p className="text-white text-sm italic">"{selectedScript.hook}"</p>
          </div>
      </div>

      {/* CTA Bar */}
      <div className="bg-gray-100 p-3 flex items-center justify-between border-t border-gray-200">
        <div className="flex-1 min-w-0 pr-2">
            <p className="text-xs text-gray-500 uppercase truncate">deckmastersak.com</p>
            <h3 className="text-sm font-bold text-gray-900 truncate leading-tight mt-0.5">{angle.headline}</h3>
        </div>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-semibold px-4 py-2 rounded transition-colors whitespace-nowrap">
            {angle.cta}
        </button>
      </div>
      
      {/* Engagement Footer */}
       <div className="px-3 py-2 flex items-center justify-between border-t border-gray-200 text-gray-500 text-sm">
            <div className="flex items-center gap-1">
                 <div className="flex -space-x-1">
                     <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center ring-2 ring-white">
                         <svg className="w-2 h-2 text-white fill-current" viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                     </div>
                 </div>
                 <span>24</span>
            </div>
            <div className="flex gap-3 text-xs font-medium">
                <span>4 Comments</span>
                <span>2 Shares</span>
            </div>
       </div>
    </div>
  );
};

export const AdvertisingPlan: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'planner' | 'matrix' | 'hooks' | 'guide'>('planner');
  const [selectedAngleId, setSelectedAngleId] = useState<string>(adAngles[0].id);
  const [selectedScriptId, setSelectedScriptId] = useState<string>(adAngles[0].scripts[0].id);
  const [copied, setCopied] = useState<string | null>(null);

  const currentAngle = adAngles.find(a => a.id === selectedAngleId) || adAngles[0];
  const currentScript = currentAngle.scripts.find(s => s.id === selectedScriptId) || currentAngle.scripts[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleExportJson = () => {
    const dataStr = JSON.stringify(adAngles, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "deck-masters-ad-plan-2026.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-stone-800 pb-6">
            <div>
                <h2 className="text-2xl font-display font-bold uppercase text-white flex items-center gap-2">
                    <Layout className="text-orange-600" />
                    2026 Advertising Plan
                </h2>
                <p className="text-stone-400 text-sm mt-1">
                    The "Andromeda" Strategy: 5 Angles, 20 Creatives.
                </p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                 <div className="flex gap-2">
                     <button 
                        onClick={handleExportJson}
                        className="bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-300 text-xs font-bold uppercase px-4 py-2 rounded transition-colors flex items-center gap-2"
                     >
                        <Download className="w-4 h-4" />
                        Export JSON
                     </button>
                     <button className="bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-300 text-xs font-bold uppercase px-4 py-2 rounded transition-colors" onClick={() => window.open('https://adsmanager.facebook.com', '_blank')}>
                        Open Ads Manager
                     </button>
                 </div>

                <div className="flex bg-stone-900 p-1 rounded-sm border border-stone-800">
                    {['planner', 'matrix', 'hooks', 'guide'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all ${
                                activeTab === tab
                                    ? 'bg-stone-800 text-white shadow-sm'
                                    : 'text-stone-500 hover:text-stone-300'
                            }`}
                        >
                            {tab.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'planner' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar: Angles & Scripts */}
                <div className="lg:col-span-4 space-y-6">
                    
                    {/* Angle Selector */}
                    <div className="space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">Select Strategy Angle</h3>
                        {adAngles.map((angle) => (
                            <button
                                key={angle.id}
                                onClick={() => {
                                    setSelectedAngleId(angle.id);
                                    setSelectedScriptId(angle.scripts[0].id); // Reset script on angle change
                                }}
                                className={`w-full text-left p-4 rounded-sm border transition-all relative overflow-hidden group ${
                                    selectedAngleId === angle.id
                                        ? 'bg-orange-900/20 border-orange-600'
                                        : 'bg-stone-900/50 border-stone-800 hover:border-stone-600'
                                }`}
                            >
                                 <div className="relative z-10">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={`font-bold uppercase text-sm ${selectedAngleId === angle.id ? 'text-white' : 'text-stone-300'}`}>
                                            {angle.title}
                                        </span>
                                        {selectedAngleId === angle.id && <Check className="w-4 h-4 text-orange-500" />}
                                    </div>
                                    <span className="text-xs text-stone-500">{angle.target}</span>
                                 </div>
                                 {selectedAngleId === angle.id && (
                                     <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-600"></div>
                                 )}
                            </button>
                        ))}
                    </div>

                    {/* Script Selector */}
                    <div className="space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-3 mt-8">Select Creative Script</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {currentAngle.scripts.map((script) => (
                                <button
                                    key={script.id}
                                    onClick={() => setSelectedScriptId(script.id)}
                                    className={`w-full text-left px-4 py-3 rounded-sm border transition-all flex items-center gap-3 ${
                                        selectedScriptId === script.id
                                            ? 'bg-stone-800 border-stone-600 text-white'
                                            : 'bg-transparent border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                                    }`}
                                >
                                    <PlayCircle className={`w-4 h-4 ${selectedScriptId === script.id ? 'text-orange-500' : 'text-stone-600'}`} />
                                    <span className="text-xs font-bold uppercase truncate">{script.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Copy Helpers */}
                     <div className="bg-stone-900 border border-stone-800 p-4 rounded-sm mt-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">Quick Copy</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-stone-400">Primary Text</span>
                                    <button 
                                        onClick={() => handleCopy(currentAngle.primaryText, 'primary')}
                                        className="text-orange-600 hover:text-orange-500 text-xs uppercase font-bold flex items-center gap-1"
                                    >
                                        {copied === 'primary' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                        {copied === 'primary' ? 'Copied' : 'Copy'}
                                    </button>
                                </div>
                                <div className="bg-stone-950 p-2 rounded text-xs text-stone-500 truncate border border-stone-900 font-mono">
                                    {currentAngle.primaryText.substring(0, 40)}...
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-stone-400">Headline</span>
                                    <button 
                                        onClick={() => handleCopy(currentAngle.headline, 'headline')}
                                        className="text-orange-600 hover:text-orange-500 text-xs uppercase font-bold flex items-center gap-1"
                                    >
                                        {copied === 'headline' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                        {copied === 'headline' ? 'Copied' : 'Copy'}
                                    </button>
                                </div>
                                <div className="bg-stone-950 p-2 rounded text-xs text-stone-500 truncate border border-stone-900 font-mono">
                                    {currentAngle.headline}
                                </div>
                            </div>
                             <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs text-stone-400">Script Hook</span>
                                    <button 
                                        onClick={() => handleCopy(currentScript.hook, 'hook')}
                                        className="text-orange-600 hover:text-orange-500 text-xs uppercase font-bold flex items-center gap-1"
                                    >
                                        {copied === 'hook' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                        {copied === 'hook' ? 'Copied' : 'Copy'}
                                    </button>
                                </div>
                                <div className="bg-stone-950 p-2 rounded text-xs text-stone-500 truncate border border-stone-900 font-mono">
                                    {currentScript.hook}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content: Preview */}
                <div className="lg:col-span-8">
                    <div className="bg-stone-900/50 border border-stone-800 rounded-sm p-8 flex flex-col items-center justify-center min-h-[600px] relative">
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                            <span className="bg-blue-600 text-white text-[10px] font-bold uppercase px-2 py-1 rounded">Facebook Feed Preview</span>
                        </div>
                        
                        <FacebookAdPreview angle={currentAngle} selectedScript={currentScript} />

                        <div className="mt-8 max-w-lg text-center">
                            <h4 className="text-stone-300 font-bold uppercase text-sm mb-2">Why this works</h4>
                            <p className="text-stone-500 text-xs leading-relaxed">
                                This creative targets the <span className="text-orange-500 font-bold">{currentAngle.target}</span> segment. 
                                The hook "{currentScript.hook}" is designed to stop the scroll by triggering specific {currentAngle.id === 'luxury' ? 'status/pride' : currentAngle.id === 'trust' ? 'fear/skepticism' : 'logic'} emotions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'matrix' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {adAngles.map((angle) => (
                    <div key={angle.id} className="space-y-4">
                        <div className="bg-stone-900 border border-stone-800 p-4 rounded-sm border-t-4 border-t-orange-600">
                            <h3 className="text-sm font-bold uppercase text-white mb-1">{angle.title}</h3>
                            <p className="text-[10px] text-stone-500 uppercase tracking-wider">{angle.target}</p>
                        </div>
                        <div className="space-y-3">
                            {angle.scripts.map((script) => (
                                <div key={script.id} className="bg-stone-950 border border-stone-800 p-3 rounded hover:border-stone-700 transition-colors group">
                                    <div className="flex items-start gap-2 mb-2">
                                        <PlayCircle className="w-4 h-4 text-orange-600 mt-0.5" />
                                        <h4 className="text-xs font-bold text-stone-300 uppercase leading-tight">{script.title}</h4>
                                    </div>
                                    <p className="text-[10px] text-stone-500 mb-2 italic">"{script.hook}"</p>
                                    <div className="text-[10px] text-stone-600 uppercase tracking-wider border-t border-stone-900 pt-2 mt-2">
                                        Visual: {script.visual}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'hooks' && (
            <div className="bg-stone-900/50 border border-stone-800 rounded-sm p-8">
                <h3 className="text-lg font-display font-bold uppercase text-white mb-6 flex items-center gap-2">
                    <Info className="text-orange-600 w-5 h-5" />
                    Creative Hooks Library
                    <span className="bg-stone-800 text-stone-400 text-[10px] px-2 py-0.5 rounded-full ml-2">Testing Set</span>
                </h3>
                
                <div className="space-y-8">
                    {adAngles.map((angle) => (
                        <div key={angle.id}>
                            <h4 className="text-sm font-bold uppercase text-orange-500 mb-4 tracking-widest border-b border-stone-800 pb-2">
                                {angle.title} <span className="text-stone-600 text-[10px] normal-case ml-2">({angle.target})</span>
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {angle.hooks.map((hook, index) => (
                                    <div key={index} className="bg-stone-950 border border-stone-800 p-4 rounded group hover:border-orange-900 transition-colors relative">
                                        <p className="text-stone-300 text-xs font-medium pr-8">"{hook}"</p>
                                        <button 
                                            onClick={() => handleCopy(hook, `hook-${angle.id}-${index}`)}
                                            className="absolute top-2 right-2 text-stone-600 hover:text-orange-500 transition-colors"
                                            title="Copy Hook"
                                        >
                                            {copied === `hook-${angle.id}-${index}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {activeTab === 'guide' && (
            <div className="space-y-8">
                {/* Andromeda Protocol */}
                <div className="bg-stone-900/50 border border-stone-800 rounded-sm p-8">
                    <h3 className="text-lg font-display font-bold uppercase text-white mb-6 flex items-center gap-2">
                        <Layout className="text-orange-600 w-5 h-5" />
                        Meta Ads Execution Guide: The "Andromeda" Protocol
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                        <div>
                            <h4 className="font-bold text-orange-500 uppercase mb-3 text-xs tracking-widest">1. Campaign Structure</h4>
                            <ul className="space-y-2 text-stone-400 list-disc pl-4">
                                <li><strong>Objective:</strong> Leads (Instant Forms priority).</li>
                                <li><strong>Budget:</strong> ABO for Phase 1 (Testing), CBO for Phase 2 (Scaling).</li>
                                <li><strong>Targeting:</strong> Broad (Anchorage + 25mi). Let creative target.</li>
                                <li><strong>Placements:</strong> Advantage+ (Automatic).</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-orange-500 uppercase mb-3 text-xs tracking-widest">2. Creative Strategy</h4>
                            <ul className="space-y-2 text-stone-400 list-disc pl-4">
                                <li><strong>Format:</strong> 4:5 Vertical Video (Feed) & 9:16 (Reels).</li>
                                <li><strong>Testing:</strong> 1 Angle, 1 Body Script, 5 Hook Variants.</li>
                                <li><strong>Golden Rule:</strong> First 3 seconds determine 80% of success.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-orange-500 uppercase mb-3 text-xs tracking-widest">3. Optimization Rules</h4>
                            <ul className="space-y-2 text-stone-400 list-disc pl-4">
                                <li><strong>Soft Kill:</strong> Spend 1x Target CPL ($45) with 0 leads &rarr; Pause.</li>
                                <li><strong>Hard Kill:</strong> Spend 2x Target CPL ($90) with 0 leads &rarr; Delete.</li>
                                <li><strong>Scale:</strong> If CPL &lt;$30, increase budget 20% every 48 hours.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-orange-500 uppercase mb-3 text-xs tracking-widest">4. Retargeting</h4>
                            <ul className="space-y-2 text-stone-400 list-disc pl-4">
                                <li><strong>Audience:</strong> Website visitors (30 days), Video viewers (50%+).</li>
                                <li><strong>Angles:</strong> Social Proof (Review Screenshots), Scarcity ("2 slots left").</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* The P.E.R.F.O.R.M. Framework */}
                <div className="bg-stone-900/50 border border-stone-800 rounded-sm p-8">
                     <h3 className="text-lg font-display font-bold uppercase text-white mb-6 flex items-center gap-2">
                        <Check className="text-orange-600 w-5 h-5" />
                        The P.E.R.F.O.R.M. Framework
                        <span className="bg-stone-800 text-stone-400 text-[10px] px-2 py-0.5 rounded-full ml-2">Why Our Ads Win</span>
                    </h3>
                    <p className="text-stone-400 text-sm mb-6">Every successful ad script in our matrix follows this 7-step psychological sequence.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-stone-950 p-4 border border-stone-800 rounded-sm">
                            <div className="text-orange-500 font-bold text-lg mb-1">P — Problem</div>
                            <div className="text-xs text-stone-500 uppercase tracking-widest mb-2">The Hook</div>
                            <p className="text-stone-300 text-xs">"Tired of staring at a plain, unused backyard?"</p>
                            <p className="text-stone-300 text-xs mt-1">"Worried about contractors ghosting you?"</p>
                        </div>
                        <div className="bg-stone-950 p-4 border border-stone-800 rounded-sm">
                            <div className="text-orange-500 font-bold text-lg mb-1">E — Explanation</div>
                            <div className="text-xs text-stone-500 uppercase tracking-widest mb-2">The Solution</div>
                            <p className="text-stone-300 text-xs">"We use a Fixed-Price Deck System that eliminates surprises."</p>
                            <p className="text-stone-300 text-xs mt-1">"Custom decks built in 21 days or less."</p>
                        </div>
                         <div className="bg-stone-950 p-4 border border-stone-800 rounded-sm">
                            <div className="text-orange-500 font-bold text-lg mb-1">R — Result</div>
                            <div className="text-xs text-stone-500 uppercase tracking-widest mb-2">The Transformation</div>
                            <p className="text-stone-300 text-xs">"Turn your yard into a private resort."</p>
                            <p className="text-stone-300 text-xs mt-1">"Finally be proud to host friends."</p>
                        </div>
                         <div className="bg-stone-950 p-4 border border-stone-800 rounded-sm">
                            <div className="text-orange-500 font-bold text-lg mb-1">F — Friction</div>
                            <div className="text-xs text-stone-500 uppercase tracking-widest mb-2">Objection Handling</div>
                            <p className="text-stone-300 text-xs">"No surprise change orders."</p>
                            <p className="text-stone-300 text-xs mt-1">"We handle all permits and cleanup."</p>
                        </div>
                         <div className="bg-stone-950 p-4 border border-stone-800 rounded-sm">
                            <div className="text-orange-500 font-bold text-lg mb-1">O — Others</div>
                            <div className="text-xs text-stone-500 uppercase tracking-widest mb-2">Social Proof</div>
                            <p className="text-stone-300 text-xs">"Rated 5 Stars by 142 Anchorage homeowners."</p>
                            <p className="text-stone-300 text-xs mt-1">"See what Rachel B. said about our speed."</p>
                        </div>
                         <div className="bg-stone-950 p-4 border border-stone-800 rounded-sm">
                            <div className="text-orange-500 font-bold text-lg mb-1">R — Request</div>
                            <div className="text-xs text-stone-500 uppercase tracking-widest mb-2">Call to Action</div>
                            <p className="text-stone-300 text-xs">"Click below to get your free inspection."</p>
                            <p className="text-stone-300 text-xs mt-1">"Book your design consult today."</p>
                        </div>
                         <div className="bg-stone-950 p-4 border border-stone-800 rounded-sm md:col-span-2">
                            <div className="text-orange-500 font-bold text-lg mb-1">M — Motive</div>
                            <div className="text-xs text-stone-500 uppercase tracking-widest mb-2">Urgency / Incentive</div>
                            <p className="text-stone-300 text-xs">"Only 3 Priority Build Slots left for June."</p>
                            <p className="text-stone-300 text-xs mt-1">"Prices increase July 1st due to material costs."</p>
                        </div>
                    </div>
                </div>

                {/* Strategy & Principles */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* The Sam Darby Formula */}
                    <div className="bg-stone-900/50 border border-stone-800 rounded-sm p-8">
                        <h3 className="text-lg font-display font-bold uppercase text-white mb-6">The Winning Formula</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-center gap-2 p-2 bg-stone-950 border border-stone-900 rounded">
                                <span className="text-orange-500 font-bold">1. Positioning</span>
                                <span className="text-stone-500">&rarr;</span>
                                <span className="text-stone-300">Specific Angle (e.g., Speed)</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-stone-950 border border-stone-900 rounded">
                                <span className="text-orange-500 font-bold">2. Named Process</span>
                                <span className="text-stone-500">&rarr;</span>
                                <span className="text-stone-300">"21-Day Build System™"</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-stone-950 border border-stone-900 rounded">
                                <span className="text-orange-500 font-bold">3. Risk Reversal</span>
                                <span className="text-stone-500">&rarr;</span>
                                <span className="text-stone-300">"No-Surprise Guarantee"</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-stone-950 border border-stone-900 rounded">
                                <span className="text-orange-500 font-bold">4. Emotional Vision</span>
                                <span className="text-stone-500">&rarr;</span>
                                <span className="text-stone-300">"Pride of Hosting"</span>
                            </div>
                             <div className="flex items-center gap-2 p-2 bg-stone-950 border border-stone-900 rounded">
                                <span className="text-orange-500 font-bold">5. Scarcity</span>
                                <span className="text-stone-500">&rarr;</span>
                                <span className="text-stone-300">"Only 2 Slots Left"</span>
                            </div>
                             <div className="flex items-center gap-2 p-2 bg-stone-950 border border-stone-900 rounded">
                                <span className="text-orange-500 font-bold">6. Proof</span>
                                <span className="text-stone-500">&rarr;</span>
                                <span className="text-stone-300">"142 Decks Built"</span>
                            </div>
                        </div>
                    </div>

                    {/* Voice of Customer */}
                    <div className="bg-stone-900/50 border border-stone-800 rounded-sm p-8">
                        <h3 className="text-lg font-display font-bold uppercase text-white mb-6">Voice of Customer Themes</h3>
                        <p className="text-stone-400 text-xs mb-4">
                            We don't guess. We mirror exactly what our 5-star reviews say to build trust.
                        </p>
                        <div className="space-y-3">
                            <div className="border-l-2 border-orange-500 pl-3">
                                <h5 className="text-stone-200 text-sm font-bold">Communication</h5>
                                <p className="text-stone-500 text-xs italic">"Kept us informed every step... Explained everything clearly."</p>
                            </div>
                            <div className="border-l-2 border-orange-500 pl-3">
                                <h5 className="text-stone-200 text-sm font-bold">On-Time / Efficient</h5>
                                <p className="text-stone-500 text-xs italic">"Finished ahead of schedule... Showed up when they said they would."</p>
                            </div>
                            <div className="border-l-2 border-orange-500 pl-3">
                                <h5 className="text-stone-200 text-sm font-bold">Professional / Clean</h5>
                                <p className="text-stone-500 text-xs italic">"Left the site clean every day... Respectful of our home."</p>
                            </div>
                             <div className="border-l-2 border-orange-500 pl-3">
                                <h5 className="text-stone-200 text-sm font-bold">No Stress</h5>
                                <p className="text-stone-500 text-xs italic">"Made the process easy... No headaches... Handled everything."</p>
                            </div>
                             <div className="border-l-2 border-orange-500 pl-3">
                                <h5 className="text-stone-200 text-sm font-bold">Trust & Integrity</h5>
                                <p className="text-stone-500 text-xs italic">"Honest... Transparent pricing... No surprises."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};
