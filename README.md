AI Safety Incident Dashboard
This project is a simple React app to manage and view AI safety incidents.
You can filter, sort, expand details, and add new incidents through a form.

Features
View list of incidents with filter by severity

Sort incidents by newest or oldest

Expand/Collapse incident details

Add new incidents through a form

Installation and Running Locally
1. Clone the repository
bash
git clone https://github.com/asefshaik/sparkle.git

cd sparkle
2. Install dependencies
bash
npm install
3. Start the development server
bash
npm start
The app will run at http://localhost:3000.

Project Structure
bash
/src
  ├── App.js
  ├── App.css
  ├── data.js
  └── index.js
Technologies Used
React (with Hooks)

CSS for styling

Notes
You can modify initialIncidents inside data.js.

A .gitignore should be used to exclude node_modules/.

