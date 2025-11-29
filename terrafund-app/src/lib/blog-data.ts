export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    image: string;
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'how-ads-plant-trees',
        title: 'How Watching Ads Can Reforest the Planet',
        excerpt: 'Discover the innovative model that turns your attention into real-world environmental impact. No donations required.',
        date: 'November 29, 2025',
        author: 'Plant With Ads Team',
        image: '🌳',
        content: `
      <h2>The Power of Attention</h2>
      <p>Every day, billions of dollars are spent on digital advertising. Companies pay for your attention. But what if that value could be redirected towards something that actually matters? That's the core mission of Plant With Ads.</p>
      
      <h2>The Model Explained</h2>
      <p>It's simple economics. When you view an ad on our platform, advertisers pay a small fee (CPM). Instead of keeping all that profit, we pool it into a collective fund. Once that fund reaches the cost of planting a tree (typically $0.50 - $1.00), we send the money to our certified partners.</p>
      
      <h2>Why This Matters</h2>
      <p>Traditional charity relies on disposable income. But not everyone has extra money to give. However, almost everyone has a few minutes of spare time. By democratizing philanthropy, we allow anyone with an internet connection to become a climate hero.</p>
      
      <h2>Transparency is Key</h2>
      <p>We believe you have the right to know where the money goes. That's why we display real-time stats and provide clear breakdowns of our costs versus our donations. We partner with trusted organizations like One Tree Planted to ensure every tree is actually put in the ground.</p>
    `
    },
    {
        slug: 'top-5-benefits-of-reforestation',
        title: 'Top 5 Benefits of Reforestation Beyond Carbon',
        excerpt: 'Trees do more than just suck up CO2. They restore water cycles, protect biodiversity, and support local communities.',
        date: 'November 28, 2025',
        author: 'Eco Research Team',
        image: '🌍',
        content: `
      <h2>1. Biodiversity Protection</h2>
      <p>Forests are home to 80% of the world's terrestrial biodiversity. Reforestation helps rebuild habitats for endangered species, from orangutans in Indonesia to jaguars in the Amazon.</p>
      
      <h2>2. Water Cycle Restoration</h2>
      <p>Trees act as natural sponges. They absorb rainfall and release it slowly, preventing floods and maintaining river levels during droughts. Their roots also filter pollutants, providing cleaner water for downstream communities.</p>
      
      <h2>3. Soil Health</h2>
      <p>Deforestation leads to soil erosion, turning fertile land into desert. Replanting trees anchors the soil, restores nutrients, and allows agriculture to thrive again in surrounding areas.</p>
      
      <h2>4. Economic Growth</h2>
      <p>Our partners don't just plant trees; they hire local villagers to do it. This provides fair wages and sustainable livelihoods in developing nations, lifting communities out of poverty.</p>
      
      <h2>5. Mental Health</h2>
      <p>Studies show that proximity to nature reduces stress and improves mental well-being. By greening our planet, we are creating a healthier world for future generations to enjoy.</p>
    `
    },
    {
        slug: 'digital-activism-guide',
        title: 'A Guide to Digital Environmental Activism',
        excerpt: 'You don\'t need to be a scientist to save the earth. Here are 3 ways you can make a difference from your phone.',
        date: 'November 27, 2025',
        author: 'Community Manager',
        image: '📱',
        content: `
      <h2>1. Use Ecosia</h2>
      <p>Switch your search engine to Ecosia. They use their ad revenue to plant trees. It's a simple switch that accumulates massive impact over time.</p>
      
      <h2>2. Plant With Ads</h2>
      <p>Of course, we have to mention our own platform! By spending just 5 minutes a day watching ads on our dashboard, you can contribute significantly to our global tree fund. It's passive, easy, and effective.</p>
      
      <h2>3. Digital Cleanups</h2>
      <p>Did you know that storing old emails and photos consumes energy in data centers? Delete unnecessary files and unsubscribe from newsletters you don't read. A cleaner digital footprint means less energy consumption.</p>
      
      <h2>Conclusion</h2>
      <p>The internet consumes a lot of energy, but it can also be a powerful tool for good. By being mindful of your digital habits and using platforms that give back, you turn your screen time into green time.</p>
    `
    }
];
