'use strict';

// Employee Directory Module
(function employeeDirectory() {
	let elementIndex = 0; // Saves the index of last clicked employee 
	
	// AJAX call to retrieve 12 employees from the United States
	$.ajax({
	  url: 'https://randomuser.me/api/?results=12&nat=us',
	  dataType: 'json',
	  success: function(data) {
		  let employeeHTML = '<ul class="employee-list">';
		  $.each(data.results,function(index,employee) {
			  employeeHTML += '<li>';
			  employeeHTML += `<a class="card" href="${employee.picture.large}">`;
			  employeeHTML += '<div class="image-container">';
			  employeeHTML += `<img src="${employee.picture.medium}">`;
			  employeeHTML += '</div>';
			  employeeHTML += '<div class="info-block">';
			  employeeHTML += `<p class="name">${employee.name.first} ${employee.name.last}</p>`;
			  employeeHTML += `<p class="email">${employee.email}</p>`;
			  employeeHTML += `<p class="city">${employee.location.city}</p>`;
			  employeeHTML += `<p class="hidden">${employee.login.username}</p>`;
			  employeeHTML += `<p class="hidden">${employee.cell}</p>`;
			  employeeHTML += `<p class="hidden">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>`;
			  let dob = employee.dob.date.substr(0,10);  // Copy dob as a string
			  const regex = /(\d{4})-(\d{2})-(\d{2})/;  // Regex formula to capture 3 groups of numbers
			  let birthdate = dob.replace(regex, '$2/$3/$1');  // Reformat the number groups into new format
			  employeeHTML += `<p class="hidden">Birthday: ${birthdate}</p>`;
			  employeeHTML += '</div></a></li>';
		  }); // end each
		  employeeHTML += '</ul>';
		  $('#employee').html(employeeHTML);
	  }
	});

	// Build a modal overlay
	let $overlay = $('<div id="overlay"></div>');
	let $content = $('<div id="content"></div>');
	let $close = $('<p id="close">X</p>');
	$content.append($close);
	let $image = $('<img>');
	$content.append($image);
	let $arrows = $('<div class=""arrows></div>');
	let $previous = $('<span class="previous">&#10094;</span>');
	$arrows.append($previous);
	let $next = $('<span class="next">&#10095;</span>');
	$arrows.append($next);
	$content.append($arrows);
	let $name = $('<p class="name"></p>');
	$content.append($name);
	let $email = $('<p class="email"></p>');
	$content.append($email);
	let $username = $('<p class="username"></p>');
	$content.append($username);
	let $hr = $('<hr>');
	$content.append($hr);
	let $phone = $('<p class="phone"></p>');
	$content.append($phone);
	let $address = $('<p class="address"></p>');
	$content.append($address);
	let $birthdate = $('<p class="birthdate"></p>');
	$content.append($birthdate);
	$overlay.append($content);
	$('body').append($overlay);

	// Show overlay when an employee is clicked
	$('#employee').on('click', 'a', function(event){
		event.preventDefault();
		
		// Save employee index and show correct overlay arrows
		elementIndex = $('#employee a').index(this);
		showOverlayArrows();

		// Show employee information on the overlay
		let imageLocation = $(this).attr("href");
		$image.attr("src", imageLocation);
		let name = $(this).children("div").children("p")[0].textContent;
		$name.text(name);
		let email = $(this).children("div").children("p")[1].textContent;
		$email.text(email);
		let username = $(this).children("div").children("p")[3].textContent;
		$username.text(username);
		let phone = $(this).children("div").children("p")[4].textContent;
		$phone.text(phone);
		let address = $(this).children("div").children("p")[5].textContent;
		$address.text(address);
		let birthdate = $(this).children("div").children("p")[6].textContent;
		$birthdate.text(birthdate);

		// Show the overlay
		$overlay.show();
	});

	// Hide overlay if clicked
	$close.click(function() {
	  $overlay.hide();
	});

	// Search employee list based on input element search parameters
	function searchList() {
		// Get the search value in lowercase
		let searchValue = document.getElementsByTagName('input')[0].value.toLowerCase();

		// Hide all the employees on the page
		let employeeList = document.querySelector(".employee-list").children;
		for (let index = 0; index < employeeList.length; index++) {
			employeeList[index].style.display = "none";
		}

		// Storage for all employee matches
		let matches = [];

		// Test all employees on the page for the search match
		for (let index = 0; index < employeeList.length; index++) {
			// Capture name element
			let name = employeeList[index].getElementsByTagName("p")[0].innerHTML.toLowerCase();
			// Capture username element
			let username = employeeList[index].getElementsByTagName("p")[3].innerHTML.toLowerCase();

			// Test if element contains text from search field
			if(name.includes(searchValue) || username.includes(searchValue)) {
				matches.push(employeeList[index]);
			} 
		}

		// Message if no employees were found
		let searchMessage = document.querySelector('.search-message');
		if(matches.length === 0) {
			searchMessage.textContent = "Sorry, no employees were found";
		} else {
			searchMessage.textContent = "";
		}

		// Display employees that match
		for (var index = 0; index < matches.length; index++) {
			matches[index].style.display = "block";
		}

		// Clear search box
		document.getElementsByTagName('input')[0].value = "";
	}

	// Add click handler for searching
	$('button').on('click', searchList);

	// Logic to determine when to show or hide the overlay arrows
	function showOverlayArrows() {
		let employeeCount = $(".employee-list li").length;
		if(elementIndex+1 === employeeCount) {
			$('.next').hide();
		} else {
			$('.next').show();
		}
		if(elementIndex-1 < 0) {
			$('.previous').hide();
		} else {
			$('.previous').show();
		}
	}

	// Click to show the previous card
	function previousCard() {
		$('#employee a')[elementIndex-1].click();
	};

	// Click to show the next card
	function nextCard() {
		$('#employee a')[elementIndex+1].click();
	};
	
	// Click handlers for arrow buttons
	$('.previous').on('click', previousCard);
	$('.next').on('click', nextCard);

// End Employee Directory Module
}());
