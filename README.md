# Work Achievements Bot **(WIP)**

Welcome to the Work Achievements Bot, a Node.js application designed to track achievements and virtual coins for users and teams via telegram. Below is a brief overview and essential information for running and improving the application.

## Overview

The Work Achievements Bot motivates users through achievements, where virtual coins can be earned by completing specific goals based on age ranges. The application operates in monthly cycles (rounds), allowing users to regain achievements and face new challenges. Team collaboration is crucial, as each user's achievements contribute to their team's overall success.

## Key Features

- Age range-specific achievements with predefined coin values.
- Monthly rounds with persistent achievements and new challenges.
- Team-based competition among Green, Red, Blue, and Orange teams.
- Status showcasing teams with the most achievements.
- Coin Masters have the authority to award extra coins to teams.

## Running the Application

1. Clone the repository: `git clone [https://github.com/your-username/coin-tracking-bot.git](https://github.com/MaartenWessels/WorkAchievementsBot.git)`
2. Install dependencies: `npm install`
3. Configure Firebase: Set up Firebase credentials and configure the connection.
4. Configure Telegram Bot: Create a new bot using the Telegram BotFather and configure the connection.
5. Run the application: `npm start` or `npm start:dev` for development variables.

## To-Do

- **Next Round Functionality:** Implement a way for the bot to advance to the next round. Rounds are basically months, but it can happen that a round needs to start earlier or later.

- **Manually Add Extra Coins:** Enable the bot to add extra coins to teams manually.

- **Improved Authentication/approval system:** Enhance the authentication system with approval before you have access to the bot.

- **Improved Achievement Timestamps for Leaderboards:** Currently, the bot saves an `added_at` value at the root of achievements in the database. Enhance this by implementing more detailed timestamps for each achievement. This improvement will provide more accurate and granular information for tracking achievements, especially for generating leaderboards based on achievement timestamps.

- **Leaderboards:** To see who has the most coins in the round.

Feel free to contribute to the repository by addressing these to-dos, suggesting improvements, or sharing your feedback. Your insights are invaluable, and remember, this application is a work in progress - your contributions can help make it better!
