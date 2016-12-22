using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Community.Models;
using Microsoft.AspNetCore.Identity;
using System.IO;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Community.Data
{
    /**
     * Class: DbInitializer
     * Purpose: Seeds the database with data during development
     * Methods:
     *   InitializeAsync() - Initializes the database
     */
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

                List<ApplicationUser> mockUsers = new List<ApplicationUser>()
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
                    },
                    new ApplicationUser {
                        FirstName = "Boyd",
                        LastName = "Belmont",
                        City = "Nashville",
                        State = "TN",
                        UserName = "boyd@boyd.com",
                        Email = "boyd@boyd.com"
                    },
                    new ApplicationUser {
                        FirstName = "Tamatha",
                        LastName = "Elie",
                        City = "Nashville",
                        State = "TN",
                        UserName = "tamatha@tamatha.com",
                        Email = "tamatha@tamatha.com"
                    },
                    new ApplicationUser {
                        FirstName = "Omega",
                        LastName = "Aldrich",
                        City = "Nashville",
                        State = "TN",
                        UserName = "omega@omega.com",
                        Email = "omega@omega.com"
                    },
                    new ApplicationUser {
                        FirstName = "Ralph",
                        LastName = "Maskell",
                        City = "Nashville",
                        State = "TN",
                        UserName = "ralph@ralph.com",
                        Email = "ralph@ralph.com"
                    },
                    new ApplicationUser {
                        FirstName = "Kristen",
                        LastName = "Raphael",
                        City = "Nashville",
                        State = "TN",
                        UserName = "kristen@kristen.com",
                        Email = "kristen@kristen.com"
                    },
                    new ApplicationUser {
                        FirstName = "Joseph",
                        LastName = "Lumpkins",
                        City = "Nashville",
                        State = "TN",
                        UserName = "joseph@joseph.com",
                        Email = "joseph@joseph.com"
                    },
                    new ApplicationUser {
                        FirstName = "Brant",
                        LastName = "Pergande",
                        City = "Hattiesburg",
                        State = "MS",
                        UserName = "brant@brant.com",
                        Email = "brant@brant.com"
                    }
                    // more new users...
                };

                using (StreamReader r = File.OpenText("./Data/MOCK_USER_DATA_NASHVILLE.json"))
                {
                    string json = r.ReadToEnd();
                    mockUsers.AddRange(JsonConvert.DeserializeObject<List<ApplicationUser>>(json));
                }

                var userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();

                foreach (ApplicationUser user in mockUsers)
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
                        Organizer = context.ApplicationUser.Where(u => u.FirstName == "Steve").FirstOrDefault()
                    },
                    new Organization {
                        Name = "Mercy Multiplied",
                        Description = "Mercy Multiplied is a nonprofit Christian organization that helps young women break free from life-controlling behaviors and situations, including eating disorders, self-harm, drug and alcohol addictions, unplanned pregnancy, depression, sexual abuse, and sex trafficking. Our residential program is voluntary, biblically based, and completely free of charge to young women ages 13-28. Our goal is to help residents permanently stop destructive cycles, discover purpose for their lives, and become productive and thriving individuals. Our outreach programs and resources are based on the same biblically based, life-transforming principles used by Mercy homes.",
                        City = "Nashville",
                        State = "TN",
                        IsActive = true,
                        Organizer = context.ApplicationUser.OrderBy(u => Guid.NewGuid()).Where(u => u.City == "Nashville" && u.State == "TN").First()
                    },
                    new Organization {
                        Name = "Tennessee Big Fluffy Dog Rescue",
                        Description = "We are a not for profit 501c3 dog rescue that specializes in the rescue of giant breed working dogs. All our dogs are in private foster homes.",
                        City = "Nashville",
                        State = "TN",
                        IsActive = true,
                        Organizer = context.ApplicationUser.OrderBy(u => Guid.NewGuid()).Where(u => u.City == "Nashville" && u.State == "TN").First()
                    },
                    new Organization {
                        Name = "Tennessee Women's Theater Project",
                        Description = "Each year, we present two professional stage plays plus our annual Women's Work showcase and celebration of works created by women. We choose plays that meet our mission criteria: to present productions of the highest quality; to express the human condition in the female voice; to provide professional opportunities to female actors, designers and stage managers; and to introduce live theater to new and underserved audiences.",
                        City = "Nashville",
                        State = "TN",
                        IsActive = true,
                        Organizer = context.ApplicationUser.OrderBy(u => Guid.NewGuid()).Where(u => u.City == "Nashville" && u.State == "TN").First()
                    },
                    new Organization {
                        Name = "Homework Hotline",
                        Description = "Homework Hotline provides one-on-one free tutoring by phone to Middle Tennessee students and parents.  With Homework Hotline, students tackle new concepts, complete challenging homework, and gain academic skills.",
                        City = "Nashville",
                        State = "TN",
                        IsActive = true,
                        Organizer = context.ApplicationUser.OrderBy(u => Guid.NewGuid()).Where(u => u.City == "Nashville" && u.State == "TN").First()
                    },
                    new Organization {
                        Name = "Southern Pines Animal Shelter",
                        Description = "Southern Pines Animal Shelter is an open admission shelter, meaning dogs and cats are accepted without regard to health, age, or perceived adoptability.",
                        City = "Hattiesburg",
                        State = "MS",
                        IsActive = true,
                        Organizer = context.ApplicationUser.Where(u => u.FirstName == "Logan").FirstOrDefault()
                    },
                    new Organization {
                        Name = "Gulf Coast Audiology Association",
                        Description = "Offering free hearing assessments to those in need.",
                        City = "Gulfport",
                        State = "MS",
                        IsActive = true,
                        Organizer = context.ApplicationUser.Where(u => u.FirstName == "Brian").FirstOrDefault()
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
                    },
                    new Event {
                        Organization = context.Organization.Where(o => o.Name == "Mercy Multiplied").SingleOrDefault(),
                        Name = "Benefit Concert",
                        Address = "1 Cannery Row",
                        City = "Nashville",
                        State = "TN",
                        ZipCode = "37203",
                        Date = DateTime.Today.AddDays(20),
                        StartTime = DateTime.Today.AddDays(20).AddHours(3),
                        EndTime = DateTime.Today.AddDays(20).AddHours(4),
                        Description = "Raising money for Mercy Multiplied with a show by Moon Taxi."
                    },
                    new Event {
                        Organization = context.Organization.Where(o => o.Name == "Mercy Multiplied").SingleOrDefault(),
                        Name = "Holiday Dinner",
                        Address = "303 Demonbreun St",
                        City = "Nashville",
                        State = "TN",
                        ZipCode = "37201",
                        Date = DateTime.Today.AddDays(4),
                        StartTime = DateTime.Today.AddDays(4).AddHours(3),
                        EndTime = DateTime.Today.AddDays(4).AddHours(7),
                        Description = "A delicious dinner celebrating the 2016 accomplishments for Mercy Multiplied."
                    },
                    new Event {
                        Organization = context.Organization.Where(o => o.Name == "Tennessee Big Fluffy Dog Rescue").SingleOrDefault(),
                        Name = "Adoptathon",
                        Address = "2500 West End Ave",
                        City = "Nashville",
                        State = "TN",
                        ZipCode = "37203",
                        Date = DateTime.Today.AddDays(17),
                        StartTime = DateTime.Today.AddDays(17).AddHours(2),
                        EndTime = DateTime.Today.AddDays(17).AddHours(10),
                        Description = "We have 7 dogs who need to find a good home! Come help us find a lovely home for these loveable creatures."
                    },
                    new Event {
                        Organization = context.Organization.Where(o => o.Name == "Tennessee Big Fluffy Dog Rescue").SingleOrDefault(),
                        Name = "Dog Food Drive",
                        Address = "3021 Lealand Ln",
                        City = "Nashville",
                        State = "TN",
                        ZipCode = "37204",
                        Date = DateTime.Today.AddDays(8),
                        StartTime = DateTime.Today.AddDays(8).AddHours(1),
                        EndTime = DateTime.Today.AddDays(8).AddHours(9),
                        Description = "Help us collect dog food for our dogs!"
                    },
                    new Event {
                        Organization = context.Organization.Where(o => o.Name == "Tennessee Women's Theater Project").SingleOrDefault(),
                        Name = "Hamlet Performance",
                        Address = "2500 West End Ave",
                        City = "Nashville",
                        State = "TN",
                        ZipCode = "37203",
                        Date = DateTime.Today.AddDays(17),
                        StartTime = DateTime.Today.AddDays(17).AddHours(2),
                        EndTime = DateTime.Today.AddDays(17).AddHours(10),
                        Description = "We will be putting on a free show to the community in Centennial Park."
                    },
                    new Event {
                        Organization = context.Organization.Where(o => o.Name == "Tennessee Women's Theater Project").SingleOrDefault(),
                        Name = "Romeo and Juliet Performance",
                        Address = "2500 West End Ave",
                        City = "Nashville",
                        State = "TN",
                        ZipCode = "37203",
                        Date = DateTime.Today.AddDays(18),
                        StartTime = DateTime.Today.AddDays(18).AddHours(2),
                        EndTime = DateTime.Today.AddDays(18).AddHours(10),
                        Description = "We will be putting on a free show to the community in Centennial Park."
                    },
                    new Event {
                        Organization = context.Organization.Where(o => o.Name == "Homework Hotline").SingleOrDefault(),
                        Name = "Math Tutoring",
                        Address = "4805 Park Avenue",
                        City = "Nashville",
                        State = "TN",
                        ZipCode = "37209",
                        Date = DateTime.Today.AddDays(12),
                        StartTime = DateTime.Today.AddDays(12).AddHours(2),
                        EndTime = DateTime.Today.AddDays(12).AddHours(10),
                        Description = "We need math tutors to help students in the community."
                    },
                    new Event {
                        Organization = context.Organization.Where(o => o.Name == "Homework Hotline").SingleOrDefault(),
                        Name = "History Tutoring",
                        Address = "4805 Park Avenue",
                        City = "Nashville",
                        State = "TN",
                        ZipCode = "37209",
                        Date = DateTime.Today.AddDays(13),
                        StartTime = DateTime.Today.AddDays(13).AddHours(2),
                        EndTime = DateTime.Today.AddDays(13).AddHours(10),
                        Description = "We need history tutors to help students in the community."
                    },
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
                        ApplicationUser = context.ApplicationUser.Where(u => u.FirstName == "Matt").FirstOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Hour of Code").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Hour of Code").SingleOrDefault().EndTime,
                        JobTitle = "Mentor",
                        Description = "Duties include inspiring kids to learn about tech.",
                        ChatMuted = false,
                        AttendeePoints = 500
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Hour of Code").SingleOrDefault(),
                        ApplicationUser = context.ApplicationUser.Where(u => u.FirstName == "Steve").FirstOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Hour of Code").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Hour of Code").SingleOrDefault().EndTime,
                        JobTitle = "Mentor",
                        Description = "Duties include inspiring kids to learn about tech.",
                        ChatMuted = false,
                        AttendeePoints = 500
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Highway Cleanup").SingleOrDefault(),
                        ApplicationUser = context.ApplicationUser.Where(u => u.FirstName == "Matt").FirstOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Highway Cleanup").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Highway Cleanup").SingleOrDefault().EndTime,
                        JobTitle = "Street Cleaner",
                        Description = "Duties include wearing a bright orange vest and cleaning the side of the road.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Highway Cleanup").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Highway Cleanup").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Highway Cleanup").SingleOrDefault().EndTime,
                        JobTitle = "Street Cleaner",
                        Description = "Duties include wearing a bright orange vest and cleaning the side of the road.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Highway Cleanup").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Highway Cleanup").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Highway Cleanup").SingleOrDefault().EndTime,
                        JobTitle = "Street Cleaner",
                        Description = "Duties include wearing a bright orange vest and cleaning the side of the road.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Highway Cleanup").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Highway Cleanup").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Highway Cleanup").SingleOrDefault().EndTime,
                        JobTitle = "Street Cleaner",
                        Description = "Duties include wearing a bright orange vest and cleaning the side of the road.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Puppy Therapy").SingleOrDefault(),
                        ApplicationUser = context.ApplicationUser.Where(u => u.FirstName == "Morgan").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Puppy Therapy").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Puppy Therapy").SingleOrDefault().EndTime,
                        JobTitle = "Dog Pin Supervisor",
                        Description = "We need someone who is willing to watch over the puppies while they are being adopted.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Benefit Concert").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Benefit Concert").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Benefit Concert").SingleOrDefault().EndTime,
                        JobTitle = "Checkin Table Worker",
                        Description = "You will be checking tickets and selling tickets to those attending.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Benefit Concert").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Benefit Concert").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Benefit Concert").SingleOrDefault().EndTime,
                        JobTitle = "Cleanup Crew",
                        Description = "Responsible for cleaning and sweeping after the event.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Holiday Dinner").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Holiday Dinner").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Holiday Dinner").SingleOrDefault().EndTime,
                        JobTitle = "Greeter",
                        Description = "Responsible for welcoming all of our guests and sponsors.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Adoptathon").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Adoptathon").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Adoptathon").SingleOrDefault().EndTime,
                        JobTitle = "Puppy Caretaker",
                        Description = "Help us keep the puppies entertained as they're being adopted.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Adoptathon").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Adoptathon").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Adoptathon").SingleOrDefault().EndTime,
                        JobTitle = "Puppy Caretaker",
                        Description = "Help us keep the puppies entertained as they're being adopted.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Adoptathon").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Adoptathon").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Adoptathon").SingleOrDefault().EndTime,
                        JobTitle = "Puppy Caretaker",
                        Description = "Help us keep the puppies entertained as they're being adopted.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Dog Food Drive").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Dog Food Drive").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Dog Food Drive").SingleOrDefault().EndTime,
                        JobTitle = "Marketing Representative",
                        Description = "Help us spread the word to local businesses about the dog food drive.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Dog Food Drive").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Dog Food Drive").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Dog Food Drive").SingleOrDefault().EndTime,
                        JobTitle = "Marketing Representative",
                        Description = "Help us spread the word to local businesses about the dog food drive.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Hamlet Performance").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Hamlet Performance").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Hamlet Performance").SingleOrDefault().EndTime,
                        JobTitle = "Ticketbooth Volunteer",
                        Description = "Responsibilities include selling tickets to attendees.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Hamlet Performance").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Hamlet Performance").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Hamlet Performance").SingleOrDefault().EndTime,
                        JobTitle = "Ticketbooth Volunteer",
                        Description = "Responsibilities include selling tickets to attendees.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Romeo and Juliet Performance").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Romeo and Juliet Performance").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Romeo and Juliet Performance").SingleOrDefault().EndTime,
                        JobTitle = "Ticketbooth Volunteer",
                        Description = "Responsibilities include selling tickets to attendees.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Romeo and Juliet Performance").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Romeo and Juliet Performance").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Romeo and Juliet Performance").SingleOrDefault().EndTime,
                        JobTitle = "Ticketbooth Volunteer",
                        Description = "Responsibilities include selling tickets to attendees.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Math Tutoring").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Math Tutoring").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Math Tutoring").SingleOrDefault().EndTime,
                        JobTitle = "Math Tutor",
                        Description = "Help out high school students enrolled in Algebra 1.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Math Tutoring").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Math Tutoring").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Math Tutoring").SingleOrDefault().EndTime,
                        JobTitle = "Math Tutor",
                        Description = "Help out high school students enrolled in Algebra 1.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "Math Tutoring").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "Math Tutoring").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "Math Tutoring").SingleOrDefault().EndTime,
                        JobTitle = "Math Tutor",
                        Description = "Help out high school students enrolled in Algebra 1.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "History Tutoring").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "History Tutoring").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "History Tutoring").SingleOrDefault().EndTime,
                        JobTitle = "History Tutor",
                        Description = "Help out high school students enrolled in World History 1.",
                        ChatMuted = false,
                        AttendeePoints = 250
                    },
                    new EventMember {
                        Event = context.Event.Where(e => e.Name == "History Tutoring").SingleOrDefault(),
                        StartTime = context.Event.Where(e => e.Name == "History Tutoring").SingleOrDefault().StartTime,
                        EndTime = context.Event.Where(e => e.Name == "History Tutoring").SingleOrDefault().EndTime,
                        JobTitle = "History Tutor",
                        Description = "Help out high school students enrolled in World History 1.",
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