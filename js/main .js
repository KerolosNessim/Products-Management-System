var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCateg = document.getElementById("productCateg");
var productDesc = document.getElementById("productDesc");
var myTable = document.getElementById("myTable");
var myBtn = document.getElementById("myBtn");
var inputSearch = document.getElementById("inputSearch");
var nameAlert = document.getElementById("nameAlert");
var priceAlert = document.getElementById("priceAlert");
var categAlert = document.getElementById("categAlert");
var discAlert = document.getElementById("discAlert");
var productList;
var updateIndex;
// check local storage
if (localStorage.getItem("productList") === null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProduct(productList);
}
// function to add product
function addProduct() {
  // check btn for update or add product
  if (
    nameValidate() === true &&
    priceValidate() === true &&
    categValidate() === true &&
    discValidate() === true
  ) {
    if (myBtn.innerHTML === "Add Product") {
      var product = {
        name: productName.value,
        price: productPrice.value,
        categ: productCateg.value,
        desc: productDesc.value,
      };
      productList.push(product);
    } else {
      productList[updateIndex].name = productName.value;
      productList[updateIndex].price = productPrice.value;
      productList[updateIndex].categ = productCateg.value;
      productList[updateIndex].desc = productDesc.value;
    }
    displayProduct(productList);
    addToLocalStorage();
    clearInputs();
  }
}
// function to display product
function displayProduct(pList) {
  var cartona = ``;
  for (var i = 0; i < pList.length; i++) {
    cartona += `<tr>
     <td class="text-warning">${i + 1}</td>
     <td>${pList[i].name}</td>
     <td>${pList[i].price}</td>
     <td>${pList[i].categ}</td>
     <td>${pList[i].desc}</td>
     <td><button onclick="updateProduct(${i})" class="btn btn-warning text-white"><i class="fa-solid fa-file-pen"></i> Update</button></td>
     <td><button onclick="deleteProduct(${i})" class="btn btn-danger"><i class="fa-regular fa-trash-can"></i> Delete</button></td>
     </tr>
    `;
  }
  myTable.innerHTML = cartona;
}
// function to clear inputs
function clearInputs() {
  productName.value = "";
  productPrice.value = "";
  productCateg.value = "";
  productDesc.value = "";
  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productCateg.classList.remove("is-valid");
  productDesc.classList.remove("is-valid");
}
// function to delete product
function deleteProduct(index) {
  productList.splice(index, 1);
  addToLocalStorage();
  displayProduct(productList);
}
// function to add to local storage
function addToLocalStorage() {
  localStorage.setItem("productList", JSON.stringify(productList));
}
// function to update product
function updateProduct(index) {
  updateIndex = index;
  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productCateg.value = productList[index].categ;
  productDesc.value = productList[index].desc;
  myBtn.innerHTML = "Update Product";
}
// function to search product
function searchProduct() {
  var term = inputSearch.value.toLowerCase();
  var searchList = [];
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term)) {
      searchList.push(productList[i]);
    }
  }
  displayProduct(searchList);
}
// function to validate name
function nameValidate() {
  var regex = /^[A-Z][a-zA-Z0-9\s]+$/;
  if (regex.test(productName.value)) {
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    nameAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    nameAlert.classList.replace("d-none", "d-block");
    return false;
  }
}
// function to validate price
function priceValidate() {
  var regex = /^(?:[1-9]\d{3,4}|100000)$/;
  if (regex.test(productPrice.value)) {
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");
    priceAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
    priceAlert.classList.replace("d-none", "d-block");
    return false;
  }
}
// function to validate category
function categValidate() {
  var regex = /^[A-Z][a-zA-Z0-9\s]+$/;
  if (regex.test(productCateg.value)) {
    productCateg.classList.add("is-valid");
    productCateg.classList.remove("is-invalid");
    categAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    productCateg.classList.add("is-invalid");
    productCateg.classList.remove("is-valid");
    categAlert.classList.replace("d-none", "d-block");
    return false;
  }
}
// function to validate discription
function discValidate() {
  var regex = /^[A-Z][\w\s]{0,99}$/;
  if (regex.test(productDesc.value)) {
    productDesc.classList.add("is-valid");
    productDesc.classList.remove("is-invalid");
    discAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    productDesc.classList.add("is-invalid");
    productDesc.classList.remove("is-valid");
    discAlert.classList.replace("d-none", "d-block");
    return false;
  }
}
