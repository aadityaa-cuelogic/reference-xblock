function ReferenceBlock(runtime, element){
	// console.log("This is ReferenceBlock Js Function Called", runtime);

	$(".save-reference-link").on('click', function(){
		// console.log("Save click");
		var _this = $(this);
		var data_arr = [];
		$('#referenceapp_table .reference-data.ref-link-exists').each(function () {
			console.log($(this).find('.reference-link').attr('rel'));
			var temp = {
				'ref_id':$(this).attr('rel'),
				'ref_name':$(this).find('.reference-name').attr('rel'),
				'ref_link':$(this).find('.reference-link').attr('rel'),
				'ref_desc':$(this).find('.reference-desc').attr('rel')
			}
			data_arr.push(temp);
		});
		var url = runtime.handlerUrl(element, 'studio_submit')
		post_data = data_arr;
		// console.log(post_data,'===post data===');

		$.post(url, JSON.stringify(post_data), function(data, status) {
			// console.log(data,'===data===');
			// console.log(status,'====status====');
			if(status == 'success'){
				window.location.reload();
			}
		});
	});

	$(".add-reference").on('click', function(){
		console.log("Add Reference btn click");
		var _this = $(this);
		var ref_id = _this.attr('rel');
		var data_row = _this.closest('.reference-data');
		if(!data_row.hasClass('ref-link-exists')){
			data_row.addClass('ref-link-exists');
			_this.addClass('remove-reference').removeClass('add-reference').html("Remove");
		}
		/*
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
		*/
	});

	$(".remove-reference").on('click', function(){
		console.log("Remove Reference btn click");
		var _this = $(this);
		var ref_id = _this.attr('rel');
		var data_row = _this.closest('.reference-data');
		data_row.removeClass('ref-link-exists');
		_this.addClass('add-reference').removeClass('remove-reference').html("Add");
		
		// console.log("Remove Reference btn click");
		// var _this = $(this);
		// var ref_id = _this.attr('rel');
		// var data_row = _this.closest('.reference-data');
		// var ref_name = data_row.find('.reference-name').attr('rel');
		// var ref_link = data_row.find('.reference-link').attr('rel');
		// var ref_desc = data_row.find('.reference-desc').attr('rel');

		// var url = runtime.handlerUrl(element, 'studio_remove_submit')
		// console.log(url, "===url===", ref_name);

		// post_data = {
		// 	'ref_id':ref_id,
		// 	'ref_name':ref_name,
		// 	'ref_link':ref_link,
		// 	'ref_desc':ref_desc
		// }

		// $.post(url, JSON.stringify(post_data), function(data, status) {
		// 	console.log(data,'===data===');
		// 	console.log(status,'====status====');
		// 	if(status == 'success'){
		// 		_this.addClass('add-reference').removeClass('remove-reference').html("Add");
		// 	}
		// });
		
	});
}