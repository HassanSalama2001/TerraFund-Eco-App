export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    condition: (stats: { totalAdsWatched: number; treesContributedTo: number }) => boolean;
}

export const BADGES: Badge[] = [
    {
        id: 'seedling',
        name: 'The Seedling',
        description: 'Watched your first ad. Small steps lead to big forests!',
        icon: '🌱',
        condition: (stats) => stats.totalAdsWatched >= 1
    },
    {
        id: 'sapling',
        name: 'Sapling',
        description: 'Watched 10 ads. You are growing!',
        icon: '🌿',
        condition: (stats) => stats.totalAdsWatched >= 10
    },
    {
        id: 'tree_hugger',
        name: 'Tree Hugger',
        description: 'Helped plant your first tree (250 ads equivalent).',
        icon: '🌳',
        condition: (stats) => stats.totalAdsWatched >= 250
    },
    {
        id: 'forest_guardian',
        name: 'Forest Guardian',
        description: 'Helped plant 5 trees. You are a hero!',
        icon: '🦸',
        condition: (stats) => stats.treesContributedTo >= 5
    },
    {
        id: 'eco_warrior',
        name: 'Eco Warrior',
        description: 'Watched 100 ads. Your impact is real.',
        icon: '⚔️',
        condition: (stats) => stats.totalAdsWatched >= 100
    },
    {
        id: 'legend',
        name: 'Legend',
        description: 'Watched 1000 ads. The planet thanks you!',
        icon: '👑',
        condition: (stats) => stats.totalAdsWatched >= 1000
    }
];
