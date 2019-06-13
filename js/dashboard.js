/*
  Name:         Ised Gongora
  Course Name:  ICT-4510-1 Adv Website Design & Mgmt
  Date:         06-10-2019
  Description:  - Administrative Dashboard page:
                 - Login Form and process
                 - The form must contain the following fields username and password
                 - Make Ajax POST request containing username and password to "https://ict4510.herokuapp.com/api/login" endpoint.
                 - A successful 200 HTTP response will contain a user object.  The user object contains your username, first_name, last_name, api_key, and session token.
                 - Save the user object to sessionStorage and hide the Login form 
                - Logout process
                 - Delete user object from sessionStorage and render the login form
*/
'use strict';

function api_url() {
    return 'https://ict4510.herokuapp.com/';
}

var api_key = function() {
    return 'bcb3dfa19bc89fde4d7fb98eda7a814b';
}

function validUser() {

    var url = api_url() + 'api/login';

    var user = {
        username: document.querySelector('[name="username"]').value,
        password: document.querySelector('[name="password"]').value
    };

    var message = document.getElementById('message');
    //Make Ajax POST request containing username and password to 
    //"https://ict4510.herokuapp.com/api/login" endpoint.
    var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    });

    fetch(request)
        .then(function(response) {
            if (response.status === 200) {

                // clear input values and error authentication message
                document.querySelector('[name="username"]').value = '',
                    document.querySelector('[name="password"]').value = ''
                message.innerHTML = '';

                //hide the form after a successful login
                hideLoginForm();
                addedItem();
                showAdminDashboard();

                return response.json();
            } else {
                //fail message
                message.innerHTML = '<div class="alert alert-danger">Invalid User Login</div>';
            }
        })
        .then(function(json) {
            //Save the user object to sessionStorage and hide the Login form
            window.sessionStorage.removeItem('user');
            window.sessionStorage.setItem('user', JSON.stringify(json));
        });

    return false;
};

function saveItem() {
    // Save manu item
    var obj = JSON.parse(window.sessionStorage.getItem('user'));
    var token = obj.user.token;
    var url = api_url() + 'api/menus?api_key=' + api_key;

    //Menu items object
    var menuItem = {
        item: document.querySelector('[name="menuItem"]').value,
        description: document.querySelector('[name="menuDescription"]').value,
        price: document.querySelector('[name="menuPrice"]').value
    };

    var request = new Request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(menuItem),
        mode: 'cors'
    });

    fetch(request)
        .then(function(response) {

            if (response.status === 201) {

                // clear form fields
                document.querySelector('[name="menuItem"]').value = '',
                    document.querySelector('[name="menuDescription"]').value = '',
                    document.querySelector('[name="menuPrice"]').value = ''
                var itemType = menuItem.item;
                document.querySelector('#message').innerHTML = 'Menu Item  ' + itemType + ' Saved!';

                addedItem();

                setTimeout(function() {
                    message.innerHTML = '';
                }, 7000);

            } else if (response.status === 400) {

                response.json().then(function(response) {

                    var errors = '<ul>';

                    for (let i = 0; i < response.errors.length; i++) {
                        errors += '<li>' + response.errors[i].message + '</li>';
                    }
                    errors += '</ul>';
                    message.innerHTML = '<div class="alert alert-danger">' + errors + '</div>';
                    setTimeout(function() {
                        message.innerHTML = '';
                    }, 7000);
                });
            } else {
                message.innerHTML = '<div class="alert alert-danger">Menu Item NOT Saved</div>';
                setTimeout(function() {
                    message.innerHTML = '';
                }, 7000);
            }
        });
};

function addedItem() {
    var url = api_url() + 'api/menus?api_key=' + api_key;
    fetch(url)
        .then(function(response) {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(function(json) {
            display_menu_items(json.menu);
        });
};
//<!--Display the menu items as a table -->
function display_menu_items(menu) {
    if (menu.length === 0) {
        message.innerHTML = '<div class="alert alert-info">No menu items found</div>';
        return false;
    }
    var html = '<thead>';
    html += '<tr>';
    html += '<th>Item</th>';
    html += '<th>Description</th>';
    html += '<th>Price</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';

    for (var i = 0; i < menu.length; i++) {
        html += '<tr>';
        html += '<td>' + menu[i].item + '</td>';
        html += '<td>' + menu[i].description + '</td>';
        html += '<td>' + menu[i].price + '</td>';
        html += '</tr>';
    }

    html += '</tbody>';

    var menu_items = document.getElementById('menu-list');
    menu_items.innerHTML = html;
};

function logout() {
    //Delete user object from sessionStorage and render the login form
    window.sessionStorage.removeItem('user');
    dashboardHidden();
    loginShow();
    return false;
};

function hideLoginForm() {
    var login = document.querySelector('[name="loginDashboard"]');
    login.style.display = 'none';
};

function loginShow() {
    var login = document.querySelector('[name="loginDashboard"]');
    login.style.display = 'block';
};

function dashboardHidden() {
    // hide dashboard items
    var dashboard = document.getElementsByClassName('dashboard');

    for (var i = 0; i < dashboard.length; i++) {
        dashboard[i].style.display = 'none';
    }
};

function showAdminDashboard() {
    // show admin dashboard items
    var dashboard = document.getElementsByClassName('dashboard');

    for (var i = 0; i < dashboard.length; i++) {
        dashboard[i].style.display = 'block';
    }
};

(function() {
    dashboardHidden();
}());