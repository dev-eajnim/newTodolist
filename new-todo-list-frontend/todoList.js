let selectedId = null;

async function getList() {

    const list = await fetch('http://localhost:3000/todolist')
        .then(response => response.json());

    const ul = document.querySelector('.ulTodo');
    ul.innerHTML = '';

    for (let l of list) {
        const li = document.createElement('li');
        let checked = '';

        if (l.chk) {
            checked = 'checked';
        }

        li.setAttribute('data-id', l.id);
        li.innerHTML = `
            <input type="checkbox" ${checked} onChange="toggle(${l.id})">
            <label>${l.content}</label>
            <button onclick="btnChange(${l.id})">수정</button>
            <button onclick="deleteTodo(${l.id})">삭제</button>
        `;
        ul.append(li);
    }
}

async function deleteTodo(id) {
    await fetch(`http://localhost:3000/todolist/${id}`, {
        method: 'DELETE'
    }).then(res => {
        alert('할 일이 삭제되었습니다');
    }).catch(() => {
        alert('Error');
    })
    getList();
}
async function btnSaveTodo() {
    if (selectedId) {
        await updateTodo(selectedId);
    } else {
        await createTodo();
    }
    getList();
}

async function updateTodo(id) {
    const td = document.querySelector('#todoContent').value;
    let todo = await fetch(`http://localhost:3000/todolist/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }, body: JSON.stringify({
            "content": td
        })
    }).then((res) => {
        res.json();
        alert("할 일이 수정되었습니다.");
    }).catch(() => {
        alert("에러");
    })
}

async function createTodo() {
    const td = document.querySelector('#todoContent').value;

    await fetch('http://localhost:3000/todolist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "content": td,
            "chk": false
        })
    }).then(res => {
        res.json()
        alert("할 일을 새로 추가했습니다");
    }).catch(() => {
        alert("에러");
    })
}

function getShow() {
    divChangeTodo.style = "display:block";
}

function getHide() {
    divChangeTodo.style = "display:none";
}

async function btnChange(id) {
    getShow();
    const li = document.querySelector(`.ulTodo li[data-id="${id}"]>label`); // > 자식 & 스페이스바는 후손
    document.querySelector('#todoContent').value = li.innerText;
    selectedId = id;
}


async function toggle(id){
    
    const res = await fetch(`http://localhost:3000/todolist/${id}/toggle`,{
        method:'PATCH'
    }).then((res)=>{
        return res.json();
    }).catch(()=>{
        alert("에러");
    })
}

window.onload = () => {
    getList();
}
