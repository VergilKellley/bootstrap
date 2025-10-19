// Define the base URL for the API endpoint
const API_URL = "http://localhost:3000/items";

// Get references to DOM elements: the form and the item list
const form = document.getElementById("itemForm");
const itemList = document.getElementById("itemList");

/* 
 * Function: fetchItems
 * Purpose: Fetches the list of items from the API and displays them in the UI
 */
async function fetchItems() {
  try {
    // Make a GET request to the API
    const res = await fetch(API_URL);
    // Parse the JSON response
    const items = await res.json();

    // Clear the current item list in the UI
    itemList.innerHTML = "";

    // Loop through each item and create a list element
    items.forEach(item => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";

      // Set the text of the list item to the item's name
      li.textContent = item.name;

      // Create a delete button for each item
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn btn btn-danger btn-sm";

      // Add a click event to delete the item when the button is clicked
      deleteBtn.addEventListener("click", () => deleteItem(item.id));

      // Append the delete button to the list item
      li.appendChild(deleteBtn);

      // Add the list item to the item list in the DOM
      itemList.appendChild(li);
    });
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error("Error fetching items:", error);
  }
}

/* 
 * Event Listener: form submit
 * Purpose: Handles form submission to add a new item to the list
 */
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent page reload

  // Get and trim the input value
  const nameInput = document.getElementById("itemName");
  const name = nameInput.value.trim();

  // Do nothing if input is empty
  if (!name) return;

  try {
    // Send a POST request to add the new item
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name }) // Convert JS object to JSON string
    });

    // Clear the input field after successful submission
    nameInput.value = "";

    // Refresh the item list to show the new item
    fetchItems();
  } catch (error) {
    // Log any errors that occur during the POST
    console.error("Error adding item:", error);
  }
});

/* 
 * Function: deleteItem
 * Purpose: Sends a DELETE request to remove an item by its ID
 */
async function deleteItem(id) {
  try {
    // Send DELETE request to the API
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    // Refresh the item list after deletion
    fetchItems();
  } catch (error) {
    // Log any errors that occur during the DELETE
    console.error("Error deleting item:", error);
  }
}

// Initial call to fetch and display all items when the page loads
fetchItems();
