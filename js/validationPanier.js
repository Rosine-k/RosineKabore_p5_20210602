// Ajout des Regex
let form = document.querySelector(".formulaire");

//Création des expressions régulières
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let nameRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
let numberRegExp = new RegExp("^[0-9]{5,5}$");

function validFirstName() {
    let isvalid = true;
    let inputFirstName = document.getElementById('firstName');

    let firstNameErrorMsg = document.getElementById('firstNameError');
 
    if (inputFirstName.value === "") {
        firstNameErrorMsg.innerHTML = 'Champ invalide, veuillez saisir votre prénom.';
        isvalid = false;
    }
    else if (nameRegExp.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = '';
    } else {
        firstNameErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre prénom.';
        isvalid = false;
    }
    return isvalid;

}

function validLastName() {
    let isvalid = true;
    let inputLastName = document.getElementById('lastName');

    let lastNameErrorMsg = document.getElementById('lastNameError');

    if (inputLastName.value === "") {
        lastNameErrorMsg.innerHTML = 'Champ invalide, veuillez saisir votre nom.';
        isvalid = false;
    }
    else if (nameRegExp.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = '';
    } else {
        lastNameErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre nom.';
        isvalid = false;
    }
    return isvalid;
}

function validAddress() {
    let isvalid = true;
    let inputAddress = document.getElementById('address');

    let addressErrorMsg = document.getElementById('addressError');

    if (inputAddress.value === "") {
        addressErrorMsg.innerHTML = 'Champ invalide, veuillez saisir votre adresse.';
        isvalid = false;
    }
    else if (addressRegExp.test(address.value)) {
        addressErrorMsg.innerHTML = '';
    } else {
        addressErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre adresse.';
        isvalid = false;
    }
    return isvalid;
}


function validCity() {
    let isvalid = true;
    let inputCity = document.getElementById('city');

    let cityErrorMsg = document.getElementById('cityError');

    if (inputCity.value === "") {
        cityErrorMsg.innerHTML = 'Champ invalide, veuillez saisir votre ville.';
        isvalid = false;
    }
    else if (nameRegExp.test(city.value)) {
        cityErrorMsg.innerHTML = '';
    } else {
        cityErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre ville.';
        isvalid = false;
    }
    return isvalid;
}

function validZip() {
    let isvalid = true;
    let inputZip = document.getElementById('zip');

    let zipErrorMsg = document.getElementById('zipError');

    if (inputZip.value === "") {
        zipErrorMsg.innerHTML = 'Champ invalide, veuillez saisir votre code postal.';
        isvalid = false;
    }
    else if (zipRegExp.test(zip.value)) {
        zipErrorMsg.innerHTML = '';
    } else {
        zipErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre code postal.';
        isvalid = false;
    }
    return isvalid;
}


function validEmail() {
    let isvalid = true;
    let inputEmail = document.getElementById('email');

    let emailErrorMsg = document.getElementById('emailError');

    if (inputEmail.value === "") {
        emailErrorMsg.innerHTML = 'Champ invalide, veuillez saisir votre adresse email.';
        isvalid = false;
    }
    else if (emailRegExp.test(email.value)) {
        emailErrorMsg.innerHTML = '';
    } else {
        emailErrorMsg.innerHTML = 'Champ invalide, veuillez vérifier votre adresse email.';
        isvalid = false;
    }
    return isvalid;
}


//Envoi des informations client au localstorage
function sendForm() {

    let inputFirstName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAddress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputZip = document.getElementById('zip');
    let inputEmail = document.getElementById('email');
    
    let productsLS = JSON.parse(localStorage.getItem("produit"));

    if (!validLastName() || !validFirstName() || !validAddress() || !validCity() || !validZip() || !validEmail) {
        alert("Vérifiez vos coordonnées pour passer la commande !");
    } else {
        alert('test');
        console.log('fonctionne');
        productID = [];

        for (let i = 0; i < productsLS.length; i++) {
            productID.push(productsLS[i].id);
        }

        let order = {
        contact : {
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            address: inputAddress.value,
            city: inputCity.value,
            zip: inputZip.value,
            email: inputEmail.value,
        },
        products : productID
        }

        let urlOrder = URL_API + '/order';

        fetch(urlOrder, {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
            },
        })
        .then((response) => response.json())
        .then(async function (resultOrder) {
            order = await resultOrder;
            document.location.href = "confirmation.html?orderId=" + order.orderId;
            localStorage.clear();
        })
    }
}