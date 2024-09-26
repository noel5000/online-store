

using OnlineStore.Common;
using OnlineStore.Data;
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


    public async Task SendInvoiceAsync(Invoice invoice)
    {

        Body = "<div style=\"background-color: #ffffff; padding: 20px;\">" +
              $"<b2>Hola {invoice.User?.FirstName}</b2> <br />" +
              $"<p>Gracias por comprar en nuestra plataforma</p> <br />";
        To = invoice.User?.Email;
        Subject = $"Confirmación de order {invoice.OrderId}";

      //  await SendAsync();
    }



}