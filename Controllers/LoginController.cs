using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace AspNetCoreVueStarter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpGet()]
        public object GetToken()
        {
            var usuarioAD = HttpContext.User.Identity.Name;
            var expiration = DateTime.UtcNow.AddDays(7);
            var secretKey = "55edcc86-f002-4bea-8662-93e041f521dd";
            var issuer = "Autologin";
            var audience = "MITMA";
            return GenerateToken(secretKey, usuarioAD, issuer, audience, expiration);
        }
        string GenerateToken(string secretKey, string identity, string issuer, string audience, DateTime expiration)
        {
            if (identity == null)
                return string.Empty;
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = issuer,
                Audience = audience,
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, identity),
                    //new Claim("role", rol)

                }),
                Expires = expiration,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
