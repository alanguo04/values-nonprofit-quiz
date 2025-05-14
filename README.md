# Nonprofit Matcher

A quick web app that helps companies discover nonprofits to donate to, based on their values and preferences.

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## If `npm run dev` doesn’t work

You may not have Node.js installed.

1. Download it from: https://nodejs.org/
2. Install version 18 or later
3. Confirm it's installed:

```bash
node -v
npm -v
```

Then retry:

```bash
npm install
npm run dev
```

---

## How It Works

- The user fills out a short quiz specifying their values:
  - Preferred cause (e.g. climate, education, health)
  - Local or global scope
  - Nonprofit size
  - Number of nonprofits to display

- The app sends this info to **Google’s Gemini API**, which returns a list of nonprofits in JSON format.

- Each nonprofit is shown in a card with:
  - Name
  - Mission
  - Cause
  - Location
  - Annual Donations
  - People Affected
  - Website link

- The user can navigate through suggestions using left/right buttons.

---

## Write Up

This is a quick web app that accepts filters or wants from a user, and then generates a list of charities fitting those criteria, displaying high-level info and providing a link to go to the website. 

It inherently uses Google's Gemini API to find the charities based on criteria. 

Given more time, I would like to see if I could download a CSV—like the example nonprofits.json that is not used in the project, since I decided to use the LLM instead–or use a databse API so I can pull data about nonprofits/charities around the world, and write my own logic that can help hone in on what charities the company would like.

An LLM might be very general and choose the mainstream ones, but if I have access to a large database of nonprofit data, I can do data-manipulation to do things like filter based on other factors, or add a randomness factor, etc. But the LLM is good for getting a good list for a 2 hour project.

I used ChatGPT to streamline the tailwind css portions of this project, and for debugging.

5/14 notes for myself:

If I were to improve, one idea is to have user selected a goal of how many people to impact in x sector, and it will compile a portfolio of charities to invest into. I.e. user says I want to feed 10,000,000 meals to starving children, and it will give a list of charities and how much to donate in order to reach the quota