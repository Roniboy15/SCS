const init = () => {
showInfo();
}

const showInfo = () => {

    let btn = document.querySelector("#btn_show");
    let info_div = document.querySelector("#info_div");
    let counter = 0;
    btn.addEventListener("click", () => {
        counter++;
        if(counter>1){
            counter = 0;
            info_div.style.display = "none";
            btn.innerHTML = `v<br>See More`;
        }
        else{
            info_div.style.display = "flex";
            btn.innerHTML = `^<br>See Less`;
        }

    })
}

init();