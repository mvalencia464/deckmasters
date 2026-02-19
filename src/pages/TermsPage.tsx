import React, { useEffect } from 'react';
import { Hammer, ArrowLeft, CheckCircle2 } from 'lucide-react';

const TermsPage = ({ navigate }: { navigate: (path: string) => void }) => {
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
                        <Hammer className="w-6 h-6" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold uppercase text-white">Terms & <span className="text-stone-600">Conditions</span></h1>
                </div>

                <div className="prose prose-invert max-w-none space-y-12">
                    <section>
                        <p className="text-stone-400 leading-relaxed italic border-l-2 border-stone-800 pl-6">
                            Last Updated: February 18, 2026
                        </p>
                        <p className="mt-8 text-lg text-stone-300 leading-relaxed">
                            These Terms and Conditions govern your use of the Deck Masters website and our project estimation services. By requesting a quote or utilizing this site, you agree to these terms in full.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-display font-bold uppercase text-white border-b border-stone-900 pb-4">1. Service Estimates & Proposals</h2>
                        <div className="space-y-4 text-stone-400">
                            <p>
                                Estimates provided through our online "Stoke Planner" or quote forms are preliminary projections based on user-submitted data. These figures are for informational purposes and do not constitute a binding contract.
                            </p>
                            <div className="bg-stone-900/50 p-6 rounded-sm border-l-4 border-orange-600">
                                <p className="text-stone-300 font-bold mb-2 uppercase text-xs tracking-widest">Final Pricing Factors:</p>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-stone-400">
                                    <li>On-site structural inspection and soil analysis.</li>
                                    <li>Material price fluctuations at the time of procurement.</li>
                                    <li>Specific Municipality of Anchorage (MOA) site requirements.</li>
                                    <li>Utility locates and easement restrictions.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-display font-bold uppercase text-white border-b border-stone-900 pb-4">2. Permitting & Compliance</h2>
                        <p className="text-stone-400">
                            Deck Masters provides permitting management services as an authorized agent for the homeowner. While we handle the coordination with the Municipality of Anchorage (MOA), homeowners are responsible for providing accurate property markers and disclosing known easements. All projects are built to meet or exceed current International Residential Code (IRC) as adopted by local Anchorage jurisdiction.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-display font-bold uppercase text-white border-b border-stone-900 pb-4">3. Communication & SMS Consent</h2>
                        <p className="text-stone-400">
                            By submitting an inquiry, you grant Deck Masters permission to contact you via phone, email, or SMS regarding your project. This includes automated meeting reminders and project milestone updates.
                        </p>
                        <div className="flex gap-4 items-start bg-orange-600/5 p-4 rounded-sm border border-orange-600/20">
                            <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-1" />
                            <p className="text-sm text-stone-300 italic">User information provided for SMS consent will not be shared with third parties for marketing purposes.</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-display font-bold uppercase text-white border-b border-stone-900 pb-4">4. Intellectual Property</h2>
                        <p className="text-stone-400">
                            All content on this website, including but not limited to the "Fixed-Price System™" details, project portfolio imagery, 3D rendering styles, and specialized Anchorage engineering descriptions, are the exclusive property of Deck Masters. Unauthorized reproduction or "scraping" of this content for commercial use is strictly prohibited.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-display font-bold uppercase text-white border-b border-stone-900 pb-4">5. Limitation of Liability</h2>
                        <p className="text-stone-400">
                            Deck Masters is not liable for indirect, incidental, or consequential damages arising from the use of our digital planning tools. While we strive for 100% accuracy in our initial projections, actual site conditions in Alaska (frost heave, subsurface boulders, etc.) may necessitate adjustments to project scope.
                        </p>
                    </section>

                    <section className="space-y-4 text-stone-400 border-t border-stone-900 pt-12">
                        <h2 className="text-2xl font-display font-bold uppercase text-white mb-4">Governing Law</h2>
                        <p>
                            These terms are governed by the laws of the State of Alaska. Any disputes arising from the use of this site or our services shall be handled within the jurisdiction of the Third Judicial District at Anchorage.
                        </p>
                    </section>

                    <section className="space-y-4 text-stone-400 border-t border-stone-900 pt-12">
                        <h2 className="text-2xl font-display font-bold uppercase text-white mb-6">Contact Us</h2>
                        <p>
                            If you have questions regarding these terms, please contact us at:
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

export default TermsPage;
