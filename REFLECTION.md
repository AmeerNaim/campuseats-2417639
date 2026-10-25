# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?

Imperative telling the computer exactly how to build the screen step-by-step. Declarative (like React) just describing what I want the screen to look like, and React does the hard work to make it happen.

2. Why must a component name start with a capital letter?

It tells React that this is a special, custom component I made. If it starts with a lowercase letter, React just thinks it is a normal HTML tag like <div> or <p>.

3. What does a fragment <>...</> do, and why not just use a <div>?

A fragment groups items together without adding an extra, useless box to your webpage. If I use a <div> instead, that extra box can accidentally mess up my page's design and styling.

4. Name one benefit of splitting the UI into small components.

It allows me to easily reuse the exact same piece of code anywhere in my app. It also makes my code much easier to read and fix when something breaks.
