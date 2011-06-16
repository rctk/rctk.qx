qx.Class.define("rctk.Core",
{
    extend : qx.core.Object,

    construct: function(app) { 
        this.app = app;
        this.root = new rctk.Root(app.getRoot());
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
                control = new rctk.Button(id);
                break;
            case "window":
                control = new rctk.Window(id);
                break;
            case "statictext":
                control = new rctk.StaticText(id);
                break;
            case "statichtmltext":
                control = new rctk.StaticHTMLText(id);
                break;
            case "panel":
                control = new rctk.Panel(id);
                break;
            case "checkbox":
                control = new rctk.Checkbox(id);
                break;
            case "text":
                control = new rctk.Text(id);
                break;
            case "date":
                control = new rctk.Date(id);
                break;
            default:
                this.error("Unknown control: " + task.control);
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
            this.core.push({'method':'event', 'type':data.type, 'id':data.control.id, 'data':{}});
            this.core.flush(); 
        }
    }

});

