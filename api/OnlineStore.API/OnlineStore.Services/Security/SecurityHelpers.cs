using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using OnlineStore.Common;
using System.IdentityModel.Tokens.Jwt;

namespace Microsoft.AspNetCore.Http
{
    public static class SecurityHelpers
    {
       public static string GetUserId(this HttpRequest request, HttpContext httpContext)
       {
         if (httpContext is null)
                {
                   return string.Empty;
                }

                var currentToken = httpContext!.Request.Headers.FirstOrDefault(x => x.Key == "Authorization").Value.ToString();

                try
                {
                    if (string.IsNullOrEmpty(currentToken) || !currentToken.Contains("Bearer"))
                        return string.Empty;

                    string? token = currentToken.Split(" ")?.LastOrDefault();
                    var tokenObject = new JwtSecurityTokenHandler().CanReadToken(token) is false ? null : new JwtSecurityTokenHandler().ReadJwtToken(token);
                    if(tokenObject is null)
                        return string.Empty;
                    return tokenObject.Claims.FirstOrDefault(x=> x.Type == "sid")?.Value ?? "";


                }
                catch
                {
                    return string.Empty;
                }
       }
    }
}
