use rdev::{Event, EventType,Key,simulate,SimulateError};
use std::{thread,time};
use super::read_write;
// use tauri::api::file;
static mut MY_STR: String = String::new();
trait KeyTraits{
	fn from_c(c: char) -> Result<(rdev::Key,bool), ()>;
}

impl KeyTraits for Key{
	fn from_c(c: char) -> Result<(rdev::Key,bool), ()> {
		match c {
			'a' => Ok((rdev::Key::KeyA,false)),
			'b' => Ok((rdev::Key::KeyB,false)),
			'c' => Ok((rdev::Key::KeyC,false)),
			'd' => Ok((rdev::Key::KeyD,false)),
			'e' => Ok((rdev::Key::KeyE,false)),
			'f'	=> Ok((rdev::Key::KeyF,false)),
			'g' => Ok((rdev::Key::KeyG,false)),
			'h' => Ok((rdev::Key::KeyH,false)),
			'i' => Ok((rdev::Key::KeyI,false)),
			'j' => Ok((rdev::Key::KeyJ,false)),
			'k' => Ok((rdev::Key::KeyK,false)),
			'l' => Ok((rdev::Key::KeyL,false)),
			'm' => Ok((rdev::Key::KeyM,false)),
			'n' => Ok((rdev::Key::KeyN,false)),
			'o' => Ok((rdev::Key::KeyO,false)),
			'p' => Ok((rdev::Key::KeyP,false)),
			'q' => Ok((rdev::Key::KeyQ,false)),
			'r' => Ok((rdev::Key::KeyR,false)),
			's' => Ok((rdev::Key::KeyS,false)),
			't' => Ok((rdev::Key::KeyT,false)),
			'u' => Ok((rdev::Key::KeyU,false)),
			'v' => Ok((rdev::Key::KeyV,false)),
			'w' => Ok((rdev::Key::KeyW,false)),
			'x' => Ok((rdev::Key::KeyX,false)),
			'y' => Ok((rdev::Key::KeyY,false)),
			'z' => Ok((rdev::Key::KeyZ,false)),

			' ' => Ok((rdev::Key::Space,false)),

			'1' => Ok((rdev::Key::Num1,false)),
			'2' => Ok((rdev::Key::Num2,false)),
			'3' => Ok((rdev::Key::Num3,false)),
			'4' => Ok((rdev::Key::Num4,false)),
			'5' => Ok((rdev::Key::Num5,false)),
			'6' => Ok((rdev::Key::Num6,false)),
			'7' => Ok((rdev::Key::Num7,false)),
			'8' => Ok((rdev::Key::Num8,false)),
			'9' => Ok((rdev::Key::Num9,false)),
			'0' => Ok((rdev::Key::Num0,false)),

			'-' => Ok((rdev::Key::Minus,false)),			
			'=' => Ok((rdev::Key::Equal,false)),
			
			'`' => Ok((rdev::Key::BackQuote,false)),
			'~' => Ok((rdev::Key::BackQuote,true)),

			'!' => Ok((rdev::Key::Num1,false)),
			'@' => Ok((rdev::Key::Num2,true)),
			'#' => Ok((rdev::Key::Num3,true)),
			'$' => Ok((rdev::Key::Num4,true)),
			'%' => Ok((rdev::Key::Num5,true)),
			'^' => Ok((rdev::Key::Num6,true)),
			'&' => Ok((rdev::Key::Num7,true)),
			'*' => Ok((rdev::Key::Num8,true)),
			'(' => Ok((rdev::Key::Num9,true)),
			')' => Ok((rdev::Key::Num0,true)),
			'_' => Ok((rdev::Key::Minus,true)),
			'+' => Ok((rdev::Key::Equal,true)),
			
			'[' => Ok((rdev::Key::LeftBracket,false)),
			']' => Ok((rdev::Key::RightBracket,false)),
			'\\' => Ok((rdev::Key::BackSlash,false)),

			'{' => Ok((rdev::Key::LeftBracket,true)),
			'}' => Ok((rdev::Key::RightBracket,true)),
			'|' => Ok((rdev::Key::BackSlash,true)),

			';' => Ok((rdev::Key::SemiColon,false)),
			'\'' => Ok((rdev::Key::Quote,false)),

			':' => Ok((rdev::Key::SemiColon,true)),
			'"' => Ok((rdev::Key::Quote,true)),

			'.' => Ok((rdev::Key::Dot,false)),
			',' => Ok((rdev::Key::Comma,false)),
			'/' => Ok((rdev::Key::Slash,false)),
			
			'>' => Ok((rdev::Key::Dot,true)),
			'<' => Ok((rdev::Key::Comma,true)),
			'?' => Ok((rdev::Key::Slash,true)),


			_ => Err(()),
		}
	}
}

fn send(event_type: &EventType) {
    let delay = time::Duration::from_millis(10);
    match simulate(event_type) {
		Ok(()) => (),
        Err(SimulateError) => {
            println!("We could not send {:?}", event_type);
        }
    }
    // Let ths OS catchup (at least MacOS)
    thread::sleep(delay);
}

fn replace_string(my_pattern_struct: read_write::PatternStruct){
	/*
		simulates backspace event for my_pattern.len + 1 times to remove the pattern
		and writes the replacement.
	*/
	let my_pattern = my_pattern_struct.pattern;
	let remove_pattern = || {
		// function to remove the pattern by pressing backspace
		let my_len = my_pattern.len();
		let delay = time::Duration::from_millis(500);
		thread::sleep(delay);
		for _i in 0..my_len+1{
			send(&EventType::KeyPress(Key::Backspace));
		}
	};
	let add_replacement = || {
		// function to type the replacement text in
		for i in my_pattern_struct.replacement.chars(){
			let j = i.to_lowercase().nth(0).unwrap();
			let (my_key,need_shift) = Key::from_c(j).unwrap();
			if i.is_uppercase() || need_shift{
				send(&EventType::KeyPress(Key::ShiftLeft)); // Press the Shift Key
				send(&EventType::KeyPress(my_key));
				send(&EventType::KeyRelease(my_key));
				send(&EventType::KeyRelease(Key::ShiftLeft)); // Release the Shift Key
			}else{
				send(&EventType::KeyPress(my_key));
				send(&EventType::KeyRelease(my_key));
			}
			// println!("{:?}",k);
			// print!("{}",i);
		}
	};
	remove_pattern();
	add_replacement();
}

use tauri::api::path::config_dir;

// use tauri::Config;
fn check_patterns(my_string: &String)->bool{
	/* 
		function that checks the word string with the stored patterns
		if a pattern is found then it calls the replace string on the pattern and returns true
		else returns false
	*/
	
	let app_dir = config_dir().map(|dir| dir.join("replace_io")).unwrap();
	let my_file = app_dir.join("data.json");

	// println!("{:?}",my_string);
	let my_data_file =  my_file.to_str().unwrap().to_string();
	let pattern_arr =  read_write::read_struct(my_data_file);
	for i in pattern_arr.into_iter(){
		if *my_string.to_lowercase() == i.pattern{
			// println!("Match found for {}.",i.pattern);
			replace_string(i);
			return true
		}
	}
	false
}

fn add_to_my_str(my_char: Option<String>){
	/*
		function to manupilate the word_string 
		(add the letter to the string or to clear the string)
		calls the check_patterns when a whitespace is recieved
	*/
	// println!("{}",my_char.as_ref().map(|x| &**x).unwrap_or("\\"));
	// event.name
	unsafe{
		// println!("my_char = {:?}",my_char);
		// println!("my_char = {:?}",my_char.as_ref());
		let a = &"\\".to_string();
		let temp: &str = my_char.as_ref().unwrap_or(a);
		if temp == a{
			return
		}
		let temp1 = temp.chars().nth(0).unwrap();
		// println!("temp len = '{}'",temp.len());
		// println!("{}",temp==" ");
		if temp.len() != 1 || (!temp1.is_alphabetic() && !temp1.is_whitespace() && temp1 != '*'){
			// if we have not inputed characters
			// println!("here at break. temp:: {:?}",temp);
			// println!("asdf {:?}",my_char);
			MY_STR = String::new();
			return
		}
		// println!("temp used = '{}'",temp);
		if temp.contains(char::is_whitespace){
			// if white-space occures
			// here we can check the last word for patterns...
			// println!("here1");
			check_patterns(&MY_STR);
			MY_STR = String::new();
			// return
		}else{
			// else we just push the letter
			MY_STR.push(temp1);
			// println!("{:?}",temp1);
		}
	}

}

pub fn callback(event: Event){
	// println!("{:?}",event.event_type == EventType::KeyPress());

	if matches!(event.event_type, EventType::KeyPress(_)){
		// a += 1;

		add_to_my_str(event.name);
	// 	// MY_STR = MY_STR + "asd";
	// 	// println!("New String :: {}",MY_STR);

	// 	// match event.name.as_ref().map(|x| &**x).unwrap(){
	// 	//     Some(ref a) if a == "a" => println!("'a' is pressed"),
	// 	//     _ => ()ssssssssssasssssssssssssssssssssssssssss
	// 	// }

	// 	// owned_string.push_str(&another_owned_string);
	// 	// println!("aasd");
	}
	// "asd".to_owned()
	()
	// println!("My callback {:?}", event);
	// if event.event_type 
	// match event {sssssssss
	//      => print!(""),
	//     None => (),
	// }
}
