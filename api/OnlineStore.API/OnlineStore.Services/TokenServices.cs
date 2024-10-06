using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using OnlineStore.Common;
using OnlineStore.Data;

namespace OnlineStore.Services;

public class TokenServices
{
    private readonly AppSettings _appSettings;

    public TokenServices(AppSettings appSettings)
    {
        _appSettings = appSettings;
    }

    public TokenVm? Generate(User appUser, string[]? roles = null)
    {

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Name,  $"{appUser.FirstName} {appUser.LastName}"),
            new Claim(JwtRegisteredClaimNames.FamilyName,  $"{appUser.LastName}"),
            new Claim(JwtRegisteredClaimNames.GivenName,  $"{appUser.FirstName}"),
            new Claim(JwtRegisteredClaimNames.Email,  appUser.UserName),
            new Claim(JwtRegisteredClaimNames.Sid, appUser.Id.ToString()),
            new Claim("Roles", JsonConvert.SerializeObject(roles?? [])),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.TokenKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expiration = DateTime.UtcNow.AddHours(_appSettings.TokenTime);
       //var expiration =    Server.GetDateNow().AddSeconds(10);
        JwtSecurityToken token = new JwtSecurityToken(
            issuer: _appSettings.Domain,
            audience: _appSettings.Domain,
            claims: claims,
           expires: expiration,
            signingCredentials: creds
        );
        return new TokenVm {
            TokenKey = new JwtSecurityTokenHandler().WriteToken(token),
            Expire =  expiration.Year + "-" + expiration.Month + "-" + expiration.Day + " " +  expiration.Hour +":"+  expiration.Minute+ ":"+ expiration.Second,
            FirstName = appUser.FirstName, 
            LastName = appUser.LastName, 
            Username = appUser.UserName,
            Roles = roles,
            DocumentId = appUser.DocumentId,
            Id = appUser.Id
        };

    }
}