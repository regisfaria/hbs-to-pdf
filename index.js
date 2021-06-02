require('dotenv/config')

const pdf = require('handlebars-pdf');
const fs = require('fs');
const path = require("path");

/////////////////////////////////////// ALTER FILENAME HERE //////////////////////////////////////////////////////
const fileName = 'standard_template.hbs';

const templatesFolder = process.env.TEMPLATES_PATH;
const scriptFolder = path.join(process.cwd());

fs.readFile(`${templatesFolder}/${fileName}`, (err, data) => {
  if (!err) {
    const document = {
      template: data.toString(),
      // add variables values below, when present in hbs file
      context: {
        title: `Olá, NomeUser! Há algum problema com suas imagens de verificação! O que pode ser?`,
        content: `Verifique se o ambiente está bem iluminado e se as imagens não ficaram tremidas. É muito importante tirar a Selfie segurando o mesmo documento enviado, precisamos ver você :) Para a validação da sua conta PandaPay, aceitamos RG e ou CNH como documento e ele  precisa estar em bom estado, com a expedição com prazo máximo de 10 anos, lembrando que também não são aceitas cópias ou imagens da tela do seu computador ou celular. Tudo isso para você utilizar com o máximo nível de segurança.`,
      },
      path: `${scriptFolder}/pdfs/${new Date().getTime()}.pdf`
    };
  
    pdf.create(document)
      .then(response => {
        console.log(`PDF created at: ${response.filename}`);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    throw Error(`An error occurred: ${err}`)
  }
})


