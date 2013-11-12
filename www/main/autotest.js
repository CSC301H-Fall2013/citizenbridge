




//----------------------- ----------------------- -----------------------
//-----------------------  helper functions. 
//----------------------- ----------------------- -----------------------

var success_count = 0;
succes = function(id,msg)   //msg par is optional. 
{  
		//update the word seen in result. 
         x = document.getElementById(id);
         x.innerHTML='success';
         x.className='success';

         //append messege to test case data field. 
	     y = document.getElementById(id + "_data");
	     if (y != null)
	    	 y.innerHTML = msg;
         
	     //update success count
	     success_count++;
};
failure_count = 0;
failure = function(id)
{  
		 //update result to failure. 
         x = document.getElementById(id);
         x.innerHTML='failure';
         x.className='failure';
         
         //increment count
         failure_count++;
};

not_implemented_count = 0;
failureNotImplemented = function(id)
{
         x = document.getElementById(id);
         x.innerHTML='failure test case not implemented';
         x.className='notImplemented';
         not_implemented_count++;
};




//----------------------- ----------------------- ----------------------- 
//-----------------------  Test Case definitions. 
//----------------------- ----------------------- ----------------------- 


//----------------------- This is just an example test case
exampleTest = function() 
{
   if (1 == 1) 
      succes('t1', "all is well");
   else 
      failure('t1');
};


//-----------------------  Test if we are able to download the representative list. 
t2_acquire_rep_list = function(data) 
{
  if (data != null) {
	  
	 msg = "Representatives count: " +  data.results.length;
     succes('t2',msg);
  } else
	 failure('t2');
};

t3_acquire_bill_list = function(data)
{
	
  if (data != null){  
	  msg = "Bills count: " +  data.results.length;
	  succes('t3',msg);
  }
  else
	 failure('t3');
};



t4_acquire_induvidual_rep = function(data) 
{
  if (data != null){ 
     
	  result = data.results[0];
	  given = result.name.given;
	  imgUrl = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=" + result.image_id; 
	  
	  msg = given + " " + "<img src='" + imgUrl + "'height='42' width='25'>";
	  succes('t4', msg);
  }
  else
	 failure('t4');
	
	//Older JS implementation. Useful for reference:
//   //This function is only reached if the downloaded rep list is successfull. 
//   test_downloaded_rep = function (data) 
//   {
//      result = data.results[0];
//      given  = result.name.given;
//      if (given == "Mike")  //usually there are 300+ members. If there are less then there is a problem.
//           succes('t4')
//   }
//
//   //Call the API to get the list. 
//   ParlData.reps("78554", "all", test_downloaded_rep);
//
//   //Time out after 4 seconds. 
//   setTimeout(function () {
//      x = document.getElementById('t4').innerHTML
//      if (x != 'success')
//         failure('t4')
//   }, 7000)
};


t5_acquire_induvidual_bill = function(data) 
{
   thisTestCaseID = "t5";

   if (data != null){ //usually there are 300+ members. If there are less then there is a problem.
	      result = data.results[0];
	      title = result.title.EN;
	      prefixnum = result.prefix + result.number;
		  msg = prefixnum + " " + title;
		  succes(thisTestCaseID, msg);
	  }
	  else
		 failure(thisTestCaseID);
};
  


t6_= function() 
{
         failureNotImplemented('t6')
}
t7_= function() 
{
         failureNotImplemented('t7')
}
t8_= function() 
{
         failureNotImplemented('t8')
}


t9_first_rep = function (data)
{
	  if (data != null){
		  result = data.results[0];
		  given = result.name.given;
		  imgUrl = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=" + result.image_id;   
		  msg = given + " " + "<img src='" + imgUrl + "'height='42' width='25'>";
		  succes('t9', msg);
	  }
	  else
		 failure('t9');
};

t10_last_rep = function (data)
{
	  if (data != null){
		     
		  result = data.results[data.results.length -1];
		  given = result.name.given;
		  imgUrl = "http://www.parl.gc.ca/Parlinfo/images/Picture.aspx?Item=" + result.image_id;   
		  msg = given + " " + "<img src='" + imgUrl + "'height='42' width='25'>";
		  succes('t10', msg);
	  }
	  else
		 failure('t10');
};


t11_test_first_bill_in_index = function(data) 
{
   thisTestCaseID = "t11";

   if (data != null){ 
	      result = data.results[0];
	      title = result.title.EN;
	      prefixnum = result.prefix + result.number;
		  msg = prefixnum + " " + title;
		  succes(thisTestCaseID, msg);
	  }
	  else
		 failure(thisTestCaseID);
};


t12_test_last_bill_in_index = function(data) 
{
   thisTestCaseID = "t12";

   if (data != null){
	      result = data.results[data.results.length -1];
	      title = result.title.EN;
	      prefixnum = result.prefix + result.number;
		  msg = prefixnum + " " + title;
		  succes(thisTestCaseID, msg);
	  }
	  else
		 failure(thisTestCaseID);
};


//given valid rep, return it's id. 
t13_rep_near_me = function(jsonlocData, jsonrepData)
{ 
	thisTestCaseID = "t13";
	repId = loadMyRep(jsonlocData, jsonrepData,1);
	if (repId == "78598")	{
		succes(thisTestCaseID, "Rep id for postcode: M5S2G1 is: " + repId);
	} else {
		failure(thisTestCaseID);
	}
};

t14_rep_near_me_with_invalid_postcode = function(jsonlocData, jsonrepData)
{
	alert("hello");
	repId = loadMyRep(jsonlocData, jsonrepData,1);
	alert(repId);

   failureNotImplemented('t14');
};

//----------------------- ----------------------- -----------------------
//â----------------------  Call the test cases. 
//----------------------- ----------------------- -----------------------
exampleTest();
t2_acquire_rep_list(JS_AllRepList);
t3_acquire_bill_list(JS_AllBillList);
t4_acquire_induvidual_rep(JS_SingleRep);
t5_acquire_induvidual_bill(JS_SingleBill);
t6_();
t7_();
t8_();
t9_first_rep(JS_AllRepList);
t10_last_rep(JS_AllRepList);
t11_test_first_bill_in_index(JS_AllBillList);
t12_test_last_bill_in_index(JS_AllBillList);
t13_rep_near_me(jsonlocData, JS_AllRepList);
//t13_rep_near_me(); called from autotest.php
t14_rep_near_me_with_invalid_postcode(invalidPostcodeData, JS_AllRepList);

//<!--LEO: Pie char code, runs at the end  -->
var pieData = [
		{
			value: success_count,
			color: "#80ff00"
		},
		{
			value : failure_count,
			color : "#ff0000"
		},
		{
			value : not_implemented_count, 
			color : "#FF8000"
		}
	];
var myPie = new Chart(document.getElementById("canvas").getContext("2d")).Pie(pieData);
