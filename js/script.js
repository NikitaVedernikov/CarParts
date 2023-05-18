'use strict'
$(function() {
    let header = $('header');
    let hederHeight = header.height();
  
    $(window).scroll(function() {
        if($(this).scrollTop() > 1) {
            header.addClass('header-fix');
            $('body').css({
               'paddingTop': hederHeight+'px',
            });
        } 
        else 
        {
            header.removeClass('header-fix');
            $('body').css({
                'paddingTop': 0,
            })
       }
     });

    function getForm(){
        for (let i of categorys_menu_li){
            if ($(i.children[1]).hasClass('categorys-choice-active')) {
                $(i.children[1]).removeClass('categorys-choice-active')
            }
        }
     	document.querySelector('.entry-menu').style.display = 'block'
     	document.querySelector('#root').style.background = 'rgba(20, 20, 20, 0.9)'
     	document.querySelector('#root').style.transition = '.8s'
    }

    function getOutForms(event){
        if ($('.entry-menu').css('display') == 'block') {
            $('.entry-menu').css('display', 'none')
            $('#root').css('background', 'none')
            $('#root').css('transition', '.2s')
            return
        }
        for (let i of categorys_menu_li) {
            if (event.target == i.children[0] || event.target == i.children[1]) {
                return
            }
            if ($(i.children[1]).hasClass('categorys-choice-active')) {
                $(i.children[1]).removeClass('categorys-choice-active')
            }
        }
    }


    let profile_button = $('#logo3')
    let mainmenu = $('.mainmenu')
    profile_button.click(getForm)
    mainmenu.click(function(event) {getOutForms(event)})
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
    		getOutForms(event);
    	}
    });

    function getMenu(item){
        if ($('.entry-menu').css('display') == 'block') {
            getOutForms()
            return
        }
        for (let i of categorys_menu_li) {
            if ($(i.children[1]).hasClass('categorys-choice-active') && 
                item != i.children[1]) {
                $(i.children[1]).removeClass('categorys-choice-active')
            }
        }
        $(item).addClass('categorys-choice-active')
    }

    let categorys_menu_li = $('.info-categorys ul li')
    for (let i of categorys_menu_li) {
        i.addEventListener('click', function() {
            getMenu(this.children[1])
            
        })
    }

    function setCoockie(login){
        localStorage.setItem('login', login)
    }

    function removeCoockie(login){
        if (localStorage.key(login)){
            localStorage.removeItem(login)
        }
    }

    function loginUser(login){
        $('#login-image img').css('display', 'none')
        $('#login-image').prepend($('<p>', {
            'text': `${login}`,
            'id': 'profileName'
        }))
        $('#login-image').addClass('logged')
    }

    function submitLogin(event){
        event.preventDefault()
        let login = $('#loginE')
        let password = $('#passwordE')
        fetch('/login-user', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                "login" : login.val(),
                "password" : password.val(),
            })
        })
        .then(res => res.text())
        .then(res => {
            if(res == 'ok'){
                loginUser(login.val())
                setCoockie(login.val())
                getOutForms()
            }
        })
    }

    function checkLogin(event){
        let login = $('#loginR')
        fetch('/login-check', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/x-www-form-urlencoded'
            },
            body: login.val()
        })
        .then(res => res.text())
        .then(res => {
            if(res == 'not'){
                $('#loginR').css('border-color', 'white')
                check1 = true
            }
            else {
                $('#loginR').css('border-color', 'red')
                check1 = false
            }
        })
    }

    function getTrue(){
        return true
    }

    function checkEmail(event){
        let email = $('#emailR')
        let result = false
        fetch('/email-check', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/x-www-form-urlencoded'
            },
            body: email.val()
        })
        .then(res => res.text())
        .then(res => {
            if(res == 'not'){
                $('#emailR').css('border-color', 'white')
                check2 = true
            }
            else {
                $('#emailR').css('border-color', 'red')
                check3 = false
            }
        })
    }

    function checkPasswords(event){
        if ($('#passwordCheckR').val() == $('#passwordR').val()) {
            $('#passwordR').css('border-color', 'white')
            $('#passwordCheckR').css('border-color', 'white')
            check3 = true
        }
        else {
            $('#passwordR').css('border-color', 'red')
            $('#passwordCheckR').css('border-color', 'red')
            check3 = false
        }
    }

    function submitReg(event){
        event.preventDefault()
        let login = $('#loginR')
        let email = $('#emailR')
        let pass = $('#passwordR')
        let passCheck = $('#passwordCheckR')
        if (check1 & check2 & check3) {
            fetch('/reg-user', {
                        method: 'POST',
                        headers: {
                            'Content-type' : 'application/x-www-form-urlencoded'
                        },
                        body: JSON.stringify({
                            "login": login.val(),
                            "email": email.val(),
                            "password": pass.val(),
                        })
                    })
            loginUser(login.val())
            setCoockie(login.val())
            getOutForms()
        }
    }

    let headerRight = $('.header-right')
    let loginButton = $('#submitE')
    loginButton.click(function(event) {submitLogin(event)})

    if (localStorage.getItem(localStorage.key('login'))){
        loginUser(localStorage.getItem(localStorage.key('login')))
    }

    function getRegForm(event){
        $('#loginForm').css('display', 'none')
        $('#registrationForm').css('display', 'block')
        $('.entry-menu').css('height', '565px')
        $('.entry-menu').css('transition', '.4s')
        $('#regTitle').css('display', 'none')
        $('#logTitle').css('display', 'block')
        $('#submitE').css('display', 'none')
        $('#submitR').css('display', 'block')
    }

    function getLogForm(event){
        $('#loginForm').css('display', 'block')
        $('#registrationForm').css('display', 'none')
        $('.entry-menu').css('height', '410px')
        $('.entry-menu').css('transition', '.4s')
        $('#regTitle').css('display', 'block')
        $('#logTitle').css('display', 'none')
        $('#submitE').css('display', 'block')
        $('#submitR').css('display', 'none')
    }

    let regTitle = $('#regTitle')
    regTitle.click(function(event) {getRegForm(event)})

    let logTitle = $('#logTitle')
    logTitle.click(function(event) {getLogForm(event)})

    let check1
    let loginR = $('#loginR')
    loginR.change(function(event) {checkLogin(event)})

    let check2
    let emailR = $('#emailR')
    emailR.change(function(event) {checkEmail(event)})

    let check3
    let passCheck = $('#passwordCheckR')
    passCheck.change(function(event) {checkPasswords(event)})

    let submitR = $('#submitR')
    submitR.click(function(event) {submitReg(event)})

    let profileName = $('#profileName')
    profileName.click(function() {
    })

    function exit(event){
        console.log('VEEHOD!!')
        console.log($('#login-image p').text())
        removeCoockie('login')
        $('#login-image img').css('display', 'inline-block')
        $('#login-image p').remove()
        $('#login-image').removeClass('logged')
    }

    let exitButton = $('#exit')
    exitButton.click(function(event) {exit(event)})
});