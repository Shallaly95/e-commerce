// JavaScript code to fetch data and populate search bar options
const searchInput = document.querySelector('.search-input');
const searchOptions = document.querySelector('#search-options');

let productsData = []; // To store the fetched product data


///////////////////////////Shallaly//////////////
var user = JSON.parse(localStorage.getItem("unique"));
var userCart = JSON.parse(localStorage.getItem(user + "Cart"))
if (userCart == null) { userCart = [] }
var cartCount = document.getElementById("cartCount");
cartCount.innerHTML = userCart.length;
////////////////////////////////////////////////////////

// Fetch data from the given link
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        // Save the fetched data and populate the search bar options with product names
        productsData = data;
        data.forEach(product => {
            const option = document.createElement('option');
            option.value = product.title; // Display product titles in the search bar suggestions
            searchOptions.appendChild(option);
        });

        // Populate the product list on page load
        populateProductList(productsData);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Function to populate the product list
function populateProductList(products) {
    const main = document.querySelector('main');
    main.innerHTML = ''; // Clear existing products
    console.log(products);
    products.forEach(product => {
        const productSection = document.createElement('section');
        productSection.className = 'product';

        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.title;

        const h2 = document.createElement('h2');
        h2.textContent = product.title;

        const price = document.createElement('p');
        price.textContent = `$${product.price}`;

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.dataset.title = product.title; // Add product title as a custom attribute
        
        
        addToCartButton.addEventListener("click", function () {
            // var user = JSON.parse(localStorage.getItem("unique"))
            if (user == null) {
                alert("You must login first");
            } else {
                // alert(user)
                var cart = JSON.parse(localStorage.getItem(user + "Cart"));
                if (cart == null) {
                    cart = [];
                }
                var obj = {
                    username: user,
                    productId: product.id,
                    image: product.image,
                    price: product.price,
                    title: product.title
                };
                cart.push(obj);
                localStorage.setItem(user + "Cart", JSON.stringify(cart));
                cartCount.innerHTML = cart.length;
            }
        });

        const viewDetailsLink = document.createElement('a');
        viewDetailsLink.href = `product.html?id=${product.id}`; // Add the link for product details page

        // Append elements to product section
        productSection.appendChild(image);
        productSection.appendChild(h2);
        productSection.appendChild(price);
        productSection.appendChild(addToCartButton);
        productSection.appendChild(viewDetailsLink);

        main.appendChild(productSection);
    });

}

// Event handler for form submission
function handleSearch(event) {
    event.preventDefault(); // Prevent form submission

    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredProducts = productsData.filter(product => product.title.toLowerCase().includes(searchTerm));

    // Populate the product list with filtered products
    populateProductList(filteredProducts);

    return false;
}

/////////////////////////////////////shallaly////////////////////////////
function displayUserName() {
    const userInfoElement = document.getElementById('user-info');
    const userName = localStorage.getItem('unique');

    if (userName) {
        userInfoElement.textContent = `Welcome, ${userName}`; // Display the user name
    }
}
displayUserName();

document.getElementById('logout').addEventListener('click', function (event) {
    event.preventDefault();

    // Remove  from local storage
    localStorage.removeItem('unique');

    // Redirect the user to the login page or any other actions after logout
    window.location.href = 'login.html';
});


///////////////////////////////////////////////////////////////

