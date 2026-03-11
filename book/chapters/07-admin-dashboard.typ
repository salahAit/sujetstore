= Administrative Dashboard & Content Management

A platform is only as good as its content. SujetStore provides administrators and educators with a powerful, custom-built Content Management System (CMS) to manage the entire educational tree without touching the database.

== Security & Authentication

Access to the `/admin` routes is strictly protected. 
- Authentication uses a custom implementation relying on `bcryptjs` for password hashing.
- Sessions are stored in the `users.db` SQLite database via secure HTTP-only, `SameSite=Lax` cookies.
- Rate limiting is enforced on login endpoints to prevent brute-force attacks.

== The Document CMS

The administration panel provides full CRUD (Create, Read, Update, Delete) capabilities for the taxonomic hierarchy:

1. *Levels* (e.g., Middle School)
2. *Years* (e.g., 4AM)
3. *Subjects* (e.g., Mathematics)
4. *Documents* (e.g., Term 1 Exam with Solution)

*Key UI Features:*
- *Modal-Based Editing:* All add/edit operations use floating Shadcn-Svelte modals for fast interaction without triggering full page reloads.
- *Confirmation Dialogs:* Destructive operations require explicit confirmation through a `ConfirmModal` component to prevent accidental data loss.
- *File Linking:* Documents can be linked directly via direct URL, ensuring the platform database remains lightweight.

== The Interactive Quiz Builder

Creating interactive Moodle-style content is notoriously complex in most LMS platforms. SujetStore solves this by providing a highly optimized, visual Quiz Builder.

*Builder Features:*
- *Drag-and-Drop Ordering:* Teachers can reorder questions within a quiz visually.
- *Specialized Question Sub-forms:* Because the platform supports 14 different question types, the builder dynamically renders a tailored sub-form based on the selected type. 
  - For example, selecting "Matrix" reveals a grid builder for rows and columns.
  - Selecting "Hotspot" reveals an image upload field and X/Y coordinate inputs for defining clickable zones.
- *Quiz Metadata Engine:* Set time limits, required passing scores, and publish toggles.

== Analytics Dashboard

The admin home page provides a high-level overview of platform health:
- Total Document counts grouped by Level and Year.
- Global point accumulations.
- Quiz completion statistics to identify the most difficult or popular exercises across the platform.
