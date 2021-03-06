/**
 * Created by son on 2019-03-13.
 */
var clientConfig = {
	removeNodeLimit: 200,
	chartDataLimit: 6,
	checkedLib: function () {
		return $('input[id=libCheck]').is(':checked');
	},
	checkedLog: function () {
		return $('input[id=logCheck]').is(':checked');
	},
	checkedError: function () {
		return $('input[id=errorCheck]').is(':checked');
	},
	checkedAccess: function () {
		return $('input[id=accessCheck]').is(':checked');
	},

	readOnlyKeys: ['serverPort', 'ajpProtocol', 'ajpPort', 'ajpEnabled']
};
