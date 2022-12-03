"use strict";

// variables
const amount = document.querySelector("#amount");
const descript = document.querySelector("#descript");
const type = document.querySelector("#type");
const submitBtn = document.querySelector("#submit");
const userList = document.querySelector("#users");

// function
async function savetoServer(e) {
  e.preventDefault();
  const amount = e.target.amount.value;
  const descript = e.target.descript.value;
  const type = e.target.type.value;

  const obj = {
    amount,
    descript,
    type,
  };
  let req;
  try {
    req = await axios.post(
      "https://crudcrud.com/api/ec26c42aecb24c4fa5e07e891a6c91b3/appointment",
      obj
    );
    display(req.data);
    console.log(req.data);
  } catch (error) {
    console.log("something went wrong...", error);
  }
  clearInputField();
}
const clearInputField = function() {
  amount.value = "";
  descript.value = "";
  type.value = "";
};

function display(obj) {
  console.log(obj, obj._id);
  const li = document.createElement("li");
  li.innerHTML = `<span>${obj.amount}</span>-<span>${obj.descript}</span>-<span>${obj.type}</span>`;
  li.className = "information";
  li.id = obj._id;

  // creating delete button element
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.appendChild(document.createTextNode("Delete"));

  // appending the delete button to li
  li.appendChild(deleteBtn);

  // creating edit button element
  const editBtn = document.createElement("button");
  editBtn.className = "edit";
  editBtn.appendChild(document.createTextNode("Edit"));

  // appending the edit button to li
  li.appendChild(editBtn);

  // appending li to userlist
  userList.appendChild(li);
  clearInputField();
}

async function displayFromServer() {
  // for (const val of Object.values(obj)) {
  //   console.log(val);
  // }
  let res;
  try {
    res = await axios.get(
      "https://crudcrud.com/api/ec26c42aecb24c4fa5e07e891a6c91b3/appointment"
    );
    const array = res.data;
    array.forEach((obj) => {
      console.log(obj, obj._id);
      const li = document.createElement("li");
      li.innerHTML = `<span>${obj.amount}</span>-<span>${obj.descript}</span>-<span>${obj.type}</span>`;
      li.className = "information";
      li.id = obj._id;

      // creating delete button element
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete";
      deleteBtn.appendChild(document.createTextNode("Delete"));

      // appending the delete button to li
      li.appendChild(deleteBtn);

      // creating edit button element
      const editBtn = document.createElement("button");
      editBtn.className = "edit";
      editBtn.appendChild(document.createTextNode("Edit"));

      // appending the edit button to li
      li.appendChild(editBtn);

      // appending li to userlist
      userList.appendChild(li);
    });
  } catch (error) {
    (err) => console.log(err);
  }
}

async function deleteUser(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure you want to delete this item ?")) {
      const li = e.target.parentElement;
      li.style.display = "none";
      userList.removeChild(li);
      console.log(li, li.id);
      let req;

      try {
        req = await axios.delete(
          `https://crudcrud.com/api/ec26c42aecb24c4fa5e07e891a6c91b3/appointment/${li.id}`
        );
        alert("user deleted");
      } catch (error) {
        console.log(error);
      }
    }
  }
}

async function editUser(e) {
  if (e.target.classList.contains("edit")) {
    if (confirm("Are you sure you want to edit this item ?")) {
      const litoEdit = e.target.parentElement;
      console.log(litoEdit);
      amount.value = litoEdit.children[0].textContent;
      descript.value = litoEdit.children[1].textContent;
      type.value = litoEdit.children[2].textContent;

      litoEdit.style.display = "none";
      userList.removeChild(litoEdit);
      console.log(litoEdit, litoEdit.id);

      let req;
      try {
        req = await axios.delete(
          `https://crudcrud.com/api/ec26c42aecb24c4fa5e07e891a6c91b3/appointment/${litoEdit.id}`
        );
        alert("enter user details");
      } catch (error) {
        console.log(error);
      }
    }
  }
}

// event listeners
window.addEventListener("DOMContentLoaded", displayFromServer);
userList.addEventListener("click", deleteUser);
userList.addEventListener("click", editUser);
