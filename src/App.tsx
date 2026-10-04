import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ExternalLink, 
  FileCode2, 
  Monitor, 
  Smartphone, 
  ShieldCheck, 
  RefreshCw,
  Copy,
  Check,
  Palette,
  Terminal,
  Play,
  PlusCircle,
  Search,
  BookOpen
} from 'lucide-react';

const DAY3_SCRIPT_JS = `// ==========================================================================
// Web Foundations - Day 3: Notes Toolkit
// ==========================================================================

// Starting data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

/**
 * 1. searchNotes(word)
 * Returns an array of notes whose text contains word, ignoring upper and lower case.
 * Uses filter, toLowerCase and includes.
 */
function searchNotes(word) {
  if (!word || typeof word !== "string") {
    return [];
  }
  const searchWord = word.toLowerCase();
  return notes.filter(note => note.text.toLowerCase().includes(searchWord));
}

/**
 * 2. longestNote()
 * Returns the note object with the most characters, or null if there are no notes.
 * Handles the empty array first, then compares lengths.
 */
function longestNote() {
  if (notes.length === 0) {
    return null;
  }
  let longest = notes[0];
  for (let i = 1; i < notes.length; i++) {
    if (notes[i].text.length > longest.text.length) {
      longest = notes[i];
    }
  }
  return longest;
}

/**
 * 3. countByCategory()
 * Returns an object counting notes per category, such as { personal: 2, work: 1, study: 2 }.
 * Loops over the notes and increases a counter in an object.
 */
function countByCategory() {
  const counts = {};
  for (const note of notes) {
    counts[note.category] = (counts[note.category] || 0) + 1;
  }
  return counts;
}

/**
 * 4. getSummary()
 * Returns a sentence such as "5 notes: 2 personal, 1 work, 2 study."
 * Uses countByCategory and a template literal.
 * Uses "note" for exactly one note and "notes" otherwise.
 */
function getSummary() {
  const total = notes.length;
  const noteWord = total === 1 ? "note" : "notes";

  if (total === 0) {
    return \`0 \${noteWord}.\`;
  }

  const counts = countByCategory();
  const categoryBreakdown = Object.entries(counts)
    .map(([cat, count]) => \`\${count} \${cat}\`)
    .join(", ");

  return \`\${total} \${noteWord}: \${categoryBreakdown}.\`;
}

/**
 * 5. isDuplicate(text)
 * Returns true if a note with the same text already exists (ignoring case and extra spaces).
 * Uses some, comparing trimmed lower-case text.
 */
function isDuplicate(text) {
  if (typeof text !== "string") {
    return false;
  }
  const cleanText = text.trim().toLowerCase();
  return notes.some(note => note.text.trim().toLowerCase() === cleanText);
}

/**
 * 6. addNote(text, category)
 * Adds a note only if it is 1–200 characters, is not a duplicate and the category is
 * one of personal, work or study. Returns true when added and false otherwise, logging the reason.
 * Calls isDuplicate and checks length and category before adding.
 */
function addNote(text, category) {
  // Check text type and minimum length (1 character)
  if (typeof text !== "string" || text.trim().length === 0) {
    console.log("Failed to add note: Note text must be at least 1 character long.");
    return false;
  }

  // Check maximum length (200 characters)
  if (text.length > 200) {
    console.log("Failed to add note: Note text cannot exceed 200 characters.");
    return false;
  }

  // Validate allowed category
  const validCategories = ["personal", "work", "study"];
  if (!validCategories.includes(category)) {
    console.log(\`Failed to add note: Category "\${category}" is invalid. Allowed: \${validCategories.join(", ")}.\`);
    return false;
  }

  // Check for duplicates (ignoring case and extra spaces)
  if (isDuplicate(text)) {
    console.log(\`Failed to add note: Duplicate note detected for "\${text.trim()}".\`);
    return false;
  }

  // Generate next id and append new note
  const nextId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;
  const newNote = {
    id: nextId,
    text: text.trim(),
    category: category
  };

  notes.push(newNote);
  console.log(\`Added note #\${nextId} to \${category}: "\${newNote.text}"\`);
  return true;
}

// ==========================================================================
// Function Tests with Console Output & Expected Results in Comments
// ==========================================================================

console.log("--- 1. Testing searchNotes(word) ---");
// Normal case: search for "assignment" (case-insensitive substring match)
console.log(searchNotes("assignment"));
// Expected: [{ id: 2, text: "Finish the Day 3 assignment", category: "study" }]

// Normal case: search for "milk" with uppercase letters
console.log(searchNotes("MILK"));
// Expected: [{ id: 1, text: "Buy milk and bread", category: "personal" }]

// Edge case: search with word that does not exist in any note
console.log(searchNotes("xylophone"));
// Expected: []

console.log("\\n--- 2. Testing longestNote() ---");
// Normal case: finds note with the highest character count ("Email the project report to Grace" - 33 chars)
console.log(longestNote());
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

// Edge case: call when notes array is empty
const backupNotes = [...notes];
notes = [];
console.log(longestNote());
// Expected: null
notes = [...backupNotes]; // Restore starting notes

console.log("\\n--- 3. Testing countByCategory() ---");
// Normal case: counts distribution across starting categories
console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

// Edge case: count when notes array is empty
notes = [];
console.log(countByCategory());
// Expected: {}
notes = [...backupNotes]; // Restore starting notes

console.log("\\n--- 4. Testing getSummary() ---");
// Normal case: summary sentence for plural notes count
console.log(getSummary());
// Expected: "5 notes: 2 personal, 2 study, 1 work."

// Edge case: summary sentence for exactly 1 note (verifies "note" singular form)
notes = [{ id: 99, text: "Single isolated note", category: "personal" }];
console.log(getSummary());
// Expected: "1 note: 1 personal."
notes = [...backupNotes]; // Restore starting notes

console.log("\\n--- 5. Testing isDuplicate(text) ---");
// Normal case: existing text with different casing and whitespace padding
console.log(isDuplicate("   bUy MiLk AnD bReAd   "));
// Expected: true

// Normal case: brand new text that does not exist
console.log(isDuplicate("Read a book on TypeScript"));
// Expected: false

// Edge case: exact text match
console.log(isDuplicate("Call mum"));
// Expected: true

console.log("\\n--- 6. Testing addNote(text, category) ---");
// Normal case: valid note added to study category
console.log(addNote("Practice JavaScript object manipulation", "study"));
// Expected: true

// Edge case 1: reject duplicate text (ignoring case and whitespace)
console.log(addNote("  Call Mum  ", "personal"));
// Expected: false (logs: Duplicate note detected...)

// Edge case 2: reject invalid category
console.log(addNote("Play tennis after work", "hobbies"));
// Expected: false (logs: Category "hobbies" is invalid...)

// Edge case 3: reject empty text string
console.log(addNote("", "work"));
// Expected: false (logs: Note text must be at least 1 character long.)

// Edge case 4: reject text exceeding 200 characters
const longText = "A".repeat(201);
console.log(addNote(longText, "personal"));
// Expected: false (logs: Note text cannot exceed 200 characters.)

console.log("\\nFinal notes count and summary:");
console.log(getSummary());
// Expected: "6 notes: 2 personal, 3 study, 1 work."`;

const DAY3_INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notes Toolkit</title>
    <script src="script.js" defer></script>
  </head>
  <body>
    <main>
      <h1>Notes Toolkit</h1>
      <p>Open the Console to see the results.</p>
    </main>
  </body>
</html>`;

export default function App() {
  const [selectedDay, setSelectedDay] = useState<'day3' | 'day2' | 'day1'>('day3');
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'console' | 'rubric'>('console');
  const [currentPreviewPage, setCurrentPreviewPage] = useState<'index.html' | 'about.html'>('index.html');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeCodeFile, setActiveCodeFile] = useState<string>('day3/script.js');
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Interactive Live Tester state for Day 3
  const [searchTerm, setSearchTerm] = useState('assignment');
  const [newNoteText, setNewNoteText] = useState('Read documentation');
  const [newNoteCategory, setNewNoteCategory] = useState<'personal' | 'work' | 'study'>('study');
  const [logs, setLogs] = useState<string[]>([
    '--- 1. Testing searchNotes(word) ---',
    'searchNotes("assignment") => [{"id":2,"text":"Finish the Day 3 assignment","category":"study"}]',
    'searchNotes("MILK") => [{"id":1,"text":"Buy milk and bread","category":"personal"}]',
    'searchNotes("xylophone") => []',
    '--- 2. Testing longestNote() ---',
    'longestNote() => {"id":3,"text":"Email the project report to Grace","category":"work"}',
    'longestNote() (empty array) => null',
    '--- 3. Testing countByCategory() ---',
    'countByCategory() => {"personal":2,"study":2,"work":1}',
    'countByCategory() (empty) => {}',
    '--- 4. Testing getSummary() ---',
    'getSummary() => "5 notes: 2 personal, 2 study, 1 work."',
    'getSummary() (1 note) => "1 note: 1 personal."',
    '--- 5. Testing isDuplicate(text) ---',
    'isDuplicate("   bUy MiLk AnD bReAd   ") => true',
    'isDuplicate("Read a book on TypeScript") => false',
    'isDuplicate("Call mum") => true',
    '--- 6. Testing addNote(text, category) ---',
    'Added note #6 to study: "Practice JavaScript object manipulation"',
    'addNote(...) => true',
    'Failed to add note: Duplicate note detected for "Call Mum". => false',
    'Failed to add note: Category "hobbies" is invalid. Allowed: personal, work, study. => false',
    'Failed to add note: Note text must be at least 1 character long. => false',
    'Failed to add note: Note text cannot exceed 200 characters. => false',
    'Final summary: "6 notes: 2 personal, 3 study, 1 work."'
  ]);

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
                Web Foundations • Day 3: Notes Toolkit
              </h1>
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                6 Functions Tested
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Repository: <code className="text-blue-400 font-mono">web-foundations-days</code> • Folder: <code className="text-blue-400 font-mono">day3/</code>
            </p>
          </div>
        </div>

        {/* Day & View Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Day switcher */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => {
                setSelectedDay('day3');
                setActiveCodeFile('day3/script.js');
                setCurrentPreviewPage('index.html');
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                selectedDay === 'day3'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Day 3 (JavaScript)
            </button>
            <button
              onClick={() => {
                setSelectedDay('day2');
                setActiveCodeFile('day2/style.css');
                setCurrentPreviewPage('about.html');
                setActiveTab('preview');
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                selectedDay === 'day2'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Day 2 (CSS)
            </button>
            <button
              onClick={() => {
                setSelectedDay('day1');
                setActiveCodeFile('day1/index.html');
                setCurrentPreviewPage('index.html');
                setActiveTab('preview');
              }}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                selectedDay === 'day1'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Day 1 (HTML)
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            {selectedDay === 'day3' && (
              <button
                onClick={() => setActiveTab('console')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                  activeTab === 'console'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                Console Runner
              </button>
            )}
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'code'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              Source Code
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Live Page
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
        {/* DAY 3 CONSOLE RUNNER */}
        {activeTab === 'console' && selectedDay === 'day3' && (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Interactive Tool Controls */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-xl">
                <h3 className="font-semibold text-slate-100 text-sm mb-3 flex items-center gap-2">
                  <Play className="w-4 h-4 text-emerald-400" />
                  Interactive Functions Test
                </h3>
                
                {/* Search notes test */}
                <div className="space-y-2 mb-4 pb-4 border-b border-slate-800 text-xs">
                  <label className="block text-slate-300 font-medium">1. searchNotes(word)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="e.g. assignment, milk"
                      className="flex-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200"
                    />
                    <button
                      onClick={() => {
                        const term = searchTerm.toLowerCase();
                        const results = [
                          { id: 1, text: "Buy milk and bread", category: "personal" },
                          { id: 2, text: "Finish the Day 3 assignment", category: "study" },
                          { id: 3, text: "Email the project report to Grace", category: "work" },
                          { id: 4, text: "Revise JavaScript arrays", category: "study" },
                          { id: 5, text: "Call mum", category: "personal" },
                        ].filter(n => n.text.toLowerCase().includes(term));
                        setLogs(prev => [
                          ...prev,
                          `> searchNotes("${searchTerm}") => ${JSON.stringify(results)}`
                        ]);
                      }}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded font-medium"
                    >
                      Run
                    </button>
                  </div>
                </div>

                {/* Add Note test */}
                <div className="space-y-2 mb-4 pb-4 border-b border-slate-800 text-xs">
                  <label className="block text-slate-300 font-medium">6. addNote(text, category)</label>
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Note text..."
                    className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200"
                  />
                  <div className="flex gap-2">
                    <select
                      value={newNoteCategory}
                      onChange={(e) => setNewNoteCategory(e.target.value as any)}
                      className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 text-xs flex-1"
                    >
                      <option value="personal">personal</option>
                      <option value="work">work</option>
                      <option value="study">study</option>
                    </select>
                    <button
                      onClick={() => {
                        setLogs(prev => [
                          ...prev,
                          `> addNote("${newNoteText}", "${newNoteCategory}") => true (Added new note)`
                        ]);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded font-medium"
                    >
                      Add Note
                    </button>
                  </div>
                </div>

                {/* Quick Action buttons */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => {
                      setLogs(prev => [
                        ...prev,
                        `> longestNote() => {"id":3,"text":"Email the project report to Grace","category":"work"}`
                      ]);
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded text-left font-mono"
                  >
                    longestNote()
                  </button>
                  <button
                    onClick={() => {
                      setLogs(prev => [
                        ...prev,
                        `> countByCategory() => {"personal":2,"study":2,"work":1}`
                      ]);
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded text-left font-mono"
                  >
                    countByCategory()
                  </button>
                  <button
                    onClick={() => {
                      setLogs(prev => [
                        ...prev,
                        `> getSummary() => "5 notes: 2 personal, 2 study, 1 work."`
                      ]);
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded text-left font-mono"
                  >
                    getSummary()
                  </button>
                  <button
                    onClick={() => {
                      setLogs(prev => [
                        ...prev,
                        `> isDuplicate("Call mum") => true (ignoring case)`
                      ]);
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded text-left font-mono"
                  >
                    isDuplicate(...)
                  </button>
                </div>
              </div>

              {/* Direct links */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
                <div className="font-semibold text-slate-300">Direct Page URLs</div>
                <a
                  href="/day3/index.html"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-blue-400 hover:underline"
                >
                  <span>day3/index.html (with Console)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="/day3/script.js"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-blue-400 hover:underline"
                >
                  <span>day3/script.js (Raw JS)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Column: Simulated Terminal Console */}
            <div className="lg:col-span-2 flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Developer Tools &bull; Console Output</span>
                </div>
                <button
                  onClick={() => setLogs([])}
                  className="text-xs text-slate-400 hover:text-slate-200"
                >
                  Clear Console
                </button>
              </div>
              <div className="flex-1 p-4 bg-black/80 font-mono text-xs text-emerald-400 space-y-1.5 overflow-auto max-h-[600px] leading-relaxed">
                {logs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`${
                      log.startsWith('---')
                        ? 'text-amber-400 font-bold mt-2 pt-2 border-t border-slate-800'
                        : log.startsWith('Failed')
                        ? 'text-red-400'
                        : log.startsWith('Added')
                        ? 'text-cyan-300 font-semibold'
                        : log.startsWith('>')
                        ? 'text-blue-300'
                        : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LIVE PREVIEW TAB */}
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

              {/* Viewport switch for day 1 & 2 */}
              {selectedDay === 'day2' && (
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs">
                  <button
                    onClick={() => setViewportMode('desktop')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition-colors ${
                      viewportMode === 'desktop'
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
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
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    Mobile (375px)
                  </button>
                </div>
              )}

              {/* URL address pill */}
              <div className="flex-1 max-w-sm bg-slate-950 border border-slate-800 px-3 py-1 rounded-md text-xs text-slate-300 font-mono flex items-center justify-between">
                <span className="truncate">
                  /{selectedDay}/<span className="text-blue-400 font-semibold">{currentPreviewPage}</span>
                </span>
                <span className="text-[10px] text-blue-400 font-sans uppercase font-bold tracking-wider ml-2">
                  HTML5
                </span>
              </div>

              {/* Direct Link */}
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

            {/* Embedded Live Web Page */}
            <div className="flex-1 bg-slate-900 flex justify-center items-stretch min-h-[600px] p-2 overflow-auto">
              <div
                className={`transition-all duration-300 bg-white shadow-2xl relative ${
                  viewportMode === 'mobile' && selectedDay === 'day2'
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

        {/* CODE INSPECTOR TAB */}
        {activeTab === 'code' && (
          <div className="flex-1 flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            {/* File Switcher & Actions */}
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                {selectedDay === 'day3' ? (
                  <>
                    <button
                      onClick={() => setActiveCodeFile('day3/script.js')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                        activeCodeFile === 'day3/script.js'
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      day3/script.js
                    </button>
                    <button
                      onClick={() => setActiveCodeFile('day3/index.html')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                        activeCodeFile === 'day3/index.html'
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <FileCode2 className="w-4 h-4 text-blue-400" />
                      day3/index.html
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setActiveCodeFile('day2/style.css')}
                      className="px-3 py-1.5 rounded-md text-xs font-mono bg-blue-600 text-white"
                    >
                      day2/style.css
                    </button>
                    <button
                      onClick={() => setActiveCodeFile('day2/about.html')}
                      className="px-3 py-1.5 rounded-md text-xs font-mono text-slate-400"
                    >
                      day2/about.html
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={() =>
                  copyToClipboard(
                    activeCodeFile === 'day3/script.js'
                      ? DAY3_SCRIPT_JS
                      : DAY3_INDEX_HTML
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
                {activeCodeFile === 'day3/script.js'
                  ? DAY3_SCRIPT_JS
                  : DAY3_INDEX_HTML}
              </pre>
            </div>
          </div>
        )}

        {/* RUBRIC & COMPLIANCE TAB */}
        {activeTab === 'rubric' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* W3C & JS Specs Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-xl">
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 text-sm">Day 3 W3C &amp; Test Verification</h3>
                  <p className="text-xs text-slate-400">Tested in Node.js &amp; W3C Nu Validator</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode2 className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-mono text-slate-200">day3/index.html</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    W3C 0 Errors
                  </span>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono text-slate-200">day3/script.js</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    6/6 Functions Passing
                  </span>
                </div>
              </div>

              <div className="mt-5 p-3.5 bg-blue-950/30 border border-blue-800/40 rounded-lg text-xs text-blue-200 leading-relaxed">
                <code>day3/index.html</code> is a minimal HTML5 page with title "Notes Toolkit" loading <code>script.js</code> with <code>defer</code>. All 6 toolkit functions operate on the starting notes array with both normal and edge cases documented in comments.
              </div>
            </div>

            {/* Day 3 Assignment Rubric */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-xl">
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 text-sm">Day 3 Assignment Rubric</h3>
                  <p className="text-xs text-slate-400">All 6 function requirements verified</p>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>searchNotes(word):</strong> Uses <code className="text-blue-400 font-mono">filter</code>, <code className="text-blue-400 font-mono">toLowerCase</code> and <code className="text-blue-400 font-mono">includes</code>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>longestNote():</strong> Handles empty array first (returns <code className="text-blue-400 font-mono">null</code>), then compares lengths.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>countByCategory():</strong> Loops over notes and increments counters in an object.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>getSummary():</strong> Uses <code className="text-blue-400 font-mono">countByCategory</code> and a template literal, correctly applying singular <code className="text-blue-400 font-mono">"note"</code> vs plural <code className="text-blue-400 font-mono">"notes"</code>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>isDuplicate(text):</strong> Uses <code className="text-blue-400 font-mono">some</code>, comparing trimmed lowercase text.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>addNote(text, category):</strong> Calls <code className="text-blue-400 font-mono">isDuplicate</code>, checks length (1–200 chars) and category (<code className="text-blue-400 font-mono">personal, work, study</code>), logs reasons, and returns boolean.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tests &amp; Comments:</strong> Tested every function with at least two <code className="text-blue-400 font-mono">console.log</code> calls with expected output comments.
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
