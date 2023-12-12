
let productsCatalog = [];
const url = "https://striveschool-api.herokuapp.com/api/product/";
const headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4MjljZGMwNTgzNTAwMTg1MjJkMGYiLCJpYXQiOjE3MDIzNzM4MzcsImV4cCI6MTcwMzU4MzQzN30.CLq-r1LGucfmSb604A8eBRn_0YvcxwdeFCJRYUSrO2k",
    "Accept": "application/json",
    "Content-Type": "application/json"
};

function createObject () {
let productName = document.getElementById('productName').value;
let productDescription = document.getElementById('productDescription').value;
let productBrand = document.getElementById('productBrand').value;
let productPrice = document.getElementById('productPrice').value;

if (productName === '' || productDescription === '' || productBrand === '' || productPrice === ''){
alert('Attenzione! Devi compilare tutti i campi');
return false; 
}



let product = {
    "name": productName,
    "description": productDescription,
    "brand": productBrand,
    "imageUrl": "https://us.123rf.com/450wm/artshotphoto/artshotphoto2201/artshotphoto220100030/180434190-smartphone-generico-o-cellulare-touch-screen.jpg",
    "price": productPrice
};
console.log(product);

fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(product)
})
.then((response) => response.json())
.then(data => {
   
    productsCatalog.push(data);
    console.log(productsCatalog);
    createCards ();
});

}


function createCards () {
    let pageTitle = document.getElementById('title').innerText;
    console.log('Ti trovi nella pagina: ' + pageTitle);
    let catalog = document.getElementById('catalog');
    productsCatalog.forEach(element => {
        let cards = `
        <div class="card col-3 me-3 ms-5 g-3">
    <img src="${element.imageUrl}" class="card-img-top">
     <div class="card-body">
     <h5 class="card-title">${element.name}</h5>
    <p class="card-text">${element.description}</p>
    <p class="card-text">${element.brand}</p>
    <p class="card-text">${element.price} €</p>
     </div>
     <div class="mb-4">
     <a href="#" class="btn btn-outline-warning" onclick="modifyProduct('${element._id}')">Modifica</a>
     <a href="#" class="btn btn-outline-danger" onclick="deleteProduct('${element._id}')" ${pageTitle === 'Homepage' ? 'style = "display:none" ' : 'style = ""'}>Cancella</a>
     <a href="#" class="btn btn-outline-info" onclick="populateDetailsPage ('${element._id}')" ${pageTitle !== 'Back-office Page' ? 'style = "" ' : 'style = "display:none"'}> Scopri di più </a>
     </div>
   </div>
        `
        catalog.innerHTML += cards;
    });
}

function getData () {


fetch(url, {
    method: "GET",
    headers: headers
})
.then((response) => response.json())
.then(data => {
    productsCatalog = data;
    console.log(productsCatalog);
    createCards ();
});

}


function modifyProduct (id) {
console.log('sto modificando il prodotto');
window.open('./modifyProduct.html', '_blank');
const index = productsCatalog.findIndex((product) => product._id === id);

    if ( index !== -1 ) {
       console.log('prodotto individuato');
        localStorage.setItem("Product", JSON.stringify(productsCatalog[index]));

}
}


function deleteProduct (id) {
console.log('sto cancellando il prodotto');
fetch(url + id, {
    method: "DELETE",
    headers: headers
})
.then((response) => response.json())
.then(data => {
    console.log(productsCatalog);
    
    getData();
});

}

function deleteProduct2 () {
 
    let stringifiedId = localStorage.getItem("Product");
    let parseId = JSON.parse(stringifiedId);  
    let id = parseId._id; 

    console.log('sto cancellando il prodotto');
    fetch(url + id, {
        method: "DELETE",
        headers: headers
    })
    .then((response) => response.json())
    .then(data => {
        console.log(productsCatalog);
       reset();
    });
    
    }


function populateDetailsPage (id) {
    window.open('./details.html', '_blank');
    const index = productsCatalog.findIndex((product) => product._id === id);

    if ( index !== -1 ) {
       console.log('prodotto individuato');
        localStorage.setItem("Product", JSON.stringify(productsCatalog[index]));
    }
}


function onloadCardDetails () {
let productName = document.getElementById('productName');
let productDescription = document.getElementById('productDescription');
let productBrand = document.getElementById('productBrand');
let productPrice = document.getElementById('productPrice');
let imageProduct = document.getElementById('containerImage');
let stringifiedProduct = localStorage.getItem("Product");
let parseProduct =  JSON.parse(stringifiedProduct);
let idProduct = document.getElementById('productId');


productName.value = parseProduct.name; 
productDescription.value = parseProduct.description;
productBrand.value = parseProduct.brand; 
productPrice.value = parseProduct.price;
imageProduct.src = parseProduct.imageUrl; 
idProduct.value = parseProduct._id; 

}

function reset () {
let productName = document.getElementById('productName');
let productDescription = document.getElementById('productDescription');
let productBrand = document.getElementById('productBrand');
let productPrice = document.getElementById('productPrice');
let imageProduct = document.getElementById('UrlImg');
let idProduct = document.getElementById('productId');


    productName.value = ''; 
    productDescription.value = '';
    productBrand.value = '';
    productPrice.value = ''; 
    imageProduct.value = ''; 
    idProduct.value = '';

}


function EditObject () {
    let productName = document.getElementById('productName').value;
    let productDescription = document.getElementById('productDescription').value;
    let productBrand = document.getElementById('productBrand').value;
    let productPrice = document.getElementById('productPrice').value;
    let productId = document.getElementById('productId').value; 
    
    if (productName === '' || productDescription === '' || productBrand === '' || productPrice === ''){
    alert('Attenzione! Devi compilare tutti i campi');
    return false; 
    }
    
    let product = {
        "name": productName,
        "description": productDescription,
        "brand": productBrand,
        "imageUrl": "https://us.123rf.com/450wm/artshotphoto/artshotphoto2201/artshotphoto220100030/180434190-smartphone-generico-o-cellulare-touch-screen.jpg",
        "price": productPrice
    };
    console.log(product);
    
    fetch(url + productId, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(product)
    })
    .then((response) => response.json())
    .then(data => {
       
        productsCatalog.push(data);
        console.log(productsCatalog);

    });
    
    }