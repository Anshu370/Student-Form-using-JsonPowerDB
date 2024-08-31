var baseUrl = "http://api.login2explore.com:5577";
var imlPartUrl = "/api/iml";
var irlPartUrl = "/api/irl";
var islPartUrl = "/api/isl";
var token = "90932064|-31949218361436229|90962425";
var dataBaseName = "SCHOOL-DB";
var rel = "STUDENT-TABLE";

$("#rollno").focus("");

function validateData() {
    var empIdVar = $("#rollno").val();
    if (empIdVar === "") {
        alert("Student Roll no Required Value");
        $("#rollno").focus();
        return "";
    }
    var empNameVar = $("#stuname").val();
    if (empNameVar === "") {
        alert("Student Name is Required Value");
        $("#stuname").focus();
        return "";
    }
    var empSalaryVar = $("#class").val();
    if (empSalaryVar === "") {
        alert("Student Class is Required Value");
        $("#class").focus();
        return "";
    }
    var empHRAVar = $("#dob").val();
    if (empHRAVar === "") {
        alert("Student DOB is Required Value");
        $("#dob").focus();
        return "";
    }
    var empDAVar = $("#address").val();
    if (empDAVar === "") {
        alert("Student Address is Required Value");
        $("#address").focus();
        return "";
    }
    var empDeductVar = $("#enrol").val();
    if (empDeductVar === "") {
        alert("Student Enrolment no is Required Value");
        $("#enrol").focus();
        return "";
    }
    var jsonObj = {
        Rollno: empIdVar,
        Name: empNameVar,
        Class: empSalaryVar,
        DOB: empHRAVar,
        Address: empDAVar,
        EnrollmentDate: empDeductVar
    };
    return JSON.stringify(jsonObj);
}

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#stuname").val(record.empName);
    $("#class").val(record.empSalary);
    $("#dob").val(record.hra);
    $("#address").val(record.da);
    $("#enrol").val(record.deduction);
}

function getEmpIdAsJsonObj() {
    var empId = $('rollno').val();
    var jsonObj = {
        Rollno: empId
    };
    return JSON.stringify(jsonObj);
}

function getStu() {
    var empIdAsJsonObj = getEmpIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(token, dataBaseName, rel, empIdAsJsonObj);

    jQuery.ajaxSetup({ async: false });
    var resjsonObj = executeCommand(getRequest, irlPartUrl);
    jQuery.ajaxSetup({ async: true });

    if (resjsonObj.status === 400) {
        console.log(400);
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#change").prop("disabled", true);
        $("#stuname").focus();
    } 
    else if(resjsonObj.status === 200) {
        console.log(200)
        $("#rollno").prop("disabled", true);

        fillData(resjsonObj);

        $("#save").prop("disabled", true);
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", true);
        $("#stuname").focus();
    } 
}

function resetForm() {
    $("#rollno").val("")
    $("#stuname").val("");
    $("#class").val("");
    $("#dob").val();
    $("#address").val();
    $("#enrol").val();
    $("#rollno").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#rollno").focus("");
}


function saveData() {
    var jsonStr = validateData();
    if (jsonStr === '') {
        return "";
    }

    var putRequest = createPUTRequest(token, jsonStr, dataBaseName, rel);
    
    jQuery.ajaxSetup({ async: false });
    var resjsonObj = executeCommand(putRequest, imlPartUrl);
    jQuery.ajaxSetup({ async: true });
    
    resetForm();
    $("#rollno").focus("");
}

function changeData() {
    $("#save").prop("disabled", true);
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", true);

    var jsonStr = validateData();
    if (jsonStr === '') {
        return "";
    }

    var updateRequest = createUPDATERecordRequest(token, jsonStr, dataBaseName, rel, localStorage.getItem("recno"));

    jQuery.ajaxSetup({ async: false });
    var resjsonObj = executeCommand(updateRequest, imlPartUrl);
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $("#rollno").focus("");
}

