using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Community.Models;
using Community.Models.AccountViewModels;
using Community.Data;
using Community.Models.OrganizationViewModels;
using System;

namespace Community.Controllers
{
    /**
     * Class: OrganizationController
     * Purpose: Manages Organization API endpoints
     * Methods:
     *   Get([FromQuery]string city, [FromQuery]string state) - Get organizations, all by default or search by city and/or state
     *   GetById([FromRoute]int id) - Get single organization
     *   OrganizerId([FromRoute]string id) - Get organizations organized by user
     *   Post([FromBody]OrganizationCreateViewModel organization) - Create a new organization
     *   Patch([FromRoute]int id, [FromBody]OrganizationViewModel organization) - Edit an existing organization
     *   Delete([FromRoute]int id) - Disable an existing organization
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

        /**
         * GET /organization/all
         * Purpose: Get all organizations
         * Return:
         *      List<OrganizationViewModel>
         */
        /**
         * GET /organization/location?city=Nashville&state=TN
         * Purpose: Search for organizations by city and/or state
         * Args:
         *      string city - (Optional) search by city
         *      string state - (Optional) search by state
         * Return:
         *      List<OrganizationViewModel>
         */
        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> Get([FromQuery]string city, [FromQuery]string state)
        {
            List<Organization> organizations = new List<Organization>();
            if (city != null && state == null)
            {
                organizations = await context.Organization.Include(o => o.Organizer).Where(o => o.City == city && o.IsActive == true).ToListAsync();
            }
            else if (city == null && state != null)
            {
                organizations = await context.Organization.Include(o => o.Organizer).Where(o => o.State == state && o.IsActive == true).ToListAsync();
            }
            else if (city == null && state == null)
            {
                organizations = await context.Organization.Include(o => o.Organizer).Where(o => o.IsActive == true).ToListAsync();
            }
            else
            {
                organizations = await context.Organization.Include(o => o.Organizer).Where(o => o.City == city && o.State == state && o.IsActive == true).ToListAsync();
            }
            if (organizations == null) return NotFound();
            List<OrganizationViewModel> model = new List<OrganizationViewModel>();
            foreach (Organization org in organizations)
                model.Add(new OrganizationViewModel(org));
            return Json(model);
        }

        /**
         * GET /organization/3
         * Purpose: Get a specific organization by ID
         * Args:
         *      int id - Organization ID
         * Return:
         *      OrganizationViewModel
         */
        [HttpGet]
        [Route("[controller]/{id}")]
        public async Task<IActionResult> GetById([FromRoute]int id)
        {
            Organization organization = await context.Organization.Include(o => o.Organizer).Where(o => o.OrganizationId == id).SingleOrDefaultAsync();
            if (organization == null) return NotFound();
            return Json(new OrganizationViewModel(organization));
        }

        /**
         * GET /organization/organizerId/cd377dd3-f75e-4ad9-b35c-9aba57a76878
         * Purpose: Get a list of organizations organized by a specific user
         * Args:
         *      string id - User id
         * Return:
         *      List<OrganizationViewModel>
         */
        [HttpGet]
        [Route("[controller]/organizerId/{id}")]
        public async Task<IActionResult> OrganizerId([FromRoute]string id)
        {
            Organization[] organizations = await context.Organization.Include(o => o.Organizer).Where(o => o.Organizer.Id == id && o.IsActive == true).ToArrayAsync();
            if (organizations == null) return NotFound();
            List<OrganizationViewModel> model = new List<OrganizationViewModel>();
            foreach (Organization org in organizations)
            {
                model.Add(new OrganizationViewModel(org));
            }
            return Json(model);
        }

        /**
         * POST /organization/
         * Purpose: Create a new organization
         * Args:
         *      OrganizationCreateViewModel organization - New organization
         * Return:
         *      OrganizationViewModel
         */
        [HttpPost]
        [Route("[controller]")]
        // [Authorize]
        public async Task<IActionResult> Post([FromBody]OrganizationCreateViewModel organization)
        {
            if (ModelState.IsValid)
            {
                var user = await GetCurrentUserAsync();
                // For testing purposes, uncomment the line below and comment the GetCurrentUserAsync() line.
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

        /**
         * PATCH /organization/3
         * Purpose: Edit an existing organization
         * Args:
         *      int id - Organization id
         *      OrganizationViewModel - Existing organization with updated fields
         * Return:
         *      OrganizationViewModel
         */
        [HttpPatch]
        [Route("[controller]/{id}")]
        // [Authorize]
        public async Task<IActionResult> Patch([FromRoute]int id, [FromBody]EditOrganizationViewModel organization)
        {
            if (ModelState.IsValid)
            {
                // Confirm that the logged in user is the organizer
                var user = await GetCurrentUserAsync();

                // For testing purposes
                // ApplicationUser user = await context.ApplicationUser.SingleOrDefaultAsync(u => u.FirstName == "Matt");

                Organization originalOrg = await context.Organization.Include(o => o.Organizer).Where(o => o.Organizer.Id == user.Id).SingleOrDefaultAsync();

                // Organization must be organized by the current user
                if (originalOrg == null) {
                    return BadRequest(new
                    {
                        Error = $"Can't find organization with id {id} organized by user {user.FirstName} {user.LastName} with user id {user.Id}.",
                        StatusCode = "400"
                    });
                }

                originalOrg.Name = organization.Name;
                originalOrg.Description = organization.Description;
                originalOrg.City = organization.City;
                originalOrg.State = organization.State;

                context.Entry(originalOrg).State = EntityState.Modified;
                context.Update(originalOrg);
                await context.SaveChangesAsync();

                return Json(new OrganizationViewModel(originalOrg, new ApplicationUserViewModel(user)));
            }
            return Json(ModelState);
        }

        /**
         * DELETE /organization/3
         * Purpose: Deletes an organization, all of their future events, and any event members & chat messages for those events
         * Args:
         *      int id - Organization ID
         * Return:
         *      NoContentResult
         */
        [HttpDelete]
        [Route("[controller]/{id}")]
        // [Authorize]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            // Confirm that the logged in user is the organizer
            var user = await GetCurrentUserAsync();

            // For testing purposes, uncomment the line below and comment the GetCurrentUserAsync() line.
            // ApplicationUser user = await context.ApplicationUser.SingleOrDefaultAsync(u => u.FirstName == "Matt");

            Organization originalOrg = await context.Organization.Include(o => o.Organizer).Where(o => o.OrganizationId == id && o.IsActive == true).SingleOrDefaultAsync();

            if (originalOrg == null || originalOrg.Organizer != user) {
                return BadRequest(new
                {
                    Error = $"Can't find active organization with id {id} organized by user {user.FirstName} {user.LastName} with user id {user.Id}.",
                    StatusCode = "400"
                });
            }

            originalOrg.IsActive = false;

            // Remove all future events from database
            Event[] organizationEvents = await context.Event.Include(e => e.Organization).Where(e => e.Organization.OrganizationId == id && e.Date > DateTime.Now).ToArrayAsync();
            // Remove all event members from future events from database
            EventMember[] eventMembers = await context.EventMember.Include(e => e.Event).ThenInclude(ev => ev.Organization).Where(e => e.Event.Organization.OrganizationId == id && e.Event.Date > DateTime.Now).ToArrayAsync();
            // Remove all chatroom messages from future events from database
            EventChatroomMessage[] chatMessages = await context.EventChatroomMessage.Include(e => e.EventMember).ThenInclude(ev => ev.Event).ThenInclude(eve => eve.Organization).Where(e => e.EventMember.Event.Organization.OrganizationId == id && e.EventMember.Event.Date > DateTime.Now).ToArrayAsync();

            context.RemoveRange(chatMessages);
            context.RemoveRange(eventMembers);
            context.RemoveRange(organizationEvents);

            context.Entry(originalOrg).State = EntityState.Modified;
            context.Update(originalOrg);
            await context.SaveChangesAsync();

            return new NoContentResult();
        }

    }
}
