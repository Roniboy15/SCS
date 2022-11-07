
const init = () => {
    ShowInfo();
    //CheckWhereBtn();
    Carousel();
}

const ShowInfo = () => {

    let btn = document.querySelector("#btn_show");
    let info_div = document.querySelector("#info_div");
    let counter = 0;

    btn.addEventListener("click", () => {
        counter++;
        if (counter > 1) {
            counter = 0;
            info_div.style.display = "none";
            btn.innerHTML = `v<br>What we offer`;
            //document.querySelector("#btn_div").className = "fixed-bottom"
        }
        else {
            info_div.style.display = "flex";
            btn.innerHTML = `^<br>See Less`;
            //document.querySelector("#btn_div").className = "fixed-top"


            window.scrollTo(0, document.body.scrollHeight)
        }

    })
}

/*const CheckWhereBtn = () => {
    setInterval(() => {
        if (scrollY > 300) {

            document.querySelector("#btn_div").className = "fixed-bottom"
        }
        else {

            document.querySelector("#btn_div").className = "fixed-bottom"

        }
    }, 500)

}*/

const Carousel = () => {

    let bg = document.querySelector("#pic_div");
    let bg2 = document.querySelector("#load_div");
    let counter = 1;
    let counter2 = 2;

    setInterval(() => {

        counter++;
        counter2++;

        bg.style.backgroundImage = 'url(images/' + counter + '.jpg)';
        bg2.style.backgroundImage = 'url(images/' + counter2 + '.jpg)';

        if (counter == 5) counter = 1;
        if (counter2 == 5) counter2 = 1;
    }, 7000)
}

init();