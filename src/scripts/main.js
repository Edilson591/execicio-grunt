
const seach = document.getElementById("busca-img")
const seachImg = document.getElementById("seach-img")
const listSearch = document.getElementById("list-search")
console.log(listSearch)

const getApi = async(photo) => {
    const url = `https://pixabay.com/api/?key=42629754-b6a68ed3d4a40f734e78c886f&q=${photo}&image_type=photo&pretty=true`

    try {
        const response = await fetch(url);
        const results = await response.json();
        await fixResults(results.hits.slice(0, 12))
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function fixResults(results) {
    if(results.length === 0) {
        alert("imagem não encontrada")
        seach.value = ''
    }
    listSearch.innerHTML = ''

    results.map(itens => {
        const imgWrapper = document.createElement("div"); 
        imgWrapper.className = "img-wrapper"; 
        const imgElement = document.createElement("img");
        imgWrapper.style.backgroundImage = `url(${itens.webformatURL})`
        imgElement.alt = itens.tags;
        imgWrapper.appendChild(imgElement);
        listSearch.appendChild(imgWrapper);

    })
}

async function handleButton(e) {
    e.preventDefault()
    const getInput = seach.value
    await getApi(getInput)
}


seachImg.addEventListener("click", handleButton)




