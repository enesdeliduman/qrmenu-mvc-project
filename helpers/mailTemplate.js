const mailTemp = (type, message, name, token) => {
    if (type == "message") {
        return (
            `<!DOCTYPE html>
<html lang="tr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href=" https://fonts.googleapis.com">
    <link rel="preconnect" href=" https://fonts.gstatic.com" crossorigin>
    <link href=" https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap" rel="stylesheet">
    <style>
        *,
        *::after,
        *::before {
            margin: 0;
            padding: 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

        body {
            background-color: aliceblue;
            font-family: "Ubuntu", sans-serif;
            font-weight: 400;
        }
        
        header {
            background-color: #FF5733;
            text-align: start;
            padding: 2rem 3rem;
            font-weight: 700;
        }

        header h1 {
            color: white;
        }

        section {
            text-align: start;
            padding: 2rem 3rem;
        }
    </style>
</head>

<body>
    <header>
        <h1><b>${process.env.SITE_NAME}</b></h1>
    </header>
    <section>
        <p>Merhaba, ${name}</p>
        <br>
        <p>${message}</p>
        <br>
        <br>
        <br>
        <p><b>Sağlıklı günler dileriz.</b></p>
        <p><b>${process.env.SITE_NAME} ekibi.</b></p>
    </section>
</body>

</html>`
        )
    } else if (type == "forgotPassword") {
        return (
            `<!DOCTYPE html>
<html lang="tr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href=" https://fonts.googleapis.com">
    <link rel="preconnect" href=" https://fonts.gstatic.com" crossorigin>
    <link href=" https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap" rel="stylesheet">
    <style>
        *,
        *::after,
        *::before {
            margin: 0;
            padding: 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

        body {
            background-color: aliceblue;
            font-family: "Ubuntu", sans-serif;
            font-weight: 400;
        }
        
        header {
            background-color: #FF5733;
            text-align: start;
            padding: 2rem 3rem;
            font-weight: 700;
        }

        header h1 {
            color: white;
        }

        section {
            text-align: start;
            padding: 2rem 3rem;
        }
    </style>
</head>

<body>
    <header>
        <h1><b>${process.env.SITE_NAME}</b></h1>
    </header>
    <section>
        <p>Merhaba, ${name}</p>
        <br>
        <p>
        Şifre sıfırlama talebiniz alınmıştır. Şifrenizi yeniden belirlemek için aşağıdaki bağlantıya tıklayın:

        ${token}

        Bu bağlantı güvenlik nedenleriyle belirli bir süre geçerli olacaktır. Bağlantıyı aldıktan sonra 10 dakika içinde kullanmanız önerilir. Bağlantı süresi dolduysa, şifre sıfırlama işlemi için yeniden talepte bulunabilirsiniz.
                
        Eğer bu talebi siz yapmadıysanız, bu e-postayı dikkate almayabilirsiniz. Güvenliğiniz bizim için önemlidir ve herhangi bir sorun yaşamanız durumunda destek ekibimizle iletişime geçebilirsiniz.
                
        Herhangi bir sorun yaşarsanız veya yardım ihtiyaç duyarsanız, lütfen destek ekibimizle iletişime geçmekten çekinmeyin.
        </p>
        <br>
        <br>
        <br>
        <p><b>Sağlıklı günler dileriz.</b></p>
        <p><b>${process.env.SITE_NAME} ekibi.</b></p>
    </section>
</body>

</html>`)
    }
}
module.exports = { mailTemp };