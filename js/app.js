// AJAX call to retrieve 12 employees
$.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data) {
      let employeeHTML = '<ul class="clearfix">';
      $.each(data.results,function(index,employee) {
		  employeeHTML += '<li>';
		  employeeHTML += '<a class="card" href="' + employee.picture.large + '">';
		  employeeHTML += '<div class="image-container">';
		  employeeHTML += '<img src="' + employee.picture.medium + '">';
		  employeeHTML += '</div>';
		  employeeHTML += '<div class="info-block">';
		  employeeHTML += '<p class="name">' + employee.name.first + ' ' + employee.name.last + '</p>';
		  employeeHTML += '<p class="email">' + employee.email + '</p>';
		  employeeHTML += '<p class="city">' + employee.location.city + '</p>';
		  employeeHTML += '<p class="hidden">' + employee.login.username + '</p>';
		  employeeHTML += '<p class="hidden">' + employee.cell + '</p>';
		  employeeHTML += '<p class="hidden">' + employee.location.street + ' ' + employee.location.city +
			  ' ' + employee.location.state + ' ' + employee.location.postcode + '</p>';
		  let dob = employee.dob.split(" ", 1)[0];  // Copy dob as a string
		  const regex = /(\d{4})-(\d{2})-(\d{2})/;  // Regex formula to capture 3 groups of numbers
		  let birthdate = dob.replace(regex, '$2/$3/$1');  // Reformat the number groups into new format
		  employeeHTML += '<p class="hidden">Birthday: ' + birthdate + '</p>';
		  employeeHTML += '</div></a></li>';
      }); // end each
      employeeHTML += '</ul>';
      $('#employee').html(employeeHTML);
  }
});

// Build a modal overlay
let $overlay = $('<div id="overlay"></div>');
let $content = $('<div id="content"></div>');
let $button = $('<p id="close">X</p>');
$content.append($button);
let $image = $('<img>');
$content.append($image);
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

	$overlay.show();
});

// Hide overlay if clicked
$button.click(function() {
  $overlay.hide();
});
