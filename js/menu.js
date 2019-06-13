/*
  Name:         Ised Gongora
  Course Name:  ICT-4510-1 Final Project
  Date:         06-10-2019
  Description:  - Make Ajax GET request to "https://ict4510.herokuapp.com/api/menus?api_key=<your-api-key>" endpoint  
                - A successful response will result in a 200 HTTP response and and a JSON response containing your list of menu items
                - You decide HOW to display the menu items. i.e. ordered list, unordered list, table etc...
*/
'use strict';

function api_url() {
    return 'https://ict4510.herokuapp.com/';
}

//var api_key = get_api_key();

var api_key = function() {
    return 'bcb3dfa19bc89fde4d7fb98eda7a814b';
}

const get_menu_items = function() {

    //Make Ajax GET request to "https://ict4510.herokuapp.com/api/menus?api_key=<your-api-key>" endpoint 
    let url = api_url() + 'api/menus?api_key=' + api_key;
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
//You decide HOW to display the menu items. i.e. ordered list, unordered list, table etc...
const display_menu_items = function(menu) {

    if (menu.length === 0) {
        let message = document.getElementById('message');
        message.innerHTML = '<div class="alert alert-info">No menu items found</div>';
        return false;
    }

    let html = '<body>';
    html += '<h2>Menu Items List</h2>'
    for (let i = 0; i < menu.length; i++) {

        html += '<ul>';
        html += '<li>';
        html += '<ul>';
        html += '<li>  Item: ' + menu[i].item + '</li>'
        html += '<li> Description: ' + menu[i].description + '</li>'
        html += '<li> Price: ' + menu[i].price + '</li>'
        html += '</ul>';
        html += '</li>';
        html += '</ul>';
    }

    html += '</body>';

    let menu_items = document.getElementById('menu-list');
    menu_items.innerHTML = html;
};

get_menu_items();