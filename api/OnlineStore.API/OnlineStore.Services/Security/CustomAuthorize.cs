using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using OnlineStore.Common;
using System.IdentityModel.Tokens.Jwt;

namespace OnlineStore.Services.Security
{
    public class CustomAuthorize : TypeFilterAttribute
    {
        public CustomAuthorize(string[] roles) : base(typeof(ClaimRequirementFilter))
        {
            Arguments = [roles];
        }

        public class ClaimRequirementFilter : IAuthorizationFilter
        {
            readonly string[] _roles;
            readonly IHttpContextAccessor _httpContextAccessor;

            public ClaimRequirementFilter(string[] roles, IHttpContextAccessor httpContextAccessor)
            {
                _roles = roles;
                _httpContextAccessor = httpContextAccessor;
            }

            public void OnAuthorization(AuthorizationFilterContext context)
            {
                if (_httpContextAccessor is null || _httpContextAccessor.HttpContext is null)
                {
                    context.Result = new ForbidResult();
                    return;
                }

                bool isInvalid = false;
                var currentToken = _httpContextAccessor!.HttpContext!.Request.Headers.FirstOrDefault(x => x.Key == "Authorization").Value.ToString();

                try
                {

                    if (string.IsNullOrEmpty(currentToken) || !currentToken.Contains("Bearer"))
                        isInvalid = true;

                    if (isInvalid is false)
                    {
                        string? token = currentToken.Split(" ")?.LastOrDefault();
                        var tokenObject = new JwtSecurityTokenHandler().CanReadToken(token) is false ? null : new JwtSecurityTokenHandler().ReadJwtToken(token);
                        if (tokenObject is null || tokenObject.ValidTo < DateTime.Now)
                        {
                            context.Result = new ForbidResult();
                            return;
                        }
                        var userRoles = tokenObject.Claims.Any(x => x.Type == "Roles") ? JsonConvert.DeserializeObject<string[]>(tokenObject.
                            Claims.First(x => x.Type == "Roles").Value) : null;

                        if (userRoles is null)
                            context.Result = new ForbidResult();

                        if (userRoles!.Contains("Administrator"))
                            return;

                        else if (userRoles is not null && userRoles.Length > 0)
                        {
                            if (_roles.Intersect(userRoles).Count() == 0)
                                context.Result = new ForbidResult();
                        }
                    }
                    else
                        context.Result = new ForbidResult();
                }
                catch
                {
                    context.Result = new ForbidResult();
                }

            }
        }
    }
}
