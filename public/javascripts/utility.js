//utility functions

//validate form fields for text from serialized array
var validateForText = function(arr) {
	for(var i = 0; i < arr.length; i++){
		if(!arr[i]['value']){
			alert('Please enter '+arr[i]['name']);
			return false;
		}
	}
	return true;
};

//escape html tags
var escape = function(str){
	var reBeg = new RegExp("%3C", "gim");
	var reEnd = new RegExp("%3E", "gim");
	if(str.match(reBeg) || str.match(reEnd)){
		return true;
	}
};

//parse text for linebreaks
var parseText = function(str){
	var re = new RegExp("%0D%0A", "gim");
	var text = str.replace(re, "<br>");
	return text;
};