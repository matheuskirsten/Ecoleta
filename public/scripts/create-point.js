function populateUFs() {
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then ( res => res.json() )
    .then( states => {

        for ( const state of states) {
            ufselect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`
         }
    
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")


    const ufValue = event.target.value

    const indexOSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true


    fetch(url)
    .then ( res => res.json() )
    .then( cities => {

        for ( const city of cities) {
            citySelect.innerHTML +=  `<option value="${city.nome}">${city.nome}</option>`
        }
    
        citySelect.disabled = false

    })

}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de coleta
//pegar todos os LI's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem )
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //add ou remover uma classe com Js
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    console.log('ITEM ID: ', itemId)

    
//verificar se existem selecionados e pegar os itens
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })


//se ja estiver selecionado tirar da seleção
    if( alreadySelected >= 0 ) {
        const filteredItems = selectedItems.filter (item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
         
        selectedItems = filteredItems
    } else { 
        // se nao estiver add na seleção
        selectedItems.push(itemId)
    }
    
    console.log('selectedItems: ', selectedItems)



//atualizar o campo escondido com os itens selecionados

    collectedItems.value = selectedItems

}

