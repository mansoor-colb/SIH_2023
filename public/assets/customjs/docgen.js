$(document).ready(function(){
    alert(5)
    let query = window.location.search;
    let url = new URLSearchParams(query);
    let val = url.get("type");
    alert(val);
    $.ajax({
        url:"http://localhost:1223/docdetail",
            type:"post",
            dataType:"json",
            data:{doc:val},       
            beforeSend:function(){
                $("#detailsform").html(`Generating....`)

            },
           success: function (res) {
            if(res.data==1){
                $("#detailsform").html(``)
                
                for(let i of JSON.parse(res.res.text)){
                    $("#detailsform").append(`  <div class="col-lg-6">
                    <div class="floating-label form-group">
                       <input class="floating-input form-control" type="text" placeholder="${i}">
                       <label>${i}</label>
                    </div>
                 </div>`)
                console.log(i)
                }
                // console.log(res.res)

            }
            else{
                alert("eror")

            }
            
        }
    });


})