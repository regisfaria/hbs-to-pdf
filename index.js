require('dotenv/config')

const pdf = require('handlebars-pdf');
const fs = require('fs');
const path = require("path");

/////////////////////////////////////// ALTER FILENAME HERE //////////////////////////////////////////////////////
const fileName = 'example.hbs';

const templatesFolder = process.env.TEMPLATES_PATH;
const scriptFolder = path.join(process.cwd());

fs.readFile(`${templatesFolder}/${fileName}`, (err, data) => {
  if (!err) {
    const document = {
      template: data.toString(),
      // add variables values below, when present in hbs file
      context: {},
      path: `${scriptFolder}/pdfs/${new Date().getTime()}.pdf`
    };
  
    pdf.create(document)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    throw Error(`An error occurred: ${err}`)
  }
})


