function deleteRow(row)
{
// Delete selected row
    var i=row.parentNode.parentNode.rowIndex;
    document.getElementById('irisTable').deleteRow(i);
}

function checkTime(i)
{
    if (i < 10){
        i = "0"+i;
    }
    return i;
}

function findend(row)
{
//Used start time, exp time and number of exps to find the approximate end time for the observation
    var i = row.parentNode.id.split('-')[1]

//grab values from the HTML file
    var statime = document.getElementById("1-"+i+"-statimerow").children[0].value;//document.getElementById('1-'+i+'-statimebox').value;
    var exptime = parseFloat(document.getElementById('1-'+i+'-exptimerow').children[0].value);
    var repeats = parseFloat(document.getElementById('1-'+i+'-repeatsrow').children[0].value);

//break the start time into HH,MM,SS
    var arstime = statime.split(":")
   
//Just use current date to set up a day to operate on
//really just a dummy variable
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    var dd = currentDate.getDate();
    var mm = currentDate.getMonth()+1;
    var yy = currentDate.getYear();

    mm = checkTime(mm)
    dd = checkTime(dd)

    var date = new Date(yy,mm,dd,arstime[0],arstime[1],arstime[2])

    var addsec = exptime*repeats
// Add exposure time to start time 
    date.setSeconds(date.getSeconds()+addsec);
// Add slew time (Assume slow)
    var addslew = 10 //min
    date.setMinutes(date.getMinutes()+addslew)


    
//split endtime into a string variable
    var endHour = checkTime(date.getHours()) + ':' + checkTime(date.getMinutes())+ ":" + checkTime(date.getSeconds());

// update endtime
    document.getElementById('1-'+i+'-endtimebox').innerHTML = endHour;
    
}

//fixes issue with wrong ids for rows
var idInit = 1;

function duplicateRow(row){

//copy based of  the row clicked
	var j = row.parentNode.id.split('-')[1]
//Create a duplicated of the last row created
    var table = document.getElementById("irisTable"); // find table to append to
    var row   = document.getElementById('1-'+j+'-samplerow');
    var newRow = row.cloneNode(true); // Clone the row

    incrementId(newRow); // Increment the row's ID
    var cells = newRow.cells;
    var ocells = row.cells;

    for(var i = 0; i < cells.length; i++){
        incrementId(cells[i]); // Increment the cells' IDs
    }
    insertAfter(row, newRow); // Insert the row at the right position
    idInit++;//inc row id


    for(var i = 0; i < cells.length; i++){
   //update input frame to include proper numbering
        var dofreeze = updateinput(cells[i]);
   //set old cell values to static so you can save 
        if (dofreeze == 1){
            freezevals(ocells[i]);
        }
    }
}

//locks in values of previously submitted values
function freezevals(elem){

    if (elem.id.split('-')[2] != 'endtimebox'){
        if (document.getElementById(elem.id).children[0].type != 'button') {
            document.getElementById(elem.id).innerHTML =  document.getElementById(elem.id).children[0].value;
        }
    }
}


function updateinput(elem){
    //dictionary to make thaw table if add table call is frozen
    var propdict = {
                    "dayrow":[1,"text",""],
                    "statimerow":[8,"text",""],
                    "exptimerow":[7,"text",""],
                    "repeatsrow":[5,"text",""],
                    "xsrow":[6,"text",""],
                    "ysrow":[6,"text",""],
                    "obsidrow":[10,"text",""],
                    "titlerow":[35,"text",""],
                    "rollrow":[3,"text",""],
                    "aecrow":[1,"checkbox","off"],
                    "trackrow":[1,"checkbox","off"]
                    };


   //look whether to freeze column or not
    var dofreeze = 1;

    //Update input element value
    if (elem.id.split('-')[2] != 'endtimebox'){
    // check to see if box has a child (i.e. the box is frozen)
        if (document.getElementById(elem.id).innerHTML[0] == '<'){
            document.getElementById(elem.id).children[0].id = elem.id.replace('row','box')
    // clears out previous data
            if (document.getElementById(elem.id).children[0].type == 'text') {
                document.getElementById(elem.id).children[0].value = null; 
                document.getElementById(elem.id).value = null;
            }
        }

        if (document.getElementById(elem.id).innerHTML[0] != '<'){
//remove data from HTML row
            document.getElementById(elem.id).innerHTML = ''
            var node = document.createElement("input");
// id of variable to put into dictionary propdict
            var inid = elem.id.split('-');

            var thisid = propdict[inid[2]];
//set up attributes from dictionary
            node.setAttribute('type',thisid[1]);
            node.setAttribute('value',thisid[2]);
            node.setAttribute('size',thisid[0]);
            node.setAttribute('id',inid[0]+'-'+inid[1]+'-'+inid[2].replace('row','box'));

//Addend onto parent
            document.getElementById(elem.id).appendChild(node);
//do not freeze frozen data
            dofreeze = 0;
        }
         
        
    }
    //console.log(document.getElementById(elem.id))
    //document.getElementById(elem.id).children[0].id = elem.id.replace('row','box')
    return dofreeze;
}

function incrementId(elem){


//Change ids of cell to increment by 1
    idParts = elem.id.split('-'); // Cut up the element's ID to get the second part.
   
    idInit ? idParts[1] = idInit + 1 : idInit = idParts[1]++;  // Increment the ID, and set a temp variable to keep track of the id's.
    
    elem.id = idParts.join('-'); // Set the new id to the element.
   
}

function saveform(){
    var data = document.getElementById("irisTable").innerHTML;
    var fname = 'loggingdata.html'
    console.log(document.getElementById("irisTable"))

}

function insertAfter(after, newNode){
//Insert new row at bottom
    after.parentNode.insertBefore(newNode, after.nextSibling);
}
