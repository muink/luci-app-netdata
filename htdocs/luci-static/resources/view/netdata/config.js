'use strict';
'require view';
'require form';

return view.extend({
//	handleSaveApply: null,
//	handleSave: null,
//	handleReset: null,

	load: function() {
	return Promise.all([
		uci.load('netdata'),
	]);
	},

	render: function(res) {

		var m, s, o;

		m = new form.Map('netdata');

		s = m.section(form.TypedSection, 'netdata');
		s.anonymous = true;

		o = s.option(form.Flag, 'enabled', _('Enable'));
		o.rmempty = false;

		o = s.option(form.Value, 'port', _('Service port'));
		o.datatype = 'port';
		o.placeholder = '19999';
		o.rmempty = false;

		return m.render();
	}
});
