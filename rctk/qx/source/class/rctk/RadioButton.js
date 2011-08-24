qx.Class.define("rctk.RadioButton",
{
    extend : rctk.Base,

    construct : function(core, id)
    {
        this.base(arguments, core, id);
    },
    members: {
        create: function(data) {
            this.control = new qx.ui.form.RadioButton(data.text || '');
            if('checked' in data) {
                this.control.setValue(data.checked);
            }
            this.control.addListener("execute", function(e) { this.clicked(e); }, this);
        },
        clicked: function(e) {
            if(this.enabled.click) {
                this.fireDataEvent('event', {'type':'click', 'control':this, 
                                             'sync':true});
            }
            else {
                this.core.sync(this);
            }
        },
        set_properties: function(data) {
            if('text' in data) {
                this.control.setLabel(data.checked);
            }
            if('checked' in data) {
                this.control.setValue(data.checked);
            }
            if('group' in data && data.group) {
                // make this something static in rctk.RadioButton?
                var g = this.core.get_radiogroup(data.group);
                g.add(this.control);
            }
        },
        value: function() {
            return {'checked':this.control.getValue()};
        }
    }
});

