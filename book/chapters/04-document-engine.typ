= The Document Engine

The core utility of SujetStore is the rapid discovery, filtering, and consumption of static educational documents (Exams, Assignments, Summaries).

== Discovery & Categorization

The homepage presents the three educational levels of the Algerian system:
- *Primary* — Grades 1 through 5
- *Middle School* — Grades 1AM through 4AM
- *Secondary* — Grades 1AS through 3AS (across all specialized streams)

Each drill-down reveals a structured grid of years, leading to the core subjects.

== Trimester Tabs: Segmented Control

Inside a subject page, documents are grouped using a *Segmented Control* interface — a horizontal tab bar with three segments: _Term 1_, _Term 2_, _Term 3_, and _General_.

Built on Shadcn UI's `Tabs` pattern, this control physically separates the academic year. Furthermore, the system implements *Smart Auto-Tab Selection*: On page mount, the engine scans the trimesters in order and automatically activates the first one that contains available documents, saving the user from clicking through empty tabs.

== The Contextual Filter Bar

Inside each trimester tab, users can narrow down hundreds of documents instantly using client-side Svelte 5 `$derived` runes:

- *Document Type:* Filter by Exam, Assignment, Lesson, Summary, or Book.
- *Source:* Filter by Official (Ministry standard) or Proposed (Teacher drafts).
- *Strict Solution Toggle:* A prominent switch to show "Only documents with solutions attached."

Because filtering happens entirely client-side, the UI updates instantly without any network latency or skeleton loaders.

== Smart PDF Viewer & Printing

SujetStore integrates an in-browser PDF viewing experience that keeps students on the platform without forcing downloads:

- *Fullscreen Modal:* Clicking a document opens a distraction-free, full-height modal containing the PDF `iframe`.
- *One-Click Solution Toggle:* If a document possesses an attached solution file, a floating toggle button allows the student to flip instantly between viewing the "Subject" and the "Correction" without reloading the modal. 
- *Background Printing:* Print functionality is handled seamlessly, opening the system print dialog directly from the file blob to ensure perfect margins regardless of browser quirks.

== Smart Tracking Persistence

To help students track what they have studied over long periods, the application implements local persistence tracking. When a student opens a document, its ID is saved to the browser's `localStorage` via a `Set` implementation.

When displaying the document lists, previously viewed items are marked with a distinct Checkmark indicator (✓) and a slightly faded styling, providing immediate visual feedback on their revision progress.
