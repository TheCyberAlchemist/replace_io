import './style.css'
import './fas.css'
import {readDataFile,delete_pattern} from "./read_write"

// import { invoke } from '@tauri-apps/api'
// import { emit } from '@tauri-apps/api/event'

// add_pattern.addEventListener('click', () => {
//   if (route.value != null){
//     window.location.href = window.location.origin + '/' + "add_pattern.html";
//   }
// })


// invoke('start_pattern_matching').then((response) => console.log(response));

// invoke('get_all_pattern').then(response=> add_tr(response));'

async function main(){
  const response = await readDataFile();
  console.log(response);
  add_tr(response);
}
main();
function add_tr(response:Array<object>){
  // console.log(response)
  let a: any = response;
  const my_body = document.querySelector<HTMLTableSectionElement>('#my_body')!
  my_body.innerHTML = "";
  for (let i = 0; i < a.length; i++) {
    my_body.innerHTML += `
      <tr>
        <td class="id_td">${a[i].id}</td>
        <td>${a[i].pattern}</td>
        <td>${a[i].replacement}</td>
        <td class="delete_td"><button class="delete_buttons" data-id="${a[i].id}">
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
      console.log(id);
      delete_pattern(id).then(response => {
        console.log(response);
        add_tr(response);
      })
      // invoke('delete_pattern', {deleteId: parseInt(id)})
      //   .then(() => invoke('get_all_pattern').then(response=> add_tr(response)))
    })
  }
}
// function delete_pattern(id: any){
  
//     console.log("delete_buttons")
//     invoke('delete_pattern', {deleteId: parseInt(id)})
//       .then((response) => console.log(response))
// }
