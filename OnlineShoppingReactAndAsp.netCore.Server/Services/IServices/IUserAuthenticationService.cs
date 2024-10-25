﻿using OnlineShoppingReactAndAsp.netCore.Server.RepoModel;

namespace OnlineShoppingReactAndAsp.netCore.Server.Services.IServices
{
    public interface IUserAuthenticationService
    {
        List<PasswordHashModel> ReturnDecryptPassword(string flag, string UserName, string PasswordHash, string JwtToken);
        List<ResponseCode> LoginResponse(string flag, string UserName, string PasswordHash, string JwtToken);

        List<AccessToken> AccessJwtToken(string flag, string UserName, string PasswordHash, string JwtToken);
    }
}
