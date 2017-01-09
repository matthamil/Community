using System;
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
            if (eMember.Length > 1)
            {
                for (int i = 0; i < eMember.Length - 1; i++)
                {
                    if (!Title.Contains(eMember[i].JobTitle))
                    {
                        Title += eMember[i].JobTitle + ", ";
                    }
                }
            }
            else
            {
                Title = eMember[0].JobTitle;
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
            if (eMember.Length > 1)
            {
                for (int i = 0; i < eMember.Length - 1; i++)
                {
                    if (!Title.Contains(eMember[i].JobTitle))
                    {
                        Title += eMember[i].JobTitle + ", ";
                    }
                }
            }
            else
            {
                Title = eMember[0].JobTitle;
            }
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public bool Organizer { get; set; }
    }
}