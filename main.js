function setUp(){
    const imgStop = document.getElementsByClassName("img-stop");
    for(const button of imgStop){
        button.addEventListener("click", function (e){
            toggleImage(e.target);
        });
    }

    const switchImage = document.getElementsByClassName("switch");
    for(const element of switchImage){
        const id = element.getAttribute("id");
        const initialDelay = Math.random() * 4000 + 1000;
        setTimeout(() => changeImages(id), initialDelay);
    }

}

function changeImages(imgID){
    const imgElement = document.getElementById(imgID);
    const imgSets = {
        'img-1': [
            "https://cdn.pixabay.com/photo/2024/08/29/10/01/nature-9006428_1280.jpg",
            "https://cdn.pixabay.com/photo/2024/09/05/17/31/moutains-9025523_1280.jpg",
            "https://cdn.pixabay.com/photo/2024/08/18/14/34/folkstone-8978132_1280.jpg"
        ],
        'img-2': [
            "https://cdn.pixabay.com/photo/2024/09/05/08/24/mountain-9024209_1280.jpg",
            "https://cdn.pixabay.com/photo/2024/09/02/15/06/sunset-9017041_1280.jpg",
            "https://cdn.pixabay.com/photo/2023/09/03/12/16/lizard-8230594_1280.png"
        ],
        'img-3': [
            "https://cdn.pixabay.com/photo/2024/09/01/14/02/spider-9014068_1280.jpg",
            "https://cdn.pixabay.com/photo/2024/09/02/20/49/goat-9017896_1280.jpg",
            "https://cdn.pixabay.com/photo/2023/09/12/04/46/bird-8247917_1280.jpg"
        ],
        'img-4': [
            "https://cdn.pixabay.com/photo/2024/07/31/15/10/blue-8935074_1280.jpg",
            "https://cdn.pixabay.com/photo/2022/03/27/14/32/rotterdam-7095262_1280.jpg",
            "https://cdn.pixabay.com/photo/2024/08/06/14/43/dolphin-8949505_1280.jpg"
        ],
        'img-5': [
            "https://cdn.pixabay.com/photo/2024/06/22/15/56/boat-8846578_1280.jpg",
            "https://cdn.pixabay.com/photo/2023/03/27/06/06/drops-7879899_1280.jpg",
            "https://cdn.pixabay.com/photo/2022/05/31/21/29/eurasian-pygmy-owl-7234331_1280.jpg"
        ],
        'img-6': [
            "https://cdn.pixabay.com/photo/2023/08/01/06/19/iceberg-8162195_1280.jpg",
            "https://cdn.pixabay.com/photo/2023/05/05/11/01/grebe-7972183_1280.jpg",
            "https://cdn.pixabay.com/photo/2023/08/01/06/19/iceberg-8162195_1280.jpg"
        ],
        'img-7': [
            "https://cdn.pixabay.com/photo/2024/03/02/19/29/yellow-fruits-8609272_1280.jpg",
            "https://cdn.pixabay.com/photo/2022/10/11/12/38/dog-7514202_1280.jpg",
            "https://cdn.pixabay.com/photo/2023/05/20/19/57/lizard-8007238_1280.jpg"
        ]
    }
    let idx = imgSets[imgID].indexOf(imgElement.src);
    if (idx === -1) {
        idx = 0;
    } else {
        idx = (idx + 1) % imgSets[imgID].length;
    }
    if(imgElement.classList.contains("switch")) {
        imgElement.src = imgSets[imgID][idx];
    }
    const nextInterval = Math.random()*4000 + 1000;
    setTimeout(() => changeImages(imgID),nextInterval);



}

function toggleImage(buttonElement){
    if(buttonElement.innerText === "Stop"){
        buttonElement.innerText = "Start";
    }
    else{
        buttonElement.innerText = "Stop";
    }
    const img = buttonElement.parentElement.querySelector("img");
    img.classList.toggle("switch");
}