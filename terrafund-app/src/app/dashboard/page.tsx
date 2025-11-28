import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { AdSimulation } from '../../features/ads/AdSimulation';
import { GlobalTreeFund } from '../../components/features/GlobalTreeFund';
import { UserStats } from '../../components/features/UserStats';

export default function Dashboard() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container py-8">
                <h1 className="text-2xl font-bold mb-6 text-earth-900">Community Dashboard</h1>

                {/* Global Tree Fund - Featured at top */}
                <div className="mb-8">
                    <GlobalTreeFund />
                </div>

                {/* Grid Layout for User Actions & Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Left Column: Ad Watch & User Stats */}
                    <div className="space-y-6">
                        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4">Earn for the Fund</h2>
                            <AdSimulation />
                        </div>

                        <UserStats />
                    </div>

                    {/* Right Column: Information & Transparency */}
                    <div className="space-y-6">
                        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
                            <div className="space-y-4 text-sm text-gray-600">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">📺</span>
                                    <div>
                                        <p className="font-semibold text-gray-900">1. Watch Ads</p>
                                        <p>Each ad you watch adds real money to the global fund</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">🌍</span>
                                    <div>
                                        <p className="font-semibold text-gray-900">2. Community Fund</p>
                                        <p>All users contribute together to reach the tree goal</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">🌳</span>
                                    <div>
                                        <p className="font-semibold text-gray-900">3. Real Trees Planted</p>
                                        <p>When we reach $0.50, a real tree gets planted!</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">🔄</span>
                                    <div>
                                        <p className="font-semibold text-gray-900">4. Repeat</p>
                                        <p>New tree fund starts immediately. Keep the momentum!</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">💡 Did You Know?</h3>
                            <p className="text-sm text-gray-700 mb-3">
                                One tree absorbs approximately 22kg of CO₂ per year and produces 118kg of oxygen!
                            </p>
                            <p className="text-sm text-gray-700">
                                Together, we are making a real impact on our planet, one ad at a time. 🌍
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
