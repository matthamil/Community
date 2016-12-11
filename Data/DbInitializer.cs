using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Community.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Community.Data
{
    public static class DbInitializer
    {
        public static async void InitializeAsync(IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                // Check for existing users
                if (context.ApplicationUser.Any())
                {
                    return; // DB has been seeded
                }

                ApplicationUser[] users = new ApplicationUser[]
                {
                    new ApplicationUser {
                        FirstName = "Matt",
                        LastName = "Hamil",
                        City = "Nashville",
                        State = "TN",
                        UserName = "matt@matt.com",
                        Email = "matt@matt.com"
                    },
                    new ApplicationUser {
                        FirstName = "Steve",
                        LastName = "Steverson",
                        City = "Nashville",
                        State = "TN",
                        UserName = "steve@steve.com",
                        Email = "steve@steve.com"
                    },
                    new ApplicationUser {
                        FirstName = "Logan",
                        LastName = "Schultz",
                        City = "Hattiesburg",
                        State = "MS",
                        UserName = "logan@logan.com",
                        Email = "logan@logan.com"
                    },
                    new ApplicationUser {
                        FirstName = "Morgan",
                        LastName = "Baker",
                        City = "Hattiesburg",
                        State = "MS",
                        UserName = "morgan@morgan.com",
                        Email = "morgan@morgan.com"
                    },
                    new ApplicationUser {
                        FirstName = "Brian",
                        LastName = "Slater",
                        City = "Gulfport",
                        State = "MS",
                        UserName = "brian@brian.com",
                        Email = "brian@brian.com"
                    }
                };

                var userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();

                foreach (ApplicationUser user in users)
                {
                    await userManager.CreateAsync(user, user.FirstName + "123!");
                }

                context.SaveChanges();  // Seed users added

                Organization[] organizations = new Organization[]
                {
                    new Organization {
                        Name = "Nashville Software School",
                        Description = "Nashville Software School (NSS) is a place where a person with aptitude, motivation, passion, and commitment can learn the craft of software development.",
                        City = "Nashville",
                        State = "TN",
                        IsActive = true,
                        Organizer = context.ApplicationUser.Where(u => u.FirstName == "Steve").SingleOrDefault()
                    },
                    new Organization {
                        Name = "Southern Pines Animal Shelter",
                        Description = "Southern Pines Animal Shelter is an open admission shelter, meaning dogs and cats are accepted without regard to health, age, or perceived adoptability.",
                        City = "Hattiesburg",
                        State = "MS",
                        IsActive = true,
                        Organizer = context.ApplicationUser.Where(u => u.FirstName == "Logan").SingleOrDefault()
                    },
                    new Organization {
                        Name = "Gulf Coast Audiology Association",
                        Description = "Offering free hearing assessments to those in need.",
                        City = "Gulfport",
                        State = "MS",
                        IsActive = true,
                        Organizer = context.ApplicationUser.Where(u => u.FirstName == "Brian").SingleOrDefault()
                    }
                };

                foreach (Organization org in organizations)
                {
                    context.Organization.Add(org);
                }

                context.SaveChanges(); // Added seed organizations

                Event[] events = new Event[]
                {
                    new Event {
                        Organization = context.Organization.Where(o => o.Name == "Nashville Software School").SingleOrDefault(),
                        Name = "Hour of Code",
                        Address = "500 Interstate Blvd S",
                        City = "Nashville",
                        State = "TN",
                        ZipCode = "37210",
                        Date = DateTime.Today.AddDays(2),
                        StartTime = DateTime.Today.AddDays(2).AddHours(3),
                        EndTime = DateTime.Today.AddDays(2).AddHours(4),
                        Description = "Teaching kids the fundamentals of programming in an hour."
                    },
                    new Event {
                        Organization = context.Organization.Where(o => o.Name == "Nashville Software School").SingleOrDefault(),
                        Name = "Highway Cleanup",
                        Address = "500 Interstate Blvd S",
                        City = "Nashville",
                        State = "TN",
                        ZipCode = "37210",
                        Date = DateTime.Today.AddDays(4),
                        StartTime = DateTime.Today.AddDays(4).AddHours(5),
                        EndTime = DateTime.Today.AddDays(4).AddHours(8),
                        Description = "Cleaning up the community"
                    },
                    new Event {
                        Organization = context.Organization.Where(o => o.Name == "Southern Pines Animal Shelter").SingleOrDefault(),
                        Name = "Puppy Therapy",
                        Address = "118 College Drive",
                        City = "Hattiesburg",
                        State = "MS",
                        ZipCode = "39406",
                        Date = DateTime.Today.AddDays(12),
                        StartTime = DateTime.Today.AddDays(12).AddHours(2),
                        EndTime = DateTime.Today.AddDays(12).AddHours(6),
                        Description = "Come adopt a puppy!"
                    }
                };

                foreach (Event e in events)
                {
                    context.Event.Add(e);
                }

                context.SaveChanges(); // Added seed events

                EventMember[] eMembers = new EventMember[]
                {
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Hour of Code").SingleOrDefault(),
                        Volunteer = context.ApplicationUser.Where(u => u.FirstName == "Matt").SingleOrDefault(),
                        StartTime = DateTime.Today.AddDays(2).AddHours(3),
                        EndTime = DateTime.Today.AddDays(2).AddHours(4),
                        JobTitle = "Mentor",
                        Description = "Duties include inspiring kids to learn about tech.",
                        ChatMuted = false,
                        AttendeePoints = 500
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Hour of Code").SingleOrDefault(),
                        Volunteer = context.ApplicationUser.Where(u => u.FirstName == "Steve").SingleOrDefault(),
                        StartTime = DateTime.Today.AddDays(2).AddHours(3),
                        EndTime = DateTime.Today.AddDays(2).AddHours(4),
                        JobTitle = "Mentor",
                        Description = "Duties include inspiring kids to learn about tech.",
                        ChatMuted = false,
                        AttendeePoints = 500
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Highway Cleanup").SingleOrDefault(),
                        Volunteer = context.ApplicationUser.Where(u => u.FirstName == "Matt").SingleOrDefault(),
                        StartTime = DateTime.Today.AddDays(4).AddHours(5),
                        EndTime = DateTime.Today.AddDays(4).AddHours(8),
                        JobTitle = "Street Cleaner",
                        Description = "Duties include wearing a bright orange vest and cleaning the side of the road.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Highway Cleanup").SingleOrDefault(),
                        StartTime = DateTime.Today.AddDays(4).AddHours(5),
                        EndTime = DateTime.Today.AddDays(4).AddHours(8),
                        JobTitle = "Street Cleaner",
                        Description = "Duties include wearing a bright orange vest and cleaning the side of the road.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Highway Cleanup").SingleOrDefault(),
                        StartTime = DateTime.Today.AddDays(4).AddHours(5),
                        EndTime = DateTime.Today.AddDays(4).AddHours(8),
                        JobTitle = "Street Cleaner",
                        Description = "Duties include wearing a bright orange vest and cleaning the side of the road.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Highway Cleanup").SingleOrDefault(),
                        StartTime = DateTime.Today.AddDays(4).AddHours(5),
                        EndTime = DateTime.Today.AddDays(4).AddHours(8),
                        JobTitle = "Street Cleaner",
                        Description = "Duties include wearing a bright orange vest and cleaning the side of the road.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Puppy Therapy").SingleOrDefault(),
                        Volunteer = context.ApplicationUser.Where(u => u.FirstName == "Morgan").SingleOrDefault(),
                        StartTime = DateTime.Today.AddDays(12).AddHours(2),
                        EndTime = DateTime.Today.AddDays(12).AddHours(6),
                        JobTitle = "Dog Pin Supervisor",
                        Description = "We need someone who is willing to watch over the puppies while they are being adopted.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    }
                };

                foreach (EventMember member in eMembers)
                {
                    context.EventMember.Add(member);
                }

                context.SaveChanges(); // Added seed eventmembers
            }
        }
    }
}