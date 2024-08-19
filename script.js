var editing = 0;

document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('add-form');
    const amtInput = document.getElementById('amount');
    const nameInput = document.getElementById('name');
    const dataTable = document.getElementById('data-table');

    form.addEventListener('submit', function(event){
        event.preventDefault();

        var amtAdd = amtInput.value.trim();
        var nameAdd = nameInput.value.trim();
        
        if(amtAdd !== '' && nameAdd !== '' && editing == 0){

            const trow = document.createElement('tr');

            const tcolAmt = document.createElement('td');
            tcolAmt.className = 'table-amt-data';
            tcolAmt.textContent = amtAdd;

            const tcolName = document.createElement('td');
            tcolName.className = 'table-name-data';
            tcolName.textContent = nameAdd;

            const tImg = document.createElement('td');
            tImg.className = 't-edit-img';
            tImg.innerHTML = '<img src = "assets/edit.png" height="20" atl="edit" id="t-edit-img">';

            
            tImg.querySelector('img').addEventListener('click', function(){
                if(editing === 0){
                    editing = 1;
                    
                    const editRow = this.closest('tr');
                    edit(editRow);
                    
                    
                }
            })
            
            trow.appendChild(tImg);
            trow.appendChild(tcolAmt);
            trow.appendChild(tcolName);
            dataTable.appendChild(trow);
            
            amtInput.value = '';
            nameInput.value = '';
        }
    });
})

function saveRow(row, name, amt){
    const amountCell = row.querySelector('.table-amt-data');
    const nameCell = row.querySelector('.table-name-data');
    
    amountCell.textContent = amt;
    nameCell.textContent = name;
}

function cancelRow(row, name, amt){
    const amountCell = row.querySelector('.table-amt-data');
    const nameCell = row.querySelector('.table-name-data');

    amountCell.textContent = amt;
    nameCell.textContent = name;
}

function edit(row){
    const amountCell = row.querySelector('.table-amt-data');
    const nameCell = row.querySelector('.table-name-data');
    
    var tempName = nameCell.textContent;
    var tempamt = amountCell.textContent;
    
    amountCell.innerHTML = '<input type="number" id="editamt">';
    nameCell.innerHTML = '<span><input type="text" id="editname"></span>';
    nameCell.innerHTML += '<span><button class="in-btn" id="save-btn" type="click">Save</button><button class="in-btn" id="cancel-btn" type="click">Cancel</button></span>';
    
    document.getElementById('editamt').value = tempamt;
    document.getElementById('editname').value = tempName;
    
    const saveBtn = document.getElementById('save-btn')
    saveBtn.addEventListener('click', function(){
        tempamt = document.getElementById('editamt').value;
        tempName = document.getElementById('editname').value;
        saveRow(row, tempName, tempamt);
        editing = 0;
    })

    const cancelBtn = document.getElementById('cancel-btn')
    cancelBtn.addEventListener('click', function(){
        cancelRow(row, tempName, tempamt);
        editing = 0;
    })
}