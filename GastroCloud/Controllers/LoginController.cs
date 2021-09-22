using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GastroCloud.Models.Useful;

namespace GastroCloud.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Login(SystemType sys, string user, string password)
        {
            //Here, we have to validate user's ACL according to the selected app in order to get the correct path
            return Json(new {
                path = "/Admin/Home",
                success = true
            });
        }
    }
}