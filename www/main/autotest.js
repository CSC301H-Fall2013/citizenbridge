
//▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►  helper functions. 
succes = function(id) 
{  
         x = document.getElementById(id);
         x.innerHTML='success';
         x.className='success';
}
failure = function(id)
{  
         x = document.getElementById(id);
         x.innerHTML='failure';
         x.className='failure';
}

failureNotImplemented = function(id)
{
         x = document.getElementById(id);
         x.innerHTML='failure test case not implemented';
         x.className='failure';
}


//▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►  Test Case definitions. 

//▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►  This is just an example test case
exampleTest = function() 
{
   if (1 == 1) 
      succes('t1')
   else 
      failure('t1')
}


//▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►  Test if we are able to download the representative list. 
t2_acquire_rep_list = function() 
{

   //This function is only reached if the downloaded rep list is successfull. 
   test_downloaded_reps = function (data) 
   {
      if (data.results.length > 10)  //usually there are 300+ members. If there are less then there is a problem.
         succes('t2')
   }

   //Call the API to get the list. 
   ParlData.reps(test_downloaded_reps);

   //Time out after 4 seconds. 
   setTimeout(function () {
      x = document.getElementById('t2').innerHTML
      if (x != 'success')
         failure('t2')
   }, 4000)
}

t3_acquire_bill_list = function()
{
	test_downloaded_bills = function(data)
	{
		if (data.results.length > 10)
			succes('t3')
	}
	
	//Call the API to get the list.
	ParlData.bbls(test_downloaded_bills);
	
	//Time out after 4 seconds. 
	setTimeout(function () {
		x = document.getElementById('t3').innerHTML
		if (x != 'success')
			failure('t3')
	}, 4000)
}



t4_acquire_induvidual_rep = function() 
{

   //This function is only reached if the downloaded rep list is successfull. 
   test_downloaded_rep = function (data) 
   {
      result = data.results[0];
      given  = result.name.given;
      if (given == "Mike")  //usually there are 300+ members. If there are less then there is a problem.
           succes('t4')
   }

   //Call the API to get the list. 
   ParlData.reps("78554", "all", test_downloaded_rep);

   //Time out after 4 seconds. 
   setTimeout(function () {
      x = document.getElementById('t4').innerHTML
      if (x != 'success')
         failure('t4')
   }, 4000)
}


t5_acquire_induvidual_bill = function() 
{

   thisTestCaseID = "t5";

   //This function is only reached if the downloaded rep list is successfull. 
   test_downloaded_bill = function (data) 
   {
      result = data.results[0];
      title = result.title.EN;
      if (title != null)  //usually there are 300+ members. If there are less then there is a problem.
            succes('t5')
   }

   //Call the API to get the list. 
   ParlData.bbls("5079843", "all", test_downloaded_bill);

   //Time out after 4 seconds. 
   setTimeout(function () {
      x = document.getElementById('t5').innerHTML
      if (x != 'success')
         failure('t5')
   }, 4000)
}

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



//▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►  Test the test cases. 
exampleTest();
t2_acquire_rep_list();
t3_acquire_bill_list();
t4_acquire_induvidual_rep();
t5_acquire_induvidual_bill();
t6_();
t7_();
t8_();