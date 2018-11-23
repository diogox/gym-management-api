namespace GymAPI.Models
{
    public class SupportTicket
    {
        public long Id { get; set; }
        public string Message { get; set; }
        public Client Client { get; set; }
    }
}