// validation du formulaire 
let inputFirstName = document.getElementById('firstName');
let inputLastName = document.getElementById('lastName');
let inputAddress = document.getElementById('address');
let inputCity = document.getElementById('city');
let inputZip = document.getElementById('zip');
let inputEmail = document.getElementById('email');

function validFirstName() {

    let errorFirstName = document.getElementById('firstNameError');

    inputFirstName.addEventListener('keyup', () => {

        if (inputFirstName == /^[A-Za-z\s]+$/ || inputFirstName == "") {
            return true;
       }

       else {
        inputFirstName.style.borderColor = "red";
        errorFirstName.innerHTML = "Veuillez entrer votre prénom";
       }
    })    
}

function validLastName() {

    let errorLastName = document.getElementById('lastNameError');

    inputLastName.addEventListener('keyup', () => {

        if (inputLastName == /^[A-Za-z\s]+$/ || inputLastName == "") {
            return true;
        }

       else {
        inputLastName.style.borderColor = "red";
        errorLastName.innerHTML = "Veuillez entrer votre nom de famille";
       }
    })    
}


function validAddress() {
    
    let errorAdress = document.getElementById('addressError');

    inputAddress.addEventListener('keyup', () => {

        if (inputAddress == /^[0-9a-zA-Z]+$/ || inputAddress == "") {
            return true;
        }
        else {
            inputAddress.style.borderColor = "red";
            errorAdress.innerHTML = "Veuillez entrer votre adresse";
           }
    })   
    
}

function validCity() {

    let errorCity = document.getElementById('cityError');

    inputCity.addEventListener('keyup', () => {

        if (inputCity == /^[A-Za-z\s]+$/ || inputCity == "") {
            return true;
       }

       else {
        inputCity.style.borderColor = "red";
        errorCity.innerHTML = "Veuillez entrer votre ville";
       }
    })    
}

function validZip() {

    let errorZip = document.getElementById('zipError');

    inputZip.addEventListener('keyup', () => {

        if (inputZip == /^[0-9]+$/ || inputZip == "") {
            return true;
       }

       else {
        inputZip.style.borderColor = "red";
        errorZip.innerHTML = "Veuillez entrer votre code postal";
       }
    }) 
}

function validEmail() {

    let errorEmail = document.getElementById('emailError');

    inputEmail.addEventListener('keyup', () => {

        if (inputEmail == /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ || inputEmail == "") {
            return true;
        }

       else {
          inputEmail.style.borderColor = "red";
          errorEmail.innerHTML = "Veuillez entrer votre adresse e-mail";
        }
    }) 
}

function validation() {

    let boutonvalidation = document.querySelector('.btn-validation');

    let firstName = validFirstName();
    let lastName = validLastName();
    let address = validAddress();
    let city = validCity();
    let zip = validZip();
    let email = validEmail();
    

    boutonvalidation.addEventListener('click', function (e) {

        e.preventDefault();

        if (firstName && lastName && address && city && zip && email  == true) {
            sendOrder();
        }

        else {
            alert("Veuillez saisir des champs valides");    
            return false;
        }
    })
}

validation();


// // envoie de la commande
function sendOrder() {

    let products = productsLS.map(product => product.id);

    let order = {
        contact: {
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            address: inputAddress.value,
            city: inputCity.value,
            zip: inputZip.value,
            mail: inputEmail.value,
        },
        idProduct: products,
    }

    let urlOrder = URL_API + '/' + 'order';

    fetch(urlOrder, {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
    .then(async function (reponseOrder) {
        order = await reponseOrder;
        localStorage.setItem(orderId);
        document.location.href = "confirmation.html?orderId=" + order.orderId;
        localStorage.clear();
    })
}