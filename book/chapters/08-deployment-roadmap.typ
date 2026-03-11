= Deployment & Future Roadmap

== Production Deployment Guide

SujetStore is designed to be easily deployed on cheap VPS infrastructure (e.g., Contabo, Hetzner) while handling massive scale.

=== Current Infrastructure Footprint

#table(
  columns: (1fr, 2fr),
  [*Component*], [*Specification*],
  [Provider], [Standard Linux VPS (Ubuntu 22.04+)],
  [Web Server], [Caddy (auto-SSL reverse proxy)],
  [Process Manager], [systemd service unit],
  [Backup Strategy], [Daily SQLite `.backup` of `users.db` with 7-day retention],
)

=== Deployment Commands

A deployment script (`deploy.sh`) is provided in the repository root to automate the build and restart process.

```bash
./deploy.sh full    # Initial setup, dependency install + deployment
./deploy.sh deploy  # Subsequent updates (git pull, build, restart)
```

== Security Layers

#table(
  columns: (1fr, 2fr),
  [*Layer*], [*Implementation*],
  [Transport], [HTTPS enforced via Caddy auto-SSL],
  [Cookies], [`HttpOnly` · `Secure` · `SameSite=Lax`],
  [Passwords], [bcryptjs hashing for Admin accounts],
  [SQL Injection], [Guaranteed prevention via Drizzle ORM prepared statements],
)

== Future Roadmap

While Phase 1 (The Interactive Assessment Engine) is now successfully completed, SujetStore has clear expansion vectors for Phase 2 and beyond.

=== Phase 2: Video Solutions & Streaming Architecture

To support deeper understanding—especially for subjects like Physics and Mathematics—the platform will integrate video walkthroughs mimicking a teacher's explanation.

*Proposed Streaming Tech Stack:*
- *HLS Protocol:* Adaptive bitrate streaming with 10-second chunks for instant playback.
- *AES-128 Encryption:* Per-chunk encryption to prevent unauthorized downloads.
- *Backblaze B2:* Cold storage at a fraction of the cost of Amazon S3.
- *Cloudflare CDN:* Zero egress fees via the Bandwidth Alliance, providing rapid edge distribution across North Africa.

=== Phase 3: Advanced Analytics & Weakness Detection

Transitioning from macro-level admin analytics to personalized student diagnostics:

- *Automated Weakness Detection:* Analysis of specific interactive quiz errors to identify targeted knowledge gaps (e.g., "Struggles with Fractions").
- *Personalized Recommendations:* Automatically suggesting specific summaries or lessons based on failed quiz competencies.
- *Parent Dashboards:* Summary statistics tracking a student's study time, exam scores, and progression by trimester.
