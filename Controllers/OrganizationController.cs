using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Community.Models;
using Community.Models.AccountViewModels;
using Community.Services;
using Community.Data;

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
    [Route("api/[controller]")]
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

        // GET api/organization
        [HttpGet]
        public IActionResult Get()
        {
            IQueryable<Organization> organizations = from organization in context.Organization select organization;
            return Json(organizations);
        }

        // GET api/organization/3
        [HttpGet("{id}")]
        public IActionResult Get([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                Organization organization = context.Organization.Single(o => o.OrganizationId == id);
                if (organization == null)
                {
                    return NotFound();
                }
                return Ok(organization);
            }
            catch
            {
                return NotFound();
            }
        }

        // GET api/organization/3/volunteers
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

        [HttpPost]
        // [Authorize]
        public async Task<IActionResult> Create([FromBody]Organization organization)
        {
            ModelState.Remove("organization.Organizer");

            if (ModelState.IsValid)
            {
                var user = await GetCurrentUserAsync();
                var userId = _userManager.GetUserIdAsync(user);
                var claims = await _userManager.GetClaimsAsync(user);
                organization.Organizer = user;

                context.Add(organization);

                await context.SaveChangesAsync();
                return Json(organization);
            }
            return BadRequest();
        }

        [HttpPost]
        // [Authorize]
        public async Task<IActionResult> Edit(Organization organization)
        {
            Organization originalOrg = await context.Organization.SingleAsync(o => o.OrganizationId == organization.OrganizationId);

            if (ModelState.IsValid)
            {
                originalOrg.OrganizationId = organization.OrganizationId;
                originalOrg.Description = organization.Description;
                originalOrg.Organizer = organization.Organizer;
                originalOrg.IsActive = organization.IsActive;

                context.Entry(originalOrg).State = EntityState.Modified;
                context.Update(originalOrg);
                await context.SaveChangesAsync();

                return Json(originalOrg);
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        // [Authorize]
        public async Task<IActionResult> Delete([FromRoute]int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Organization orgToDelete = await context.Organization.SingleAsync(o => o.OrganizationId == id);

                if (orgToDelete == null)
                {
                    return NotFound();
                }

                context.Organization.Remove(orgToDelete);
            }
            catch
            {
                return NotFound();
            }

            try
            {
                await context.SaveChangesAsync();
            }
            catch
            {
                return Forbid();
            }

            return new NoContentResult();
        }

    }
}
