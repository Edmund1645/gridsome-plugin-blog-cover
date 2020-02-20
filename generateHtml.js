module.exports = function(title, { backgroundColors, imgHeight, imgWidth, border }) {
  const bgColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

  console.log(backgroundColors, bgColor, imgHeight, imgWidth, border);

  const template = `
    <html>
      <head>
        <style>
          * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
          }

          body{
            min-width: ${imgWidth};
            min-height: ${imgHeight};
            padding: 40px;
            background: ${bgColor};
            color: #ffffff;
            font-family:  -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
            font-size: 2rem;
            text-transform: capitalize;
          }

          div.container{
            border: ${border ? '3px solid #ffffff' : 'none'};
            text-align: left;
            padding: 30px;
            width: 100%;
            height: 100%
          }
        </style>
      </head>
      <body>
          <div class="container">
            <h1>${title}</h1>
          </div>
      </body>
    </html>
  `;
  return template;
};
