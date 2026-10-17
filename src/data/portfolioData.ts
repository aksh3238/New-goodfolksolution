export interface ProjectItem {
  id: string;
  title: string;
  category: 'Branding' | 'Packaging' | 'Creative Design' | 'E-commerce' | 'Performance Marketing' | 'Video & Social';
  tag: string;
  shortDesc: string;
  brief: string;
  approach: string;
  deliverables: string[];
  visualType: 'portfolio-botanics' | 'portfolio-coffee' | 'portfolio-skincare' | 'portfolio-fintech' | 'portfolio-beverage' | 'portfolio-apparel';
  isConcept: boolean;
}

export const portfolioProjects: ProjectItem[] = [
  {
    id: 'botanica-skincare',
    title: 'Botanica Restorative Skincare',
    category: 'Packaging',
    tag: 'Brand & Packaging',
    shortDesc: 'Sustainable botanical skincare identity with amber apothecary bottles and tactile embossing.',
    brief: 'Create a clean, premium skincare brand system that emphasizes clean organic chemistry and sustainable luxury.',
    approach: 'We developed an earthy yet precise visual identity system centered on a bespoke wordmark, amber glass bottles, and minimal dielines with soft tactile paper stocks.',
    deliverables: [
      'Primary & secondary packaging dielines',
      'Amber bottle screen-printed graphics',
      'Minimalist wordmark & brand seal',
      'Unboxing experience & shipping sleeves',
    ],
    visualType: 'portfolio-botanics',
    isConcept: true,
  },
  {
    id: 'verve-coffee',
    title: 'Verve Single-Origin Roasters',
    category: 'Branding',
    tag: 'Brand Identity',
    shortDesc: 'Artisanal coffee identity with foil-stamped retail pouches and regional origin storytelling.',
    brief: 'Design a confident, high-grade packaging and identity suite for a specialty micro-roaster reaching discerning coffee drinkers.',
    approach: 'We crafted an editorial typography system paired with metallic copper foil stamps and modular color-coded origin tags for seamless roast variety extensions.',
    deliverables: [
      'Comprehensive brand identity guidelines',
      '250g & 1kg retail pouch packaging',
      'Origin color-coding system',
      'Cafe signage and takeaway cups',
    ],
    visualType: 'portfolio-coffee',
    isConcept: true,
  },
  {
    id: 'lumina-glow',
    title: 'Lumina Glow Series A+ Suite',
    category: 'E-commerce',
    tag: 'Creative Design & E-com',
    shortDesc: 'Amazon A+ content suite, feature comparison infographics, and product highlight tiles.',
    brief: 'Elevate an e-commerce beauty brand’s product detail page with high-conversion visual storytelling and ingredient clarity.',
    approach: 'We structured the Amazon A+ layout into 5 sequential conversion modules: hero brand story, clinical benefit comparison, ingredient callouts, and usage guide.',
    deliverables: [
      '7-module Amazon A+ design suite',
      'Feature-benefit comparison infographics',
      'Product packaging render cleanups',
      'Mobile-optimized e-commerce banners',
    ],
    visualType: 'portfolio-skincare',
    isConcept: true,
  },
  {
    id: 'nexa-pay',
    title: 'Nexa Pay Acquisition Campaign',
    category: 'Performance Marketing',
    tag: 'Performance Marketing',
    shortDesc: 'Direct-response paid social ads and animated story variations designed for maximum CTR.',
    brief: 'Design high-performing ad creative variations for a next-generation payments app across Instagram and YouTube.',
    approach: 'We produced 12 distinct hook variations with bold typographic openers, user interface highlights, and clear value statements that drive immediate app downloads.',
    deliverables: [
      'Static & animated Meta ad variations (1:1 & 9:16)',
      'Hook testing matrix and iteration guide',
      'Thumb-stopping motion graphics',
      'Dedicated performance ad copy recommendations',
    ],
    visualType: 'portfolio-fintech',
    isConcept: true,
  },
  {
    id: 'zest-soda',
    title: 'Zest Sparkling Soda Launch',
    category: 'Video & Social',
    tag: 'Video & Social Media',
    shortDesc: 'High-energy summer launch campaign with short-form reels and vibrant social feed assets.',
    brief: 'Introduce a new sparkling fruit beverage to young urban consumers with dynamic motion, bright colors, and punchy sound design.',
    approach: 'We produced a synchronized 30-day social media launch campaign including teaser stories, fast-cut product reels, and interactive community story templates.',
    deliverables: [
      '15-second product launch video reels',
      '30-day social media grid assets',
      'Story stickers and interactive polls',
      'Creative direction & shot lists',
    ],
    visualType: 'portfolio-beverage',
    isConcept: true,
  },
  {
    id: 'urban-folk',
    title: 'Urban Folk Studio Apparel',
    category: 'Creative Design',
    tag: 'Brand & Creative Design',
    shortDesc: 'Modern streetwear identity, embroidered woven tags, hangtags, and lookbook art direction.',
    brief: 'Design a clean, timeless visual brand system for an independent contemporary apparel collective.',
    approach: 'We combined utilitarian Swiss typography with heavy stock hangtags and custom woven label specifications to reinforce tactile quality and craft.',
    deliverables: [
      'Complete typography & logo system',
      'Woven neck labels & care instructions',
      'Embossed cardstock hangtags with eyelet specs',
      'Digital lookbook template',
    ],
    visualType: 'portfolio-apparel',
    isConcept: true,
  },
];
