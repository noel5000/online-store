using Microsoft.OData.Edm;
using Microsoft.OData.ModelBuilder;
using OnlineStore.Data;
using System.Diagnostics.Metrics;

namespace OnlineStore.API
{
    public class ODataConfig
    {
        public static IEdmModel GetEdmModels()
        {
            var modelBuilder = new ODataConventionModelBuilder();
            modelBuilder.EnableLowerCamelCase();
            modelBuilder.EntitySet<Invoice>("Invoice").HasOptionalBinding(e=>e.User, "User");
            modelBuilder.EntitySet<Invoice>("Invoice").HasOptionalBinding(e => e.Product, "Product");
            modelBuilder.EntitySet<Product>("Product");
            modelBuilder.EntitySet<User>("User");
            return modelBuilder.GetEdmModel();
        }
    }
}
