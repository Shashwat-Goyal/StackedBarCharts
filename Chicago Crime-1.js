
var fs=require('fs');  // importing the file system module
var readLine = require('readline'); // importing the readline module

//creating an interface to define the input & output variables.
var rd=readLine.createInterface({	
	input:fs.createReadStream('crimes2001onwards.csv'),
	output:fs.createWriteStream('Chicago Crime-1.json')
});

// initializing the variables required
var jsonObj=[];
var flag=0;

var arr=[];

//reading data from the csv file using the 'on' line event
rd.on('line', function(line){

	arr=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
	if(flag==0){
		flag=1;
			}
	else if(arr[17]<2001 || arr[17]>2016){
		;
	}
	else{
			var a=jsonObj.findIndex(fnValidate); // checking if an year already exists in our final object 
			if(a==-1){
				
				var myObj={};
				myObj.Year=arr[17];
				myObj.above500=0;
				myObj.below500=0;
				jsonObj.push(myObj);
				a=jsonObj.length-1;
			}
			
				if(arr[6]==='OVER $500'){
					++jsonObj[a].above500; //increae the count of above500 if found
				}
				else if(arr[6]==='$500 AND UNDER'){
					++jsonObj[a].below500;  //increae the count of below500 if found
				}
			
		}
});

//a function returning true if an Year is already present in our JSon object.
function fnValidate(a){
	return a.Year===arr[17];
}

// End of file using the 'on' close event
rd.on('close',function()
{
jsonObj.sort(function compare(a,b){
if(a.Year>b.Year){
	return 1;
}
else{
	return -1;
}
});
// writng the file through our output variable to abc.json
rd.output.write(JSON.stringify(jsonObj));
console.log(jsonObj);
console.log("done");
});

