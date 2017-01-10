using System;
using System.Collections.Generic;
using System.Linq;

namespace Community.Models.EventChatroomMessageViewModels
{
    public class Author
    {
        public Author() { }
        public Author(EventMember[] eMember)
        {
            FirstName = eMember[0].ApplicationUser.FirstName;
            LastName = eMember[0].ApplicationUser.LastName;
            Titles = new List<string>();
            if (eMember.Length > 0)
            {
                foreach (EventMember member in eMember)
                {
                    if (!Titles.Contains(member.JobTitle))
                    {
                        Titles.Add(member.JobTitle);
                    }
                }
            }
        }
        public Author(ApplicationUser organizer)
        {
            FirstName = organizer.FirstName;
            LastName = organizer.LastName;
            Organizer = true;
        }
        public Author(ApplicationUser organizer, EventMember[] eMember)
        {
            FirstName = organizer.FirstName;
            LastName = organizer.LastName;
            Organizer = true;
            Titles = new List<string>();
            if (eMember.Length > 0)
            {
                foreach (EventMember member in eMember)
                {
                    if (!Titles.Contains(member.JobTitle))
                    {
                        Titles.Add(member.JobTitle);
                    }
                }
            }
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<string> Titles { get; set; }
        public bool Organizer { get; set; }
    }
}