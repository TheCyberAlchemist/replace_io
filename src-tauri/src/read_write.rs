use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct PatternStruct{
	pub id: i32,
	pub pattern: String,
	pub replacement: String,
}
pub fn read_struct(input_file: String) -> Vec<PatternStruct>{
	let struct_arr = {
	    let text = std::fs::read_to_string(&input_file).unwrap();
		if text.len() > 0 {
			serde_json::from_str::<Vec<PatternStruct>>(&text).unwrap()
		}else{
			vec![]
		}
	};
	struct_arr
}

pub fn append_struct(new_struct: PatternStruct,output_file: String){
	// let a = PatternStruct {pattern:"new".to_owned(),replacement:"asdfgh".to_owned()};
	// let b = PatternStruct {pattern:"123".to_owned(),replacement:"asdfgh".to_owned()};
	// let c = PatternStruct {pattern:"123".to_owned(),replacement:"asdfgh".to_owned()};
	// let d = PatternStruct {pattern:"123".to_owned(),replacement:"asdfgh".to_owned()};
	// let e = PatternStruct {pattern:"123".to_owned(),replacement:"asdfgh".to_owned()};

	// let do_steps = || -> Result<(), MyError> {
	// 	do_step_1()?;
    //     do_step_2()?;
    //     do_step_3()?;
    //     Ok(())
    // };
	// let arr = [a,b,c,d,e];
	println!("Here1");
	let mut arr = read_struct(output_file.clone());
	println!("Here2");
	let mut last_id = 0;
	if arr.len() != 0{
		last_id = arr[arr.len()-1].id;
	}
	let mut my_struct = new_struct;
	my_struct.id = last_id + 1;

	arr.push(my_struct);
	println!("{:?}",arr);
	std::fs::write(
		output_file,
	    serde_json::to_string_pretty(&arr).unwrap(),
	).unwrap();
}

pub fn remove_struct(delete_id:i32,output_file: String){
	let mut arr = read_struct(output_file.clone());
	arr = arr.into_iter()
	.filter(|pattern_struct| pattern_struct.id != delete_id)
    .collect();
	println!("{:?}",arr);
	std::fs::write(
		output_file,
		serde_json::to_string_pretty(&arr).unwrap(),
	).unwrap();
	
}