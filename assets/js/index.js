
document.addEventListener("DOMContentLoaded", function() {
    init();
  });
  
function init() {
    addEventListenerToStatusTodoClass();
}

function addEventListenerToStatusTodoClass(){
    var statusTodoChange = document.getElementsByClassName('todo_status');
    for (let i=0; i<statusTodoChange.length; i++){
       let item = statusTodoChange[i];
       item.addEventListener('change', (e)=>{
        handleTodoStatusChange(e);
       })
    }
}

function handleTodoStatusChange(e) {
    console.log('done');

    const currElem = e.target;
    var status_id = currElem.value;
    var id = currElem.closest("li").getAttribute("data-id");
    console.log('value : ', status_id);
    console.log('id :', id);
    changeTodoStatus(id, status_id);
}

async function changeTodoStatus(id, status_id) {

    var url = `todo/${id}/update_status/${status_id}`;
    console.log('url', url)
   try {
    var res = await fetch(url, {
        method: "post",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
    });
    let data = await res.json();
    console.log('data : ', data);
   } catch (error) {
    console.log('error', error);
   }
}