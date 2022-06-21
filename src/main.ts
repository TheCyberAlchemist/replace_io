import './style.css'
import './fas.css'
import { invoke } from '@tauri-apps/api'
import { emit } from '@tauri-apps/api/event'

// const app = document.querySelector<HTMLDivElement>('#app')!

// app.innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="./add_pattern" target="_blank">Documentation</a>
//   <select id="route">
//       <option value="add_pattern.html">add_pattern.html</option>
//       <option value="nested/index.html">nested/index.html</option>
//       <option value="nested/secondary.html">nested/secondary.html</option>
//     </select>
//     <button id="open-window">New window</button>
//     <button id="go">Go</button>
// `
// const add_pattern = document.querySelector<HTMLButtonElement>('#add_pattern')!
// const route = document.querySelector<HTMLSelectElement>('#route')!

// add_pattern.addEventListener('click', () => {
//   if (route.value != null){
//     window.location.href = window.location.origin + '/' + "add_pattern.html";
//   }
// })


// invoke('start_pattern_matching').then((response) => console.log(response));

invoke('get_all_pattern').then(response=> add_tr(response));

function add_tr(response:any){
  // console.log(response)
  let a: any = response;
  const my_body = document.querySelector<HTMLTableSectionElement>('#my_body')!
  my_body.innerHTML = "";
  for (let i = 0; i < a.length; i++) {
    my_body.innerHTML += `
      <tr>
        <td>${a[i].id}</td>
        <td>${a[i].pattern}</td>
        <td>${a[i].replacement}</td>
        <td><button class="delete_buttons" data-id="${a[i].id}">
          <i class="fas fa-trash-alt"></i>
        </button></td>
      </tr>
    `;
    // console.log(a[i]);
  }
  const delete_buttons = document.querySelectorAll<any>('.delete_buttons')!
  for (let i = 0; i < delete_buttons.length; i++) {

    delete_buttons[i].addEventListener('click', (e:any) => {
        const id = e.target.dataset.id;
      invoke('delete_pattern', {deleteId: parseInt(id)})
        .then(() => invoke('get_all_pattern').then(response=> add_tr(response)))
    })
  }
}
// function delete_pattern(id: any){
  
//     console.log("delete_buttons")
//     invoke('delete_pattern', {deleteId: parseInt(id)})
//       .then((response) => console.log(response))
// }

const sendButton = document.querySelector('#asd')
if (sendButton) {
  sendButton.addEventListener('click', asd)
  function asd(){
    invoke('my_custom_command')
      // `invoke` returns a Promise
      .then((response) => console.log(response))
    emit('click', {
      theMessage: 'click here'
    })
    console.log("asd")
  }
}
