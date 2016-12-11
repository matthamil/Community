using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Community.Models;
using Community.Models.AccountViewModels;
using Community.Services;
using Community.Data;
using Community.Models.OrganizationViewModels;

namespace Community.Controllers
{
    /**
     * Class: OrganizationController
     * Purpose: API endpoints for managing organizations
     * Methods:
     *   Get() - Get all organizations
     *   Get(int id) - Get single organization
     *   GetAllVolunteersForOrganization(int id) - All who have volunteered for an organization
     *   Create(Organzation organization) - Create a new organization
     *   Edit(Organization organization) - Edit an existing organization
     *   Delete(int id) - Disable an existing organization
     */
    [Produces("application/json")]
    public class OrganizationController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private ApplicationDbContext context;

        public OrganizationController(UserManager<ApplicationUser> userManager, ApplicationDbContext ctx)
        {
            _userManager = userManager;
            context = ctx;
        }

        private Task<ApplicationUser> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);

        // GET /organization/all
        [HttpGet]
        public async Task<IActionResult> All()
        {
            Organization[] organizations = await (
                from organization in context.Organization.Include(o => o.Organizer)
                where organization.IsActive == true
                select organization).ToArrayAsync();

            if (organizations == null) return NotFound();

            List<OrganizationViewModel> model = new List<OrganizationViewModel>();
            foreach (Organization org in organizations)
            {
                model.Add(new OrganizationViewModel(org));
            }

            return Json(model);
        }

        // GET /organization/id?=3
        [HttpGet]
        public async Task<IActionResult> Id([FromQuery]int id)
        {
            Organization organization = await context.Organization.Include(o => o.Organizer).Where(o => o.OrganizationId == id).SingleOrDefaultAsync();
            if (organization == null) return NotFound();
            return Json(new OrganizationViewModel(organization));
        }

        // GET /organization/organizerId?=cd377dd3-f75e-4ad9-b35c-9aba57a76878
        [HttpGet]
        public async Task<IActionResult> OrganizerId([FromQuery]string id)
        {
            Organization[] organizations = await context.Organization.Include(o => o.Organizer).Where(o => o.Organizer.Id == id).ToArrayAsync();
            if (organizations == null) return NotFound();
            List<OrganizationViewModel> model = new List<OrganizationViewModel>();
            foreach (Organization org in organizations)
            {
                model.Add(new OrganizationViewModel(org));
            }
            return Json(model);
        }

        // GET /organization/location?city=Nashville&state=TN
        [HttpGet]
        public async Task<IActionResult> Location(string city, string state)
        {
            List<Organization> organizations = null;
            if (city != null && state == null)
            {
                organizations = await context.Organization.Include(o => o.Organizer).Where(o => o.City == city).ToListAsync();
            }
            else if (city == null && state != null)
            {
                organizations = await context.Organization.Include(o => o.Organizer).Where(o => o.State == state).ToListAsync();
            }
            else if (city == null && state == null)
            {
                return BadRequest();
            }
            else
            {
                organizations = await context.Organization.Include(o => o.Organizer).Where(o => o.City == city && o.State == state).ToListAsync();
            }
            if (organizations == null) return NotFound();

            List<OrganizationViewModel> model = new List<OrganizationViewModel>();
            foreach (Organization org in organizations)
            {
                model.Add(new OrganizationViewModel(org));
            }
            return Json(model);
        }

        // TODO: Move to a volunteers controller?
        // GET /organization/3/volunteers
        [HttpGet]
        [RouteAttribute("{id}/volunteers")]
        public async Task<IActionResult> GetAllVolunteersForOrganization([FromQuery]int id)
        {
            // ApplicationUser -> EventMember -> Event -> Organization
            // TODO
            // var volunteers = await (
            //     from user in context.ApplicationUser
            //     from eventMember in context.EventMember
            //     from orgEvent in context.Event
            //     where eventMember.VolunteerId == ApplicationUser.Id
            //     where
            //     ).toListAsync();
            return Ok();
        }

        // POST /organization/create
        [HttpPost]
        // [Authorize]
        public async Task<IActionResult> Create([FromBody]OrganizationCreateViewModel organization)
        {
            if (ModelState.IsValid)
            {
                var user = await GetCurrentUserAsync();
                // Uncomment for testing
                // ApplicationUser user = await context.ApplicationUser.SingleAsync(u => u.FirstName == "Matt");

                Organization org = new Organization()
                {
                    Organizer = user,
                    Name = organization.Name,
                    Description = organization.Description,
                    City = organization.City,
                    State = organization.State,
                    IsActive = true
                };

                context.Add(org);

                await context.SaveChangesAsync();

                OrganizationViewModel model = new OrganizationViewModel(org, new ApplicationUserViewModel(user));
                return Json(model);
            }
            return BadRequest();
        }

        [HttpPost]
        // [Authorize]
        public async Task<IActionResult> Edit([FromBody]OrganizationViewModel organization)
        {
            // Confirm that the logged in user is the organizer
            var user = await GetCurrentUserAsync();

            // For testing purposes
            // ApplicationUser user = await context.ApplicationUser.SingleOrDefaultAsync(u => u.FirstName == "Matt");

            Organization originalOrg = await context.Organization.Include(o => o.Organizer).SingleOrDefaultAsync(o => o.OrganizationId == organization.OrganizationId);

            if (originalOrg == null || originalOrg.Organizer != user) {
                return BadRequest(new
                {
                    Error = $"Can't find organization with id {organization.OrganizationId} organized by user {user.FirstName} {user.LastName} with user id {user.Id}.",
                    StatusCode = "400"
                });
            }

            if (ModelState.IsValid)
            {
                originalOrg.OrganizationId = organization.OrganizationId;
                originalOrg.Name = organization.Name;
                originalOrg.Description = organization.Description;
                originalOrg.IsActive = organization.IsActive;
                originalOrg.City = organization.City;
                originalOrg.State = organization.State;

                context.Entry(originalOrg).State = EntityState.Modified;
                context.Update(originalOrg);
                await context.SaveChangesAsync();

                return Json(new OrganizationViewModel(originalOrg, new ApplicationUserViewModel(user)));
            }

            return Json(ModelState);
        }

        [HttpDelete]
        // [Authorize]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            // Confirm that the logged in user is the organizer
            var user = await GetCurrentUserAsync();

            // For testing purposes
            // ApplicationUser user = await context.ApplicationUser.SingleOrDefaultAsync(u => u.FirstName == "Matt");

            Organization originalOrg = await context.Organization.Include(o => o.Organizer).SingleOrDefaultAsync(o => o.OrganizationId == id);

            if (originalOrg == null || originalOrg.Organizer != user) {
                return BadRequest(new
                {
                    Error = $"Can't find organization with id {id} organized by user {user.FirstName} {user.LastName} with user id {user.Id}.",
                    StatusCode = "400"
                });
            }

            originalOrg.IsActive = false;

            context.Entry(originalOrg).State = EntityState.Modified;
            context.Update(originalOrg);
            await context.SaveChangesAsync();

            return new NoContentResult();
        }

    }
}
