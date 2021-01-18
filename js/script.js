// Constantes.
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

// Entrada.
const products = [
    {
        description: "Goma de borrar",
        price: 0.25,
        tax: LOWER_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Lápiz H2",
        price: 0.4,
        tax: LOWER_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Cinta rotular",
        price: 9.3,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Papelera plástico",
        price: 2.75,
        tax: REGULAR_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Escuadra",
        price: 8.4,
        tax: REGULAR_TYPE,
        stock: 3,
        units: 0,
    },
    {
        description: "Pizarra blanca",
        price: 5.95,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Afilador",
        price: 1.2,
        tax: LOWER_TYPE,
        stock: 10,
        units: 0,
    },
    {
        description: "Libro ABC",
        price: 19,
        tax: EXEMPT_TYPE,
        stock: 2,
        units: 0,
    },
];

let subtotal = 0;
let iva = 0;
let total = 0;
let numberProduct = 1;
let buttonDisable = true;

//---------- Create product list in HTML ----------

var createNumberProduct = () => {
    const numbersProducts = document.createElement('span');
    numbersProducts.innerHTML = `${numberProduct}.`;

    document.getElementById('productList').appendChild(numbersProducts);

    numberProduct++
}

var createLabelProduct = (product) => {
    const labelProduct = document.createElement('label');
    labelProduct.innerHTML = `${product.description} - ${product.price}€/ud.`;

    document.getElementById('productList').appendChild(labelProduct);
}

var createInputUnits = (product) => {
    const inputUnits = document.createElement('input');
    inputUnits.setAttribute('class', 'product-unit');   
    inputUnits.setAttribute('type', 'number');
    inputUnits.setAttribute('min', 0);
    inputUnits.setAttribute('max', product.stock);
    inputUnits.setAttribute('value', product.units);
    inputUnits.addEventListener("change", event => product.units = event.target.value);
    inputUnits.addEventListener("change", buttonCalculateDisable);

    document.getElementById('productList').appendChild(inputUnits);
}

//---------- EXTRA: Enable or disable button ----------

var buttonCalculateDisable = (buttonDisable) => {
    for (var product of products) {
        buttonDisable = buttonDisable && product.units == 0;
    }

    if (buttonDisable) {
        document.getElementById("calculate").disabled = true;
        return;
    } else {
        document.getElementById("calculate").disabled = false;
        return;
    }
}

//---------- Calculate subtotal, iva and purchase total ----------

var calculateTotal = () => {
    for (var product of products) {
        subtotal += (product.price * product.units);
        iva += ((product.price * product.units) * product.tax / 100);
    }

    total = subtotal + iva;

    document.getElementById('subtotal').value = `${subtotal.toFixed(2)}€`;
    document.getElementById('iva').value = `${iva.toFixed(2)}€`;
    document.getElementById('total').value = `${total.toFixed(2)}€`;
}

var resetValues = () => {
    subtotal = 0;
    iva = 0;
    total = 0;
}

//---------- Algorithm ----------

var calculateShoppingCart = () => {
    calculateTotal();
    resetValues();
}

for (var product of products) {
    createNumberProduct();
    createLabelProduct(product);
    createInputUnits(product);
}

document.getElementById("calculate").disabled = true;
document.getElementById('calculate').addEventListener('click', calculateShoppingCart);