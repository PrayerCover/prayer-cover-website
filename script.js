// Prayer Cover Website

(function(){

  const supabase =
    window.supabase.createClient(
      "https://gmtkxwlikptewlfagpba.supabase.co",
      "sb_publishable_zPq_XsTniASzK1aCzYKp5Q_2SoSCel-"
    );


  /* ==================================================
     WEBSITE CONTACT US
     FRONT-END FORM BEHAVIOR
  ================================================== */

  const contactUsForm =
    document.getElementById(
      "contactUsForm"
    );

  if(!contactUsForm){
    return;
  }


  const contactUsType =
    document.getElementById(
      "contactUsType"
    );

  const contactUsTopicWrap =
    document.getElementById(
      "contactUsTopicWrap"
    );

  const contactUsTopic =
    document.getElementById(
      "contactUsTopic"
    );

  const contactUsMapStreetFields =
    document.getElementById(
      "contactUsMapStreetFields"
    );

  const contactUsMapProblemType =
    document.getElementById(
      "contactUsMapProblemType"
    );

  const contactUsMapState =
    document.getElementById(
      "contactUsMapState"
    );

  const contactUsMapCity =
    document.getElementById(
      "contactUsMapCity"
    );

  const contactUsMapStreet =
    document.getElementById(
      "contactUsMapStreet"
    );

  const contactUsMessageLabel =
    document.getElementById(
      "contactUsMessageLabel"
    );


  /* ==================================================
     QUICK TOPICS BY WEBSITE REQUEST TYPE
  ================================================== */

  const contactUsTopics = {

    general_contact: [
      {
        value:"question",
        label:"General Question"
      },
      {
        value:"comment",
        label:"Comment"
      },
      {
        value:"feedback",
        label:"Feedback"
      },
      {
        value:"other",
        label:"Something Else"
      }
    ],

    church_pastor_inquiry: [
      {
        value:"interested_in_prayer_cover",
        label:"Interested in Prayer Cover for Our Church"
      },
      {
        value:"how_members_participate",
        label:"How Our Members Participate"
      },
      {
        value:"multi_campus",
        label:"Multi-Campus Church Question"
      },
      {
        value:"getting_started",
        label:"Getting Started / Pastor Information"
      },
      {
        value:"other",
        label:"Something Else"
      }
    ],

    church_participation_pricing: [
      {
        value:"pricing",
        label:"Pricing Question"
      },
      {
        value:"church_capacity",
        label:"Church Participation Capacity"
      },
      {
        value:"surrounding_areas",
        label:"Surrounding Cities / Service Area"
      },
      {
        value:"change_participation",
        label:"Changing Participation Level"
      },
      {
        value:"other",
        label:"Something Else"
      }
    ],

    streetkeeper_membership: [
      {
        value:"individual_membership",
        label:"Individual Streetkeeper Membership"
      },
      {
        value:"partner_membership",
        label:"Streetkeeper Partner Membership"
      },
      {
        value:"church_sponsored",
        label:"Church-Sponsored Participation"
      },
      {
        value:"membership_features",
        label:"Membership Features"
      },
      {
        value:"other",
        label:"Something Else"
      }
    ],

    app_technical_support: [
      {
        value:"cannot_sign_in",
        label:"I Can't Sign In"
      },
      {
        value:"app_will_not_open",
        label:"The App Will Not Open"
      },
      {
        value:"feature_not_working",
        label:"A Feature Is Not Working"
      },
      {
        value:"account_email_problem",
        label:"Account / Email Problem"
      },
      {
        value:"other",
        label:"Something Else"
      }
    ],

    billing_question: [
      {
        value:"charge_payment",
        label:"Charge / Payment Question"
      },
      {
        value:"subscription",
        label:"Subscription Question"
      },
      {
        value:"change_cancel",
        label:"Change or Cancel Billing"
      },
      {
        value:"receipt_history",
        label:"Receipt / Payment History"
      },
      {
        value:"other",
        label:"Something Else"
      }
    ]

  };


  /* ==================================================
     POPULATE QUICK TOPIC DROPDOWN
  ================================================== */

  function populateContactUsTopics(){

    if(
      !contactUsType ||
      !contactUsTopic ||
      !contactUsTopicWrap
    ){
      return;
    }

    const requestType =
      contactUsType.value;

    contactUsTopic.innerHTML =
      '<option value="">Select one</option>';

    const topics =
      contactUsTopics[
        requestType
      ] || [];


    topics.forEach(
      function(topic){

        const option =
          document.createElement(
            "option"
          );

        option.value =
          topic.value;

        option.textContent =
          topic.label;

        contactUsTopic.appendChild(
          option
        );

      }
    );


    if(topics.length){

      contactUsTopicWrap
        .classList
        .remove(
          "contactUsHidden"
        );

      contactUsTopic.required =
        true;

    } else {

      contactUsTopicWrap
        .classList
        .add(
          "contactUsHidden"
        );

      contactUsTopic.required =
        false;

      contactUsTopic.value =
        "";

    }

  }


  /* ==================================================
     MAP / STREET PROBLEM DISPLAY
  ================================================== */

  function updateContactUsRequestType(){

    if(
      !contactUsType ||
      !contactUsMapStreetFields
    ){
      return;
    }


    const isMapStreetProblem =
      contactUsType.value ===
      "map_street_problem";


    contactUsMapStreetFields
      .classList
      .toggle(
        "contactUsHidden",
        !isMapStreetProblem
      );


    if(contactUsMessageLabel){

      contactUsMessageLabel
        .textContent =
          isMapStreetProblem
            ? "Tell us what happened"
            : "Message";

    }


    if(contactUsMapProblemType){

      contactUsMapProblemType.required =
        isMapStreetProblem;

    }


    if(contactUsMapState){

      contactUsMapState.required =
        isMapStreetProblem;

    }


    if(contactUsMapCity){

      contactUsMapCity.required =
        isMapStreetProblem;

    }


    if(contactUsMapStreet){

      contactUsMapStreet.required =
        false;

    }


    populateContactUsTopics();

  }


  /* ==================================================
     MAP STREET REQUIREMENTS
  ================================================== */

  function updateContactUsMapRequirements(){

    if(
      !contactUsMapProblemType ||
      !contactUsMapStreet
    ){
      return;
    }


    const problemType =
      contactUsMapProblemType.value;


    const streetRequired =
      problemType ===
        "street_not_found" ||
      problemType ===
        "street_cannot_select_claim" ||
      problemType ===
        "duplicate_street" ||
      problemType ===
        "wrong_city";


    contactUsMapStreet.required =
      streetRequired;

  }


  /* ==================================================
     REQUEST TYPE CHANGE
  ================================================== */

  if(contactUsType){

    contactUsType.addEventListener(
      "change",
      function(){

        updateContactUsRequestType();

      }
    );

  }


  /* ==================================================
     MAP PROBLEM TYPE CHANGE
  ================================================== */

  if(contactUsMapProblemType){

    contactUsMapProblemType
      .addEventListener(
        "change",
        function(){

          updateContactUsMapRequirements();

        }
      );

  }


  /* ==================================================
     INITIAL FORM STATE
  ================================================== */

  updateContactUsRequestType();

  updateContactUsMapRequirements();

/* ==================================================
   WEBSITE CONTACT US — SUBMIT
================================================== */

contactUsForm.addEventListener(
  "submit",
  async function(event){

    event.preventDefault();


    const contactUsName =
      document
        .getElementById(
          "contactUsName"
        );

    const contactUsEmail =
      document
        .getElementById(
          "contactUsEmail"
        );

    const contactUsMessage =
      document
        .getElementById(
          "contactUsMessage"
        );

    const contactUsSuccessMessage =
      document
        .getElementById(
          "contactUsSuccessMessage"
        );


    const name =
      contactUsName
        ? contactUsName.value.trim()
        : "";


    const email =
      contactUsEmail
        ? contactUsEmail.value.trim()
        : "";


    const request_type =
      contactUsType
        ? contactUsType.value
        : "";


    const topic =
      contactUsTopic
        ? contactUsTopic.value
        : "";


    const supportMessage =
      contactUsMessage
        ? contactUsMessage.value.trim()
        : "";


    let problem_type = "";

    let message =
      supportMessage;


    /* ======================================
       MAP / STREET DETAILS
    ======================================= */

    if(
      request_type ===
      "map_street_problem"
    ){

      problem_type =
        contactUsMapProblemType
          ? contactUsMapProblemType.value
          : "";


      const state =
        contactUsMapState
          ? contactUsMapState.value.trim()
          : "";


      const city =
        contactUsMapCity
          ? contactUsMapCity.value.trim()
          : "";


      const street =
        contactUsMapStreet
          ? contactUsMapStreet.value.trim()
          : "";


      const countyField =
        document.getElementById(
          "contactUsMapCounty"
        );


      const nearbyAreaField =
        document.getElementById(
          "contactUsMapNearbyArea"
        );


      const county =
        countyField
          ? countyField.value.trim()
          : "";


      const nearbyArea =
        nearbyAreaField
          ? nearbyAreaField.value.trim()
          : "";


      message =
        "MAP / STREET PROBLEM\n\n" +

        "Problem Type: " +
        problem_type +
        "\n" +

        "State: " +
        state +
        "\n" +

        "City: " +
        (city || "Not provided") +
        "\n" +

        "Street: " +
        (street || "Not provided") +
        "\n" +

        "County: " +
        (county || "Not provided") +
        "\n" +

        "Nearby ZIP / Area: " +
        (nearbyArea || "Not provided") +
        "\n\n" +

        "User Description:\n" +
        supportMessage;

    }


    /* ======================================
       NON-MAP QUICK TOPIC
    ======================================= */

    if(
      request_type !==
        "map_street_problem" &&
      topic
    ){

      message =
        "TOPIC: " +
        topic +
        "\n\n" +
        supportMessage;

    }


    /* ======================================
       WRITE TO SUPPORT_REQUESTS
    ======================================= */

    const {
      error:
        supportInsertError
    } =
      await supabase
        .from(
          "support_requests"
        )
        .insert([
          {
            name,
            email,
            request_type,
            message
          }
        ]);


    if(supportInsertError){

      console.error(
        "WEBSITE CONTACT INSERT ERROR",
        supportInsertError
      );

      alert(
        "Something went wrong. Please try again."
      );

      return;

    }


    /* ======================================
       SEND WEBSITE NOTIFICATION + AUTO-REPLY
    ======================================= */

    try{

      const {
        data:
          notificationResult,

        error:
          notificationError
      } =
        await supabase.functions.invoke(
          "send_website_contact_notification",
          {
            body:{
              name,
              email,
              request_type,
              topic,
              problem_type,
              message
            }
          }
        );


      if(notificationError){

        console.error(
          "WEBSITE CONTACT NOTIFICATION ERROR",
          notificationError
        );

      }


    }catch(notificationException){

      console.error(
        "WEBSITE CONTACT NOTIFICATION ERROR",
        notificationException
      );

    }


    /* ======================================
       SUCCESS
    ======================================= */

    if(contactUsSuccessMessage){

      contactUsSuccessMessage
        .classList
        .remove(
          "contactUsHidden"
        );

    }


    contactUsForm.reset();


    updateContactUsRequestType();

    updateContactUsMapRequirements();

  }
);

  
})();
