import {
  Wallet,
  PiggyBank,
  CreditCard,
  Home,
  Car,
  LineChart,
  Plane,
  ShieldCheck,
  Zap,
  Gift,
  Percent,
  Clock,
  Globe,
  TrendingUp,
  BadgeCheck,
  Lock,
  type LucideIcon,
} from "lucide-react";

export interface ProductFeature {
  icon: LucideIcon;
  title: string;
  body: string;
}

export interface Product {
  slug: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  tagline: string;
  image: string;
  intro: string;
  features: ProductFeature[];
  stats: { value: string; label: string }[];
  ctaPrimary: string;
}

export const products: Product[] = [
  {
    slug: "checking",
    navLabel: "Checking",
    eyebrow: "Everyday banking",
    title: "Checking that rewards you",
    tagline: "A $300 welcome bonus, zero hidden fees, and money that moves the moment you do.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Nexus Premier Checking puts everyday banking on autopilot — instant transfers, real-time alerts, and a welcome bonus the moment you’re verified.",
    features: [
      { icon: Gift, title: "$300 welcome bonus", body: "Earn it automatically when your identity is verified and your account opens." },
      { icon: Zap, title: "Instant transfers", body: "Move money between accounts in real time, with every transfer fully audited." },
      { icon: ShieldCheck, title: "No hidden fees", body: "No monthly maintenance fees and no surprises — ever." },
    ],
    stats: [
      { value: "$300", label: "Welcome bonus" },
      { value: "$0", label: "Monthly fee" },
      { value: "24/7", label: "Account access" },
    ],
    ctaPrimary: "Open a checking account",
  },
  {
    slug: "savings",
    navLabel: "Savings & CDs",
    eyebrow: "Grow your money",
    title: "Savings that actually grow",
    tagline: "Earn 3.5% APY on every dollar, with no minimums and no lock-ups.",
    image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Put your money to work with a high-yield savings account, or lock in a guaranteed return with a Nexus CD. Either way, your balance climbs.",
    features: [
      { icon: Percent, title: "3.5% APY", body: "One of the highest yields available, compounding automatically." },
      { icon: PiggyBank, title: "No minimums", body: "Start with a dollar — there’s no minimum balance to earn interest." },
      { icon: Clock, title: "Flexible CDs", body: "Choose terms from 6 to 60 months with guaranteed fixed rates." },
    ],
    stats: [
      { value: "3.5%", label: "APY" },
      { value: "$0", label: "Minimum balance" },
      { value: "60mo", label: "Max CD term" },
    ],
    ctaPrimary: "Open a savings account",
  },
  {
    slug: "credit-cards",
    navLabel: "Credit Cards",
    eyebrow: "Spend smarter",
    title: "Cards that pay you back",
    tagline: "Unlimited cashback, premium travel perks, and zero foreign transaction fees.",
    image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1600&q=80",
    intro:
      "From everyday cashback to the Nexus Infinite travel card, find a card that fits the way you spend — and rewards you for it.",
    features: [
      { icon: CreditCard, title: "Unlimited 2% back", body: "Earn cashback on every purchase, with no categories to track." },
      { icon: Globe, title: "No FX fees", body: "Spend anywhere in the world with zero foreign transaction fees." },
      { icon: Lock, title: "Fraud protection", body: "Real-time alerts and $0 liability on unauthorized charges." },
    ],
    stats: [
      { value: "2%", label: "Cashback" },
      { value: "$0", label: "FX fees" },
      { value: "$0", label: "Fraud liability" },
    ],
    ctaPrimary: "Explore credit cards",
  },
  {
    slug: "home-loans",
    navLabel: "Home Loans",
    eyebrow: "Home lending",
    title: "A home loan that feels like home",
    tagline: "Competitive fixed rates, transparent terms, and a guided path to closing.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Whether you’re buying your first home or refinancing, work one-on-one with a dedicated specialist from pre-approval to the keys in your hand.",
    features: [
      { icon: Percent, title: "Low fixed rates", body: "Lock in predictable monthly payments for the life of your loan." },
      { icon: BadgeCheck, title: "Fast pre-approval", body: "Get a decision in minutes and shop with confidence." },
      { icon: Home, title: "Dedicated specialists", body: "A lending advisor guides you through every step." },
    ],
    stats: [
      { value: "15min", label: "Pre-approval" },
      { value: "30yr", label: "Fixed terms" },
      { value: "1:1", label: "Specialist support" },
    ],
    ctaPrimary: "Explore home loans",
  },
  {
    slug: "auto",
    navLabel: "Auto",
    eyebrow: "Auto financing",
    title: "Drive off with a better rate",
    tagline: "Finance or refinance your vehicle with fast approvals and flexible terms.",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Get pre-qualified without affecting your credit, then choose a payment that fits your budget — for new, used, or refinanced vehicles.",
    features: [
      { icon: Car, title: "New & used", body: "Competitive financing for any vehicle, from any dealer." },
      { icon: Zap, title: "Quick decisions", body: "Get pre-qualified in minutes with no impact to your credit." },
      { icon: Percent, title: "Refi & save", body: "Lower your monthly payment by refinancing an existing loan." },
    ],
    stats: [
      { value: "0", label: "Credit impact" },
      { value: "84mo", label: "Max term" },
      { value: "$0", label: "Application fee" },
    ],
    ctaPrimary: "Explore auto loans",
  },
  {
    slug: "investing",
    navLabel: "Investing",
    eyebrow: "Nexus Wealth",
    title: "Invest with confidence",
    tagline: "Commission-free trading and expert advisory, all in one place.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Trade stocks, ETFs, and options with $0 commissions, or let a dedicated advisor build a plan tailored to your goals.",
    features: [
      { icon: LineChart, title: "$0 commissions", body: "Trade stocks, ETFs, and options with no per-trade fees." },
      { icon: TrendingUp, title: "Smart portfolios", body: "Automated, diversified portfolios that rebalance for you." },
      { icon: BadgeCheck, title: "Personal advisors", body: "Get a tailored plan reviewed by investment experts." },
    ],
    stats: [
      { value: "$0", label: "Commissions" },
      { value: "24/7", label: "Portfolio access" },
      { value: "1:1", label: "Advisor access" },
    ],
    ctaPrimary: "Start investing",
  },
  {
    slug: "travel",
    navLabel: "Travel",
    eyebrow: "Nexus Travel",
    title: "Travel further with Nexus",
    tagline: "Turn everyday spending into trips, with premium perks and no FX fees.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Earn travel rewards on every purchase, book through the Nexus Travel portal, and enjoy lounge access and trip protection along the way.",
    features: [
      { icon: Plane, title: "3x on travel", body: "Earn triple rewards on flights, hotels, and dining." },
      { icon: Globe, title: "No FX fees", body: "Spend abroad with zero foreign transaction fees." },
      { icon: ShieldCheck, title: "Trip protection", body: "Travel with built-in insurance and 24/7 assistance." },
    ],
    stats: [
      { value: "3x", label: "Travel rewards" },
      { value: "$0", label: "FX fees" },
      { value: "1,300+", label: "Lounges" },
    ],
    ctaPrimary: "Explore travel rewards",
  },
];

export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);
