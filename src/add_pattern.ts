import './style.css'

import { invoke } from '@tauri-apps/api'


// on form submit'
const read_patterns = document.querySelector<HTMLFormElement>('#read_patterns')!
// const app = document.querySelector<HTMLButtonElement>('#asd')!

// // app.innerHTML = `
// // 	<button class="w3-button w3-gray" onclick="asd()" id="asd">
// // 	asd
// // 	</button>
// // `
// app.addEventListener('click', () => {
// 	window.location.href = window.location.origin;
// })

read_patterns.addEventListener('submit', (e) => {
	e.preventDefault()
	// get the form data
	// there are many ways to get this data using jQuery (you can use the class or id also)
	let x: any= e; 
	const formData = new FormData(x.target)
	const form_data = {
		id: 0,
		pattern: formData.get('pattern'),
		replacement: formData.get('replacement')
	}
	console.log(formData)
	// const form_data = {id:0,pattern:"asd",replacement:"asd"}
	invoke('add_pattern', {asd:form_data}).then(() => {
		window.location.href = window.location.origin;
	});
})

// invoke('get_all_pattern').then(response => {
// 	console.log(response)
// 	for (let i = 0; i < response.length; i++) {
// 	  my_body.innerHTML += `
// 		<tr>
// 		  <td>${response[i].id}</td>
// 		  <td>${response[i].pattern}</td>
// 		  <td>${response[i].replacement}</td>
// 		</tr>
// 	  `;
// 	  console.log(response[i]);
// 	}
//   })