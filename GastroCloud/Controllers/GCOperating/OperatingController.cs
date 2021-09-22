using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GastroCloud.Controllers
{
    public class OperatingController : Controller
    {
        // GET: Operating
        public ActionResult Home()
        {
            return View("Home/Home");
        }
    }
}