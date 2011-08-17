qx.Class.define("rctk.Core",
{
    extend : qx.core.Object,

    construct: function(app) { 
        this.app = app;
        this.root = new rctk.Root(this, app.getRoot());
        this.controls = {0: this.root};
        this.sid = null;
        var self=this;
        this.core = new rctk.core();
        this.core.handlers.request = rctk.util.proxy(this.rctk_request, this);
        this.core.handlers.construct = rctk.util.proxy(this.construct_control, this);
    },
    members :
    {
        app: null,

        rctk_request: function(path, callback, sessionid, data) {
            console.log(arguments);
            var req = new qx.io.remote.Request(path, "POST", "application/json");
            req.addListener("completed", function(e) {
                callback(e.getResponseHeader('rctk-sid'), e.getContent());        
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
                control = new rctk.Checkbox(this, id);
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
                                data:{'value':data.control.value()}});
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
        }
    }

});

