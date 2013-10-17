


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


//▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►  Test the test cases. 
exampleTest();
t2_acquire_rep_list();










