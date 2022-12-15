/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Ishanshi Bhardwaj
 * Email: bhardwai@oregonstate.edu
 */

//posts that are there when the page initially loads
var initialPost = [];

function main() {
  initialPost = [...document.getElementsByClassName("post")];
}

document.getElementById("sell-something-button").addEventListener("click",openModal)
document.getElementById("modal-close").addEventListener("click",closeModal)
document.getElementById("modal-cancel").addEventListener("click",closeModal)
document.getElementById("modal-accept").addEventListener("click",createFields)
document.getElementById("filter-update-button").addEventListener("click",updates)
/*
    Sell Something Button steps for execution 
    1. When you click that button then display a modal 
    To show the modal:
        1. First find that element in the HTML
        2. Get the element in Javascript
        3. Change that element to unhide the properties

*/
/**
 * Function name : openModal
 * Function's objective: As soon as the user clicks the button then they are shown the modal that they can enter data into
 */
function openModal() {

  console.log("button clicked");


  var modalBackdrop = document.getElementById("modal-backdrop");
  //unhide the backdrop
  modalBackdrop.classList.remove("hidden");
  console.log(modalBackdrop);
  //unhide the sell-something-modal
  var sellSomething = document.getElementById("sell-something-modal");
  sellSomething.classList.remove("hidden");
}

/*
    2. X/closing the modal
        When x or cancel is clicked hide the modal and clear the backdrop

    Things to do:
    1. Find the x button and the cancel button 
    2. re-hide them both 
    3. clear all the input fields 

*/
/**
 * Function name: closeModal
 * Function's objective: close the modal when we click cancel or the x button
 */
function closeModal() {
  var modalBackdrop = document.getElementById("modal-backdrop");
  modalBackdrop.classList.add("hidden");
  var sellSomething = document.getElementById("sell-something-modal");
  sellSomething.classList.add("hidden");
  clearFields();
  console.log(modalBackdrop);
}

/**
 * Function: clearInput
 * Function's Objective: get the elements that we want to clear and then set them to an empty string to clear them
 * @param {} inputId
 */
function clearInput(inputId) {
  var inputElement = document.getElementById(inputId);
  inputElement.value = "";
}
/**
 * Function name: clearFields
 * Function's objective: store the elements we want to clear and then call the clearInput function to clear them all
 */
function clearFields() {
  var arrayOfInputs = [
    "post-text-input",
    "post-photo-input",
    "post-price-input",
    "post-city-input",
  ];
  arrayOfInputs.forEach(clearInput);
  document.getElementById("post-condition-new").checked = true;
}

/*
    3. Open Modal

    When the modal is open and the create button is pressed then create the post and clear the fields

    Things to do:
    1. find the create button
    2. close the modal
    3. generate a new post 
        - The new post should be AFTER the existing post
        - should match the post format
            how to change clone attributes 


*/
/**
 * Function name: createFields
 * Function: create the actual post with the data from the modal
 */
function createFields() {
  var modalAC = document.getElementById("posts");
  //get the element and store them in an object
  const newPost = {
    text: document.getElementById("post-text-input").value,
    photo: document.getElementById("post-photo-input").value,
    price: document.getElementById("post-price-input").value,
    city: document.getElementById("post-city-input").value,
  };

  //check which values have been selected for the conditions
  const allConditions = document.getElementsByName("post-condition");
  for (let i = 0; i < allConditions.length; i++) {
    const element = allConditions[i];
    //add the value into the newPost object in the condition key
    if (element.checked === true) {
      newPost.condition = element.value;
      break;
    }
  }
  //Alert system to make sure that the user is inputting data into the modal
  if (newPost.text === "" ||newPost.photo === "" ||newPost.price === "" ||newPost.city === "" ||newPost.condition === "") {
    alert("Value is missing in one of the Fields!!!");
    return;
  }

  //create each and every element and then set the respective attributes to match the html format
  const postDiv = document.createElement("div");
  postDiv.setAttribute("class", "post");
  postDiv.setAttribute("data-price", newPost.price);
  postDiv.setAttribute("data-city", newPost.city);
  postDiv.setAttribute("data-condition", newPost.condition);

  const postContent = document.createElement("div");
  postContent.setAttribute("class", "post-contents");

  const postImageContainer = document.createElement("div");
  postImageContainer.setAttribute("class", "post-image-container");

  const image = document.createElement("img");
  image.setAttribute("src", newPost.photo);
  image.setAttribute("alt", newPost.text);

  postImageContainer.appendChild(image);

  const postInfoContainer = document.createElement("div");
  postInfoContainer.setAttribute("class", "post-info-container");

  const a = document.createElement("a");
  a.setAttribute("href", "#");
  a.setAttribute("class", "post-title");
  //creating a text
  const aText = document.createTextNode(newPost.text);
  a.appendChild(aText);

  const spanPrice = document.createElement("span");
  spanPrice.setAttribute("class", "post-price");
  spanPrice.appendChild(document.createTextNode("$" + newPost.price));

  const spanCity = document.createElement("span");
  spanCity.setAttribute("class", "post-city");
  spanCity.appendChild(document.createTextNode("("+ newPost.city.charAt(0).toUpperCase()+newPost.city.slice(1)+")"));

  //begin appending the children to be in their respective div
  postInfoContainer.appendChild(a);
  postInfoContainer.appendChild(spanPrice);
  postInfoContainer.appendChild(spanCity);

  postContent.appendChild(postImageContainer);
  postContent.appendChild(postInfoContainer);
  postDiv.appendChild(postContent);

  modalAC.appendChild(postDiv);

  //call the respective functions that first add the new post into the initial array and add's the new city and closes the modal
  main();
  addingCity(newPost.city);
  closeModal();
}

/*
1. store all the post into an array 
2. if there is a filter applied you look at the array and replace the current html with those values
3. if there is a new post that is added then you need to add that post into that array 
4. function that gets the html post into an array 
5. recall the function to update the array if a new post is added 
*/
/**
 * Function name: updates
 * Function objective: check the filter content and see which posts match the filters set
 */
function updates() {
  var filterText = document.getElementById("filter-text").value;
  var minPrice = document.getElementById("filter-min-price").value;
  var maxPrice = document.getElementById("filter-max-price").value;
  var filterCity = document.getElementById("filter-city").value;
  var filterCondition = document.getElementsByName("filter-condition");
  var condition = [];

  for (let i = 0; i < filterCondition.length; i++) {
    const element = filterCondition[i];
    //add the value into the newPost object in the condition key
    if (element.checked === true) {
      condition.push(element.value.toLowerCase());
    }
  }

  // console.log(filterText,minPrice,maxPrice,filterCity, condition)

  //saves the filter content in an array
  var filterPost = [];

  console.log(initialPost);

  //trying to save the content of all posts to compare
  for (let j = 0; j < initialPost.length; j++) {
    const element = initialPost[j];
    //using an object to store and compare
    var filterObject = {
      city: filterCity === "" || filterCity.toLowerCase() === element.getAttribute("data-city").toLowerCase(),
      min:minPrice === "" || Number(minPrice) <= Number(element.getAttribute("data-price")),
      max:maxPrice === "" ||Number(maxPrice) >= Number(element.getAttribute("data-price")),
      text: filterText === "" ||element.querySelector(".post-title").textContent.toLowerCase().includes(filterText.toLowerCase()),
      filter:condition.length === 0 ||condition.includes(element.getAttribute("data-condition").toLowerCase()),
    };
    //Testing:
    //console.log("Max:" ,maxPrice)
    //console.log("Min: ", minPrice)
    //console.log("data-price", element.getAttribute("data-price"))
    //console.log('Max condition' , filterObject.max)

    filterCity === element.getAttribute("data-city");

    //checking to see what filters match and then pushing the respective posts onto the DOM
    if (filterObject.city && filterObject.min && filterObject.max && filterObject.text && filterObject.filter) {
      //push when conditions are met
      filterPost.push(element);
    }
  }
  //remove all the nodes that don't match the filter
  removeAllChildNodes(document.getElementById("posts"));
  filterPost.forEach((filterResult) => document.getElementById("posts").appendChild(filterResult)
  );
}

/**
 * Function name: removeAllChildNodes
 * Function's Objective: remove all the child nodes one by one
 * @param {*} parent
 */
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/**
 * Extra Credit
 * Function name: addingCity
 * Function's objective: adding the new city into the pre-existing cities present in the filter
 * @param {*} newCity
 */
function addingCity(newCity) {
  var filterCities = document.querySelector("#filter-city");

  for (let i = 0; i < filterCities.length; i++) {
    const element = filterCities[i];
    //if the city does exist then return
    if (element.value.toLowerCase() === newCity.toLowerCase()) {
      return;
    }
  }
  //if the city doesn't exist then add that city into the filters
  var city = document.createElement("option");

  city.appendChild(document.createTextNode(newCity));
  filterCities.appendChild(city);
}
