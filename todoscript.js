const todos = JSON.parse(localStorage.getItem('todos')) || []

document.querySelector("#todo-form").addEventListener('submit',function(e){
    e.preventDefault() 
    if(e.target.elements.text.value!="")
    {
        todos.push({
            title:e.target.elements.text.value,
            completed:false
        })
        localStorage.setItem('todos',JSON.stringify(todos))
    }
    renderTodos(todos,filters)
    e.target.elements.text.value = ''
})

const filters = {
    searchText : '',
    hideCompleted:false
    
}

const renderTodos = function(todos,filters){
    const filteredTodos = todos.filter(function(e){
        const searchText = e.title.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideChecking = !filters.hideCompleted || !e.completed

        return searchText && hideChecking
    })

    const trackingTodos = filteredTodos.filter(function(e){
        return !e.completed
    })

    document.querySelector("#todos").innerHTML = ''

    const track = document.createElement('h2')
    track.style.display = 'flex'
    track.style.justifyContent = 'center'
    track.style.marginBottom = '20px'
    track.style.color = 'brown'
    track.style.fontSize = '28px'
    track.textContent = `You have ${trackingTodos.length} todos to complete`
    
    document.querySelector("#todos").appendChild(track)

    filteredTodos.forEach(function(e,index){

        const smalldiv = document.createElement('div')
        smalldiv.style.width = '200px'

        const divTag = document.createElement('div')
        divTag.class = 'divTag'
        divTag.style.display = 'flex'
        divTag.style.flexDirection = 'row'
        divTag.style.justifyContent= 'space-Between'
        divTag.style.width = '430px'
        divTag.style.height = '47px'
        divTag.style.border = 'none'
        divTag.style.outline= '1px solid grey'
        divTag.style.marginBottom = '10px'
        divTag.style.backgroundColor = 'grey'
        
        const ele = document.createElement('p')
        ele.style.fontSize = '20px'
        ele.style.marginTop = '-31px'
        ele.style.marginLeft = '35px'
        ele.style.color = 'white'
        ele.textContent = e.title
        
        const completed = document.createElement('input')
        completed.type = 'checkbox'
        completed.style.margin = '14px'
        completed.checked = e.completed 

        const deleteTodo = document.createElement('button')
        deleteTodo.textContent = 'Delete'
        deleteTodo.style.width = '80px'
        deleteTodo.style.height = '30px'
        deleteTodo.style.fontFamily = 'Times New Roman'
        deleteTodo.style.fontSize = '15px'
        deleteTodo.style.marginTop = '8px'
        deleteTodo.style.marginLeft = '50px'
        deleteTodo.style.marginRight = '15px'
        deleteTodo.style.backgroundColor = 'hsl(0 0% 0%)'
        deleteTodo.style.color = 'white'
        deleteTodo.style.border = 'none'
        
        smalldiv.append(completed)
        smalldiv.appendChild(ele)
        divTag.appendChild(smalldiv)
        divTag.appendChild(deleteTodo)
        document.querySelector("#todos").appendChild(divTag)


        deleteTodo.addEventListener('click',function(){
            todos.splice(index,1)
            localStorage.setItem('todos',JSON.stringify(todos))
            renderTodos(todos,filters)
        })

        completed.addEventListener('change',function(){
            e.completed = completed.checked
            localStorage.setItem('todos',JSON.stringify(todos))
            renderTodos(todos,filters)
        })
        
    })
}

renderTodos(todos,filters)

document.querySelector('#search-todo').addEventListener('input',function(e){
    filters.searchText = e.target.value
    renderTodos(todos,filters)
})

document.querySelector('#check').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
}) 