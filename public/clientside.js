document.addEventListener('DOMContentLoaded', function () {
	if (document.readyState === 'interactive' || document.readyState === 'complete') {
		const loginForm = document.querySelector('#loginForm');
		console.log(loginForm);
		if (loginForm) {
			loginForm.addEventListener('submit', function (e) {
				console.log(e);
				e.preventDefault();
				submitForm(e, this);
			});
		}
	}
});

async function postData(url = '', data = {}) {
	var myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');

	var raw = JSON.stringify(data);

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		credentials: 'include',
		mode: 'cors',
		redirect: 'follow',
	};

	fetch(url, requestOptions)
		.then((response) => {
			console.log(response);
			//on part du principe qu'on a une réponse positive pour le moment
			window.location.href = 'https://front.santeclick.staging-pharmanity.fr:9090/oauth-client/auth';
		})
		.then((result) => console.log(result))
		.catch((error) => console.log('error', error));
}

function submitForm(event) {
	postData('https://santeclick.staging-pharmanity.fr/login', { username: 'test', password: 'test' });
}
//https://santeclick.staging-pharmanity.fr
