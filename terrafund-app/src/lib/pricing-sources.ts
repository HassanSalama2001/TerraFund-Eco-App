// Tree pricing sources configuration
export interface PricingSource {
    name: string;
    organization: string;
    url: string;
    priceUSD: number;
    description: string;
    lastVerified: string;
}

export const PRICING_SOURCES: PricingSource[] = [
    {
        name: 'One Tree Planted',
        organization: 'One Tree Planted',
        url: 'https://onetreeplanted.org',
        priceUSD: 1.00,
        description: 'Global reforestation nonprofit. $1 = 1 tree planted.',
        lastVerified: '2024-11-28',
    },
    {
        name: 'Team Trees',
        organization: 'Arbor Day Foundation',
        url: 'https://teamtrees.org',
        priceUSD: 1.00,
        description: 'Collaboration with Arbor Day Foundation. $1 = 1 tree.',
        lastVerified: '2024-11-28',
    },
    {
        name: 'Eden Reforestation',
        organization: 'Eden Reforestation Projects',
        url: 'https://edenprojects.org',
        priceUSD: 0.10,
        description: 'Focused on mangrove and forest restoration. Lower cost per tree.',
        lastVerified: '2024-11-28',
    },
    {
        name: 'Trees for the Future',
        organization: 'Trees for the Future',
        url: 'https://trees.org',
        priceUSD: 0.10,
        description: 'Agroforestry projects supporting farmers. $0.10 per seedling.',
        lastVerified: '2024-11-28',
    },
];

export function calculateAveragePrice(sources: PricingSource[] = PRICING_SOURCES): number {
    // Use weighted average favoring established organizations
    const weights = {
        'One Tree Planted': 0.35,
        'Team Trees': 0.35,
        'Eden Reforestation': 0.15,
        'Trees for the Future': 0.15,
    };

    const weightedSum = sources.reduce((sum, source) => {
        const weight = weights[source.name as keyof typeof weights] || 1 / sources.length;
        return sum + source.priceUSD * weight;
    }, 0);

    // Round to 2 decimal places
    return Math.round(weightedSum * 100) / 100;
}

export function convertCreditsToUSD(credits: number, creditsPerDollar: number = 10): number {
    return Math.round((credits / creditsPerDollar) * 100) / 100;
}

export function calculateTreeCostInCredits(treePriceUSD: number, creditsPerDollar: number = 10): number {
    return Math.ceil(treePriceUSD * creditsPerDollar);
}
