namespace OnlineShoppingReactAndAsp.netCore.Server.RepoModel
{
    public class UserShippingAddress
    {
        public int Id { get; set; } // Represents the primary key of the table
        public int UserId { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNo { get; set; } 
        public string ShippingAddress { get; set; } 
    }
}
