qx.Class.define("rctk.List",
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
            this.control = new qx.ui.form.List();
            if('multiple' in data && data.multiple) {
                this.control.setSelectionMode("multi"); 
            }
            else {
                this.control.setSelectionMode("single");
            }
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
            if('item' in data) {
                this.model.push(qx.data.marshal.Json.createModel(
                     {'id':data.item[0], 
                      'label':data.item[1]}));
            }
            if('clear' in data && data.clear) {
                this.model.removeAll();
            }
            if('selection' in data) {
                if(data.selection === null) {
                    this.control.resetSelection();
                }
                else {
                    console.log(data.selection);
                    console.log(this.model);
                    var res = [];
                    for(var i = 0; i < this.model.length; i++) {
                        var m = this.model.getItem(i);
                        if(qx.lang.Array.contains(data.selection, m.get("id"))) {
                            res.push(m);
                        }
                    }
                    console.log(res);
                    this.control.setModelSelection(res);
                }
            }
            if('multiple' in data) {
                if(data.multiple) {
                    this.control.setSelectionMode("multi"); 
                }
                else {
                    this.control.setSelectionMode("single");
                }
            }
            this.install_listeners();
        },
        value: function() {
            var selection = this.controller.getSelection();
            if(selection.length) {
                var res = [];
                var sel = this.controller.getSelection();
                for(var i = 0; i < sel.length; i++) {
                    res.push(sel.getItem(i).get("id"));
                }
                return {'selection':res};
            }
            return {'selection':null};
        }
    }
});

