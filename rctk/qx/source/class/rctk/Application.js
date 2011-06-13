
/* ************************************************************************

#asset(rctk/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "rctk"
 */
qx.Class.define("rctk.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.core.Init.getApplication().getRoot().setNativeContextMenu(true);
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */
      //var main = new rctk.Window("rctk");
      //main.open();
      
      // name somewhat conflicting with rctk.core -- make it qxCore?
      var core = new rctk.Core(this);
      core.run();
    }
  }
});
