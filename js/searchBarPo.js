const searchForm = document.querySelector('.search');
const input = document.querySelector('.input');
const newsList = document.querySelector('.news-list');
const result = document.querySelector('.result');
searchForm.addEventListener('submit', retrieve)
function retrieve(e) {
    newsList.innerHTML = '';

    e.preventDefault()
    const apikey = '7852479235e34a35a344d9fb58f557c9'
    let text = input.value;

    let url =
        `https://newsapi.org/v2/everything?q=${text}&political&from=2022-05-16&sortBy=publishedAt&apiKey=${apikey}`;

    if (text !== null && text !== '' && text.length >= 2) {
        fetch(url).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);

            let splittedText = Array.from(text.split(" "));
            let isTrue = text.includes(".");
            let validation = 0;

            if (data.status === 'ok' && data.totalResults > 0) {

                let articles = Array.from(data.articles);

                articles.forEach(article => {
                    console.log(article.description);

                    let tempValidation = 0;

                    splittedText.forEach(word => {

                        if (article.title.includes(word)) {
                            tempValidation = tempValidation + 1;
                        }

                    });

                    if (tempValidation > validation) {
                        validation = tempValidation;
                    }
                });

                let halfLength = splittedText.length / 2;

                if (validation > halfLength || isTrue) {
                    swal({
                        icon: "success",
                    });
                } else {
                    swal({
                        icon: "error",
                    });
                }



            } else {
                if (isTrue) {
                    swal({
                        icon: "success",
                    });
                } else {
                    swal({
                        icon: "error",
                    });
                }

            }



        });
    }
}