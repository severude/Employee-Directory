// AJAX call to retrieve 12 employees
$.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data) {
      let employeeHTML = '<ul class="clearfix">';
      $.each(data.results,function(i,employee) {
		  employeeHTML += '<li>';
		  employeeHTML += '<a class="card" href="' + employee.picture.large + '">';
		  employeeHTML += '<div class="image-container">';
		  employeeHTML += '<img src="' + employee.picture.medium + '">';
		  employeeHTML += '</div>';
		  employeeHTML += '<div class="info-block">';
		  employeeHTML += '<p class="name">' + employee.name.first + ' ' + employee.name.last + '</p>';
		  employeeHTML += '<p class="email">' + employee.email + '</p>';
		  employeeHTML += '<p class="city">' + employee.location.city + '</p>';
		  employeeHTML += '</div></a></li>';
      }); // end each
      employeeHTML += '</ul>';
      $('#employee').html(employeeHTML);
  }
});

// Build a modal overlay
let $overlay = $('<div id="overlay"></div>');
let $content = $('<div id="content"></div>');
let $image = $('<img>');
$content.append($image);
let $name = $('<p class="name"></p>');
$content.append($name);
let $email = $('<p class="email"></p>');
$content.append($email);
let $city = $('<p class="city"></p>');
$content.append($city);
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
	let city = $(this).children("div").children("p")[2].textContent;
	$city.text(city);

	$overlay.show();
});

// Hide overlay if clicked
$overlay.click(function() {
  $overlay.hide();
});
