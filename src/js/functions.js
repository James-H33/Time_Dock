require('../sass/main.sass');
require('./jquery-3.1.0.min.js');

"use strict";

document.addEventListener('DOMContentLoaded', function(){


    const FindUsers = {
        init: function() {
            this.cacheDOM();
            this.bindEvents();
        },
        cacheDOM: function() {
            this.$findUsersBtn = document.querySelector('#find-users-btn');
            this.$usersFormDisplay = document.querySelector('.users-form-display');
            this.$usersFormInput = document.querySelector('.users-form-wrapper input');
            this.$renderUsers = document.querySelector('.render-users');
        },
        bindEvents: function() {
            this.$findUsersBtn.addEventListener('click', this.getRequests.bind(this));
        },
        render: function(data) {
            console.log('Render Method Called');
            var template = `<h1 class="user">${data.username}</h1>
                            <h1 class="user-email"> ${data.email}</h1> `;
            this.$renderUsers.innerHTML = template;
        },
        getRequests: function(event) {
            event.stopPropagation();
            event.preventDefault();

            var iVal = this.$usersFormInput.value;
            if (iVal.trim().length === 0) {
                return alert('Please enter a username');
            }
            getRequestData(iVal.trim());
            iVal = '';
        }
    }

    FindUsers.init();



    const AddUsers = {
        init: function(){
            this.cacheDOM();
            this.bindEvents();
        },
        cacheDOM: function() {
            this.$addUserDisplay = document.querySelector('.add-user-display');
            this.$addUserInputs = document.querySelectorAll('.add-user-display input');
            this.$addUserBtn = document.querySelector('#add-user-btn');
            this.$renderUser = document.querySelector('.render-add-user');
        },
        bindEvents: function() {
            this.$addUserBtn.addEventListener('click', this.postRequest.bind(this));
        },
        render: function(message) {
            var template = `<h1>${message}</h1>`;
            this.$renderUser.innerHTML = template;
        },
        postRequest: function(event) {
            event.stopPropagation();
            event.preventDefault();

            var newUser = new Object();
            var iVal = this.$addUserInputs;
            for(var i = 0; i < iVal.length; i++) {
                if(iVal[i].name === 'username') {
                    newUser.username = iVal[i].value.trim();
                    iVal[i].value = '';
                }
                if(iVal[i].name === 'email') {
                    newUser.email = iVal[i].value.trim();
                    iVal[i].value = '';
                }
                if(iVal[i].name === 'password') {
                    newUser.password = iVal[i].value.trim();
                    iVal[i].value = '';
                }
            }

            postRequestData(newUser);

        }
    }

    AddUsers.init();


    /***************************************************************************
                                Helper Functions
    ***************************************************************************/

    function getRequestData(username) {
        var http = new XMLHttpRequest();
        var method = 'GET';
        var url = '/userdata/search?username=' + username;

        http.open(method, url);
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        http.send();
        http.onreadystatechange = function() {
            if(http.readyState === XMLHttpRequest.DONE && http.status === 200) {
                var data = JSON.parse(http.responseText);
                if(data.error) {
                    console.log(data.error);
                    return alert(data.error);
                }
                FindUsers.render(data);
                return console.log('Success');
            } else if (http.readyState === XMLHttpRequest.DONE) {
                return alert('Something went wrong!');
            }
        }
    }

    function postRequestData(newUser) {
        var http = new XMLHttpRequest();
        var method = 'POST';
        var url = '/userdata';

        http.open(method, url);
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        http.send(JSON.stringify(newUser));
        http.onreadystatechange = function() {
            if(http.readyState === XMLHttpRequest.DONE && http.status === 200) {
                var data = JSON.parse(http.responseText);
                if(data.error) {
                    console.log('Not successful');
                    return AddUsers.render(data.error);
                } else {
                    console.log('Success');
                    AddUsers.render('User Saved!');
                }

            } else if(http.readyState === XMLHttpRequest.DONE) {
                return alert('Amigo, you have made mistake somewhere');
            }
        }
    }

});
