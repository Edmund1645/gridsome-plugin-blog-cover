module.exports = function(title, { backgroundColors, imgHeight, imgWidth, border, domain }) {
  const bgColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

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
          }

          div.container{
            border: ${border ? '3px solid #ffffff' : 'none'};
            text-align: left;
            padding: 30px;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between
          }
          h1.title{
            font-size: 3.7rem;
            text-transform: capitalize;
          }
          p.domain{
            justify-contnet: flex-end;
            text-align: right;
            font-style: italic
          }
        </style>
      </head>
      <body>
          <div class="container">
            <h1 class="title">${title}</h1>

            <p class="domain">${domain}</p>
          </div>
      </body>
    </html>
  `;
  return template;
};
