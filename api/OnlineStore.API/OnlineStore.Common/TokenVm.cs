using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Common
{
    public class TokenVm
    {
        public string? TokenKey { get; set; }
        public string? Expire { get; set; }
        public string? Username { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public char? Gender { get; set; }
        public string[]? Roles { get; set; }
        public string? DocumentId { get; set; }
        public string? Id {get; set;}
    }
}
