// loading products from API
const loadProducts = () => {
    const url = `https://fakestoreapi.com/products`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => showProducts(data));
};
loadProducts();

// showing al products 
const showProducts = (products) => {
    const allProducts = products.map((pd) => pd);
    for (const product of allProducts) {
        const image = product.image;
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
    <div class="col">
    <div class="single-product bg-gray rounded">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h4>${product.title.slice(0, 15)}</h4>
      <p>Category: ${product.category}</p>
      <h4>Price: $ ${product.price}</h4>
      <span class="me-5"><i class="fas fa-star"></i>&nbsp;${product.rating.rate}</span>&nbsp &nbsp;
      <span><i class="fas fa-user-circle"></i>&nbsp;${ product.rating.count}</span>
      <div class="mt-2">
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-secondary">add to cart</button>
      <button onclick="getSingleProduct(${product.id})" id="details-btn" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
      </div>
      </div>
      </div>
      `;
        document.getElementById("all-products").appendChild(div);
    }
};

//counting product in cart
let count = 0;
const addToCart = (id, price) => {
    count = count + 1;
    updatePrice("price", price);
    updateTotal()
    updateTaxAndCharge();
    document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
    const element = document.getElementById(id).innerText;
    const converted = parseFloat(element);
    return converted;
};

// updating price
const updatePrice = (id, value) => {
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = convertedOldPrice + convertPrice;
    document.getElementById(id).innerText = total;
};

const setInnerText = (id, value) => {
    document.getElementById(id).innerText = value;
};

// delivery charge and total tax
const updateTaxAndCharge = () => {
    const priceConverted = getInputValue("price");
    if (priceConverted > 0) {
        setInnerText("delivery-charge", 20);
        setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
    }
    if (priceConverted > 200) {
        setInnerText("delivery-charge", 20);
        setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
    }
    if (priceConverted > 400) {
        setInnerText("delivery-charge", 50);
        setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
    }
    if (priceConverted > 500) {
        setInnerText("delivery-charge", 60);
        setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
    }
    updateTotal()
};

//updating gradtotal
const updateTotal = () => {
    const grandTotal =
        getInputValue("price") + getInputValue("delivery-charge") +
        getInputValue("total-tax");
    document.getElementById("total").innerText = grandTotal.toFixed(2);
};

//showing single product
const getSingleProduct = (id) => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(json => ShowSingleProduct(json))
    }
    // showing product in modal
const modalBody = document.querySelector('.modal-body')
const modalTitle = document.querySelector('.modal-title')
const ShowSingleProduct = product => {
    modalTitle.innerText = `${product.title}`
    modalBody.innerHTML = `
  <div class="text-center bg-white">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h4>${product.title}</h4>
      <p>Category: ${product.category}</p>
      <h4>Price: $ ${product.price}</h4>
      <p>${product.description}</p>
      <span class="me-5"><i class="fas fa-star"></i>&nbsp;${product.rating.rate}</span>&nbsp &nbsp;
      <span><i class="fas fa-user-circle"></i>&nbsp;${ product.rating.count}</span>
      <div class="mt-2">

      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-secondary">add to cart</button>
      <button onclick="getSingleProduct(${product.id})" id="details-btn" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
      </div>
      </div>
  `
}