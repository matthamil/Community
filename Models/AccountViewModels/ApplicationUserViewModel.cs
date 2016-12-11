namespace Community.Models.AccountViewModels
{
    public class ApplicationUserViewModel
    {
        public ApplicationUserViewModel() { }
        public ApplicationUserViewModel(ApplicationUser user)
        {
            FirstName = user.FirstName;
            LastName = user.LastName;
            City = user.City;
            State = user.State;
            Id = user.Id;
        }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Id { get; set; }
    }
}
