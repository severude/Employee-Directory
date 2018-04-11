$.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data) {
      let employeeHTML = '<ul>';
      $.each(data.results,function(i,employee) {
      	employeeHTML += '<li class="grid-25 tablet-grid-30">';
      	employeeHTML += '<a href="' + employee.picture.large + '" class="image">';
        employeeHTML += '<div class="tablet-grid-50"><img src="' + employee.picture.large + '"></div>';
		employeeHTML += '<div class="tablet-grid-50"><h6>' + employee.name.first + ' ' + employee.name.last + '</h6>';
		employeeHTML += '<p>' + employee.email + '</p>';
		employeeHTML += '<p>' + employee.location.city + '</p>';
		employeeHTML += '</div></a></li>';
      }); // end each
      employeeHTML += '</ul>';
      $('#employee').html(employeeHTML);
  }
});