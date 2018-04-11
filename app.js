$.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data) {
      let employeeHTML = '<ul>';
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
