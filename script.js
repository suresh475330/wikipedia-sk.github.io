const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch='

const form = document.querySelector('.form')
const input = document.querySelector('.input')
const container = document.querySelector('.container')

form.addEventListener('submit',(e)=>{
  e.preventDefault()
  let value =  input.value
  if(!value){
      container.innerHTML = `<div class='error'>plz enter some value search</div>`
      return;
  }
  getData(value)
})


const getData = async (value)=>{
 try {
    const response = await fetch(`${url}${value}`)
    const data = await response.json()
    const results = data.query.search
    if(results.length < 1){
        container.innerHTML = `<div class='error'>no matching results found plz try agian</div>`
       return;
    }
    display(results)
 } catch (error) {
     console.log(error);
 }
}

const display = (item)=>{
   const listCard = item
   .map((newArray)=>{
    const {pageid,snippet,title} = newArray
    return `<a href='https://en.wikipedia.org/?curid=${pageid}" target="_blank">
         <h4>${title}</h4>
         <p>${snippet}</p>
     </a>`
   })
   .join(' ')
   container.innerHTML =`<div class='articles'>${listCard}</div>`
}

