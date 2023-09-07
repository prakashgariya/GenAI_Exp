(function () {

    const jQueryScript = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js";
    let template = document.createElement("template");
    template.innerHTML = `
    <style>
    .textarea {
        width:100%;
        height:514px;
    }
    .img {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    
    </style>
    <div>
    <img id="image" class="img" src="https://prakashgariya.github.io/GenAI_Exp/VishalKrish.png" alt="Finance Analyst" width="200px" height="450px"/>
    <textarea id="textArea" name="textArea" class="textarea">Generated Insights will show up here</textarea>
    </div>
    `;
//<button class="button">Generate Insights</button>
// .button {
//     background-color: #4CAF50;
//     border: none;
//     color: white;
//     padding: 15px 32px;
//     text-align: center;
//     text-decoration: none;
//     display: inline-block;
//     font-size: 16px;
//     margin: 4px 2px;
//     cursor: pointer;
//     width:100%;
// }
    class CloudFunction extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(template.content.cloneNode(true));

            //this._button = this._shadowRoot.querySelector('button');
            this._iamge = this._shadowRoot.getElementById('image')
            this._button.addEventListener('click', this._onButtonClick.bind(this));

            this._shadowRoot.querySelector('textArea').hidden = true;

        }

        _onButtonClick(event) {
            let sToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzOGMwNmM2MjA0NmMyZDk0OGFmZmUxMzdkZDUzMTAxMjlmNGQ1ZDEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjE4MTA0NzA4MDU0LTlyOXMxYzRhbGczNmVybGl1Y2hvOXQ1Mm4zMm42ZGdxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0Mzc4MzE0ODMyNjg4MzIxNzgwIiwiaGQiOiJkZWxvaXR0ZS5jb20iLCJlbWFpbCI6InVzYS1wZ2FyaXlhQGRlbG9pdHRlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiY1N2U2REb0VXejkyeTZ2czFlUC1iUSIsIm5iZiI6MTY5NDEwMjEzOSwiaWF0IjoxNjk0MTAyNDM5LCJleHAiOjE2OTQxMDYwMzksImp0aSI6Ijg1NWQyZDBhOWYxMTc3MTYzZDNkYmVlZjVjNjJhMWRhMjk3YWVjNmIifQ.CBvSHuOx8aHSUuQ_3EfQ048lcWMacBCAUJ6q_fKDpSTTN0kRWfmMkJOaF3Hp8ZpzNuOaAYfE-DhjzYBjiNpnpWnugx7HVUcmHXdxxR7lz1chQJeqlx4Xo7dcw_LnVhoe2-Zze8jgOo3oDDBT7hDKAQcViLFYSOhdYY2-NapGHblAolrnbYC4fTZ6WmQg0DeWTIaYNAzfIh4iVi4kzpWU3TJ9I_adFhql-bMaRo55LPu_qvoHolDJVCdt2U6hToySA8ql_kduTDg_zWh3THGLv41mdaAWW63amlQRhmbwDVyVWdfvnTF5HPkhIVwyclNS8BJQqhjWW9boyBx86mxhEQ";
            var textArea = this.shadowRoot.getElementById('textArea');
            var image = this.shadowRoot.getElementById('image');
            image.hidden = true;
            // this._shadowRoot.querySelector(".img").style.display = "None";
            image.style.display = "None";
            textArea.hidden = false;
            textArea.value = "Fetching Insights....";
            jQuery.ajax({
                url: "https://us-central1-us-gcp-ame-con-e74c9-sbx-1.cloudfunctions.net/GCF_Gen_Analytics_trigger",
                type: "GET",
                crossDomain: true,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + sToken);
                },
                crossDomain: true,
                error: function (err) {
                    console.log("Error");
                    textArea.value = err.responseText;
                },
                success: function (data, textStatus) {
                    console.log("Success");
                    textArea.value = data;
                }
            });
        }
    }

    customElements.define('sac-cloudfunction-exp', CloudFunction);
})();