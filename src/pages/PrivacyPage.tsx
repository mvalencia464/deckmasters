import React, { useEffect } from 'react';
import { Shield, ArrowLeft, CheckCircle2 } from 'lucide-react';

const PrivacyPage = ({ navigate }: { navigate: (path: string) => void }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-stone-950 text-stone-300 pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-orange-600 hover:text-orange-500 font-bold uppercase text-xs tracking-widest mb-12 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </button>

                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-orange-600/10 border border-orange-600 flex items-center justify-center rounded-sm text-orange-600">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold uppercase text-white">Privacy <span className="text-stone-600">Policy</span></h1>
                </div>

                <div className="prose prose-invert max-w-none space-y-12">
                    <section>
                        <p className="text-stone-400 leading-relaxed italic border-l-2 border-stone-800 pl-6">
                            Last Updated: February 18, 2026
                        </p>
                        <p className="mt-8 text-lg text-stone-300 leading-relaxed">
                            At Deck Masters, we respect your privacy and are committed to protecting the personal information you share with us. This policy explains how we collect, use, and safeguard your data when you visit our website or engage our services in Anchorage, Alaska.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-display font-bold uppercase text-white border-b border-stone-900 pb-4">1. Information We Collect</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-orange-600 font-bold uppercase text-xs tracking-widest">Provided by You</h3>
                                <p className="text-stone-400">
                                    We collect information you provide directly through our quote request forms, including:
                                </p>
                                <ul className="list-disc pl-5 text-stone-400 space-y-2">
                                    <li>Full Name and Contact Information</li>
                                    <li>Project Property Address</li>
                                    <li>Email Address and Phone Number</li>
                                    <li>Project details and site photos</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-stone-500 font-bold uppercase text-xs tracking-widest">Automated Data</h3>
                                <p className="text-stone-400">
                                    Our website automatically collects technical data to improve your experience:
                                </p>
                                <ul className="list-disc pl-5 text-stone-400 space-y-2">
                                    <li>IP Address and browser type</li>
                                    <li>Device information and OS</li>
                                    <li>Usage patterns via cookies</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6 bg-stone-900/30 p-8 border border-stone-900 rounded-sm">
                        <h2 className="text-2xl font-display font-bold uppercase text-white">2. SMS & Communication Policy</h2>
                        <p className="text-stone-400">
                            By providing your phone number on our website, you explicitly consent to receive SMS notifications, project updates, and meeting reminders from Deck Masters.
                        </p>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                                <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-1" />
                                <p className="text-stone-300 font-medium">No mobile information will be shared with third parties/affiliates for marketing or promotional purposes.</p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-1" />
                                <p className="text-stone-300 font-medium">All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.</p>
                            </div>
                        </div>
                        <p className="text-stone-500 text-sm mt-4">
                            Message and data rates may apply. You can opt-out at any time by replying STOP to any message or contacting us directly.
                        </p>
                    </section>

                    <section className="space-y-4 text-stone-400">
                        <h2 className="text-2xl font-display font-bold uppercase text-white mt-12 mb-6 border-b border-stone-900 pb-4">3. How We Use Your Data</h2>
                        <p>
                            Your information is used strictly for the following purposes:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Generating accurate project estimates and contracts.</li>
                            <li>Coordinating with the Municipality of Anchorage (MOA) for permitting.</li>
                            <li>Providing client support and project status updates.</li>
                            <li>Improving our website performance and security architecture.</li>
                        </ul>
                    </section>

                    <section className="space-y-4 text-stone-400">
                        <h2 className="text-2xl font-display font-bold uppercase text-white mt-12 mb-6 border-b border-stone-900 pb-4">4. Data Protection & Security</h2>
                        <p>
                            We implement enterprise-grade security protocols to protect your data. All web forms are protected by Cloudflare Turnstile to prevent bot activity, and personal information is stored securely within our encrypted CRM system. We do not sell your personal data to third-party data brokers.
                        </p>
                    </section>

                    <section className="space-y-4 text-stone-400 border-t border-stone-900 pt-12">
                        <h2 className="text-2xl font-display font-bold uppercase text-white mb-6">Contact Privacy Team</h2>
                        <p>
                            If you have questions regarding this policy or wish to request data deletion, please contact us at:
                        </p>
                        <div className="bg-stone-900/50 p-6 border-l-4 border-orange-600">
                            <p className="font-bold text-white mb-2 uppercase tracking-widest text-sm">Deck Masters Anchorage</p>
                            <p className="text-stone-400">625 W 59th Ave Unit J<br />Anchorage, AK 99518</p>
                            <span className="text-orange-600 font-bold uppercase tracking-widest text-xs mt-4 block">contact@deckmastersak.com</span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
