qx.Class.define("rctk.Core",
{
    extend : qx.core.Object,

    construct: function(app) { 
        this.app = app;
        this.root = new rctk.Root(this, app.getRoot());
        this.controls = {0: this.root};
        this.sid = null;
        this.core = new rctk.core();
        this.core.handlers.request = rctk.util.proxy(this.rctk_request, this);
        this.core.handlers.construct = rctk.util.proxy(this.construct_control, this);
        this.radiogroups = {};
    },
    members :
    {
        rctk_request: function(path, callback, sessionid, data) {
            console.log(arguments);
            var req = new qx.io.remote.Request(path, "POST", "application/json");
            req.addListener("completed", function(e) {
                // safari seems to capitalize the headers, and qooxdoo
                // doesn't do a case insentitive match.
                var sid = e.getResponseHeader('rctk-sid') || e.getResponseHeader('Rctk-Sid');
                callback(sid, e.getContent());        
            }, this);
            if(sessionid) {
                req.setRequestHeader('rctk-sid', sessionid);
            }
            if(data) {
                req.setData(data);
            }
            req.setTimeout(100000); // XXX
            req.send();
        },
        construct_control: function(klass, parent, id) {
            var control;
            switch(klass) {
            case "button":
                control = new rctk.Button(this, id);
                break;
            case "window":
                control = new rctk.Window(this, id);
                //this.app.getRoot().add(control);
                break;
            case "statictext":
                control = new rctk.StaticText(this, id);
                break;
            case "statichtmltext":
                control = new rctk.StaticHTMLText(this, id);
                break;
            case "panel":
                control = new rctk.Panel(this, id);
                break;
            case "checkbox":
                control = new rctk.CheckBox(this, id);
                break;
            case "radiobutton":
                control = new rctk.RadioButton(this, id);
                break;
            case "text":
                control = new rctk.Text(this, id);
                break;
            case "date":
                control = new rctk.Date(this, id);
                break;
            case "dropdown":
                control = new rctk.Dropdown(this, id);
                break;
            case "list":
                control = new rctk.List(this, id);
                break;
            case "image":
                control = new rctk.Image(this, id);
                break;
            case "rctk.qx.button":
                control = new rctk.qx.Button(this, id);
                break;
            default:
                this.error("Unknown control: " + klass);
                return;
            }
            control.addListener('event', function(e) { this.event_fired(e); }, this);
            return control;
        },
        run: function() {
            qx.log.Logger.debug("RCTK: start");
            this.core.run(this.root);
        },
        handler: function(task) {
            var control = this.controls[task.id];
            var type = task.type;
            control.handle(type);

        },
        event_fired: function(e) {
            this.debug("Event fired");
            console.log(e);
            var data = e.getData();
            if(data.sync) {
                this.core.push({'method':'sync', 'type':'sync', 
                                'id':data.control.id, 
                                'data':data.control.value()});
            }
            this.core.push({'method':'event', 
                            'type':data.type, 
                            'id':data.control.id, 
                            'data':{}});
            this.core.flush(); 
        },
        sync: function(control) {
            // a control notifies that its value has changed.
            this.core.push({'method':'sync', 
                            'type':'sync',
                            'id':control.id, 
                            'data':control.value()});
            this.core.flush(); 
        },
        get_radiogroup: function(name) {
            if(!(name in this.radiogroups)) {
                this.radiogroups[name] = new qx.ui.form.RadioGroup();
            }
            return this.radiogroups[name];
        }
    }

});

