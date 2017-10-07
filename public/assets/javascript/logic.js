document.addEventListener("DOMContentLoaded", function() {
    // Initialize Firebase
    // var config = {
    //     apiKey: "AIzaSyD73WBIlPYp8IZgQlogpWLbVe-O1PSLLL8",
    //     authDomain: "quiz-app-64dbc.firebaseapp.com",
    //     databaseURL: "https://quiz-app-64dbc.firebaseio.com",
    //     projectId: "quiz-app-64dbc",
    //     storageBucket: "quiz-app-64dbc.appspot.com",
    //     messagingSenderId: "1002575042876"
    // };
    // firebase.initializeApp(config);

    // Get elements
    const txtEmail = document.getElementById("txtEmail");
    const txtPassword = document.getElementById("txtPassword");
    const btnLogin = document.getElementById("btnLogin");
    const btnSignUp = document.getElementById("btnSignUp");
    const btnLogout = document.getElementById("btnLogout");
    const authMessage = document.getElementById("authMessage");
    const accountButton = document.getElementById("account-button");

    // Add login event
    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();
        // Sign In
        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(e => authMessage.innerHTML = '<p>' + e.message + '</p>');
        if (!e) {
            btnLogout.classList.remove('hide');
            accountButton.classList.remove('hide');
            btnLogin.classList.add('hide');
            btnSignUp.classList.add('hide');
            authMessage.innerHTML = '<p>Success! You are now logged in.</p>';
        }
    });

    // Add sign up event
    btnSignUp.addEventListener("click", e => {
        // TODO: check for real email
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();
        // Sign In
        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise.catch(e => authMessage.innerHTML = '<p>' + e.message + '</p>');
        if (!e) {
            btnLogout.classList.remove('hide');
            accountButton.classList.remove('hide');
            btnLogin.classList.add('hide');
            btnSignUp.classList.add('hide');
            authMessage.innerHTML = '<p>Welcome! You are now logged in.</p>';
        }
    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
        btnLogout.classList.add('hide');
        accountButton.classList.add('hide');
        btnLogin.classList.remove('hide');
        btnSignUp.classList.remove('hide');
        authMessage.innerHTML = '<p>Logout successful.</p>';
    });

    // Add realtime authentication listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
            authMessage.innerHTML = '<p>You are logged in as ' + firebaseUser.email + '.</p>';
            btnLogout.classList.remove('hide');
            accountButton.classList.remove('hide');
            btnLogin.classList.add('hide');
            btnSignUp.classList.add('hide');
        } else if (!firebaseUser) {
            authMessage.innerHTML = '<p>You are not logged in. Please login or create an account.</p>';
        }
    });
}());