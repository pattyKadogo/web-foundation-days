// ==========================================================================
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
    return `0 ${noteWord}.`;
  }

  const counts = countByCategory();
  const categoryBreakdown = Object.entries(counts)
    .map(([cat, count]) => `${count} ${cat}`)
    .join(", ");

  return `${total} ${noteWord}: ${categoryBreakdown}.`;
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
    console.log(`Failed to add note: Category "${category}" is invalid. Allowed: ${validCategories.join(", ")}.`);
    return false;
  }

  // Check for duplicates (ignoring case and extra spaces)
  if (isDuplicate(text)) {
    console.log(`Failed to add note: Duplicate note detected for "${text.trim()}".`);
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
  console.log(`Added note #${nextId} to ${category}: "${newNote.text}"`);
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

console.log("\n--- 2. Testing longestNote() ---");
// Normal case: finds note with the highest character count ("Email the project report to Grace" - 33 chars)
console.log(longestNote());
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

// Edge case: call when notes array is empty
const backupNotes = [...notes];
notes = [];
console.log(longestNote());
// Expected: null
notes = [...backupNotes]; // Restore starting notes

console.log("\n--- 3. Testing countByCategory() ---");
// Normal case: counts distribution across starting categories
console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

// Edge case: count when notes array is empty
notes = [];
console.log(countByCategory());
// Expected: {}
notes = [...backupNotes]; // Restore starting notes

console.log("\n--- 4. Testing getSummary() ---");
// Normal case: summary sentence for plural notes count
console.log(getSummary());
// Expected: "5 notes: 2 personal, 2 study, 1 work."

// Edge case: summary sentence for exactly 1 note (verifies "note" singular form)
notes = [{ id: 99, text: "Single isolated note", category: "personal" }];
console.log(getSummary());
// Expected: "1 note: 1 personal."
notes = [...backupNotes]; // Restore starting notes

console.log("\n--- 5. Testing isDuplicate(text) ---");
// Normal case: existing text with different casing and whitespace padding
console.log(isDuplicate("   bUy MiLk AnD bReAd   "));
// Expected: true

// Normal case: brand new text that does not exist
console.log(isDuplicate("Read a book on TypeScript"));
// Expected: false

// Edge case: exact text match
console.log(isDuplicate("Call mum"));
// Expected: true

console.log("\n--- 6. Testing addNote(text, category) ---");
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

console.log("\nFinal notes count and summary:");
console.log(getSummary());
// Expected: "6 notes: 2 personal, 3 study, 1 work."
