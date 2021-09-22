using System.Web;
using System.Web.Optimization;

namespace GastroCloud
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/content/css").Include(
                     "~/Content/CSS/Template/Icons/material_icons.css",
                     "~/Content/CSS/Template/Icons/fontawesome.css",
                     "~/Content/CSS/Alertify/alertify.min.css",
                     "~/Content/CSS/Alertify/default.min.css",
                     "~/Content/CSS/Template/Helper/basic.css",
                     "~/Content/CSS/Template/Scroll/scroll.css",
                     "~/Content/CSS/Template/Helper/basic.css",
                     "~/Content/CSS/Template/Helper/style.css",
                     "~/Content/CSS/Template/Helper/accent.css"
                     ));

            bundles.Add(new StyleBundle("~/content/fancybox").Include(
                   "~/Content/CSS/Template/Helper/fancybox.css"
                   ));

            bundles.Add(new ScriptBundle("~/bundles/fancybox").Include(
                      "~/Scripts/Template/Fancybox/fancybox.js"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/mainresources").Include(
                      "~/Scripts/Template/Dashboard/jquery.min.js",
                      "~/Scripts/Template/JQuery/jquery.min.js",
                      "~/Scripts/Template/Dashboard/popper.min.js"
                      ));


            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/Scripts/Template/Bootstrap/bootstrap-notify.js",
                        "~/Scripts/Template/Bootstrap/bootstrap-selectpicker.js",
                        "~/Scripts/Template/Bootstrap/bootstrap-datetimepicker.min.js",
                         "~/Scripts/Template/JQuery/jquery.dataTables.min.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/material").Include(
                       "~/Scripts/Template/Material/core/bootstrap-material-design.min.js",
                       "~/Scripts/Template/Material/plugins/moment.min.js",
                       "~/Scripts/Template/Material/material-dashboard.min.js"
                       ));


            bundles.Add(new ScriptBundle("~/bundles/alerts").Include(
                        "~/Scripts/Template/Alertify/alertify.min.js",
                        "~/Scripts/Template/Material/plugins/sweetalert2.js",
                        "~/Scripts/Template/PushNotification/push-notification.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/useful").Include(
                        "~/Scripts/Class/Session/session.js",
                        "~/Scripts/Useful/useful.js",
                        "~/Scripts/Useful/jquery.freezeheader.js"
                        ));

            bundles.Add(new StyleBundle("~/content/monitor").Include(
                   "~/Content/CSS/Template/Wizard/style.css"
                   ));

            bundles.Add(new ScriptBundle("~/bundles/monitor").Include(
                       "~/Scripts/Class/Orders/order_timer.js",
                       "~/Scripts/Class/Orders/Monitor/monitor.js",
                       "~/Scripts/Class/Orders/order.js",
                       "~/Scripts/Class/Orders/Containment/containment.js",
                       "~/Scripts/Class/Notifications/notification.js",
                       "~/Scripts/Template/Wizard/jquery.backstretch.min.js",
                       "~/Scripts/Template/Wizard/retina-1.1.0.min.js",
                       "~/Scripts/Template/Wizard/scripts.js"
                       ));

            bundles.Add(new ScriptBundle("~/bundles/charts").Include(
                      "~/Scripts/Template/Chart/highcharts.js",
                      "~/Scripts/Template/Chart/annotations.js",
                      "~/Scripts/Template/Chart/drilldown.js",
                      "~/Scripts/Template/Chart/hseries-label.js",
                      "~/Scripts/Template/Chart/exporting.js",
                      "~/Scripts/Template/Chart/export-data.js"
                      ));

            bundles.Add(new StyleBundle("~/content/handsontable").Include(
                   "~/Content/CSS/Template/Handsontable/handsontable.full.min.css"
                   ));

            bundles.Add(new ScriptBundle("~/bundles/handsontable").Include(
                       "~/Scripts/Template/Handsontable/handsontable.full.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/order_form").Include(
                       "~/Scripts/Class/Orders/order_timer.js",
                       "~/Scripts/Class/Orders/Reassignment/reassignment.js",
                       "~/Scripts/Class/Orders/FormActions/form.js",
                       "~/Scripts/Class/Orders/FormActions/spareparts.js",
                       "~/Scripts/Class/Orders/order.js",
                       "~/Scripts/Class/Orders/Containment/containment.js",
                       "~/Scripts/Class/Notifications/notification.js",
                       "~/Scripts/Template/Wizard/jquery.backstretch.min.js",
                       "~/Scripts/Template/Wizard/retina-1.1.0.min.js",
                       "~/Scripts/Template/Wizard/scripts.js"
                       ));

            bundles.Add(new ScriptBundle("~/bundles/scanner").Include(
                     "~/Scripts/Scanner/filereader.js",
                     "~/Scripts/Scanner/qrcodelib.js",
                     "~/Scripts/Scanner/webcodecamjs.js",
                     "~/Scripts/Scanner/serialscanner.js"
                     ));


            bundles.Add(new StyleBundle("~/content/daterangepicker").Include(
                  "~/Content/CSS/Template/Helper/daterangepicker.css"
                  ));

            bundles.Add(new ScriptBundle("~/bundles/daterangepicker").Include(
                   "~/Scripts/Template/Daterangepicker/jquery.min.js",
                   "~/Scripts/Template/Daterangepicker/moment.min.js",
                   "~/Scripts/Template/Daterangepicker/es.js",
                   "~/Scripts/Template/Daterangepicker/daterangepicker.min.js"
                   ));



            bundles.Add(new ScriptBundle("~/bundles/notification").Include(
                    "~/Scripts/Template/PushNotification/push-notification.js",
                       "~/Scripts/Notifications/notification.js"
                       ));
            
        }
    }
}
