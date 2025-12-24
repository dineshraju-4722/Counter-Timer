# React Countdown Timer

A React application that supports multiple countdown timers and time-spent tracking, focusing on efficient component-level re-rendering and real-time updates.

## Overview

This project demonstrates how React updates only the components whose state changes, instead of re-rendering the entire page. Each timer updates independently every second, making the application efficient and scalable.

## Features

- Multiple countdown timers
- Add, edit, and delete timers
- Live countdown display (days, hours, minutes, seconds)
- Time spent on site tracking
- Persistent data storage using LocalStorage
- Responsive user interface

## Tech Stack

- React
- Moment.js
- Tailwind CSS
- JavaScript (ES6+)
- LocalStorage API

## Project Structure


```bash
src/
├── components/
│   ├── CounterComponent.jsx
│   ├── TimeSpentComponent.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## How It Works

1. The user selects a date and time.
2. The app calculates the remaining time using Moment.js.
3. Each timer updates independently using `setInterval`.
4. Expired timers are automatically removed.
5. Timer data persists using LocalStorage.

## Learning Outcomes

- Understanding React component-level re-rendering
- Effective use of `useState` and `useEffect`
- Managing real-time updates
- Working with date and time calculations
- Building reusable components


## Installation

Install dependencies:

```bash

#Install dependencies

npm install

#Run

npm run dev

```



