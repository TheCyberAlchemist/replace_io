let my_patterns:Array<Pattern>;
let DEBUG:boolean = false;

import { readTextFile ,writeFile, BaseDirectory,readDir,createDir} from '@tauri-apps/api/fs';

export class Pattern {
  id: number;
  pattern: string;
  replacement: string;
  constructor(id: number, pattern: string, replacement: string) {
	this.id = id;
	this.pattern = pattern;
	this.replacement = replacement;
  }
}

export const check_or_create_app_folder = async () => {
	try {
		console.log("Here in try");
		await readDir('', { dir: BaseDirectory.App });
	} catch (err) {
		console.log("Here in catch");
		await createDir('', { dir: BaseDirectory.App, recursive: true });
	}
}

const createDataFile = async () => {
	try {
		if (DEBUG){
			await writeFile({
				contents: "[]",
				path: `C:/Users/Dev/OneDrive/Desktop/Somewhere/Tests/text-replacement/src-tauri/data.json`,
			});
		}else{
			await writeFile({
					contents: "[]",
					path: `./data.json`,
				},{
					dir: BaseDirectory.App,
				}
			);
		}
	} catch (e) {
		console.log(e);
	}
};

export const readDataFile = async () => {
	try {
		let data;
		if (DEBUG){
			data = await readTextFile(`C:/Users/Dev/OneDrive/Desktop/Somewhere/Tests/text-replacement/src-tauri/data.json`,);
		}else{
			data = await readTextFile(`./data.json`,{ dir: BaseDirectory.App });
			console.log(data);
		}
		return my_patterns = JSON.parse(data);
	}
	catch (e) {
		console.log(e);
		await check_or_create_app_folder();
		await createDataFile();
	}
}

export function append_file(form_data:Pattern){
	my_patterns.push(form_data);
	try {
		if (DEBUG){
			writeFile(
				{
					contents: JSON.stringify(my_patterns),
					path: `C:/Users/Dev/OneDrive/Desktop/Somewhere/Tests/text-replacement/src-tauri/data.json`,
				}
			);
		}else{
			writeFile(
				{
					contents: JSON.stringify(my_patterns),
					path: `./data.json`,
				},{
					dir: BaseDirectory.App,
				}
			);
		}
		readDataFile();	
	} catch (e) {
		console.log(e);
	}
}

export async function delete_pattern(id:number){
	// my_patterns.splice(id,1);
	my_patterns = my_patterns.filter((x)=> x.id != id)
	console.log(my_patterns);
	try {
		if (DEBUG){
			await writeFile(
				{
					contents: JSON.stringify(my_patterns),
					path: `C:/Users/Dev/OneDrive/Desktop/Somewhere/Tests/text-replacement/src-tauri/data.json`,
				}
			);
		}else{
			await writeFile(
				{
					contents: JSON.stringify(my_patterns),
					path: `./data.json`,
				},{
					dir: BaseDirectory.App,
				}
			);
		}
	} catch (e) {
		console.log(e);
	}
	return readDataFile();
}
// export { append_file, readDataFile};