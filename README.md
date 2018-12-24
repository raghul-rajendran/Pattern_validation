# Pattern_validation
Pattern Jquery Plugin Validation

##Feature 1:
	On Key Press 
	##### 		- Number only
	ABC 		- Text only
	##/##/#### 	- Date Formate
	##% 		- Number only
	$##,### 	- Number only
	##,### 		- Number only

	On Blur:
	$##,###.## 	- Doller and commas will added for decimal number
	##.###  	- For Deciamal numbers
	##.##% 		- For Decimal Number with percentage
	##% 		- Number with Percentage Will Add
	$##,### 	- Doller and commas will added Dynamically
	##,### 		- Commas will added dynamically

	The Important note that we can Give any numbers of the Hash key (#) 
	1.Example For numbers We can Give ## or ### or ####### it will take numbers only
	2.For Date We can Give #####/##/##### or ##/##/####
	3. For Text, We can give zxy or ABC or any text and goes on...

	Example Input field
	  <input type="text" name="phone" value="" class="pattern_class" data-pattern="#####">

##Feature 2:
	We can done an Fraction in the input box
 	example If we give 5 5/6 it convert to 5.833
	Example Input field
	  <input type="text" name="phone" value="" class="pattern_class" data-pattern="fraction#">

##Feature 3:
	If we Need to Allow Only Default Value in the text box we can allow them in on KeyPress. example If we need to allow Only Nill or text we can allow them.
	
	Example Input field
	  <input type="text" name="phone" value="" class="pattern_class" data-pattern="#####" data-pattern-default="NILL,N/A">
 	(Use only capital letter for pattern default) 
