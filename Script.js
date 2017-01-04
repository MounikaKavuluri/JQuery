/**
 * Created by sb005 on 1/4/2017.
 */

var Employee = function() {
    var id;
    var name;
    var designation;
    var dob;
    var experience;
    var doj;
    function get_id()
    {
        return id;
    }
    function set_id(empid)
    {
        id = empid;
    }
    function get_name()
    {
        return name;
    }
    function set_name(empname)
    {
        name = empname;
    }
    function get_designation()
    {
        return designation;
    }
    function set_designation(typ)
    {
        designation = typ;

    }
    function get_dob()
    {
        return dob;
    }
    function set_dob(dob1)
    {
        dob = dob1;
    }
    function get_experience()
    {
        return experience;
    }
    function set_experience(experiences)
    {
        experience = experiences;
    }
    function get_doj()
    {
        return doj;
    }
    function set_doj(doj1)
    {
        doj = doj1;
    }
    return{
        "setEmpName" : set_name,
        "getEmpName" : get_name,
        "setEmpId" : set_id,
        "getEmpId" : get_id,
        "setEmpDesignation" : set_designation,
        "getEmpDesignation" : get_designation,
        "setEmpDob" : set_dob,
        "getEmpDob" : get_dob,
        "setEmpExp" : set_experience,
        "getEmpExp" : get_experience,
        "setEmpDoj" : set_doj,
        "getEmpDoj" : get_doj

    }

}

var getEmployees = function()
{
    var Employe =[];

    function loadEmployees()
    {
        var table = document.getElementById("employee");

        jqueryAjax(function(result){
                var emp_user = result;
                console.log(emp_user);
                for(var i=0;i<emp_user.length;i++)
                {
                    var emp1 = new Employee();
                    var employ = emp_user[i];

                    emp1.setEmpName(employ.name);
                    emp1.setEmpId(employ.id);
                    emp1.setEmpDesignation(employ.designation);
                    //console.log(employ.name+" && "+emp1.getEmpType());
                    emp1.setEmpDob(employ.dob);
                    emp1.setEmpExp(employ.experience);
                    emp1.setEmpDoj(employ.doj);
                    console.log(employ.doj);

                    Employe.push(emp1);
                    //console.log(emp1.getEmpDoj());
                    prepareTable(emp1.getEmpId(),emp1.getEmpName(),emp1.getEmpDob(),emp1.getEmpDesignation(),emp1.getEmpDoj(),emp1.getEmpExp());

                }
                console.log("Array of objects ");
                console.log(Employe);
                console.log(result);
        });
    }

//code copy paste kottu append lo n
    function prepareTable(value1,value2,value3,value4,value5,value6) {
        console.log(value1);
        // alert("iiiiiii");
        var tr = jQuery('<tr>', {
            id: value1,

        }).on("click", function () {
            console.log(value1 + "#####");
            var empObject = getEmployeeDetails(this.id);
            displayDetails(empObject);

        }).append(
            jQuery('<td>',{
                html : value1
            }),
            jQuery('<td>',{
                html : value2
            }),
            jQuery('<td>',{
                html : value3
            }),
            jQuery('<td>',{
                html : value4
            }),
            jQuery('<td>',{
                html : value5
            }),
            jQuery('<td>',{
                html : value6
            })

        ).appendTo('#employee');
        console.log(tr);

    }

    function getEmployeeDetails(id)
    {
        //alert(" Hello "+id.value);

        console.log("####"+Employe.length);

        for(var i=0;i<Employe.length;i++)
        {
            var empy = Employe[i];

            if(empy.getEmpId() == id)
            {
                console.log(" ///////// ");
                return empy;
            }

        }
        /*var parentNode = empDetails.parentNode;
        parentNode.replaceChild(empDetailsnew,empDetails);*/

    }
    
    function displayDetails(empy) {

        jQuery("#details").html("");

        jQuery("#details").html(html("Employee Id : ", empy.getEmpId()));
        jQuery("#details").append(html("Employee Name : ", empy.getEmpName()));
        jQuery("#details").append(html("Employee Designation :",empy.getEmpDesignation()));
        jQuery("#details").append(html("Employee Dob :",empy.getEmpDob()));
        jQuery("#details").append(html("Employee Experience :",empy.getEmpExp()));
        jQuery("#details").append(html("Employee Date of Joining :",empy.getEmpDoj()));
    }

    function html(label,value)
    {
        var index = '<label>' + label + '</label> &nbsp;<label>' + value + '</label> <br>';
        return index;

    }
    return{
        loadEmployees : loadEmployees,
        getEmployee : getEmployeeDetails,
        displayDetails : displayDetails
    }
}
/*function getJson(callback){
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'Employees.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}*/

function jqueryAjax(callback)
{
    jQuery.ajax({url: "Employees.json", success: function(result){
        console.log(result);
        callback(result);
    },
        failure : function(result){
            console.log("Failed "+result);
        }});
}
