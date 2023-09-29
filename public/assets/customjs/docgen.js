$(document).ready(function(){
    // alert(5)
    let query = window.location.search;
    let url = new URLSearchParams(query);
    let val = url.get("type");
    alert(val);
    $.ajax({
        url:"http://localhost:1223/docdetail",
            type:"post",
            dataType:"json",
            data:{d:val},       
            beforeSend:function(){
                $("#detailsform").css({"justify-content": "center"})
                $("#detailsform").html(`
                <div class="content">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>`)

            $("#generate").html("Generating.....")
            $('#generate').prop('disabled', true);
            $("#view").slideUp();
            },
           success: function (res) {
            if(res.data==1){
               
                $("#detailsform").css({"justify-content": "unset"})
                $('#generate').prop('disabled', false);
                $("#generate").html("Generate")
                $("#detailsform").html(``)
             
                let r=res.res.replace(/[\[\]]/g, '');
                
               let rr=r.split(",")
                
                for(let i of rr){
                    $("#detailsform").append(` <div class="col-lg-6">
                    <div class="floating-label form-group">
                    <label>${i.replace(/'/g, '')}</label>
                       <input class="floating-input form-control" type="text" name ="${i.replace(/'/g, '')}" placeholder="${i.replace(/'/g, '')}">
                       
                    </div>
                 </div>`)
                console.log(i)
                }
           

            }
            else{
                alert("eror")

            }
            
        }
    });
    


    const form =   $('#details');
  form.submit(function (e) {
     alert(2)
         e.preventDefault(); // Prevent the default form submission
 
        //  const formData = new FormData(this);
       
        //  if (
        //      formData.get('val-album').trim() === '' ||
        //      formData.get('val-genere').trim() === '' ||
        //     !(imageFile)
        //  ) {
        //      swal("Invalid ",'Please fill in all fields',"error");
        //      return;
        //  }
        const formData = form.serializeArray();
        const formValues = {};
  
        $.each(formData, function(index, field) {
          formValues[field.name] = field.value;
          
        });
        for (const key in formValues) {
            if (formValues.hasOwnProperty(key)) {
              console.log(`Key: ${key}, Value: ${formValues[key]}`);
            }
          }
        // console.log(formValues)
         $.ajax({
             type: 'POST',
             url: `http://localhost:1223/detailinsert`, // The URL to your server-side route
             data:{type:val,dat:JSON.stringify(formValues)},
             beforeSend:function(){
                $("#doccontent").css({"display":"flex","justify-content": "center"})
                $("#doccontent").html(`
                <div class="content">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
                
                `)

             },
          dataType:"json",
             success: function (res) {
                $("#view").slideUp();
                 // Handle the success response from the server
                 if(res.data==1){
                    $("#view").slideDown();
                   
                    $("#doccontent").css({"justify-content": "unset"})
                    $("#doccontent").html('')
                    $("#doccontent").html(`<pre contenteditable="true">${res.res.result}</pre>`)
                  
                 }
                 else if(res.status==500){
                   
                    

                 }
                 console.log(res);
              
                 // You can update the UI here if needed
             },
             error: function (error) {
                 swal("Error","Try Later","error")
 
                 // Handle any errors that occur during the AJAX request
                 console.error(error);
             }
         });
     });


})