
namespace core
{
   
    function testFullName(): void
    {
      let messageArea = $("#messageArea").hide();
      let fullNamePattern = /([A-Z][a-z]{1,25})+(\s|,|-)([A-Z][a-z]{1,25})+(\s|,|-)*/;

        
        $("#fullName").on("blur", function()
        {
          if(!fullNamePattern.test($(this).val().toString()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Full Name. This must include at least a Capitalized first name followed by a Capitlalized last name.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function testContactNumber(): void
    {
      let messageArea = $("#messageArea");
      let contactNumberPattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        
        $("#contactNumber").on("blur", function()
        {
          if(!contactNumberPattern.test($(this).val().toString()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Contact Number. Country code and area code are both optional");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function testEmailAddress():void
    {
      let messageArea = $("#messageArea");
      let emailAddressPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
        
        $("#emailAddress").on("blur", function()
        {
          if(!emailAddressPattern.test($(this).val().toString()))
          {
            $(this).trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Please enter a valid Email Address.");
          }
          else
          {
              messageArea.removeAttr("class").hide();
          }
        });
    }

    function formValidation():void
    {
      testFullName();
      testContactNumber();
      testEmailAddress();
    }

    function displayContact(): void
    {
      // form validation
      formValidation();

        $("#sendButton").on("click", (event)=> 
        {
          let subscribeCheckbox = $("#subscribeCheckbox")[0] as HTMLInputElement;
          let fullName = $("#fullName")[0] as HTMLInputElement;
          let contactNumber = $("#contactNumber")[0] as HTMLInputElement;
          let emailAddress = $("#emailAddress")[0] as HTMLInputElement;

          if(subscribeCheckbox.checked)
          {

            
            let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);

            if(contact.serialize())
            {
              let key = contact.FullName.substring(0, 1) + Date.now();

              localStorage.setItem(key, contact.serialize());
            }
          }

          location.href = '/home';
        });
    }

    function displayContactList() :void
    {
      // confirm deletion
      $("a.delete").on("click", function(event){
        if(!confirm("Are you sure?"))
        {
          event.preventDefault();
          location.href = '/contact-list';
        }       
      });
    }

    function displayEdit(): void
    {
      // form validation
      formValidation();
     } 

    function displayLogin():void
    {
      // TODO: validation 
    }

    function displayRegister():void
    {
      // TODO: validation
    }
    

    /**
     * This is the entry point for our program
     *
     */
    function Start(): void
    {
        let pageID = $("body")[0].getAttribute("id");
        
      switch (pageID) {
        case 'edit':
          displayEdit();
          break;
        case 'contact':
          displayContact();
          break;
        case 'login':
          displayLogin();
          break;
        case 'register':
          displayRegister();
          break;
        case 'contact-list':
          displayContactList();
          break;
      }
    }

    window.addEventListener("load", Start);

}