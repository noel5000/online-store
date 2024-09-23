using System.Net;
using System.Net.Mail;
using OnlineStore.Common;

namespace OnlineStore.Services;

public class SmtpEmailServices : IDisposable
{
    private readonly EmailSettings _emailSettings;
    public string To { get; set; }
    public string Copy { get; set; }
    public string Bcc { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
    public Attachment[] Attachment { get; set; }

    public SmtpEmailServices(EmailSettings emailSettings, string to, string subject, string body)
    {
        _emailSettings = emailSettings;
        To = to;
        Subject = subject;
        Body = body;
    }

    public SmtpEmailServices(EmailSettings emailSettings)
    {
        _emailSettings = emailSettings;
    }


    public async Task Send()
    {
        try
        {
            using (SmtpClient client = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.SmtpPort))

            {
                client.Credentials = new NetworkCredential(_emailSettings.User, _emailSettings.Password);
                client.EnableSsl = _emailSettings.Ssl;
                client.Timeout = 9000;
                MailMessage mail = new MailMessage();

                mail.From = new MailAddress(_emailSettings.Replay);
                mail.IsBodyHtml = true;
                foreach (string s in ClearMail(To))
                {
                    mail.To.Add(s.Trim());

                }
                foreach (string s in ClearMail(Copy))
                {
                    mail.CC.Add(s.Trim());
                }

                foreach (string s in ClearMail(Bcc))
                {
                    mail.Bcc.Add(s.Trim());
                }

                mail.Subject = Subject;
                mail.Body = Header(_emailSettings.EmailLogoUrl??"") + Body + Footer();
                mail.IsBodyHtml = true;

                if (Attachment != null)
                {
                    foreach (Attachment a in Attachment)
                    {
                        mail.Attachments.Add(a);
                    }
                }
                await client.SendMailAsync(mail);
            }

        }
        catch (Exception ex)
        {
            throw ex;
        }

    }

    private string[] ClearMail(string mail)
    {
        return !string.IsNullOrEmpty(mail) ? mail.Split(Convert.ToChar(";")) : new string[0];
    }


    public void Dispose()
    {

    }



    private string Header(string logoUrl)
    {


        return
            "<div style=\"font-family: Roboto; margin: 0; padding: 0; background-color: #ffffff; color: #333333;\">" +
            "<div style=\"width: 100%; max-width: 600px; margin: 20px auto; text-align: center;\">" +
            "<div  style=\"background-color: #ffffff; padding: 20px;\">" +
            $"<img src=\"{logoUrl}\" alt=\"logolex\" >" +
            "</div>";


    }






    private string Footer()
    {
        return "</div>" +
                       "<div  style=\"background-color: #f8f9fa; padding: 20px; text-align: center;\">" +
                       "<p style=\"color: #333333; font-size: 14px;\">Lex - República Dominicana - info@lex.com</p>" +
                       "<!-- Agregar información de contacto -->" +
                       "</div>" +
                       "</div>";
    }


}

