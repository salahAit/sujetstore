= Gamification & Engagement

To increase student engagement, motivation, and retention, SujetStore implements a complete gamification layer. This transforms the solitary act of studying into a rewarding, trackable journey.

== Points System

The foundation of the gamification system is the Points ledger. Points are awarded automatically for positive educational behaviors:

- *Completing a Quiz:* +10 points.
- *Achieving a Perfect Score:* Bonus points depending on quiz length.
- *Earning a Badge:* Bonus points ranging from +10 to +50 based on difficulty.

All point transactions are recorded in the `user_points` table with a timestamp and reason, providing students with a transparent history of their earnings.

== Achievement Badges

The platform defines 8 built-in achievement badges that students unlock by reaching specific milestones in the Quiz Engine. 

#table(
  columns: (1fr, 1fr, 2fr),
  [*Badge*], [*Icon*], [*Unlock Condition*],
  [First Quiz], [🎯], [Complete your very first interactive quiz],
  [Quiz Explorer], [📚], [Complete 5 total quizzes],
  [Quiz Master], [🏆], [Complete 10 total quizzes],
  [Perfect Score], [⭐], [Score 100% on any quiz],
  [Speed Demon], [⚡], [Complete a quiz in under 1 minute],
  [Hot Streak], [🔥], [Score 80%+ on 3 consecutive quizzes],
  [Versatile], [🎪], [Try 5 different interactive question types],
  [Centurion], [💯], [Accumulate 100 total points],
)

The badge evaluation logic runs asynchronously upon quiz submission. When a new threshold is met, the system inserts a record into the `user_badges` table.

== The Achievements Dashboard

Students can view their progress on the dedicated Achievements page (`/achievements`). This page utilizes a horizontal tab layout to present three key views:

1. *Badges Grid:* A visual display of all 8 badges. Unearned badges appear grayscale/locked, while earned badges are fully colored with their unlock timestamps.
2. *Leaderboard:* A global ranking showing the top 10 most active students on the platform, ranked by total accumulated points.
3. *Points History:* A chronological log of the student's recent point earnings and the specific actions that triggered them.
