/**
 * [INPUT]: 依赖 react 的 useState
 * [OUTPUT]: 对外提供 App 组件
 * [POS]: 30x SEO Landing Page - 基于 GitHub README 最新内容
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { useState, useEffect, useRef } from 'react'
import './index.css'

// ============================================================
// SCROLL REVEAL HOOK - IntersectionObserver 触发动效
// ============================================================

function useScrollReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const elements = document.querySelectorAll('[data-reveal], [data-reveal-stagger]')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return ref
}

// ============================================================
// DATA - 30x SEO Skills (9 Categories, 24 Skills + 1 Orchestrator)
// 基于 GitHub README: https://github.com/norahe0304-art/30x-seo
// ============================================================

const SKILLS_BY_CATEGORY = {
  'Orchestrator': {
    color: 'system',
    skills: [
      { id: 'seo', abbr: 'Se', name: '/seo', desc: 'Master orchestrator: routes commands to 24 sub-skills, spawns 6 parallel subagents, auto-detects industry type' },
    ]
  },
  'Audit': {
    color: 'diagnostic',
    skills: [
      { id: 'seo-page', abbr: 'Pg', name: '/seo page', desc: 'Deep single-page analysis: title, meta, headings, links, images, Schema, E-E-A-T' },
    ]
  },
  'Technical SEO': {
    color: 'quality',
    skills: [
      { id: 'seo-technical', abbr: 'Te', name: '/seo technical', desc: '8-category audit: crawlability, indexability, security, URLs, mobile, CWV, structured data, JS' },
      { id: 'seo-sitemap', abbr: 'Si', name: '/seo sitemap', desc: 'Validate XML sitemaps, detect issues, generate new ones' },
      { id: 'seo-hreflang', abbr: 'Hr', name: '/seo hreflang', desc: 'Multi-language SEO: self-refs, return tags, x-default, ISO codes' },
      { id: 'seo-schema', abbr: 'Sc', name: '/seo schema', desc: 'Detect, validate, generate JSON-LD structured data' },
      { id: 'seo-geo-technical', abbr: 'Gt', name: '/seo geo-technical', desc: 'AI crawler management: GPTBot, ClaudeBot, llms.txt, SSR check' },
    ]
  },
  'Links': {
    color: 'adaptation',
    skills: [
      { id: 'seo-internal-links', abbr: 'Il', name: '/seo internal-links', desc: 'Orphan pages, click depth, anchor text, link equity distribution' },
      { id: 'seo-backlinks', abbr: 'Bl', name: '/seo backlinks', desc: 'Profile, anchors, toxic links, gap analysis', api: 'DataForSEO' },
      { id: 'seo-redirects', abbr: 'Rd', name: '/seo redirects', desc: 'Chains, loops, 301/302 mix, protocol issues, trailing slashes' },
    ]
  },
  'Content': {
    color: 'enhancement',
    skills: [
      { id: 'seo-content-audit', abbr: 'Ca', name: '/seo content-audit', desc: 'E-E-A-T scoring + AI citability analysis' },
      { id: 'seo-images', abbr: 'Im', name: '/seo images', desc: 'Alt text, file sizes, formats (WebP/AVIF), lazy loading, CLS' },
      { id: 'seo-content-decay', abbr: 'Cd', name: '/seo content-decay', desc: 'Detect declining content, recommend refresh priorities' },
      { id: 'seo-cannibalization', abbr: 'Cn', name: '/seo cannibalization', desc: 'Find keyword conflicts between pages' },
      { id: 'seo-content-brief', abbr: 'Cb', name: '/seo content-brief', desc: 'Analyze SERP top 10, generate content briefs' },
      { id: 'seo-content-writer', abbr: 'Cw', name: '/seo content-writer', desc: 'SEO + AI optimized writing guidelines' },
    ]
  },
  'Planning': {
    color: 'intel',
    skills: [
      { id: 'seo-plan', abbr: 'Pl', name: '/seo plan', desc: 'Competitor analysis, keyword strategy, content calendar, 4-phase roadmap' },
      { id: 'seo-architecture', abbr: 'Ar', name: '/seo architecture', desc: 'URL structure, navigation design, internal linking strategy' },
    ]
  },
  'Programmatic SEO': {
    color: 'research',
    skills: [
      { id: 'seo-programmatic', abbr: 'Pr', name: '/seo programmatic', desc: 'Scale content: data sources, templates, quality gates, index control' },
      { id: 'seo-competitor-pages', abbr: 'Cp', name: '/seo competitor-pages', desc: 'X vs Y comparisons, alternatives pages, feature matrices' },
    ]
  },
  'Local SEO': {
    color: 'adaptation',
    skills: [
      { id: 'seo-local', abbr: 'Lo', name: '/seo local', desc: 'GBP audit, NAP consistency, review strategy, local schema, Gemini Ask Maps optimization' },
    ]
  },
  'Monitoring': {
    color: 'intensity',
    skills: [
      { id: 'seo-monitor', abbr: 'Mo', name: '/seo monitor', desc: 'Monitor your own site: rankings, clicks, CTR, position changes', api: 'GSC' },
      { id: 'seo-serp', abbr: 'Sr', name: '/seo serp', desc: "Track any site's SERP rankings, features, historical data", api: 'DataForSEO' },
      { id: 'seo-ai-visibility', abbr: 'Ai', name: '/seo ai-visibility', desc: 'Track mentions in ChatGPT, Claude, Perplexity, Gemini, AI Overview', api: 'DataForSEO' },
    ]
  },
  'Data': {
    color: 'research',
    skills: [
      { id: 'seo-keywords', abbr: 'Kw', name: '/seo keywords', desc: 'Ideas, volume, difficulty, intent, trends', api: 'DataForSEO' },
    ]
  },
}

const ALL_SKILLS = Object.entries(SKILLS_BY_CATEGORY).flatMap(([category, data]) =>
  data.skills.map((skill, i) => ({ ...skill, category, color: data.color, number: i + 1 }))
)

// ============================================================
// APP COMPONENT
// ============================================================

function App() {
  const [activeSkill, setActiveSkill] = useState(ALL_SKILLS.find(s => s.id === 'seo'))
  const [terminalView, setTerminalView] = useState('demo')
  const [copied, setCopied] = useState(false)

  // 初始化 scroll reveal
  useScrollReveal()

  const handleCopy = (text, e) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    // 显示复制成功
    if (e?.target) {
      const btn = e.target.closest('.copy-btn')
      if (btn) {
        btn.style.color = 'var(--color-accent)'
        setTimeout(() => {
          btn.style.color = ''
        }, 2000)
      }
    }
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="grain-overlay"></div>

      {/* GitHub Link */}
      <a href="https://github.com/norahe0304-art/30x-seo" className="github-link" aria-label="View on GitHub">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      </a>

      {/* Hero Section */}
      <section id="hero" className="hero-combined">
        <div className="hero-combined-container">
          <div className="hero-combined-left">
            <h1 className="hero-title-combined">30x SEO</h1>
            <p className="hero-tagline-combined">Complete SEO workflow for Claude Code</p>
            <p className="hero-hook-text">
              Stop juggling SEO tools. 24 production ready skills handle everything from technical audits
              to AI visibility tracking. One orchestrator routes your requests automatically.
            </p>
            <div className="hero-included-box">
              <span className="hero-included-title">What's included</span>
              <div className="hero-included-items">
                <span>24 SEO skills across 9 categories</span>
                <span className="hero-included-sep">·</span>
                <span>1 <em>/seo</em> orchestrator that routes everything</span>
              </div>
            </div>
            <div className="hero-cta-group">
              <a href="#downloads" className="hero-cta-combined">Get Started</a>
              <div className="hero-logos-inline">
                <span className="hero-logos-label">Works with</span>
                <div className="hero-logos-row">
                  <span style={{ fontSize: '12px', color: 'var(--color-ash)' }}>Claude Code</span>
                </div>
              </div>
            </div>
            <p className="hero-version-link">
              <a href="#changelog">v1.1.0 · 24 skills, 9 categories, Local SEO + Gemini Ask Maps, 2026 Ready</a>
            </p>
          </div>

          <div className="hero-combined-right">
            <div className="hero-terminal">
              <div className="hero-terminal-header">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
                <span className="hero-terminal-title">claude code</span>
              </div>
              <div className="hero-terminal-body">
                <div className="hero-terminal-line">
                  <span className="terminal-prompt">❯</span>
                  <span className="hero-terminal-cmd">/seo</span>
                  <span className="hero-terminal-arg">audit example.com</span>
                </div>
                <div className="hero-terminal-output">
                  <div className="hero-output-header">
                    <span className="hero-output-icon">✓</span>
                    <span>Running comprehensive SEO audit...</span>
                  </div>
                  <div className="hero-output-stats">
                    <div className="hero-stat">
                      <span className="hero-stat-value">50+</span>
                      <span className="hero-stat-label">checks</span>
                    </div>
                    <div className="hero-stat">
                      <span className="hero-stat-value">8</span>
                      <span className="hero-stat-label">categories</span>
                    </div>
                    <div className="hero-stat">
                      <span className="hero-stat-value">24</span>
                      <span className="hero-stat-label">skills</span>
                    </div>
                  </div>
                  <div className="hero-output-items">
                    <div className="hero-output-item hero-output-item--success">
                      <span>✓</span> Meta tags optimized
                    </div>
                    <div className="hero-output-item hero-output-item--warning">
                      <span>!</span> 3 images missing alt text
                    </div>
                    <div className="hero-output-item hero-output-item--error">
                      <span>×</span> Core Web Vitals: LCP 4.2s
                    </div>
                    <div className="hero-output-item hero-output-item--success">
                      <span>✓</span> Schema markup valid
                    </div>
                  </div>
                </div>
                <div className="hero-terminal-line">
                  <span className="terminal-prompt">❯</span>
                  <span className="terminal-cursor"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="site-content" id="main-content">
        {/* Antidote Section */}
        <section className="antidote-section" id="antidote">
          <div className="section-header" data-reveal>
            <span className="section-number">01</span>
            <h2 className="section-title">The Problem</h2>
          </div>
          <div className="antidote-content">
            <p className="section-lead" data-reveal>
              SEO requires too many tools. Screaming Frog for crawls. Ahrefs for backlinks.
              PageSpeed for performance. Spreadsheets to combine everything. 30x SEO unifies
              the entire workflow into Claude Code.
            </p>
          </div>
        </section>

        {/* Solution Section - Framework Visualization */}
        <section className="solution-section" id="solution">
          <div className="section-header" data-reveal>
            <span className="section-number">02</span>
            <h2 className="section-title">The Framework</h2>
          </div>
          <div className="solution-content">
            <p className="section-lead" data-reveal>
              One orchestrator with deep expertise, plus 24 specialized skills across 9 categories.
            </p>
            <div className="solution-visual-interactive" id="framework-viz-container" data-reveal>
              <div className="framework-grid">
                {Object.entries(SKILLS_BY_CATEGORY).map(([category, data]) => (
                  <div key={category} className="framework-category">
                    <div
                      className="framework-category-label"
                      style={{ color: `var(--cat-${data.color}-text)` }}
                    >
                      {category}
                    </div>
                    <div className="framework-category-pills">
                      {data.skills.map((skill, i) => (
                        <button
                          key={skill.id}
                          type="button"
                          aria-label={`${skill.name} - ${category}`}
                          className="framework-pill"
                          style={{
                            '--cat-bg': `var(--cat-${data.color}-bg)`,
                            '--cat-border': `var(--cat-${data.color}-border)`,
                            background: `var(--cat-${data.color}-bg)`,
                            borderColor: `var(--cat-${data.color}-border)`,
                          }}
                          onClick={() => setActiveSkill({ ...skill, category, color: data.color })}
                        >
                          <div
                            className="framework-pill-number"
                            style={{ color: `var(--cat-${data.color}-text)` }}
                          >
                            {i + 1}
                          </div>
                          <div
                            className="framework-pill-abbr"
                            style={{ color: `var(--cat-${data.color}-text)` }}
                          >
                            {skill.abbr}
                          </div>
                          <div
                            className="framework-pill-name"
                            style={{ color: `var(--cat-${data.color}-text)` }}
                          >
                            {skill.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="framework-detail-box">
                {activeSkill ? (
                  <div className="framework-detail-content">
                    <h4>{activeSkill.name}</h4>
                    <p>{activeSkill.desc}</p>
                  </div>
                ) : (
                  <div className="framework-detail-placeholder">
                    Hover over a skill to see details
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Commands Section */}
        <section className="commands-section" id="commands-section">
          <div className="section-header" data-reveal>
            <span className="section-number">03</span>
            <h2 className="section-title">Skills in Action</h2>
            <p className="section-subtitle">
              See all skills with examples <a href="https://github.com/norahe0304-art/30x-seo" className="cheatsheet-link">View documentation →</a>
            </p>
          </div>
          <div className="commands-gallery">
            <div className="commands-container">
              <div className="command-manual">
                {Object.entries(SKILLS_BY_CATEGORY).map(([category, data]) => (
                  <div key={category}>
                    <div className="command-category-header">{category}</div>
                    {data.skills.map(skill => (
                      <div
                        key={skill.id}
                        className={`manual-entry ${activeSkill?.id === skill.id ? 'active' : ''}`}
                        data-id={skill.id}
                        id={`cmd-${skill.id}`}
                        onClick={() => setActiveSkill({ ...skill, category, color: data.color })}
                      >
                        <h3 className="manual-cmd-name">{skill.name}</h3>
                        <p className="manual-cmd-desc">{skill.desc}</p>
                        {skill.api && (
                          <div className="manual-cmd-rel">
                            <span className="rel-icon">⚡</span> Requires <code>{skill.api}</code>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="glass-terminal-wrapper">
                <div className="terminal-stack">
                  <div className="terminal-stack-tabs">
                    <button
                      className={`terminal-stack-tab ${terminalView === 'demo' ? 'active' : ''}`}
                      data-view="demo"
                      onClick={() => setTerminalView('demo')}
                    >
                      Demo
                    </button>
                    <button
                      className={`terminal-stack-tab ${terminalView === 'source' ? 'active' : ''}`}
                      data-view="source"
                      onClick={() => setTerminalView('source')}
                    >
                      Source
                    </button>
                  </div>

                  {terminalView === 'demo' ? (
                    <div className="terminal-window">
                      <div className="terminal-header">
                        <span className="terminal-dot red"></span>
                        <span className="terminal-dot yellow"></span>
                        <span className="terminal-dot green"></span>
                        <span className="terminal-title">claude code</span>
                      </div>
                      <div className="terminal-body">
                        <div className="terminal-line">
                          <span className="terminal-prompt">$</span>
                          <span className="terminal-cmd">{activeSkill?.name || '/seo'} https://example.com</span>
                        </div>
                        <div className="terminal-output">
                          <div className="terminal-desc">
                            <p>{activeSkill?.desc || 'Main orchestrator. Routes your request to the appropriate skill.'}</p>
                            {activeSkill?.api && (
                              <p className="terminal-api-note">⚡ Requires {activeSkill.api} API</p>
                            )}
                          </div>
                          <div className="terminal-example">
                            <span className="terminal-example-label">Example usage:</span>
                            <code>
                              {activeSkill?.id === 'seo'
                                ? '/seo audit example.com for technical issues'
                                : `${activeSkill?.name || '/seo-audit'} https://example.com`
                              }
                            </code>
                          </div>
                        </div>
                        <div className="terminal-line">
                          <span className="terminal-prompt">$</span>
                          <span className="terminal-cursor"></span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="source-window">
                      <div className="source-header">
                        <span className="source-title" id="source-title">{activeSkill?.id || 'seo'}.md</span>
                      </div>
                      <div className="source-body" id="source-content">
{`---
name: ${activeSkill?.id || 'seo'}
description: ${activeSkill?.desc || 'Main orchestrator for SEO tasks'}
args:
  - name: target
    description: URL or domain to analyze
    required: true
user-invokable: true
---

${activeSkill?.desc || 'Analyze the request and route to the appropriate SEO skill.'}

## Usage

\`\`\`
${activeSkill?.name || '/seo'} <url>
\`\`\`

${activeSkill?.api ? `## Requirements

This skill requires the ${activeSkill.api} API.
Configure your API key in the MCP settings.` : ''}
`}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Install Section */}
        <section className="platforms-section" id="downloads">
          <div className="section-header" data-reveal>
            <span className="section-number">04</span>
            <h2 className="section-title">Install</h2>
            <p className="section-subtitle">One command. Instant setup.</p>
          </div>

          <div className="install-terminal" data-reveal>
            <div className="glass-terminal">
              <div className="terminal-header">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
                <span className="terminal-title">install</span>
              </div>
              <div className="terminal-body">
                <div className="install-terminal-row">
                  <span className="install-terminal-label">Quick Install</span>
                  <div className="install-terminal-cmd">
                    <span className="terminal-prompt">$</span>
                    <code>npx skills add norahe0304-art/30x-seo</code>
                    <button
                      className="copy-btn"
                      aria-label="Copy command"
                      onClick={(e) => handleCopy('npx skills add norahe0304-art/30x-seo', e)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                      </svg>
                    </button>
                  </div>
                  <span className="install-terminal-note">One command · update with <code>npx skills update</code></span>
                </div>
              </div>
            </div>
          </div>

          <div className="install-providers" data-reveal-stagger>
            <span className="install-providers-label">Dependencies</span>
            <div className="install-providers-row">
              <div className="install-provider-badge">
                <span>Claude Code CLI</span>
              </div>
              <div className="install-provider-badge">
                <span>WebFetch (19 skills)</span>
              </div>
              <div className="install-provider-badge" style={{ opacity: 0.6 }}>
                <span>DataForSEO API (4 skills)</span>
              </div>
              <div className="install-provider-badge" style={{ opacity: 0.6 }}>
                <span>Google Search Console (1 skill)</span>
              </div>
            </div>
          </div>

          <p className="download-tip" data-reveal>
            Once installed, just type <code>/seo</code> followed by your request. The orchestrator handles routing.
          </p>
        </section>

        {/* Changelog Section */}
        <section className="changelog-section" id="changelog">
          <div className="section-header" data-reveal>
            <span className="section-number">05</span>
            <h2 className="section-title">What's New</h2>
          </div>
          <div className="changelog-list" data-reveal-stagger>
            <div className="changelog-entry">
              <div className="changelog-version-header">
                <span className="changelog-version">v1.1.0</span>
                <span className="changelog-date">March 2026</span>
              </div>
              <ul className="changelog-items">
                <li>New: <code>/seo local</code> — Local SEO audit with GBP, NAP, reviews, local schema</li>
                <li>New: Gemini Ask Maps optimization (March 2026 Google Maps AI update)</li>
                <li>24 skills across 9 categories</li>
              </ul>
            </div>
            <div className="changelog-entry">
              <div className="changelog-version-header">
                <span className="changelog-version">v1.0.0</span>
                <span className="changelog-date">March 2026</span>
              </div>
              <ul className="changelog-items">
                <li>24 production-ready SEO skills</li>
                <li>9 categories: Audit, Technical SEO, Links, Content, Planning, Programmatic SEO, Local SEO, Monitoring, Data</li>
                <li>Smart <code>/seo</code> orchestrator with 6 parallel subagents</li>
                <li>DataForSEO integration for keywords, backlinks, SERP, and AI visibility</li>
                <li>2026 Ready: AI Overviews, GEO optimization, LLM citation tracking</li>
                <li>No MCP dependencies: Direct API calls, zero middleware issues</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section" id="faq">
          <div className="section-header" data-reveal>
            <span className="section-number">06</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list" data-reveal-stagger>
            <details className="faq-item">
              <summary className="faq-question">What is 30x SEO?</summary>
              <div className="faq-answer">
                <p>30x SEO is a complete SEO workflow for Claude Code. 24 production-ready skills across 9 categories, plus one orchestrator that automatically routes your requests.</p>
                <p>AI-native, 2026 ready with AI Overviews, GEO optimization, and LLM citation tracking.</p>
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">What do I need to run it?</summary>
              <div className="faq-answer">
                <p><strong>Required:</strong> Claude Code CLI with WebFetch access. This powers 18 core skills.</p>
                <p><strong>Optional:</strong></p>
                <ul>
                  <li><strong>DataForSEO API:</strong> For keywords, backlinks, SERP, and AI visibility (4 skills)</li>
                  <li><strong>Google Search Console:</strong> For monitoring your own site (1 skill)</li>
                </ul>
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">Does this replace Ahrefs/SEMrush?</summary>
              <div className="faq-answer">
                <p>No, and it is not trying to. Those tools have massive crawl infrastructure and historical data that cannot be replicated locally.</p>
                <p>30x SEO helps you work with that data more efficiently, and handles the 80% of SEO work that does not need paid tools.</p>
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">How do I use it?</summary>
              <div className="faq-answer">
                <p>Just type <code>/seo</code> followed by your request. The orchestrator analyzes your intent and routes to the right skill.</p>
                <p>Examples:</p>
                <ul>
                  <li><code>/seo page https://example.com</code> Deep page analysis</li>
                  <li><code>/seo technical https://example.com</code> Technical audit</li>
                  <li><code>/seo keywords research "seed keyword"</code> Keyword research</li>
                </ul>
                <p>You can also invoke specific skills directly like <code>/seo technical</code> or <code>/seo keywords</code>.</p>
              </div>
            </details>
          </div>
        </section>

        {/* Consulting Section */}
        <section className="consulting-section" id="consulting">
          <div className="consulting-content" data-reveal>
            <div className="consulting-text">
              <h2 className="consulting-title">Built for the AI native SEO workflow</h2>
              <p className="consulting-desc">
                30x SEO brings enterprise grade SEO capabilities to Claude Code.
                Stop context switching between tools and let AI handle the heavy lifting.
              </p>
            </div>
            <div className="consulting-actions">
              <a href="https://github.com/norahe0304-art/30x-seo" className="btn btn-primary" target="_blank" rel="noopener">
                <span>View on GitHub</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">30x SEO</span>
            <p className="footer-tagline">Complete SEO workflow for Claude Code</p>
          </div>
          <div className="footer-links">
            <a href="#commands-section">Skills</a>
            <a href="#downloads">Install</a>
            <a href="#faq">FAQ</a>
            <a href="https://github.com/norahe0304-art/30x-seo" target="_blank" rel="noopener">GitHub</a>
            <a href="https://github.com/norahe0304-art/30x-seo-cn" target="_blank" rel="noopener">中文版</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
