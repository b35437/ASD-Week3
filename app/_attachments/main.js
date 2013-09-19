// --------  JavaScript Document  -------- //
//Name: Nathan Byarley
//Project: Week 3
//Term: 1309
//Class: ASD

//Added sections for each page. these are just the basics as they will change as needed through the remaining weeks.

$('#homepg').on('pageinit', function() {

	//using ajax to pull data from couchDB
	//data by equipment name
	$('#equipmentBtn').on('click', function(){
		$('#equipmentList').empty(); //empty the view
		$.ajax({
			url		 : '_view/equipbyname',
			dataType : 'json',
			success  : function(jsondata) {
				$.each(jsondata.rows, function (index, key){
					console.log(key.value.name);//display data to the console
					$(''+
						'<li>' +
						  '<a href="#dataSearch" data-ajax="false" id="itemBtn">' +
				          	'<h3>' + key.value.name +'</h3>' +
				          	'<p>' + 'Level: ' + key.value.level + '</p>' +
				          	'<p>' + 'Slot: ' + key.value.slot + '</p>' +
				          '</a>' +
				        '</li>'
				    ).appendTo('#equipmentList');
				});
				$('#equipmentList').listview('refresh');
			}
		});
	});


	//using ajax to pull data from couchDB
	//data by Slot
	$('#slotBtn').on('click', function(){
		$('#slotList').empty();
		$.ajax({
			url		 : '_view/equipbyslot',
			dataType : 'json',
			success  : function(jsondata) {
				$.each(jsondata.rows, function (index, key){
					console.log(key.value.slot);//display data to the console
					$(''+
						'<li>' +
						  '<a href="#slotSearch" data-ajax="false" id="slotBtn">' +
				          	'<h3>' + key.value.slot +'</h3>' +
				          	'<p>' + 'Name: ' + key.value.name + '</p>' +
				          	'<p>' + 'Level: ' + key.value.level + '</p>' +
				          '</a>' +
				        '</li>'
				    ).appendTo('#slotList');
				});
				$('#slotList').listview('refresh');
			}
		});
	});

	//using ajax to pull data from couchDB
	//data by Level
	$('#levelBtn').on('click', function(){
		$('#levelList').empty();
		$.ajax({
			url		 : '_view/equipbylevel',
			dataType : 'json',
			success  : function(jsondata) {
				$.each(jsondata.rows, function (index, key){
					console.log(key.value.level);//display data to the console
					$(''+
						'<li>' +
						  '<a href="#levelSearch" data-ajax="false" id="levelBtn">' +
				          	'<h3>' + key.value.level +'</h3>' +
				          	'<p>' + 'Name: ' + key.value.name + '</p>' +
				          	'<p>' + 'Level: ' + key.value.slot + '</p>' +
				          '</a>' +
				        '</li>'
				    ).appendTo('#levelList');
				});
				$('#levelList').listview('refresh');
			}
		});
	});

	//using ajax to pull data from json file
	$('#json').on('click', function(){
		$('#dataListings').empty();
		$.mobile.changePage('#dataSearch');//sen user to selected page.
		$.ajax({
			url		 : 'data.json',
			type	 : 'GET',
			dataType : 'json',
			success  : function(jsondata) {
				for(var i=0, j=jsondata.equipment.length; i<j; i++) {
					var equip = jsondata.equipment[i];
					$(''+
						'<div class="listing">' +
				          '<h3>' + 'Equipment Name: ' + equip.equipmentName +'</h3>' +
				          '<p>' + 'Item Slot: ' + equip.itemList +'</p>' +
				          '<p>' + 'Level: ' + equip.levelSlide +'</p>' +
				          '<p>' + 'Note: ' + equip.addNote +'</p>' +
				          '<hr />' +
				        '</div>'
				    ).appendTo('#dataListings');
				}
			}
		});
	});

	//using ajax to pull data from xml file
	$('#xml').on('click', function(){
		$('#dataListings').empty();
		$.mobile.changePage('#dataSearch');
		$.ajax({
			url		 : 'data.xml',
			type 	 : 'GET',
			dataType : 'xml',
			success	 : function(xml) {
				$(xml).find('item').each(function() {
					var equipmentName = $(this).find('equipmentName').text();
					var itemList = $(this).find('itemList').text();
					var levelSlide = $(this).find('levelSlide').text();
					var addNote = $(this).find('addNote').text();
					$(''+
					'<div class="listing">' +
						'<h3>' + 'Equipment Name: ' + equipmentName +'</h3>' +
						'<p>' + 'Item Slot: ' + itemList +'</p>' +
						'<p>' + 'Level: ' + levelSlide +'</p>' +
						'<p>' + 'Note: ' + addNote +'</p>' +
						'<hr />' +
					'</div>').appendTo('#dataListings');
				});
			}

		});
	});

		//localStorage function get, edit and delete localstorage
		//get data (localstorage)
	$('#lstorage').on('click', function(){

		//Clears the field before it repoplulates it with new data
		//this will prevent duplicates
		$.mobile.changePage('#equipmentNameSearch');
		//Empty the div to 
		$('#dataListings').empty();
		//for loop to continue through localStorage for all items.
		for( var i=0, ls = localStorage.length; i < ls; i++) {
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);

		var objectString = JSON.parse(value);
		//console.log(objectString);

			$(''+
				'<div class="listing">' +
					'<h3>' + 'Equipment Name: ' + objectString.equipmentName[0] +'</h3>' +
					'<p>' + 'Item Slot: ' + objectString.itemList[0] +'</p>' +
					'<p>' + 'Level: ' + objectString.levelSlide[0] +'</p>' +
					'<p>' + 'Note: ' + objectString.addNote[0] +'</p>' +
					'<div class="ui-block-b">' + '<a href="#homepg" class="delete" value="Delete" data-key="' + key + '">Delete</a>' + '</div>'+

					//Edited these out untill i am able to get localstorage to pull to form correctly.
					//'<div class="ui-block-b">' + '<a href="#addItem" class="edit" value="Edit" data-key="' + key + '">Edit</a>' + '</div>'+
					'<br />'+
					'<hr />' +
				'</div>'
			).appendTo('#dataListings'); // attach to the dataListing div.


			//delete function
			$('.delete').on('click', function(){
				   var vkey = $(this).data('key');
					
					//console.log(vkey);
					localStorage.removeItem(vkey);
					
			});

			//edit function
			$('.edit').on('click', function(key, value){
				$.mobile.changePage('#addItem');

				var ekey = $(this).attr('data-key');
				//console.log(ekey);
				$('#ename').val(objectString.equipmentName[0]);
				$('#itemList').val(objectString.itemList[0]);
            	$('#islide').val(objectString.levelSlide[0]);
            	$('#note').val(objectString.addNote[0]);
				$('#key').val(ekey);
			});
		}
	});
});

//Add item page, and verify required fields are filled
$('#addItem').on('pageinit', function() {

		var myForm = $('#equipmentForm');
			myForm.validate({
				invalidHandler: function(form, validator) {
					},
				submitHandler: function(form) {
				var data = myForm.serializeArray();
				saveData(data);//data
				}
		
			});

			//save data to localstorage
var saveData = function (key, value){
	if($('#key').val() == '') {
		var randomID = Math.floor(Math.random()*10000001);
        console.log(randomID);
    } else {
    	var randomID = $('#key').val();
    };
    //get form information and store within an object
		var equipment = {};
			equipment.equipmentName = [$("#ename").val()];
			equipment.itemList = [$("#itemList").val()];
			equipment.levelSlide = [$("#islide").val()];
			equipment.addNote = [$("#note").val()];
			console.log(equipment);
			//convert object to string
			localStorage.setItem(randomID, JSON.stringify(equipment));

			var randomID = key;

			//notify the user, equipment has been added
			if(localStorage.length === 0){
				alert("Equipment not saved");
			} else {
				alert("Equipment has been added to localStorage")

			}

		window.location.reload();
};

   //submit click, calls saveData.
	var submit = $('#submit');
	submit.on('click', saveData);

}); //end addItem function

$('#equipmentNameSearch').on('pageinit', function(){
});	

$('#slotSearch').on('pageinit', function(){
});

$('#levelSearch').on('pageinit', function(){
});

$('#dataSearch').on('pageinit', function(){
});

//Thsi will clear the localstorage
$("#clearLocalStorage").on('click', function() {
	//if statement based on length of localstorage
	if(localStorage.length === 0){
		alert("There is nothing to delete");
	}else {
    	var verify = confirm("Are you sure you want to clear the localStorage?");
	};
	//if you confirm you wish to delete, then storage will be cleared.
    if (verify) {
        localStorage.clear(); //clears localstorage
    }
});

$('#about').on('pageinit', function(){
	<!---- Tab function on about page ---->
	$('#about').delegate('.ui-navbar a', 'click', function () {
    	$(this).addClass('ui-btn-active');
    	$('.content_div').hide();
    	$('#' + $(this).attr('data-href')).show();
	});
});


