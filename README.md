# Expense Tracker

Expense Tracker is a web application for managing personal expenses. It allows users to add, edit, delete, and filter expenses, while displaying summary information such as the total amount, number of expenses, and highest expense.

##GitHub Repository 
[Expense Tracker GitHub Repository](https://github.com/shahedkaraki/Expense-Tracker-First-Project.git)


## How to run

Make sure the following are installed:

Node.js
PostgreSQL
VS Code


**Backend**

1. Clone or download the project and open it in VS Code.
2. Open the backend folder in the terminal:
cd backend

3. Install the required Node.js packages:
npm install

4. Create a PostgreSQL database named:
expense_tracker
5. Open schema.sql from the backend folder.
6. Run the SQL script in PostgreSQL/pgAdmin to create the expenses table and insert the sample data.
7. Create .env file inside the backend folder.

8. Add the PostgreSQL connection information to .env:
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgresql_username
DB_PASSWORD=your_postgresql_password 
DB_NAME=expense_tracker

9. Start the backend:
node server.js
The API will run at: http://localhost:3000


**Frontend**

1. Open the frontend folder in VS Code.
2. Open index.html.
3. Run the page using Live Server in VS Code.
4. The Expense Tracker interface will open in the browser.

The frontend communicates directly with the backend API running at: http://localhost:3000/api/expenses

## Features

- [x] Add an expense with validation
- [x] Delete an expense
- [x] Edit an expense
- [x] Filter by category
- [x] Summary cards (total amount, number of expenses, highest expense)
- [x] Data is saved in a PostgreSQL database
- [x] Loading spinner during API operations
- [x] Error alerts for server connection problems
- [x] Server validation error messages
- [x] Responsive mobile layout
- [x] Different colors for expense category badges


## Screenshots


Phase 1 — Backend API

Screenshots showing the API testing and backend functionality from Phase 1.

Get Expenses
![Phase 1 GET All Expenses](images/phase1/GET-all-expenses.png)

Get Expense By ID
![Phase 1 GET Expense By Id](images/phase1/GET-by-id.png)

Get invalid URL
![Phase 1 GET Invalid URL](images/phase1/GET-invalid-URL.png)

Get Invalid id
![Phase 1 GET Invalid id](images/phase1/NOT-FOUND-id2-GET.png)
![Phase 1 GET Invalid id](images/phase1/NOT-FOUND1-abc-GET.png)

Post Expense
![Phase 1 POST Expense](images/phase1/valid-POST2.png)

Post Invalid Cases
![Phase 1 POST invalid title](images/phase1/POST-invalid-title.png)
![Phase 1 POST invalid amount](images/phase1/POST-invalid-amount1.png)
![Phase 1 POST invalid amount](images/phase1/POST-invalid-amount2.png)
![Phase 1 POST invalid amount](images/phase1/POST-invalid-amount3.png)
![Phase 1 POST invalid category](images/phase1/POST-invalid-category.png)
![Phase 1 POST invalid date](images/phase1/POST-invalid-date.png)


Put Expense
![Phase 1 PUT Expense](images/phase1/PUT-valid.png)

Put Invalid Cases 
![Phase 1 PUT invalid id](images/phase1/PUT-invalid-id.png)
![Phase 1 PUT invalid title](images/phase1/PUT-non-existing-id.png)
![Phase 1 PUT invalid title](images/phase1/PUT-inavlid-title.png)
![Phase 1 PUT invalid amount](images/phase1/PUT-invalid-amount.png)
![Phase 1 PUT invalid category](images/phase1/PUT-invalid-category.png)
![Phase 1 PUT invalid date](images/phase1/PUT-invalid-date.png)

Delete Expense 
![Phase 1 DELETE Expense](images/phase1/valid-DELETE.png)

Delete Invalid Caese

![Phase 1 DELETE Invalid](images/phase1/invalid-DELETE2.png)


Phase 2 — Frontend
Desktop
![Phase 2 Desktop1](images/phase2/Desktop1.png)
![Phase 2 Desktop12](images/phase2/Desktop2.png)

Mobile

![Phase 2 Phone screen](images/phase2/Phone_screen1.png)
![Phase 2 Phone screen](images/phase2/Phone_screen2.png)

## Demo

Demo video:

[Demo Video](https://drive.google.com/file/d/1oDctzDgKNcW0hKcK0b4FYRZTq_KcHjtj/view?usp=drive_link)

## What was the hardest part?

The hardest part was connecting the frontend to the backend API and making sure that every operation reflected the actual data stored in PostgreSQL.
