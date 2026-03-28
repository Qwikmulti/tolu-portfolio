import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import React from "react";

const ARTICLES: Record<string, {
  title: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
}> = {
  "how-to-write-a-brd": {
    title: "How to Write a BRD",
    date: "March 2026",
    readTime: "8 min read",
    category: "Skills",
    content: `
      <p>A Business Requirements Document (BRD) is the cornerstone of every BA's work. It's the document that bridges the gap between stakeholder needs and technical solutions.</p>

      <h3>What Makes a Great BRD?</h3>
      <p>A great BRD is clear, concise, and structured. It should be understandable by all stakeholders — from C-suite executives to developers. Avoid jargon and ambiguity at all costs.</p>

      <h3>The Structure</h3>
      <p>Every BRD should have: an executive summary, business objectives, scope, functional requirements, non-functional requirements, assumptions and constraints, and stakeholder analysis.</p>

      <h3>Common Mistakes</h3>
      <p>The biggest mistake BAs make is writing requirements that are too technical or too vague. Always ask: "Would a non-technical stakeholder understand this?"</p>
    `,
  },
  "5-core-skills-every-ba": {
    title: "5 Core Skills Every BA Must Have",
    date: "February 2026",
    readTime: "6 min read",
    category: "Career",
    content: `
      <p>Being a great Business Analyst requires a unique blend of technical and soft skills. Here are the 5 that matter most.</p>

      <h3>1. Requirements Gathering</h3>
      <p>The ability to elicit, analyze, and document requirements is the BA's primary function. Master interview techniques, workshops, and observation.</p>

      <h3>2. Stakeholder Management</h3>
      <p>BAs work with everyone — from CEOs to developers. The ability to manage expectations, communicate effectively, and build relationships is critical.</p>

      <h3>3. Process Modelling</h3>
      <p>Being able to visually represent business processes using BPMN, flowcharts, or UML gives stakeholders a clear view of current and future states.</p>
    `,
  },
  "breaking-into-ba": {
    title: "Breaking Into BA With No Experience",
    date: "January 2026",
    readTime: "10 min read",
    category: "Career",
    content: `
      <p>Breaking into Business Analysis without prior experience is challenging but absolutely possible. Here's the roadmap.</p>

      <h3>Start with Free Resources</h3>
      <p>Download free guides, join communities, and consume content. Our free BA Starter Guide is the perfect starting point.</p>

      <h3>Build Real Skills</h3>
      <p>Create sample BRDs, map processes, and document requirements for imaginary projects. Employers want to see you can do the work.</p>
    `,
  },
  "stakeholder-management": {
    title: "Stakeholder Management: The BA's Secret Weapon",
    date: "December 2025",
    readTime: "7 min read",
    category: "Skills",
    content: `
      <p>The best technical BA still fails without stakeholder buy-in. Stakeholder management is the skill that separates good BAs from great ones.</p>

      <h3>Understand Your Stakeholders</h3>
      <p>Use a stakeholder matrix to map influence vs. interest. High influence, high interest stakeholders need maximum engagement.</p>
    `,
  },
};

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const article = ARTICLES[slug];
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-soft-white py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-charcoal/50 hover:text-electric text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold text-electric bg-electric/10 px-3 py-1 rounded-full">{article.category}</span>
          <span className="text-charcoal/40 text-xs">{article.readTime}</span>
          <span className="text-charcoal/40 text-xs">{article.date}</span>
        </div>

        <h1 className="font-cormorant text-4xl sm:text-5xl font-bold text-navy mb-8">
          {article.title}
        </h1>

        <style>{`
          .article-content h3 {
            font-family: "Cormorant Garamond", serif;
            font-size: 1.5rem;
            font-weight: bold;
            color: #0F1F3D;
            margin-top: 2rem;
          }
          .article-content p {
            color: #475569;
            line-height: 1.8;
            margin-bottom: 1.5rem;
          }
        `}</style>
        <div
          className="article-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
}
