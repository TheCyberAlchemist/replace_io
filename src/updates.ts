
///// updater //////

import { checkUpdate, installUpdate } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'

const check_update_button = document.querySelector<HTMLButtonElement>('#check_updates')!;
if (check_update_button){
	check_update_button.addEventListener('click', async () => {
	try {
	  const { shouldUpdate, manifest } = await checkUpdate()
	  console.log(manifest, shouldUpdate);
	  if (shouldUpdate) {
		// console.log('Update available for', manifest);
		let text = "We have a new update for you!\nClick OK to Install it.";
		let a = await confirm(text);
		console.log(a)
		if (a == true) {
			console.log("Update installed");
			// // display dialog
			await installUpdate()
			// // install complete, restart app
			await relaunch()
		} else {
			alert("Cancelled Update");
		}
	}else{
		alert("No update available");
		// console.log('');
	  }
	} catch (error) {
	  console.log(error)
	}
  }
  )
}
