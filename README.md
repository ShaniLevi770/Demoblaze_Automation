# Demoblaze UI & API Automation Framework  
Automation project for testing the Demoblaze demo e-commerce application using Playwright (JavaScript).

## 🚀 Overview
This project provides UI and API test automation for Demoblaze (https://www.demoblaze.com), covering:
- Home page categories
- Cart operations
- Checkout flow
- Basic API validation (signup, login)

The framework is built using **Playwright**, follows Page Object Model (POM), and includes fixtures, reusable utilities, and environment-based configuration.

---

## 📁 Project Structure
```
Demoblaze_Automation/
│
├── tests/
│ ├── UI/
│ │ ├── cart.spec.js
│ │ ├── homepage.spec.js
│ │ 
│ ├── API/
│ │ └── auth.api.spec.js
│ └── fixtures.js
│
├── pages/
│ ├── HomePage.js
│ ├── LoginPage.js
│ ├── SignupPage.js
│ ├── CartPage.js
│ 
│
├── data/
│ └── testData.js
│
├── reports/ # ignored in .gitignore
├── test-results/ # ignored (videos, traces)
│
├── .env # admin credentials (ignored)
├── playwright.config.js
├── package.json
└── README.md
```
---

## 🧪 Running Tests

### ▶ Run all tests (default)
```bash
npm test
npx playwright test
▶ Run report only on failures
npm run test:report:on-failure

▶ Always open HTML report after run
npm run test:report:always

▶ Run a single file
npx playwright test tests/UI/auth.spec.js

▶ Run in headed mode (browser visible)
npx playwright test --headed

▶ Show last report
npx playwright show-report reports/playwright-report
```

## 🔐 Environment Configuration

Create a .env file in the project root:
.env
ADMIN_USER=yourAdminUser
ADMIN_PASSWORD=yourAdminPassword


##  🧩 Key Features
✔ Page Object Model
Reusable page classes for maintainability and scalability.

✔ Fixtures
Shared browser/page/cart state logic.

✔ UI Tests
Home page categories
Product details
Add/remove items from cart
Checkout modal + validations

✔ API Tests
/signup
/login
Wrong password

✔ Reporting
HTML report
JUnit XML
Videos on failure
Traces on retry

## 📊 Reports

Playwright generates:
HTML report: reports/playwright-report/index.html
JUnit XML: reports/junit-results.xml
Videos: test-results/*/video.webm
Traces: test-results/*/trace.zip

All report folders are fully ignored in source control.

## 🧹.gitignore Summary
node_modules/
reports/
test-results/
playwright-report/
blob-report/
playwright/.cache/
playwright/.auth/
.env

## 🔍 Notes
Tests are optimized for Chromium by default; Firefox/Edge can be enabled easily in the config.

## 🛠 Tech Stack
Playwright (JS)
Node.js
Page Object Model (POM)
dotenv for environment variables
JUnit + HTML report
Cross-browser support

### 📬 Author

Shani Levi
QA Automation Engineer
(Golan Heights, Israel)
