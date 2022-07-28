export const generateTemplate = (mode, filenameArr, appEntry) => {
  return `<!DOCTYPE html>
    <html>
      <head>
        <title>Home VJ</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300" rel="stylesheet">
        ${mode === "prod" ? `<link rel="stylesheet" type="text/css" href="${process.env.HOST || ""}/static/${filenameArr.find((filename) => filename.substr(-4) == ".css")}">` : ""}
      </head>
      <body id="body" style="margin:0">
        <div id="${appEntry}"></div>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

        <script src="${process.env.HOST || ""}/static/${filenameArr.find((filename) => filename.substr(-3) == ".js")}"></script>
      </body>
    </html>`;
};
