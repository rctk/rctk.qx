qx.Class.define("rctk.Core",
{
    extend : qx.core.Object,
    construct: function(app) { 
        this.app = app;
        this.controls = {0: new rctk.Root(app.getRoot())};
        this.sid = null;
            var self=this;
            rctk.core.handlers.request = rctk.util.proxy(this.rctk_request, this);
            rctk.core.handlers.handle = rctk.util.proxy(this.handle_task, this);
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
        run: function() {
            qx.log.Logger.debug("RCTK: start");
            rctk.core.run();
        },
        handle_task: function(task) {
            this.debug("RCTK: task:");
            //qx.dev.Debug.debugObject(task);
            console.log(task);


            switch(task.action) {
            case "append":
                this.append(task);
                break;
            case "remove":
                break;
            case "create":
                this.create(task);
                break;
            case "destroy":
                break;
            case "update":
                this.update(task);
                break;
            case "call":
                break;
            case "handler":
                this.handler(task);
                break;
            case "layout":
                this.layout(task);
                break;
            case "relayout":
                this.relayout(task);
                break;
            case "timer":
                break;
            }
        },
        create: function(task) {
            var control;
            switch(task.control) {
            case "button":
                qx.log.Logger.debug("Setting button text to " + task.text);
                control = new rctk.Button(task.id, task.text);
                break;
            case "window":
                control = new rctk.Window(task.id, task.title);
                break;
            case "statictext":
                control = new rctk.StaticText(task.id, task.text);
                break;
            case "statichtmltext":
                control = new rctk.StaticHTMLText(task.id, task.text);
                break;
            case "panel":
                control = new rctk.Panel(task.id);
                break;
            case "checkbox":
                control = new rctk.Checkbox(task.id, task.text);
                break;
            case "text":
                control = new rctk.Text(task.id, task);
                break;
            case "date":
                control = new rctk.Date(task.id, task);
                break;
            default:
                this.error("Unknown control: " + task.control);
                return;
                break;
            }
            this.controls[task.id] = control;
            control.addListener('event', function(e) { this.event_fired(e); }, this);
        },
        update: function(task) {
            var control = this.controls[task.id];
            control.update(task.update);
        },
        append: function(task) {
            var container = this.controls[task.id];
            var child = this.controls[task.child];

            container.add(child, task);
        },
        layout: function(task) {
            // invoked when layout is set, contains explicit configuration
            var container = this.controls[task.id];
            container.setLayout(task.type);

        },
        relayout: function(task) {
            // invoked when relayout is done, after explicit layout(). Contains calculated config
            var container = this.controls[task.id];
            container.performLayout(task.config);
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
            rctk.core.push({'method':'event', 'type':data.type, 'id':data.control.id, 'data':{}});
            rctk.core.flush(); 
        },
    }

});

