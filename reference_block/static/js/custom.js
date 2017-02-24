function ReferenceBlock(runtime, element){
	console.log("This is ReferenceBlock Js Function Called", runtime);

	$(".add-reference").on('click', function(){
		console.log("Add Reference btn click");
		var _this = $(this);
		var ref_id = _this.attr('rel');
		var data_row = _this.closest('.reference-data');
		var ref_name = data_row.find('.reference-name').attr('rel');
		var ref_link = data_row.find('.reference-link').attr('rel');
		var ref_desc = data_row.find('.reference-desc').attr('rel');

		var url = runtime.handlerUrl(element, 'studio_add_submit')
		console.log(url, "===url===", ref_name);

		post_data = {
			'ref_id':ref_id,
			'ref_name':ref_name,
			'ref_link':ref_link,
			'ref_desc':ref_desc
		}

		$.post(url, JSON.stringify(post_data), function(data, status) {
			console.log(data,'===data===');
			console.log(status,'====status====');
			if(status == 'success'){
				_this.addClass('remove-reference').removeClass('add-reference').html("Remove");
			}
		});

	});

	$(".remove-reference").on('click', function(){
		console.log("Remove Reference btn click");
		var _this = $(this);
		var ref_id = _this.attr('rel');
		var data_row = _this.closest('.reference-data');
		var ref_name = data_row.find('.reference-name').attr('rel');
		var ref_link = data_row.find('.reference-link').attr('rel');
		var ref_desc = data_row.find('.reference-desc').attr('rel');

		var url = runtime.handlerUrl(element, 'studio_remove_submit')
		console.log(url, "===url===", ref_name);

		post_data = {
			'ref_id':ref_id,
			'ref_name':ref_name,
			'ref_link':ref_link,
			'ref_desc':ref_desc
		}

		$.post(url, JSON.stringify(post_data), function(data, status) {
			console.log(data,'===data===');
			console.log(status,'====status====');
			if(status == 'success'){
				_this.addClass('add-reference').removeClass('remove-reference').html("Add");
			}
		});

	});
	// $(element).find('.schedule-exam').click(function(){
 //        var create_account_url = runtime.handlerUrl(element, 'create_proctoru_account')

 //        post_data = {
 //            'phone':$(element).find("#phone").val(),
 //            'time_zone':$(element).find("#time-zone option:selected").val(),
 //            'tz_disp_name':$(element).find("#time-zone option:selected").text(),
 //            'address':$(element).find("#address").val(),
 //            'city':$(element).find("#city").val(),
 //            'country':$(element).find("#country option:selected").val(),
 //        }

 //        var validator = createAccountFormValidation(post_data)

 //        if (validator == true){
 //            $.post(create_account_url, JSON.stringify(post_data) , function(data,status) {
 //                if(data.status==="success"){
 //                    // render to schedule page
 //                    location.reload();
 //                }
 //            });
 //        } else {
 //            return false;
 //        }
 //    });
}