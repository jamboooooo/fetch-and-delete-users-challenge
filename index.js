const table = document.querySelector('table')
const data = fetch('https://reqres.in/api/users')
    .then(res => res.json())
    .then(obj => {
        obj.data.forEach((item, i) => {
            const idTD = document.createElement('td')
            const nameTD = document.createElement('td')
            const emailTD = document.createElement('td')
            const btnTD = document.createElement('td')
            const tr = document.createElement('tr')

            const avatar = document.createElement('img')
            avatar.src = item.avatar
            avatar.style.width = '30px'
            const btn = document.createElement('button')
            btn.textContent = 'Delete user'
            btn.style.width = '85px'
            btnTD.style.textAlign = 'center'

            btn.addEventListener('click', () => {
                deleteUser(i, btn.parentNode.parentNode)
            })

            idTD.textContent = item.id
            nameTD.textContent = item.first_name + ' ' + item.last_name
            nameTD.prepend(avatar)
            console.log(1);
            emailTD.textContent = item.email
            btnTD.append(btn)

            tr.append(idTD, nameTD, emailTD, btnTD)
            table.append(tr)

        });

        function deleteUser(id, node) {
            fetch('https://reqres.in/api/users/' + id, {
                method: 'DELETE'
            }).then(res => {
                console.log(3);
                if (res.status === 204) {
                    node.remove()
                    console.log(2);
                }
            }).catch(err => {
                alert(err.message)
            })
        }
    })