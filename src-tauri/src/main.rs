#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use rdev::{listen};
mod callback;
mod read_write;

#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}


// use tauri::{Manager};

#[tauri::command]
fn get_all_pattern() -> Vec<read_write::PatternStruct> {
  println!("reading all the structs");
  // app_handle.emit_all("Backend", Payload { message: "hello there!".into() }).unwrap();
  let temp = read_write::read_struct("./asd.json".to_string());
  println!("Done reading!!");
  temp
}

#[tauri::command]
fn add_pattern(asd: read_write::PatternStruct){
  println!("Adding a pattern {:?}",asd);
  read_write::append_struct(asd,"./asd.json".to_string());
  // app_handle.emit_all("Backend", Payload { message: "hello there!".into() }).unwrap();
  // let temp = read_write::read_struct("./asd.json".to_string());
  // tempnm 
}

#[tauri::command]
fn delete_pattern(delete_id: i32){
  println!("Deleting a pattern of id {:?}",delete_id);
  read_write::remove_struct(delete_id,"./asd.json".to_string());
  // read_write::append_struct(asd,"./asd.json".to_string());
  // app_handle.emit_all("Backend", Payload { message: "hello there!".into() }).unwrap();
  // let temp = read_write::read_struct("./asd.json".to_string());
  // tempnm 
}


#[tauri::command]
fn start_pattern_matching() {
  println!("Pattern matching started!");
  if let Err(error) =  listen(callback::callback){
    println!("Error: {:?}", error)
  }
}
// use tauri::async_runtime::Runtime;
// use tokio;
use std::thread;
fn main() {
  thread::spawn(|| {
      start_pattern_matching();
  });
  // let mut rt = tokio::runtime::Runtime::new().unwrap();
  // let a = async {
    // };
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![
    delete_pattern,
    get_all_pattern,
    start_pattern_matching,
    add_pattern
    ])
    .run(tauri::generate_context!())
    .expect("failed to run app");
    // rt.block_on(start_pattern_matching());
}