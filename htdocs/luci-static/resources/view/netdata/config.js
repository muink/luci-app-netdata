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

		o = s.option(form.Flag, 'logger', _('Enable logger'));
		o.rmempty = true;

		o = s.option(form.Button, '_start', _('Start ') + _('NetData'));
		o.inputtitle = _('Start');
		o.inputstyle = 'apply';
		o.onclick = function() {
			return fs.exec('/etc/init.d/netdata', ['start'])
				.catch(function(e) { ui.addNotification(null, E('p', e.message), 'error') });
		};

		o = s.option(form.Button, '_stop', _('Stop ') + _('NetData'));
		o.inputtitle = _('Stop');
		o.inputstyle = 'reset';
		o.onclick = function() {
			return fs.exec('/etc/init.d/netdata', ['stop'])
				.catch(function(e) { ui.addNotification(null, E('p', e.message), 'error') });
		};

		return m.render();
	}
});
