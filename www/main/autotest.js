
//All test cases go inside this function. Things outside the function will not be accessible (weird thing about JS scope)
$(document).ready(function(){


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
	exampleTest = function() 
	{
		if (1 == 1) 
			succes('t1')
		else 
			failure('t1')
	}


	//▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇►  Test cases. 
	exampleTest();

});