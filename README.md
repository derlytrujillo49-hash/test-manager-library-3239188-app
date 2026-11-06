Manager Library — Frontend App Implementation
This repository contains the client-side single-page application (SPA) for Manager Library, built using React and structured following Spec-Driven Development (SDD) practices.

Core SDD Architectural Decisions
This frontend application bridges user interactions and strict business domain rules with the Laravel API endpoints under the following patterns:

View Segmentation & Actor Mapping
Operator Dashboards: Interfaces are tailored to handle internal workflows for authenticated administrative personnel (admin and librarian).
Reactive State Validations: Active forms enforce business constraints directly on the client view state before transmitting payloads (e.g., dynamically blocking loan submissions if lines fall outside the 1-to-3 items requirement).
Soft Deletion Awareness: Catalog components handle search filtering flags (q, page) seamlessly, rendering only valid active books while remaining isolated from logical records hidden via deleted_at timestamps.

Implemented UI Architecture Component Assets
src/components/BookList.jsx -> Connects directly with the /api/v1/books endpoint to manage paginated rendering, title sorting, and on-demand keyword filtering.
src/components/LoanForm.jsx -> Orchestrates transactional borrowing sessions. Includes front-end boundary checks ensuring no operator records a loan breaking the absolute 3-item limit or references a blocked member document ID.

 Development Setup
Dependencies Installation
To restore package dependencies and spin up the quick development engine, execute the package scripts:
npm install
npm run dev
