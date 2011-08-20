qx.Class.define("rctk.Dropdown",
{
    extend : rctk.Base,

    construct : function(core, id) {
        this.base(arguments, core, id);
    },
    members: {
        clicked: function(e) {
            if(this.enabled.click) {
                qx.log.Logger.debug("Button clicked");
                this.fireDataEvent('event', {'type':'click', 
                                             'control':this, 'sync':true});
            }
            else {
                this.core.sync(this);
            }
        },
        create: function(data) {
            this.control = new qx.ui.form.SelectBox();
            this.model = new qx.data.Array();

            if(data.items) {
                for(var i=0; i < data.items.length; i++) {
                    this.model.push(qx.data.marshal.Json.createModel(
                         {'id':data.items[i][0], 
                          'label':data.items[i][1]}));
                }
            }
            this.controller = new qx.data.controller.List(this.model, 
                                                          this.control, 
                                                          "label");

            this.install_listeners();
        },
        install_listeners: function() {
            this.changeselection = this.control.addListener("changeSelection", 
                 function(e) { this.clicked(e); }, this);
        },
        remove_listeners: function() {
            if(this.changeselection) {
                this.control.removeListenerById(this.changeselection);
            }
            this.changeselection = null;
        },
        set_properties: function(data) {
            this.remove_listeners();
            if('selection' in data) {
                if(data.selection === null) {
                    this.control.resetSelection();
                }
                else {
                    for(var i = 0; i < this.model.length; i++) {
                        var m = this.model.getItem(i);
                        if(m.get("id") == data.selection) {
                            this.control.setModelSelection([m]);
                            break; // single select
                        }
                    }
                }
            }
            else if('item' in data) {
                this.model.push(qx.data.marshal.Json.createModel(
                     {'id':data.item[0], 
                      'label':data.item[1]}));
            }
            else if('clear' in data && data.clear) {
                this.model.removeAll();
            }
            this.install_listeners();
        },
        value: function() {
            var selection = this.controller.getSelection();
            if(selection.length) {
                return {'selection':this.controller.getSelection().getItem(0).get("id")};
            }
            return {'selection':null};
        }
    }
});

