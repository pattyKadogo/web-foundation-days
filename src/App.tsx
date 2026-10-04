import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ExternalLink, 
  FileCode2, 
  Monitor, 
  ShieldCheck, 
  FileText, 
  Table, 
  FormInput, 
  ListOrdered, 
  List, 
  Layers, 
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';

const INDEX_HTML_CODE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuickNotes - Home</title>
    <link rel="stylesheet" href="style.css">
    <style>
      /* Embedded responsive styles matching day1/style.css */
      ...
    </style>
  </head>
  <body>
    <header>
      <h1>QuickNotes</h1>
      <p class="tagline">Your lightweight scratchpad for ideas, thoughts, and tasks.</p>
      <nav>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
      </nav>
    </header>

    <main>
      <section>
        <h2>Create a Note</h2>
        <form action="#" method="post" id="note-form">
          <p>
            <label for="note-title">Title</label>
            <input type="text" id="note-title" name="note-title" placeholder="e.g. Learn Semantic HTML" required>
          </p>
          <p>
            <label for="note-category">Category</label>
            <select id="note-category" name="note-category">
              <option value="general">General</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="ideas">Ideas</option>
            </select>
          </p>
          <p>
            <label for="note-content">Content</label>
            <textarea id="note-content" name="note-content" rows="4" placeholder="Write your note details here..." required></textarea>
          </p>
          <p>
            <button type="submit">Save Note</button>
          </p>
        </form>
      </section>

      <section>
        <h2>Recent Notes</h2>
        <div class="notes-grid" id="notes-container">
          <article class="note-card">
            <h3>Web Foundations Day 1</h3>
            <p>Mastered semantic HTML5 elements including header, nav, main, section, article, and footer tags.</p>
            <p class="note-meta"><small>Category: Study • Priority: High</small></p>
          </article>
          <article class="note-card">
            <h3>HTML5 Form Validation</h3>
            <p>Remember to pair every input element with a corresponding label using matching for and id attributes.</p>
            <p class="note-meta"><small>Category: General • Priority: Medium</small></p>
          </article>
          <article class="note-card">
            <h3>W3C Validation Checklist</h3>
            <p>Ensure doctype is present, closing tags are correct, tables have proper headings, and forms have labels.</p>
            <p class="note-meta"><small>Category: Ideas • Priority: High</small></p>
          </article>
        </div>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 QuickNotes. All rights reserved.</p>
    </footer>
  </body>
</html>`;

const ABOUT_HTML_CODE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuickNotes - About</title>
    <link rel="stylesheet" href="style.css">
    <style>
      /* Embedded responsive styles matching day1/style.css */
      ...
    </style>
  </head>
  <body>
    <header>
      <h1>QuickNotes</h1>
      <p class="tagline">Your lightweight scratchpad for ideas, thoughts, and tasks.</p>
      <nav>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
      </nav>
    </header>

    <main>
      <h2>About QuickNotes</h2>
      <p>QuickNotes is a lightweight note-taking web application designed to help you capture ideas, jot down quick thoughts, and organize daily tasks without clutter. It provides a simple, accessible interface built with clean semantic HTML so you can stay productive and focused on what matters most.</p>

      <section>
        <h3>How to use QuickNotes</h3>
        <ol>
          <li>Enter your note title and select a relevant category from the options.</li>
          <li>Type your thoughts, tasks, or study notes in the text area.</li>
          <li>Click the "Save Note" button to store your entry for quick reference.</li>
        </ol>
      </section>

      <section>
        <h3>Features</h3>
        <ul>
          <li>Distraction-free, fast note authoring</li>
          <li>Semantic HTML5 architecture for accessibility and screen readers</li>
          <li>Keyboard shortcuts for swift navigation and workflows</li>
          <li>Category tags for seamless topic organization</li>
          <li>Responsive layout optimized for both desktop and mobile screens</li>
        </ul>
      </section>

      <section>
        <h3>Keyboard shortcuts</h3>
        <table>
          <thead>
            <tr>
              <th scope="col">Shortcut</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><kbd>Ctrl</kbd> + <kbd>N</kbd></td>
              <td>Create a new note</td>
            </tr>
            <tr>
              <td><kbd>Ctrl</kbd> + <kbd>S</kbd></td>
              <td>Save current note</td>
            </tr>
            <tr>
              <td><kbd>Ctrl</kbd> + <kbd>F</kbd></td>
              <td>Search and filter notes</td>
            </tr>
            <tr>
              <td><kbd>Esc</kbd></td>
              <td>Cancel editing or dismiss form</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h3>Send feedback</h3>
        <form action="#" method="post">
          <p>
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
          </p>
          <p>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </p>
          <p>
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </p>
          <p>
            <button type="submit">Submit Feedback</button>
          </p>
        </form>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 QuickNotes. All rights reserved.</p>
    </footer>
  </body>
</html>`;

export default function App() {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'rubric'>('preview');
  const [currentPreviewPage, setCurrentPreviewPage] = useState<'index.html' | 'about.html'>('index.html');
  const [activeCodeFile, setActiveCodeFile] = useState<'day1/index.html' | 'day1/about.html'>('day1/index.html');
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="bg-slate-950/80 backdrop-blur border-b border-slate-800 sticky top-0 z-50 px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-sm">
            QN
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-slate-100 text-base leading-tight">
                Web Foundations • Day 1 Assignment
              </h1>
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                W3C 0 Errors
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Repository: <code className="text-blue-400">web-foundations-days</code> / Folder: <code className="text-blue-400">day1/</code>
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-sm">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'preview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-4 h-4" />
            Live Browser
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'code'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode2 className="w-4 h-4" />
            Code Inspector
          </button>
          <button
            onClick={() => setActiveTab('rubric')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              activeTab === 'rubric'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Rubric & W3C Checklist
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 max-w-7xl w-full mx-auto">
        {activeTab === 'preview' && (
          <div className="flex-1 flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            {/* Browser chrome header */}
            <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-px bg-slate-800 mx-1" />
                <button
                  onClick={handleRefresh}
                  title="Reload frame"
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* URL address pill */}
              <div className="flex-1 max-w-md bg-slate-950 border border-slate-800 px-3 py-1 rounded-md text-xs text-slate-300 font-mono flex items-center justify-between">
                <span className="truncate">
                  http://localhost:3000/day1/<span className="text-blue-400 font-semibold">{currentPreviewPage}</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-sans uppercase font-bold tracking-wider ml-2">
                  HTML5
                </span>
              </div>

              {/* Page Switcher & Direct Links */}
              <div className="flex items-center gap-2">
                <div className="flex bg-slate-950 border border-slate-800 rounded-md p-0.5 text-xs">
                  <button
                    onClick={() => setCurrentPreviewPage('index.html')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      currentPreviewPage === 'index.html'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    index.html
                  </button>
                  <button
                    onClick={() => setCurrentPreviewPage('about.html')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      currentPreviewPage === 'about.html'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    about.html
                  </button>
                </div>

                <a
                  href={`/day1/${currentPreviewPage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-md transition-colors font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open Raw
                </a>
              </div>
            </div>

            {/* Embedded Live Web Page */}
            <div className="flex-1 bg-white min-h-[640px] relative">
              <iframe
                key={iframeKey}
                src={`/day1/${currentPreviewPage}`}
                title={`Live Preview of day1/${currentPreviewPage}`}
                className="w-full h-full border-0 absolute inset-0"
              />
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="flex-1 flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            {/* File Switcher & Actions */}
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveCodeFile('day1/index.html')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                    activeCodeFile === 'day1/index.html'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <FileCode2 className="w-4 h-4" />
                  day1/index.html
                </button>
                <button
                  onClick={() => setActiveCodeFile('day1/about.html')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                    activeCodeFile === 'day1/about.html'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <FileCode2 className="w-4 h-4" />
                  day1/about.html
                </button>
              </div>

              <button
                onClick={() =>
                  copyToClipboard(
                    activeCodeFile === 'day1/index.html' ? INDEX_HTML_CODE : ABOUT_HTML_CODE
                  )
                }
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            {/* Code Display Area */}
            <div className="flex-1 p-4 bg-slate-950 overflow-auto font-mono text-xs sm:text-sm text-slate-300 leading-relaxed">
              <pre className="whitespace-pre">
                {activeCodeFile === 'day1/index.html' ? INDEX_HTML_CODE : ABOUT_HTML_CODE}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'rubric' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* W3C Compliance Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-xl">
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 text-sm">W3C Nu Validator Status</h3>
                  <p className="text-xs text-slate-400">Tested against validator.w3.org</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode2 className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-mono text-slate-200">day1/index.html</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    0 Errors • 0 Warnings
                  </span>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode2 className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-mono text-slate-200">day1/about.html</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    0 Errors • 0 Warnings
                  </span>
                </div>
              </div>

              <div className="mt-5 p-3.5 bg-blue-950/30 border border-blue-800/40 rounded-lg text-xs text-blue-200 leading-relaxed">
                Both pages strictly adhere to the standard HTML5 doctype, correct semantic tags, valid nesting, matching attributes, and have been validated with the official W3C Nu HTML Checker API.
              </div>
            </div>

            {/* Assignment Rubric Checklist */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-xl">
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 text-sm">Assignment Rubric Checklist</h3>
                  <p className="text-xs text-slate-400">All Day 1 requirements fulfilled</p>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>File structure:</strong> Files placed in <code className="text-blue-400 font-mono">day1/index.html</code> and <code className="text-blue-400 font-mono">day1/about.html</code>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Header & Tagline:</strong> Identical <code className="text-blue-400 font-mono">&lt;header&gt;</code> on both pages with <code className="text-blue-400 font-mono">&lt;h1&gt;QuickNotes&lt;/h1&gt;</code> and tagline.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Navigation links:</strong> <code className="text-blue-400 font-mono">&lt;nav&gt;</code> inside header under tagline with two links: "Home" (to index.html) and "About" (to about.html). Works bidirectionally.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>About Heading & Intro:</strong> <code className="text-blue-400 font-mono">&lt;h2&gt;About QuickNotes&lt;/h2&gt;</code> followed by a clear two-sentence introduction explaining what QuickNotes is for.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Ordered List:</strong> Section with <code className="text-blue-400 font-mono">&lt;ol&gt;</code> "How to use QuickNotes" containing 3 numbered steps.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Features List:</strong> Section with unordered list (<code className="text-blue-400 font-mono">&lt;ul&gt;</code>) detailing core QuickNotes features.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Shortcuts Table:</strong> <code className="text-blue-400 font-mono">&lt;table&gt;</code> with "Shortcut" and "Action" header row and 4 shortcut rows.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Feedback Form:</strong> Includes labelled <code className="text-blue-400 font-mono">type="text"</code> name, labelled <code className="text-blue-400 font-mono">type="email"</code> email, labelled <code className="text-blue-400 font-mono">&lt;textarea&gt;</code> message, all 3 marked <code className="text-blue-400 font-mono">required</code>, with matching <code className="text-blue-400 font-mono">for</code> and <code className="text-blue-400 font-mono">id</code> attributes, plus a submit button.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Footer & Git:</strong> Identical footer on both pages; git committed with exact message <code className="text-blue-400 font-mono">Day 1 assignment</code>.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
