
const API_URL = "http://localhost:3000/api/expenses";

let expenses = [];

let editingExpenseId = null;


//category filter:
const categoryFilter = document.getElementById("category-filter");

categoryFilter.addEventListener("change", filterExpense);

function filterExpense() {

    const selectCategory = categoryFilter.value;

    let filteredExpense;

    if (selectCategory === "") {
        filteredExpense = expenses;
    }
    else {
        filteredExpense = expenses.filter(function (expense) {
            return expense.category === selectCategory;
        })
    }
    displayExpenses(filteredExpense);
}

//alert for adding expense success od failed :

function showAlert(message, type) {
    const alertContainer = document.getElementById("alert-container");
    alertContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
}



//add expenses:
const expenseForm = document.getElementById("expense-form");
expenseForm.addEventListener("submit", addExpense);

async function addExpense(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;


    const titleMessage = document.getElementById("title-message");

    if (title.trim() === "") {
        titleMessage.innerHTML = `<div class="text-danger">title is required!</div>`;
        return;
    }

    titleMessage.innerHTML = "";

    const amountMessage = document.getElementById("amount-message");
    if (amount === "" || Number(amount) <= 0) {
        amountMessage.innerHTML = `<div class="text-danger">amount must be positive number!</div>`;
        return;
    }

    amountMessage.innerHTML = "";

    const categoryMessage = document.getElementById("category-message");
    if (category === "") {
        categoryMessage.innerHTML = `<div class="text-danger">category is required!</div>`;
        return;
    }

    categoryMessage.innerHTML = "";

    const dateMessage = document.getElementById("date-message");
    if (date === "") {
        dateMessage.innerHTML = `<div class="text-danger">date is required!</div>`;
        return;
    }

    dateMessage.innerHTML = "";



    const data = {
        title: title,
        amount: Number(amount),
        category: category,
        date: date
    };


    //loading spinner after add expense:
    const loadingSpinner = document.getElementById("loading-spinner");
    loadingSpinner.classList.remove("d-none");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message);
        }


        showAlert("expense added successfully !", "success");

        await getExpenses();

        expenseForm.reset();


    } catch (error) {
        console.error(error);
        if (error.message === "Failed to fetch") {
            //if connection failed
            showAlert("unable to connect to the server", "danger");
        }
        else {
            //handels 400 cases
            showAlert(error.message, "danger")
        }
    }

    finally {
        loadingSpinner.classList.add("d-none");
    }
}


//for different colors of badgaes:
function categoryColor(category){
    if(category === "Food"){
        return "bg-warning"
    }
        if(category === "Transport"){
        return "bg-success"
    }
        if(category === "Bills"){
        return "bg-danger"
    }
        if(category === "Entertainment"){
        return "bg-info"
    }
        if(category === "Other"){
        return "bg-primary"
    }
}

const editModal = new bootstrap.Modal(document.getElementById("edit-modal"));

function displayExpenses(arrayOfExpenses) {
    const tableBody = document.getElementById("table-body");

    tableBody.innerHTML = "";

    for (let expense of arrayOfExpenses) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${expense.title}</td>
        <td>${expense.amount}</td>
        <td><span class="badge ${categoryColor(expense.category)}">${expense.category}</span></td>
        <td>${expense.date}</td>
        <td>
        <button class="btn btn-sm btn-outline-secondary edit-btn me-1 mb-1" data-id="${expense.id}">
        Edit</button>
        <button class="btn btn-sm btn-outline-danger delete-btn mb-1" data-id="${expense.id}">Delete
        </button>
        </td>
        `;

        tableBody.appendChild(row);


        //edit btn
        const editButton = row.querySelector(".edit-btn");

        editButton.addEventListener("click", function () {
            const expenseId = this.dataset.id;

            editingExpenseId = expenseId;

            const expense = expenses.find(function (expense) {
                return expense.id == expenseId;
            });


            //i put the edit modal input with the value of current expense

            document.getElementById("edit-title").value = expense.title;
            document.getElementById("edit-amount").value = expense.amount;
            document.getElementById("edit-category").value = expense.category;
            document.getElementById("edit-date").value = expense.date;

            editModal.show();
        });


        ///delete btn
        const deleteBtn = row.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", async function () {
            const expenseId = this.dataset.id;

            //loading spinner for deleting expense:
            const loadingspinner = document.getElementById("loading-spinner");
            loadingspinner.classList.remove("d-none");

            try {
                const response = await fetch(`${API_URL}/${expenseId}`, {
                    method: "DELETE"
                });

                if (!response.ok) {
                    const errorMessage = await response.json();
                    throw new Error(errorMessage.message);
                }


                await getExpenses();

                showAlert("expense deleted successfully !", "success");
            } catch (error) {
                console.error(error);
                if (error.message === "Failed to fetch") {
                    showAlert("unable to connect to the server!", "danger");
                } else {
                    showAlert(error.message, "danger");
                }
            }

            finally {
                loadingspinner.classList.add("d-none");
            }
        });

    }


}

const saveEditBtn = document.getElementById("save-edit-btn");
saveEditBtn.addEventListener("click", saveChanges);

async function saveChanges() {

    const title = document.getElementById("edit-title").value
    const amount = document.getElementById("edit-amount").value
    const category = document.getElementById("edit-category").value
    const date = document.getElementById("edit-date").value


    const data = {
        title: title,
        amount: Number(amount),
        category: category,
        date: date
    }

    //loading spinner after editing :

    const loadingspinner = document.getElementById("loading-spinner");
    loadingspinner.classList.remove("d-none");


    try {

        const response = await fetch(`${API_URL}/${editingExpenseId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)

        });



        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.error);
        }

        await getExpenses();
        editModal.hide();

        showAlert("expense updated successfully!", "success");
    } catch (error) {
        console.error(error);
        if (error.message === "Failed to fetch") {
            showAlert("unable to connect to the server!", "danger");

        } else {
            showAlert(error.message, "danger");
        }
    }

    finally {
        loadingspinner.classList.add("d-none");
    }
}

//get all expenses
async function getExpenses() {

    //for loading spinner
    const loadingSpinner = document.getElementById("loading-spinner");
    loadingSpinner.classList.remove("d-none");

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("failed to load expenses");
        }

        expenses = await response.json();


        displayExpenses(expenses);


        //get the number of expenses -- put in card
        const numOfExpenses = document.getElementById("number-of-expenses");
        numOfExpenses.innerHTML = expenses.length;



        //get the total expenses -- put in card
        let total = 0;

        for (let expense of expenses) {
            total += Number(expense.amount);
        }

        const totalAmount = document.getElementById("total-amount");
        totalAmount.innerText = total.toFixed(2);




        //get the highestamount --put in card:
        if (expenses.length === 0) {

            document.getElementById("highest-expense").innerHTML = "0.00";
            document.getElementById("highest-category").innerHTML = "-";
            return;

        }
        let highestAmount = expenses[0];
        for (let expense of expenses) {
            if (Number(expense.amount) > Number(highestAmount.amount)) {
                highestAmount = expense;
            }
        }

        const highestExpense = document.getElementById("highest-expense");
        const highestCategory = document.getElementById("highest-category");

        highestExpense.innerHTML = Number(highestAmount.amount);
        highestCategory.innerHTML = highestAmount.category;



    } catch (error) {
        console.error(error);
        if (error.message === "Failed to fetch") {
            showAlert("unable to connect to the server!", "danger");
        } else {
            showAlert(error.message, "danger");
        }
    }

    //for loading spinner (to stop it) after the request being successful or faled
    finally {
        loadingSpinner.classList.add("d-none");
    }
}

getExpenses();






