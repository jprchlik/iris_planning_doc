function updatewobbletable(row)
{

    var j = row.id;
    var e = row.options[row.selectedIndex].value;
    row.value = e;

}


function freezeday()
{
    //day table
    var dott = document.getElementById('irisweektab');

    for (var i=1,row;row=dott.rows[i];i++){
        for (var j=1,col;col =row.cells[j]; j++){
            freezevals(col)
    
        }

    }

   //freeze doy cell
    var doycell = document.getElementById('1-doyrowdata');
    freezevals(doycell);
   // freeze memory cell 
    var memcell = document.getElementById('1-memuserow');
    freezevals(memcell);

}


//function to thaw day data
function thawday()
{
    //day table
    var dott = document.getElementById('irisweektab');

    for (var i=1,row;row=dott.rows[i];i++){
        for (var j=1,col;col =row.cells[j]; j++){
            thawvals(col)
    
        }

    }

   //thaw doy cell
    var doycell = document.getElementById('1-doyrowdata');
    thawvals(doycell);
   // thaw memory cell 
    var memcell = document.getElementById('1-memuserow');
    thawvals(memcell);



//    console.log("Not Implimented")
}

function thawvals(elem)
{
//    console.log(elem)
    //dictionary to make thaw table if add table call is frozen
    var propdict = {
                    "doyrowdata":[3,"text",""],
                    "memuserow":[3,"text",""],
                    "domrow":[2,"text",""],
                    "doyrow":[3,"text",""],
                    "dotrow":[2,"text",""],
                    };


   //look whether to freeze column or not
    var dofreeze = 1;

    // check to see if box has a child (i.e. the box is frozen)
    if (document.getElementById(elem.id).innerHTML[0] == '<'){
        document.getElementById(elem.id).children[0].id = elem.id.replace('row','box')
    }
    if (document.getElementById(elem.id).innerHTML[0] != '<'){
//store previous value
        var prev = document.getElementById(elem.id).innerHTML
//remove data from HTML row
        document.getElementById(elem.id).innerHTML = ''
        var node = document.createElement("input");
// id of variable to put into dictionary propdict
        var inid = elem.id.split('-');
//        console.log(inid)

        var thisid = propdict[inid[1]];
//set up attributes from dictionary
        node.setAttribute('type',thisid[1]);
        node.setAttribute('value',prev);
        node.setAttribute('size',thisid[0]);
        node.setAttribute('id',inid[0]+'-'+inid[1].replace('row','box'));

//Addend onto parent
        document.getElementById(elem.id).appendChild(node);
    }

}


//save table html5 feature
function savehtml5()
{
    var key = 'irisTable';
    save(key);
    save('irisdoytab');
    save('irisweektab');

}

//do the saving outside the button
function save(key)
{
    var values = document.getElementById(key).innerHTML;
    localStorage.setItem(key,values);
}

//load saved table
function loadhtml5()
{
    var key = 'irisTable';
    load(key);
    load('irisdoytab');
    load('irisweektab');
}

//load saved outside the button
function load(key)
{
    var values = localStorage.getItem(key);
    document.getElementById(key).innerHTML = values;
}


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
    document.getElementById('1-'+i+'-endtimebox').value = endHour;
    
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

//Changed to allow manual setting of endtimebox
//Changed to ignore phase orbital wobble 
//   if (elem.id.split('-')[2] != 'tabwobblerow'){
       if (document.getElementById(elem.id).children[0].type != 'button') {
           document.getElementById(elem.id).innerHTML =  document.getElementById(elem.id).children[0].value;
        }
//    }
}


function updateinput(elem){
    //dictionary to make thaw table if add table call is frozen
    var propdict = {
                    "dayrow":[1,"text",""],
                    "statimerow":[8,"text",""],
                    "exptimerow":[7,"text",""],
                    "repeatsrow":[5,"text",""],
                    "endtimerow":[8,"text",""],
                    "xsrow":[6,"text",""],
                    "ysrow":[6,"text",""],
                    "obsidrow":[10,"text",""],
                    "titlerow":[35,"text",""],
                    "rollrow":[3,"text",""],
                    "aecrow":[1,"checkbox","off"],
                    "trackrow":[1,"checkbox","off"],
                    "wobblerow":[1,"checkbox","off"],
                    "tabwobblerow":[1,"select",""]
                    };


   //look whether to freeze column or not
    var dofreeze = 1;

    //Update input element value
    //Changed to allow manual setting of endtimebox (2017/01/03 J. Prchlik)
    if (elem.id.split('-')[2] != 'tabwobblerow'){
// check to see if box has a child (i.e. the box is frozen)
        if (document.getElementById(elem.id).innerHTML[0] == '<'){
            document.getElementById(elem.id).children[0].id = elem.id.replace('row','box')
    // clears out previous data from text 
            if (document.getElementById(elem.id).children[0].type == 'text') {
                document.getElementById(elem.id).children[0].value = null; 
                document.getElementById(elem.id).value = null;
            }
    // clears out previous data form checkbox
            if (document.getElementById(elem.id).children[0].type == 'checkbox') {
                document.getElementById(elem.id).children[0].value = 'off'; 
                document.getElementById(elem.id).children[0].checked = false; 
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
            if (thisid[1] == 'checkbox'){
                node.setAttribute('onclick', "if(this.checked) {value='on'}");
            }
    
    //Addend onto parent
            document.getElementById(elem.id).appendChild(node);
    //do not freeze frozen data
                dofreeze = 0;
        }
             
            
    } else {
// Update Wobble Table data 
        var tabwob = document.getElementById(elem.id);
        var childs = tabwob.childNodes.length;
        console.log(tabwob.childNodes.length);
        console.log(tabwob.childNodes);
 //Remove previous child
        var array = ["0 Table","90 Table","No Table"];
        var select = document.createElement("select");
        var dofreeze = 1;
        if (childs == 1){
//Go Passover on frozen text
            tabwob.removeChild(tabwob.firstChild);
            tabwob.appendChild(select);
            for (var i=0; i<array.length; i++){
                var option = document.createElement("option");
                option.setAttribute("value",array[i]);
                option.text = array[i];
                select.appendChild(option);
            }
            tabwob.appendChild(document.createTextNode(""));
            tabwob.appendChild(select);
            tabwob.appendChild(document.createTextNode(""));
            dofreeze = 0;
        }
    }
    //console.log(document.getElementById(elem.id))
    //document.getElementById(elem.id).children[0].id = elem.id.replace('row','box')
    return dofreeze;
}

function incrementId(elem)
{

//Change ids of cell to increment by 1
    idParts = elem.id.split('-'); // Cut up the element's ID to get the second part.
   
    idInit ? idParts[1] = idInit + 1 : idInit = idParts[1]++;  // Increment the ID, and set a temp variable to keep track of the id's.
    
    elem.id = idParts.join('-'); // Set the new id to the element.
   
}

//DOES NOT WORK
function saveform()
{
    var data = document.getElementById("irisTable").innerHTML;
    var fname = 'loggingdata.html'
    console.log(document.getElementById("irisTable"))

}

//function to save updated html file
//Does not work
function saveupdate()
{
    document.execCommand("SaveAs")

}

//Insert new row at bottom
function insertAfter(after, newNode)
{
    after.parentNode.insertBefore(newNode, after.nextSibling);
}
