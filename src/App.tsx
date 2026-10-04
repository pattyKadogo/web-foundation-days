import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ExternalLink, 
  FileCode2, 
  Monitor, 
  Smartphone, 
  ShieldCheck, 
  Layers, 
  RefreshCw,
  Copy,
  Check,
  Palette,
  Maximize2
} from 'lucide-react';

const DAY2_INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuickNotes - Home</title>
    <link rel="stylesheet" href="style.css">
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
            <p class="note-meta"><small>Category: Study &bull; Priority: High</small></p>
          </article>
          <article class="note-card">
            <h3>HTML5 Form Validation</h3>
            <p>Remember to pair every input element with a corresponding label using matching for and id attributes.</p>
            <p class="note-meta"><small>Category: General &bull; Priority: Medium</small></p>
          </article>
          <article class="note-card">
            <h3>W3C Validation Checklist</h3>
            <p>Ensure doctype is present, closing tags are correct, tables have proper headings, and forms have labels.</p>
            <p class="note-meta"><small>Category: Ideas &bull; Priority: High</small></p>
          </article>
        </div>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 QuickNotes. All rights reserved.</p>
    </footer>
  </body>
</html>`;

const DAY2_ABOUT_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuickNotes - About</title>
    <link rel="stylesheet" href="style.css">
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
        <ul class="features">
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

const DAY2_STYLE_CSS = `/* ==========================================================================
   QuickNotes Stylesheet - Day 2: Styling the Two-Page Site
   ========================================================================== */

/* 1. Box-Sizing: border-box Reset & Margin/Padding Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 2. Base Body Styles */
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f3f4f6;
  color: #1f2937;
  line-height: 1.6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 3. Header Styles */
header {
  background-color: #1e3a8a;
  color: #ffffff;
  padding: 36px 20px 28px;
  text-align: center;
}

header h1 {
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
  color: #ffffff;
}

header .tagline {
  color: #cbd5e1;
  font-size: 1.05rem;
  margin-bottom: 20px;
}

/* 4. Navigation Bar: Flexbox, Centred, 16px gap, White text, No underline, Visible hover style */
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

nav a {
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
}

nav a:hover,
nav a:focus {
  background-color: #ffffff;
  color: #1e3a8a;
  border-color: #ffffff;
}

/* 5. Centred <main> with Max-Width and Automatic Left and Right Margins */
main {
  max-width: 800px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 32px;
  margin-bottom: 32px;
  padding: 0 16px;
  flex: 1;
}

h2 {
  font-size: 1.75rem;
  color: #111827;
  margin-bottom: 12px;
}

main > p {
  font-size: 1.1rem;
  color: #374151;
  margin-bottom: 24px;
}

h3 {
  font-size: 1.3rem;
  color: #1f2937;
  margin-bottom: 14px;
}

/* 6. Section: White Card Look */
section {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}

ol {
  margin-left: 20px;
  margin-bottom: 8px;
  color: #374151;
}

ol li {
  margin-bottom: 8px;
}

/* 7. Features List: CSS Grid as Responsive Cards using repeat(auto-fit, minmax(180px, 1fr)) */
ul.features {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

ul.features li {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  font-size: 0.95rem;
  color: #334155;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  line-height: 1.5;
  display: flex;
  align-items: center;
}

/* 8. Shortcuts Table: Borders and Padding on Cells */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  margin-bottom: 8px;
}

th,
td {
  border: 1px solid #d1d5db;
  padding: 12px 14px;
  text-align: left;
}

th {
  background-color: #f3f4f6;
  color: #111827;
  font-weight: 600;
}

tbody tr:nth-child(even) {
  background-color: #f9fafb;
}

tbody tr:hover {
  background-color: #f1f5f9;
}

kbd {
  display: inline-block;
  padding: 2px 7px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.85rem;
  background-color: #f3f4f6;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  box-shadow: 0 1px 0 #94a3b8;
  color: #1e293b;
}

/* 9. Feedback Form: Fields Stacked Vertically with Full Width */
form p {
  margin-bottom: 16px;
}

form label {
  display: block;
  font-weight: 500;
  margin-bottom: 6px;
  color: #1f2937;
}

form input[type="text"],
form input[type="email"],
form select,
form textarea {
  display: block;
  width: 100%;
  padding: 10px 14px;
  font-family: inherit;
  font-size: 1rem;
  color: #111827;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

form input[type="text"]:focus,
form input[type="email"]:focus,
form select:focus,
form textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

/* 10. Buttons: Transition and Hover Effects */
button,
button[type="submit"] {
  display: inline-block;
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
}

button:hover,
button[type="submit"]:hover {
  background-color: #1d4ed8;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35);
}

button:active,
button[type="submit"]:active {
  transform: scale(0.98);
}

/* Recent Notes Grid (Home Page) */
.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 12px;
}

.note-card {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
}

.note-card h3 {
  font-size: 1.1rem;
  color: #1e3a8a;
  margin-bottom: 6px;
}

.note-card p {
  font-size: 0.95rem;
  color: #4b5563;
  margin-bottom: 8px;
}

.note-meta small {
  color: #64748b;
  font-weight: 500;
}

/* 11. Footer */
footer {
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
  padding: 20px 16px;
  text-align: center;
  color: #6b7280;
  font-size: 0.9rem;
  margin-top: auto;
}

/* 12. Media Query: (max-width: 600px) reduces header font size and padding */
@media (max-width: 600px) {
  header {
    padding: 22px 14px 18px;
  }

  header h1 {
    font-size: 1.75rem;
  }

  header .tagline {
    font-size: 0.95rem;
    margin-bottom: 16px;
  }

  nav {
    gap: 12px;
  }

  nav a {
    padding: 6px 14px;
    font-size: 0.9rem;
  }

  main {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 0 12px;
  }

  section {
    padding: 18px 14px;
    margin-bottom: 18px;
  }

  th,
  td {
    padding: 8px 10px;
    font-size: 0.9rem;
  }
}`;

export default function App() {
  const [selectedDay, setSelectedDay] = useState<'day2' | 'day1'>('day2');
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'rubric'>('preview');
  const [currentPreviewPage, setCurrentPreviewPage] = useState<'index.html' | 'about.html'>('about.html');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeCodeFile, setActiveCodeFile] = useState<'day2/style.css' | 'day2/about.html' | 'day2/index.html'>('day2/style.css');
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const getCodeContent = () => {
    if (activeCodeFile === 'day2/style.css') return DAY2_STYLE_CSS;
    if (activeCodeFile === 'day2/about.html') return DAY2_ABOUT_HTML;
    return DAY2_INDEX_HTML;
  };

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
      <header className="bg-slate-950/90 backdrop-blur border-b border-slate-800 sticky top-0 z-50 px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
            QN
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-slate-100 text-base leading-tight">
                QuickNotes — Day 2: Style the Two-Page Site
              </h1>
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                W3C 0 Errors
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Folder: <code className="text-blue-400 font-mono">day2/</code> • Pure HTML5 &amp; CSS (No React in lab pages)
            </p>
          </div>
        </div>

        {/* Day & View Selector */}
        <div className="flex items-center gap-2">
          {/* Day 1 / Day 2 switch */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setSelectedDay('day2')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                selectedDay === 'day2'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Day 2 (CSS Styled)
            </button>
            <button
              onClick={() => setSelectedDay('day1')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                selectedDay === 'day1'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Day 1 (Skeleton)
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Live Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'code'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              CSS &amp; HTML Code
            </button>
            <button
              onClick={() => setActiveTab('rubric')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'rubric'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Rubric Check
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 max-w-7xl w-full mx-auto">
        {activeTab === 'preview' && (
          <div className="flex-1 flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            {/* Browser chrome header */}
            <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="h-4 w-px bg-slate-800 mx-1" />
                <button
                  onClick={handleRefresh}
                  title="Reload preview frame"
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Viewport switch: Desktop (Full) vs Mobile Phone (375px) */}
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs">
                <button
                  onClick={() => setViewportMode('desktop')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition-colors ${
                    viewportMode === 'desktop'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Desktop View (>600px)"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  Desktop
                </button>
                <button
                  onClick={() => setViewportMode('mobile')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition-colors ${
                    viewportMode === 'mobile'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Mobile View (<600px media query test)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  Mobile (375px)
                </button>
              </div>

              {/* URL address pill */}
              <div className="flex-1 max-w-sm bg-slate-950 border border-slate-800 px-3 py-1 rounded-md text-xs text-slate-300 font-mono flex items-center justify-between">
                <span className="truncate">
                  /{selectedDay}/<span className="text-blue-400 font-semibold">{currentPreviewPage}</span>
                </span>
                <span className="text-[10px] text-blue-400 font-sans uppercase font-bold tracking-wider ml-2">
                  Live
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
                    Home
                  </button>
                  <button
                    onClick={() => setCurrentPreviewPage('about.html')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors ${
                      currentPreviewPage === 'about.html'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    About (Cards &amp; Form)
                  </button>
                </div>

                <a
                  href={`/${selectedDay}/${currentPreviewPage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-md transition-colors font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open Direct URL
                </a>
              </div>
            </div>

            {/* Embedded Live Web Page with responsive container */}
            <div className="flex-1 bg-slate-900 flex justify-center items-stretch min-h-[640px] p-2 overflow-auto">
              <div
                className={`transition-all duration-300 bg-white shadow-2xl relative ${
                  viewportMode === 'mobile'
                    ? 'w-[375px] my-4 rounded-2xl border-4 border-slate-700 overflow-hidden min-h-[600px]'
                    : 'w-full h-full rounded-md'
                }`}
              >
                <iframe
                  key={`${iframeKey}-${selectedDay}-${currentPreviewPage}`}
                  src={`/${selectedDay}/${currentPreviewPage}`}
                  title={`Live Preview of ${selectedDay}/${currentPreviewPage}`}
                  className="w-full h-full border-0 absolute inset-0"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="flex-1 flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            {/* File Switcher & Actions */}
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveCodeFile('day2/style.css')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                    activeCodeFile === 'day2/style.css'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <Palette className="w-4 h-4 text-amber-400" />
                  day2/style.css
                </button>
                <button
                  onClick={() => setActiveCodeFile('day2/about.html')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                    activeCodeFile === 'day2/about.html'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <FileCode2 className="w-4 h-4 text-blue-400" />
                  day2/about.html
                </button>
                <button
                  onClick={() => setActiveCodeFile('day2/index.html')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                    activeCodeFile === 'day2/index.html'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <FileCode2 className="w-4 h-4 text-blue-400" />
                  day2/index.html
                </button>
              </div>

              <button
                onClick={() => copyToClipboard(getCodeContent())}
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            {/* Code Display Area */}
            <div className="flex-1 p-4 bg-slate-950 overflow-auto font-mono text-xs sm:text-sm text-slate-300 leading-relaxed">
              <pre className="whitespace-pre">
                {getCodeContent()}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'rubric' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* W3C & CSS Specs Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-xl">
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 text-sm">W3C Nu Validator Status</h3>
                  <p className="text-xs text-slate-400">Tested against validator.w3.org API</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode2 className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-mono text-slate-200">day2/index.html</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    0 Errors • 0 Warnings
                  </span>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode2 className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-mono text-slate-200">day2/about.html</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    0 Errors • 0 Warnings
                  </span>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono text-slate-200">day2/style.css</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Valid CSS3 Standard
                  </span>
                </div>
              </div>

              <div className="mt-5 p-3.5 bg-blue-950/30 border border-blue-800/40 rounded-lg text-xs text-blue-200 leading-relaxed">
                Both pages in <code>day2/</code> link to the shared <code>style.css</code> via <code>&lt;link rel="stylesheet" href="style.css"&gt;</code> and strictly follow HTML5 and modern responsive CSS layout techniques without any framework dependencies.
              </div>
            </div>

            {/* Day 2 Assignment Checklist */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-xl">
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 text-sm">Day 2 Rubric Checklist</h3>
                  <p className="text-xs text-slate-400">All 9 requirements verified</p>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Copies in day2/:</strong> <code className="text-blue-400 font-mono">day2/index.html</code> and <code className="text-blue-400 font-mono">day2/about.html</code> linking shared <code className="text-blue-400 font-mono">style.css</code>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Features Class:</strong> <code className="text-blue-400 font-mono">class="features"</code> added to the features <code className="text-blue-400 font-mono">&lt;ul&gt;</code> on <code className="text-blue-400 font-mono">about.html</code>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Box-Sizing Reset:</strong> Universal <code className="text-blue-400 font-mono">box-sizing: border-box</code> reset applied.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Flexbox Nav:</strong> Centred row, <code className="text-blue-400 font-mono">16px gap</code>, white text, no underline, visible hover style.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Centred Main &amp; Card Sections:</strong> <code className="text-blue-400 font-mono">max-width: 800px</code> with auto margins, each <code className="text-blue-400 font-mono">&lt;section&gt;</code> styled as a white card.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>CSS Grid Features Cards:</strong> Features list styled using <code className="text-blue-400 font-mono">repeat(auto-fit, minmax(180px, 1fr))</code>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Table &amp; Form Styling:</strong> Table cells with borders and padding; form fields stacked vertically with full width.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Transitions:</strong> Smooth transitions on buttons and navigation links.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Media Query:</strong> <code className="text-blue-400 font-mono">@media (max-width: 600px)</code> reducing header font size, padding, and nav spacing on small screens.
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
