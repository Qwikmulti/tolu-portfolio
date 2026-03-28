import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";

const ARTICLES = [
  {
    slug: "how-to-write-a-brd",
    title: "How to Write a BRD",
    excerpt: "A Business Requirements Document is the BA's most important deliverable. Here's how to write one that stakeholders actually use.",
    readTime: "8 min read",
    date: "March 2026",
    category: "Skills",
  },
  {
    slug: "5-core-skills-every-ba",
    title: "5 Core Skills Every BA Must Have",
    excerpt: "Beyond the textbooks — the soft skills and hard skills that separate good BAs from great ones in the real world.",
    readTime: "6 min read",
    date: "February 2026",
    category: "Career",
  },
  {
    slug: "breaking-into-ba",
    title: "Breaking Into BA With No Experience",
    excerpt: "You don't need a PM background or a CS degree. Here's the roadmap I wish I had when starting out.",
    readTime: "10 min read",
    date: "January 2026",
    category: "Career",
  },
  {
    slug: "stakeholder-management",
    title: "Stakeholder Management: The BA's Secret Weapon",
    excerpt: "The most technical BA loses without stakeholder buy-in. Learn the frameworks that make people listen.",
    readTime: "7 min read",
    date: "December 2025",
    category: "Skills",
  },
];

export default function BlogPage() {
  return (
    <>
    <main>


      <div className="min-h-screen bg-soft-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-electric text-sm font-semibold tracking-[0.2em] uppercase">Blog</span>
            <h1 className="font-cormorant text-5xl sm:text-6xl font-bold text-navy mt-3">
              Articles & Insights
            </h1>
            <p className="text-charcoal/50 mt-4 max-w-lg mx-auto">
              Practical tips, career advice, and BA skills to help you succeed.
            </p>
          </div>

          <div className="space-y-6">
            {ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block bg-white rounded-2xl p-6 sm:p-8 border border-charcoal/5 hover:border-electric/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-electric bg-electric/10 px-3 py-1 rounded-full">{article.category}</span>
                  <span className="text-charcoal/40 text-xs">{article.readTime}</span>
                  <span className="text-charcoal/40 text-xs">{article.date}</span>
                </div>
                <h2 className="font-cormorant text-2xl font-bold text-navy group-hover:text-electric transition-colors mb-2">
                  {article.title}
                </h2>
                <p className="text-charcoal/55 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-electric text-sm font-medium group-hover:gap-3 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
