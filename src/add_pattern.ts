import './style.css'

// import { invoke } from '@tauri-apps/api'
import {append_file,readDataFile,Pattern} from "./read_write";

// on form submit'
const read_patterns = document.querySelector<HTMLFormElement>('#read_patterns')!

// import { appDir } from '@tauri-apps/api/path';
// const appDirPath = await appDir();
// console.log(BaseDirectory.App.toString);
// const createDataFolder = async () => {
// 	try {
// 		await createDir("data", {
// 			dir: BaseDirectory.App,
// 			recursive: true,
// 		});
// 	} catch (e) {
// 		console.error(e);
// 	}
// };
function get_new_id(){
	if (my_patterns.length == 0){
		return 0;
	}
	return my_patterns[my_patterns.length-1].id + 1;
}
let my_patterns:Array<Pattern>;
async function main(){
	my_patterns = await readDataFile();
	console.log(get_new_id())
}
main();
if (read_patterns){
	read_patterns.addEventListener('submit', (e) => {
		e.preventDefault()
		let x: any = e;
		const formData = new FormData(x.target)
		// const form_data = {
		let id = get_new_id();
		let pattern = formData.get('pattern')?.toString()
		let replacement = formData.get('replacement')?.toString()
		// }
		// console.log(form_data);
		append_file(new Pattern(id,pattern||"",replacement||""));
		window.location.href = window.location.origin;
	})
}
// invoke('get_all_pattern').then(response => {
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