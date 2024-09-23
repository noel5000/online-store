

using OnlineStore.Common;
using OnlineStore.Services;

namespace OnlineStore.Services.Email;

public class EmailTemplates : SmtpEmailServices
{
    public EmailTemplates(EmailSettings emailSettings, string to, string subject, string body) : base(emailSettings, to, subject, body)
    {
    }

    public EmailTemplates(EmailSettings emailSettings) : base(emailSettings)
    {
    }

    public async Task SendFormLink(string to, string url, string password)
    {

        Body = "<div style=\"background-color: #ffffff; padding: 20px;\">" +
              $"<p style=\"font-size: 16px; line-height: 1.5; margin-bottom: 20px;\">Ha recibido este correo para proceder a {"Comprado"} el" +
              "<b> Formulario de debida diligencia</b>. </p>" +
              //(emailType == EmailTypes.NewRequest ? $"{$"<br /><p> Su contrasena provisional es: <b>{password}</b></p><br />"}":"") +
              "<p> Para acceder al mismo por" +
              "favor presione el siguiente botón:" +
              "</p>" +
              "<a href=\"" + url + "\" style=\"background-color:#000066; padding: 10px 20px; border:none; border-radius: 4px; cursor:pointer; color:#ffffff; text-decoration: none;  display: inline-block; \">Acceder</a>" +
              "</div>";
        To = to;
        Subject ="";

        await Send();
    }



}