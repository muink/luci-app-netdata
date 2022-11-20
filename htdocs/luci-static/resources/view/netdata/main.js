'use strict';
'require view';
'require uci';

return view.extend({
	handleSaveApply: null,
	handleSave: null,
	handleReset: null,

	load: function() {
		return uci.load('netdata');
	},

	render: function() {
		var port = uci.get_first('netdata', 'netdata', 'port') || '19999';
		if (port === '0')
			return E('div', { class: 'alert-message warning' },
					_('Port 0 is not supported.<br />Change to a other port and try again.'));
		return E('iframe', {
			src: window.location.protocol + '//' + window.location.hostname + ':' + port,
			style: 'width: 100%; min-height: 100vh; border: none; border-radius: 3px;'
		});
	}
});
