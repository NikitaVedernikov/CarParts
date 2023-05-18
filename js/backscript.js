'use strict'
$(function() {
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
		.then(res => console.log(res))
	}
	let loginButton = $('#submitE')
	loginButton.click(function(event) {submitLogin(event)})
})