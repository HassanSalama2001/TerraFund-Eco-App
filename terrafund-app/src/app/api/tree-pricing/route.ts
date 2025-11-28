import { NextResponse } from 'next/server';
import { PRICING_SOURCES, calculateAveragePrice, calculateTreeCostInCredits } from '../../../lib/pricing-sources';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // In a real implementation, you might fetch live prices from APIs
        // For now, we return our configured sources with calculated average

        const averagePrice = calculateAveragePrice(PRICING_SOURCES);
        const treeCostInCredits = calculateTreeCostInCredits(averagePrice);

        return NextResponse.json({
            success: true,
            data: {
                averagePriceUSD: averagePrice,
                treeCostInCredits,
                creditsPerDollar: 10,
                sources: PRICING_SOURCES,
                lastUpdated: new Date().toISOString(),
            },
        });
    } catch (error) {
        console.error('Error fetching tree pricing:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch pricing data' },
            { status: 500 }
        );
    }
}
